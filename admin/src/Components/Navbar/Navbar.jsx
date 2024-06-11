
import './Navbar.css'
import navlogo from '../../assets/logo-admin-mebelify.png'
import navProfile from '../../assets/navbar-profile.png'

const Navbar = () => {
  const handleLogoClick = () => {
    localStorage.removeItem('auth-token')
    window.location.href = 'http://localhost:3000';
    
  };
  return (
    <div className='navbar'>
        <img src={navlogo} onClick={handleLogoClick} alt="" className="nav-logo" />
        <img src={navProfile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar