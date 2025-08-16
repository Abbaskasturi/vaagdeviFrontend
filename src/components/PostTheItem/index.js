import React, {Component} from 'react'
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom';
import './index.css'

class PostTheItem extends Component {
  
  state = {
    selectedCategory: 'Laptop',
    name: '',
    rentalCostPerDay: '',
    collectionPlace: '',
    contactPhoneNumber: '',
    proofRequired: '',
    securityDeposit: '',
    model: '',
    ram: '',
    rom: '',
    processor: '',
    condition: '',
    onRoadSpeed: '',
    storage: '',
    edition: '',
    imageUrl: null, 
    apiResponse: '',
    isError: false,
    isLoading: false,
  }

 
  handleInputChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

 
  handleFileChange = event => {
    this.setState({imageUrl: event.target.files[0]})
  }

 
  handleCategoryChange = event => {
    this.setState({
      selectedCategory: event.target.value,
      name: '',
      rentalCostPerDay: '',
      collectionPlace: '',
      contactPhoneNumber: '',
      proofRequired: '',
      securityDeposit: '',
      model: '',
      ram: '',
      rom: '',
      processor: '',
      condition: '',
      onRoadSpeed: '',
      storage: '',
      edition: '',
      imageUrl: null,
      apiResponse: '',
    })
  }


  handleSubmit = async event => {
    event.preventDefault()
    this.setState({isLoading: true, apiResponse: ''})

    const jwtToken = Cookies.get('jwt_token')
    if (!jwtToken) {
      this.setState({
        apiResponse: 'You must be logged in to post an item.',
        isError: true,
        isLoading: false,
      })
      return
    }

    
    const formData = new FormData()
    const {selectedCategory, imageUrl, ...otherStateData} = this.state

    formData.append('category', selectedCategory)
    if (imageUrl) {
      formData.append('imageUrl', imageUrl)
    }

   
    for (const key in otherStateData) {
      if (otherStateData[key] !== '' && otherStateData[key] !== null) {
        formData.append(key, otherStateData[key])
      }
    }

    const apiUrl = 'https://vaagproductsexchangeplateform.onrender.com/api/products'
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: formData,
    }

    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to post item.')
      }
    
      this.setState({
        apiResponse: 'Item posted successfully!',
        isError: false,
        isLoading: false,
        name: '',
        rentalCostPerDay: '',
        collectionPlace: '',
        contactPhoneNumber: '',
        proofRequired: '',
        securityDeposit: '',
        model: '',
        ram: '',
        rom: '',
        processor: '',
        condition: '',
        onRoadSpeed: '',
        storage: '',
        edition: '',
        imageUrl: null,
      })
    
      document.getElementById('imageUrl').value = ''
    } catch (error) {
      this.setState({
        apiResponse: error.message,
        isError: true,
        isLoading: false,
      })
    }
  }


  handleComeBack = () => {
    this.props.history.push('/');
  }

  renderFormFields = () => {
    const {selectedCategory} = this.state
    const commonFields = (
      <>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="rentalCostPerDay">Rental Cost (per day)</label>
          <input type="number" id="rentalCostPerDay" name="rentalCostPerDay" value={this.state.rentalCostPerDay} onChange={this.handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="securityDeposit">Security Deposit</label>
          <input type="number" id="securityDeposit" name="securityDeposit" value={this.state.securityDeposit} onChange={this.handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="contactPhoneNumber">Contact Phone Number</label>
          <input type="tel" id="contactPhoneNumber" name="contactPhoneNumber" value={this.state.contactPhoneNumber} onChange={this.handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="collectionPlace">Collection Place</label>
          <input type="text" id="collectionPlace" name="collectionPlace" value={this.state.collectionPlace} onChange={this.handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="proofRequired">Proof Required</label>
          <input type="text" id="proofRequired" name="proofRequired" value={this.state.proofRequired} onChange={this.handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input type="text" id="model" name="model" value={this.state.model} onChange={this.handleInputChange} required />
        </div>
      </>
    )

    switch (selectedCategory) {
      case 'Laptop':
        return (
          <>
            {commonFields}
            <div className="form-group">
              <label htmlFor="processor">Processor</label>
              <input type="text" id="processor" name="processor" value={this.state.processor} onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="ram">RAM (e.g., 16 GB)</label>
              <input type="text" id="ram" name="ram" value={this.state.ram} onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="rom">Storage (e.g., 512 GB SSD)</label>
              <input type="text" id="rom" name="rom" value={this.state.rom} onChange={this.handleInputChange} />
            </div>
          </>
        )
      case 'Bike':
        return (
          <>
            {commonFields}
            <div className="form-group">
              <label htmlFor="condition">Condition</label>
              <input type="text" id="condition" name="condition" value={this.state.condition} onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="onRoadSpeed">On-Road Speed</label>
              <input type="text" id="onRoadSpeed" name="onRoadSpeed" value={this.state.onRoadSpeed} onChange={this.handleInputChange} />
            </div>
          </>
        )
      case 'Camera':
        return (
          <>
            {commonFields}
            <div className="form-group">
              <label htmlFor="storage">Storage Details</label>
              <input type="text" id="storage" name="storage" value={this.state.storage} onChange={this.handleInputChange} />
            </div>
          </>
        )
      case 'Gatebook':
        return (
          <>
            {commonFields}
            <div className="form-group">
              <label htmlFor="edition">Edition Year</label>
              <input type="text" id="edition" name="edition" value={this.state.edition} onChange={this.handleInputChange} />
            </div>
          </>
        )
      case 'Drafter':
        return <>{commonFields}</>
      default:
        return null
    }
  }

  render() {
    const {selectedCategory, apiResponse, isError, isLoading} = this.state
    return (
      <div className="post-item-container">
        <div className="post-item-card">
          <h1 className="post-item-heading">
            Post Your Product in the Marketplace
          </h1>
          <p className="post-item-subheading">
            Choose a category and fill out the details to list your item for rent.
          </p>

          <div className="form-group">
            <label htmlFor="category-select">Select a Category</label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={this.handleCategoryChange}
            >
              <option value="Laptop">Laptop</option>
              <option value="Bike">Bike</option>
              <option value="Camera">Camera</option>
              <option value="Gatebook">Gatebook</option>
              <option value="Drafter">Drafter</option>
            </select>
          </div>

          <form onSubmit={this.handleSubmit}>
            {this.renderFormFields()}
            <div className="form-group">
              <label htmlFor="imageUrl">Upload Product Image</label>
              <input
                type="file"
                id="imageUrl"
                name="imageUrl"
                onChange={this.handleFileChange}
                required
              />
            </div>
            <div className="button-group">
              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? 'Posting...' : 'Post Item'}
              </button>
              <button
                type="button"
                className="come-back-button"
                onClick={this.handleComeBack}
              >
                Come Back
              </button>
            </div>
            {apiResponse && (
              <p className={`api-response ${isError ? 'error' : 'success'}`}>
                {apiResponse}
              </p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(PostTheItem);