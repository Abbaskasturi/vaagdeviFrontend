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

class Bikes extends Component {
  state = {apiState: apiConstants.inital, bikesData: [], searchInput: ''}

  componentDidMount() {
    this.getBikes()
  }

  getBikes = async () => {
    this.setState({apiState: apiConstants.progress})
    const apiUrl =
      'https://vaagproductsexchangeplateform.onrender.com/api/products/bikes'

    try {
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      this.setState({bikesData: data, apiState: apiConstants.success})
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
        We cannot seem to find the bikes you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getBikes}
      >
        Retry
      </button>
    </div>
  )

  successUi = () => {
    const {bikesData, searchInput} = this.state
    const filteredBikes = bikesData.filter(bike =>
      bike.name.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (filteredBikes.length === 0) {
      return (
        <div className="status-container">
          <h1 className="not-found-heading">
            Your searching product not found right now, try later.
          </h1>
        </div>
      )
    }

    return (
      <ul className="bikes-list">
        {filteredBikes.map(bike => (
          <li key={bike.id} className="bike-card">
            <img
              src={`${API_BASE_URL}${bike.imageUrl}`}
              alt={bike.name}
              className="bike-image"
            />
            <div className="bike-details">
              <h2 className="bike-name">{bike.name}</h2>
              <p className="bike-model">{bike.model}</p>

              <div className="specs-container">
                <p className="spec-item">
                  <strong>Condition:</strong> {bike.condition}
                </p>
                <p className="spec-item">
                  <strong>On-Road Speed:</strong> {bike.onRoadSpeed}
                </p>
                <p className="spec-item">
                  <strong>Proof:</strong> {bike.proofRequired}
                </p>
                <p className="spec-item">
                  <strong>Collect At:</strong> {bike.collectionPlace}
                </p>
                <p className="spec-item">
                  <strong>Status:</strong>{' '}
                  <span className={bike.inStock ? 'stock-in' : 'stock-out'}>
                    {bike.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </p>
              </div>

              <p className="security-deposit">
                <strong>Deposit:</strong> ₹{bike.securityDeposit}
              </p>

              <div className="rental-info">
                <p className="price">₹{bike.rentalCostPerDay} / day</p>
                <a
                  href={`tel:${bike.contactPhoneNumber}`}
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

  renderBikes = () => {
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
          <h1 className="main-heading">Bikes for Rent</h1>

          <div className="search-bar-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search by bike name..."
              value={searchInput}
              onChange={this.handleSearchChange}
            />
            <button type="button" className="search-icon-button">
              <FaSearch />
            </button>
          </div>

          {this.renderBikes()}
        </div>
        <BottomHeader />
      </div>
    )
  }
}

export default Bikes