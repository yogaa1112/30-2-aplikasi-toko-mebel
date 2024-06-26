
import './NavAdmin.css'
import navlogo from '../Assets/logo-admin-mebelify.png'
import navProfile from '../Assets/navbar-profile.png'

const NavAdmin = () => {
  const handleLogoClick = () => {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('isAdmin')
    window.location.replace("/");
    
  };
  return (
    <div className='navAdmin'>
        <img src={navlogo} onClick={handleLogoClick} alt="" className="navAdmin-logo" />
        <img src={navProfile} className='navAdmin-profile' alt="" />
    </div>
  )
}

export default NavAdmin