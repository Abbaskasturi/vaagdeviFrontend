import {Component} from 'react'
import {Oval} from 'react-loader-spinner'
import {FaPhoneAlt, FaSearch} from 'react-icons/fa' 
import './index.css'

import ProductsBtn from '../ProductsBtn'
import Header from '../Header'

import BottomHeader from '../BottomHeader' 

const apiConstants = {
  inital: 'INITIAL',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  fail: 'FAILURE',
}


const API_BASE_URL = 'https://vaagproductsexchangeplateform.onrender.com'

class Drafters extends Component {

  state = {apiState: apiConstants.inital, draftersData: [], searchInput: ''}

  componentDidMount() {
    this.getDrafters()
  }

  getDrafters = async () => {
    this.setState({apiState: apiConstants.progress})
    const apiUrl =
      'https://vaagproductsexchangeplateform.onrender.com/api/products/drafters'

    try {
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      this.setState({draftersData: data, apiState: apiConstants.success})
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
        We cannot seem to find the drafters you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getDrafters}
      >
        Retry
      </button>
    </div>
  )

  successUi = () => {
  
    const {draftersData, searchInput} = this.state
    const filteredDrafters = draftersData.filter(drafter =>
      drafter.name.toLowerCase().includes(searchInput.toLowerCase()),
    )


    if (filteredDrafters.length === 0) {
      return (
        <div className="status-container">
          <h1 className="not-found-heading">
            Your searching product not found right now, try later.
          </h1>
        </div>
      )
    }

    return (
      <ul className="drafters-list">
        {filteredDrafters.map(drafter => (
          <li key={drafter.id} className="drafter-card">
            <img
              src={`${API_BASE_URL}${drafter.imageUrl}`}
              alt={drafter.name}
              className="drafter-image"
            />
            <div className="drafter-details">
              <h2 className="drafter-name">{drafter.name}</h2>
              <p className="drafter-model">{drafter.model}</p>

              <div className="specs-container">
                <p className="spec-item">
                  <strong>Proof Required:</strong> {drafter.proofRequired}
                </p>
                <p className="spec-item">
                  <strong>Collection At:</strong> {drafter.collectionPlace}
                </p>
                <p className="spec-item">
                  <strong>Status:</strong>{' '}
                  <span className={drafter.inStock ? 'stock-in' : 'stock-out'}>
                    {drafter.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </p>
              </div>

              <p className="security-deposit">
                <strong>Security Deposit:</strong> ₹{drafter.securityDeposit}
              </p>

              <div className="rental-info">
                <p className="price">₹{drafter.rentalCostPerDay} / day</p>
                <a
                  href={`tel:${drafter.contactPhoneNumber}`}
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

  renderDrafters = () => {
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
          <h1 className="main-heading">Drafters for Rent</h1>
          <div className="search-bar-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search by drafter name..."
              value={searchInput}
              onChange={this.handleSearchChange}
            />
            <button type="button" className="search-icon-button">
              <FaSearch />
            </button>
          </div>

          {this.renderDrafters()}
        </div>
        <BottomHeader />
      </div>
    )
  }
}

export default Drafters