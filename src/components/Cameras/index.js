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

class Cameras extends Component {

  state = {apiState: apiConstants.inital, camerasData: [], searchInput: ''}

  componentDidMount() {
    this.getCameras()
  }

  getCameras = async () => {
    this.setState({apiState: apiConstants.progress})
    const apiUrl =
      'https://vaagproductsexchangeplateform.onrender.com/api/products/cameras'

    try {
      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      this.setState({camerasData: data, apiState: apiConstants.success})
    } catch (error) {
      this.setState({apiState: apiConstants.fail})
    }
  }

 
  handleSearchChange = event => {
    this.setState({searchInput: event.target.value})
  }


  formatDate = dateString => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    return new Date(dateString).toLocaleDateString('en-US', options)
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
        We cannot seem to find the cameras you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getCameras}
      >
        Retry
      </button>
    </div>
  )

  successUi = () => {
    
    const {camerasData, searchInput} = this.state
    const filteredCameras = camerasData.filter(camera =>
      camera.name.toLowerCase().includes(searchInput.toLowerCase()),
    )

    
    if (filteredCameras.length === 0) {
      return (
        <div className="status-container">
          <h1 className="not-found-heading">
            Your searching product not found right now, try later.
          </h1>
        </div>
      )
    }

    return (
      <ul className="cameras-list">
        {filteredCameras.map(camera => (
          <li key={camera.id} className="camera-card">
            <img
              src={`${API_BASE_URL}${camera.imageUrl}`}
              alt={camera.name}
              className="camera-image"
            />
            <div className="camera-details">
              <h2 className="camera-name">{camera.name}</h2>
              <p className="camera-model">{camera.model}</p>

              <div className="specs-container">
                <p className="spec-item">
                  <strong>Storage:</strong> {camera.storage}
                </p>
                <p className="spec-item">
                  <strong>Proof Required:</strong> {camera.proofRequired}
                </p>
                <p className="spec-item">
                  <strong>Collect At:</strong> {camera.collectionPlace}
                </p>
                <p className="spec-item">
                  <strong>Status:</strong>{' '}
                  <span className={camera.inStock ? 'stock-in' : 'stock-out'}>
                    {camera.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </p>
              </div>

              <p className="security-deposit">
                <strong>Deposit:</strong> ₹{camera.securityDeposit}
              </p>

              <div className="rental-info">
                <p className="price">₹{camera.rentalCostPerDay} / day</p>
                <a
                  href={`tel:${camera.contactPhoneNumber}`}
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

  renderCameras = () => {
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
          <h1 className="main-heading">Cameras for Rent</h1>

        
          <div className="search-bar-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search by camera name..."
              value={searchInput}
              onChange={this.handleSearchChange}
            />
            <button type="button" className="search-icon-button">
              <FaSearch />
            </button>
          </div>

          {this.renderCameras()}
        </div>
        <BottomHeader />
      </div>
    )
  }
}

export default Cameras