import {Component} from 'react'
import {Oval} from 'react-loader-spinner'
import {FaPhoneAlt, FaSearch} from 'react-icons/fa' 
import './index.css'

import ProductsBtn from '../ProductsBtn'
import Header from '../Header' 

import BottomHeader  from '../BottomHeader'

const apiConstants = {
  inital: 'INITIAL',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  fail: 'FAILURE',
}


const API_BASE_URL = 'https://vaagproductsexchangeplateform.onrender.com'

class Laptops extends Component {
  
  state = {apiState: apiConstants.inital, laptopsData: [], searchInput: ''}

  componentDidMount() {
    this.getLaptops()
  }

  getLaptops = async () => {
    this.setState({apiState: apiConstants.progress})
    const apiUrl =
      'https://vaagproductsexchangeplateform.onrender.com/api/products/laptops'

    try {
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      this.setState({laptopsData: data, apiState: apiConstants.success})
    } catch (error) {
      this.setState({apiState: apiConstants.fail})
    }
  }


  handleSearchChange = event => {
    this.setState({searchInput: event.target.value})
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
        We cannot seem to find the laptops you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getLaptops}
      >
        Retry
      </button>
    </div>
  )

  successUi = () => {
   
    const {laptopsData, searchInput} = this.state
    const filteredLaptops = laptopsData.filter(laptop =>
      laptop.name.toLowerCase().includes(searchInput.toLowerCase()),
    )

    
    if (filteredLaptops.length === 0) {
      return (
        <div className="status-container">
          <h1 className="not-found-heading">
            Your searching product not found right now, try later.
          </h1>
        </div>
      )
    }

    return (
      <ul className="laptops-list">
        {filteredLaptops.map(laptop => (
          <li key={laptop.id} className="laptop-card">
            <img
              src={`${API_BASE_URL}${laptop.imageUrl}`}
              alt={laptop.name}
              className="laptop-image"
            />
            <div className="laptop-details">
              <h2 className="laptop-name">{laptop.name}</h2>
              <p className="laptop-model">{laptop.model}</p>

              <div className="specs-container">
                <p className="spec-item">
                  <strong>Processor:</strong> {laptop.processor}
                </p>
                <p className="spec-item">
                  <strong>RAM:</strong> {laptop.ram}
                </p>
                <p className="spec-item">
                  <strong>Storage:</strong> {laptop.rom}
                </p>
                <p className="spec-item">
                  <strong>Proof:</strong> {laptop.proofRequired}
                </p>
                <p className="spec-item">
                  <strong>Collect At:</strong> {laptop.collectionPlace}
                </p>
                <p className="spec-item">
                  <strong>Status:</strong>{' '}
                  <span className={laptop.inStock ? 'stock-in' : 'stock-out'}>
                    {laptop.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </p>
              </div>

              <p className="security-deposit">
                <strong>Deposit:</strong> ₹{laptop.securityDeposit}
              </p>

              <div className="rental-info">
                <p className="price">₹{laptop.rentalCostPerDay} / day</p>
                <a
                  href={`tel:${laptop.contactPhoneNumber}`}
                  className="phone-link"
                >
                  <FaPhoneAlt className="phone-icon" />
                  Contact
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderLaptops = () => {
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
    const {searchInput} = this.state
    return (
      <div className="page-container">
        <Header />
        <div className="content-container">
          <ProductsBtn />
          <h1 className="main-heading">Laptops for Rent</h1>

      
          <div className="search-bar-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search by laptop name..."
              value={searchInput}
              onChange={this.handleSearchChange}
            />
            <button type="button" className="search-icon-button">
              <FaSearch />
            </button>
          </div>

          {this.renderLaptops()}
        </div>
        <BottomHeader  />
      </div>
    )
  }
}

export default Laptops