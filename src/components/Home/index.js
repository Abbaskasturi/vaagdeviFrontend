import Cookies from 'js-cookie'
import { Component } from 'react'
import { Redirect } from 'react-router-dom'

import './index.css'

import Laptops from '../Laptops'

class Home extends Component {
  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    } 
    return (
      <div className= "Home-container">
        <div className='both-side-container'>
          <Laptops />
        </div>
      </div>
    )
  }
}

export default Home
