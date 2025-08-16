import { Component } from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { Oval } from 'react-loader-spinner'
import './index.css'

import Header from '../Header' 

const apiConstants = {
  inital: 'INITIAL',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  fail: 'FAILURE',
}

const API_BASE_URL = 'https://vaagproductsexchangeplateform.onrender.com'

class ProductsDisplay extends Component {
  state = {apiState: apiConstants.inital, productsData: []}

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({apiState: apiConstants.progress})
    const apiUrl = 'https://vaagproductsexchangeplateform.onrender.com/api/products'

    try {
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      this.setState({productsData: data, apiState: apiConstants.success})
    } catch (error) {
      this.setState({apiState: apiConstants.fail})
    }
  }

  progressUi = () => (
    <div className="status-container">
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#007BFF"
        ariaLabel="oval-loading"
      />
    </div>
  )

  failUi = () => (
    <div className="status-container failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We could not find any products right now.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getProducts}
      >
        Retry
      </button>
    </div>
  )

  successUi = () => {
    const {productsData} = this.state
    return (
      <ul className="product-list-simple">
        {productsData.map(product => (
          <li
            key={`${product.category}-${product.id}`}
            className="product-card-simple"
          >
            <img
              src={`${API_BASE_URL}${product.imageUrl}`}
              alt={product.name}
              className="product-image-simple"
            />
            <div className="product-details-simple">
              <h2 className="product-name-simple">{product.name}</h2>
              <p className="product-info-item">
                <strong>Rent:</strong> ₹{product.rentalCostPerDay} / day
              </p>
              <p className="product-info-item">
                <strong>Deposit:</strong> ₹{product.securityDeposit}
              </p>
              <p className="product-info-item">
                <strong>Proof:</strong> {product.proofRequired}
              </p>
              <p className="product-info-item">
                <strong>Collect At:</strong> {product.collectionPlace}
              </p>
              <a
                href={`tel:${product.contactPhoneNumber}`}
                className="contact-link-simple"
              >
                <FaPhoneAlt /> Contact Owner
              </a>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderProducts = () => {
    const {apiState} = this.state
    switch (apiState) {
      case apiConstants.progress:
        return this.progressUi()
      case apiConstants.fail:
        return this.failUi()
      case apiConstants.success:
        return this.successUi()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="page-container">
        <div className="content-container">
          <Header />
          <h1 className="main-heading">Marketplace</h1>
          {this.renderProducts()}
        </div>
      </div>
    )
  }
}

export default ProductsDisplay