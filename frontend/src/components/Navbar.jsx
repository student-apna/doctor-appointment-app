import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  // const [token, setToken] = useState(true);
  const { token, setToken, userData, backendUrl } = useContext(AppContext);
  const dropdownRef = useRef();

  const [showMenu, setShowMenu] = useState(false);

  const sendVerificationOtp = async () => {
    setShowDropdown(false);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/user/send-verify-otp', {}, { headers: { token } });
      if (data.success) {
        // navigate('/email-verify');
        toast.success(data.message);
      }
      else {
        toast.error(data.error);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }



  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    navigate('/');

  }

  useEffect(() => {
    setShowDropdown(false);
  }, [location])







  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 '>
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" />

      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
          <li className='py-1'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-[#5F6FFF] w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/doctors'>
          <li className='py-1'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-[#5F6FFF] w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/about'>
          <li className='py-1'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/contact'>
          <li className='py-1'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-[#5F6FFF] w-3/5 m-auto hidden' />
        </NavLink>
        {/* <button
          onClick={() => window.location.href = "http://localhost:5174/login"}
          className="border border-gray-300 rounded-full px-2 py-1 text-xs font-small text-black hover:bg-gray-100 transition duration-200"
        >
          Admin Panel
        </button> */}

      </ul>

      <div className='flex items-center gap-5'>
       
        {!token &&
           <button
          onClick={() => window.location.href = "https://doctor-appointment-app-admin-6jja.onrender.com"}
          className="border border-gray-300 rounded-full px-6 py-1.5 text-sm md:text-xs font-medium text-black hover:bg-gray-100 transition duration-200"
        >
          Admin 
        </button>
        }
       



        {token && userData ? (

          <div
            className='relative group cursor-pointer'
            onClick={() => setShowDropdown(prev => !prev)}
            ref={dropdownRef}
          >
            <div className="flex items-center gap-2">
              <img className='w-8 h-8 rounded-full' src={userData.image} alt="" />
              <img className={`w-2 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} src={assets.dropdown_icon} alt="" />
            </div>

            <div
              className={`
                           absolute top-12 right-0 z-20 text-base font-medium text-gray-600
                           ${showDropdown ? 'block' : 'hidden'}
                           `}
            >
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-3 p-4'>
                <p onClick={() => { navigate('/my-profile'); }} className='cursor-pointer px-4 py-2 rounded hover:bg-[#5F6FFF] hover:text-white active:bg-[#5F6FFF] active:text-white'>My Profile</p>
                <p onClick={() => { navigate('/my-appointments') }} className='cursor-pointer px-3 py-2 rounded hover:bg-[#5F6FFF] hover:text-white'>My Appointments</p>
                {

                  !userData.isAccountVerified &&
                  <p
                    onClick={() => {
                      navigate('/email-verify');
                      sendVerificationOtp();


                    }}
                    className='cursor-pointer px-3 py-2 rounded hover:bg-[#5F6FFF] hover:text-white'
                  >
                    Verify Email
                  </p>
                }



                <p onClick={logout} className='cursor-pointer px-3 py-2 rounded hover:bg-[#5F6FFF] hover:text-white'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className='bg-[#5F6FFF] text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
        )}

        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
        {/* --------Mobile Menu------ */}
        <div className={`fixed top-0 right-0 h-full z-40 bg-white shadow-md transform transition-transform duration-300 ease-in-out md:hidden ${showMenu ? 'translate-x-0 w-[70%]' : 'translate-x-full w-0 overflow-hidden'}`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt="" />
            <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
