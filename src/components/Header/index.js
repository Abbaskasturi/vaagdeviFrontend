import './index.css'

import { withRouter } from  "react-router-dom" 

import Cookies from 'js-cookie' 

const Header = (props) => {
    const {history} = props 
    const logoutfun = () => {
        Cookies.remove('jwt_token') 
        history.replace('/login')
    }

  const returnHome = () => {
    const {history} = props 
    history.replace("/")
  }
  return (
    <nav className="header-container">
      <img
        src="https://res.cloudinary.com/dsp32vyqi/image/upload/v1755096172/Gemini_Generated_Image_lrb392lrb392lrb3_fnywbo.png" 
        alt="website logo"
        className="logo"
        onClick = {returnHome}
      />
      <h1 className='header-heading'>Your Unused Items Are an Income Stream </h1>
      <button type="button" className="logout-btn" onClick={logoutfun}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
