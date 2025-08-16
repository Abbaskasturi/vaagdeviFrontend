import React, {Component} from 'react'
import {Oval} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaEdit, FaTrash} from 'react-icons/fa'
import './index.css'

import Header from '../Header'

const apiConstants = {
  initial: 'INITIAL',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  fail: 'FAILURE',
}


const API_BASE_URL = 'https://vaagproductsexchangeplateform.onrender.com'

class Updatation extends Component {
  state = {
    apiState: apiConstants.initial,
    myProducts: [],
    isModalOpen: false,
    editingProduct: null, 
  
    rentalCostPerDay: '',
    securityDeposit: '',
    contactPhoneNumber: '',
    inStock: true,
  }

  componentDidMount() {
    this.getMyProducts()
  }

  
  getMyProducts = async () => {
    this.setState({apiState: apiConstants.progress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `${API_BASE_URL}/api/products/me`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(apiUrl, options)
      if (!response.ok) {
        throw new Error('Failed to fetch your products.')
      }
      const data = await response.json()
      this.setState({myProducts: data, apiState: apiConstants.success})
    } catch (error) {
      this.setState({apiState: apiConstants.fail})
    }
  }

  
  handleDelete = async (category, id) => {
    
    if (window.confirm('Are you sure you want to delete this product?')) {
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `${API_BASE_URL}/api/products/${category.toLowerCase()}/${id}`
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      try {
        const response = await fetch(apiUrl, options)
        if (!response.ok) {
          throw new Error('Failed to delete product.')
        }
        
        this.getMyProducts()
      } catch (error) {
        
        alert('Error deleting product. Please try again.')
      }
    }
  }


  openUpdateModal = product => {
    this.setState({
      isModalOpen: true,
      editingProduct: product,
      rentalCostPerDay: product.rentalCostPerDay,
      securityDeposit: product.securityDeposit,
      contactPhoneNumber: product.contactPhoneNumber,
      inStock: product.inStock,
    })
  }

  closeUpdateModal = () => {
    this.setState({isModalOpen: false, editingProduct: null})
  }

  handleUpdateChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleUpdateSubmit = async event => {
    event.preventDefault()
    const {
      editingProduct,
      rentalCostPerDay,
      securityDeposit,
      contactPhoneNumber,
      inStock,
    } = this.state
    const {category, id} = editingProduct

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `${API_BASE_URL}/api/products/${category.toLowerCase()}/${id}`
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        rentalCostPerDay,
        securityDeposit,
        contactPhoneNumber,
        inStock,
      }),
    }

    try {
      const response = await fetch(apiUrl, options)
      if (!response.ok) {
        throw new Error('Failed to update product.')
      }
      this.closeUpdateModal()
      this.getMyProducts()
    } catch (error) {
      
      alert('Error updating product. Please try again.')
    }
  }

 
  getProgress = () => (
    <div className="status-container">
      <Oval visible={true} height="80" width="80" color="#007BFF" />
    </div>
  )

  getFail = () => (
    <div className="status-container failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We could not fetch your products. Please try again.</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getMyProducts}
      >
        Retry
      </button>
    </div>
  )

  getSuccess = () => {
    const {myProducts} = this.state
    if (myProducts.length === 0) {
      return (
        <div className="status-container">
          <p>You haven&apos;t posted any products yet.</p>
        </div>
      )
    }
    return (
      <ul className="my-products-list">
        {myProducts.map(product => (
          <li
            key={`${product.category}-${product.id}`}
            className="my-product-card"
          >
            <img
              src={`${API_BASE_URL}${product.imageUrl}`}
              alt={product.name}
              className="my-product-image"
            />
            <div className="my-product-details">
              <p className="my-product-category">{product.category}</p>
              <h2 className="my-product-name">{product.name}</h2>
              <div className="my-product-actions">
                <button
                  type="button"
                  className="action-button update-btn"
                  onClick={() => this.openUpdateModal(product)}
                >
                  <FaEdit /> Update
                </button>
                <button
                  type="button"
                  className="action-button delete-btn"
                  onClick={() =>
                    this.handleDelete(product.category, product.id)
                  }
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderAllProducts = () => {
    const {apiState} = this.state
    switch (apiState) {
      case apiConstants.progress:
        return this.getProgress()
      case apiConstants.success:
        return this.getSuccess()
      case apiConstants.fail:
        return this.getFail()
      default:
        return null
    }
  }

  renderUpdateModal = () => {
    const {
      isModalOpen,
      rentalCostPerDay,
      securityDeposit,
      contactPhoneNumber,
      inStock,
    } = this.state
    if (!isModalOpen) return null

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Update Product</h2>
          <form onSubmit={this.handleUpdateSubmit}>
            <div className="form-group">
              <label htmlFor="rentalCostPerDay">Rental Cost (per day)</label>
              <input
                type="number"
                id="rentalCostPerDay"
                name="rentalCostPerDay"
                value={rentalCostPerDay}
                onChange={this.handleUpdateChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="securityDeposit">Security Deposit</label>
              <input
                type="number"
                id="securityDeposit"
                name="securityDeposit"
                value={securityDeposit}
                onChange={this.handleUpdateChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactPhoneNumber">Contact Phone Number</label>
              <input
                type="tel"
                id="contactPhoneNumber"
                name="contactPhoneNumber"
                value={contactPhoneNumber}
                onChange={this.handleUpdateChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inStock">Stock Status</label>
              <select
                id="inStock"
                name="inStock"
                value={inStock}
                onChange={this.handleUpdateChange}
              >
                <option value={true}>In Stock</option>
                <option value={false}>Out of Stock</option>
              </select>
            </div>
            <div className="modal-actions">
              <button type="submit" className="modal-button save-btn">
                Save Changes
              </button>
              <button
                type="button"
                className="modal-button cancel-btn"
                onClick={this.closeUpdateModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="page-container">
          <div className="content-container"> 
            <Header />
            <h1 className="main-heading">Manage Your Products</h1>
            {this.renderAllProducts()}
          </div>
        </div>
        {this.renderUpdateModal()}
      </>
    )
  }
}

export default Updatation