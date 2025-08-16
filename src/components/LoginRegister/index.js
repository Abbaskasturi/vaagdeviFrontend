import { Component } from 'react'
import Cookies from 'js-cookie'
import { withRouter, Redirect } from 'react-router-dom'
import './index.css'

class  LoginRegister extends Component {
  state = {
    mode: 'login',
    name: '',
    email: '',
    password: '',
    message: '',
    messageType: ''
  }

  toggleMode = () => {
    this.setState({
      mode: this.state.mode === 'login' ? 'register' : 'login',
      message: '',
      messageType: ''
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { mode, name, email, password } = this.state
    const { history } = this.props

    const endpoint =
      mode === 'register'
        ? 'https://vaagproductsexchangeplateform.onrender.com/api/auth/register'
        : 'https://vaagproductsexchangeplateform.onrender.com/api/auth/login'

    const body =
      mode === 'register' ? { name, email, password } : { email, password }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await res.json()

      if (res.ok) {
        if (mode === 'login' && data.token) {
          Cookies.set('jwt_token', data.token, { expires: 7 }) 
          history.replace('/') 
        } else {
          this.setState({
            message:
              data.message ||
              `${mode === 'login' ? 'Login' : 'Registration'} successful`,
            messageType: 'success'
          })
        }
      } else {
        this.setState({
          message:
            data.message ||
            `${mode === 'login' ? 'Login' : 'Registration'} failed`,
          messageType: 'error'
        })
      }
    } catch (err) {
      this.setState({ message: 'Network error', messageType: 'error' })
    }
  }

  render() {
    const { mode, name, email, password, message, messageType } = this.state
    const token = Cookies.get("jwt_token") 
    if(token !== undefined){
      return <Redirect to='/'/>
    }

    return (
      <div className="auth-container">
        <h1 className="welcome-heading">
          WELCOME TO VAAGDEVI PRODUCTS EXCHANGE PLATEFROM
        </h1>
        <p className="trusted-para">Trusted By Thousands Of Students</p>
        <div className="auth-card">
          <h2 className="auth-title">
            {mode === 'login' ? 'Login' : 'Register'}
          </h2>
          <form onSubmit={this.handleSubmit}>
            {mode === 'register' && (
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={name}
                onChange={this.handleChange}
                required
                className="auth-input"
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Enter your college email id"
              value={email}
              onChange={this.handleChange}
              required
              className="auth-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={this.handleChange}
              required
              className="auth-input"
            />
            <button type="submit" className="auth-btn">
              {mode === 'login' ? 'Login' : 'Register'}
            </button>
          </form>
          {message && (
            <p className={`auth-message ${messageType}`}>{message}</p>
          )}
          <button onClick={this.toggleMode} className="switch-btn">
            {mode === 'login'
              ? "Don't have an account? Register"
              : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(LoginRegister)
