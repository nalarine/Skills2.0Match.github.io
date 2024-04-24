import React, { useEffect, Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BiChevronDown } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { HiMenuAlt3 } from 'react-icons/hi'
import { AiOutlineClose, AiOutlineLogout } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import CustomButton from './CustomButton'
import { useSelector, useDispatch } from 'react-redux'
import { Logout } from '../redux/userSlice'
import { RiAdminLine } from 'react-icons/ri'
import logohead from '../assets/header.png' // Adjust the path to your logo image
import SignUp from './SignUp'

function MenuList({ user, onClick }) {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(Logout())
  }

  const userType = user?.accountType === 'seeker' ? 'Applicant' : 'Company' // Determine user type

  return (
    <Menu as="div" className="inline-block text-left">
      <div className="flex items-center">
        <Menu.Button className="flex items-center space-x-2 w-full rounded-md bg-white md:px-4 py-2 text-sm font-medium text-slate-700 hover:bg-opacity-20">
          <div className="leading-[80px] flex flex-col items-start">
            <p className="text-sm font-semibold">
              {user?.firstName ?? user?.name}
            </p>
            <span className="text-sm text-blue-600">{userType}</span>{' '}
            {/* Render user type */}
          </div>
          <img
            src={user.profileUrl}
            alt="user profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <BiChevronDown
            className="h-8 w-8 text-slate-600"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 right-2 mt-2 w-56 origin-top-right divide-y dividfe-gray-100 rounded-md bg-white shadow-lg focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={user?.accountType ? 'user-profile' : 'company-profile'}
                  className={`${active ? 'bg-green-500 text-white' : 'text-gray-900'} group flex items-center w-full rounded-md p-2 text-sm`}
                  onClick={onClick}
                >
                  <CgProfile
                    className={`${active ? 'text-white' : 'text-gray-600'} mr-2 h-5 w-5`}
                    aria-hidden="true"
                  />
                  Dashboard
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${active ? 'bg-green-500 text-white' : 'text-gray-900'} group flex items-center w-full rounded-md px-2 py-2 text-sm`}
                >
                  <AiOutlineLogout
                    className={`${active ? 'text-white' : 'text-gray-600'} mr-2 h-5 w-5`}
                    aria-hidden="true"
                  />
                  Log Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

const Navbar = () => {
  const { user } = useSelector((state) => state.user)
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const handleSignInRegister = () => {
    setOpen(true)
  }

  const handleCloseNavbar = () => {
    setIsOpen((prev) => !prev)
  }

  const handleScroll = () => {
    const offset = window.scrollY
    setScrolled(offset > 0)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div
        className={`fixed z-50 top-0 left-0 right-0 bg-nav-bg p-4 flex items-center justify-between shadow-solid rounded-lg transition-all duration-500 ease-in-out ${scrolled ? 'mt-0 ml-0 mr-0' : 'mt-4 ml-4 mr-4'}`}
      >
        <div className="flex items-center">
          <img src={logohead} alt="Logo" className="w-15 h-12 mr-2" />
        </div>
        <div className="flex items-center space-x-9 hidden lg:block">
          {' '}
          {/* Hide this block on mobile */}
          <Link to="/user-auth" className="hover:hover:text-green-500">
            Home
          </Link>
          <Link to="/companies" className="hover:hover:text-green-500">
            Companies
          </Link>
          <Link to="/AboutPage" className="hover:hover:text-green-500">
            About
          </Link>
          <Link to="/ContactPage" className="hover:hover:text-green-500">
            Contact
          </Link>
          {!user?.token ? (
            <>
              <button onClick={handleSignInRegister}>
                <CustomButton
                  title="Sign-in"
                  containerStyles="border border-green-500 text-green-500 px-4 py-2 rounded-full hover:bg-green-500 hover:text-white"
                />
              </button>
              <button onClick={handleSignInRegister}>
                <CustomButton
                  title="Register"
                  containerStyles="border border-green-500 px-4 py-2 rounded-full bg-green-500 text-white"
                />
              </button>
            </>
          ) : (
            <MenuList user={user} />
          )}
        </div>
        <button
          className="block lg:hidden text-slate-900"
          onClick={handleCloseNavbar}
        >
          {isOpen ? <AiOutlineClose size={26} /> : <HiMenuAlt3 size={26} />}
        </button>
      </div>
      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 left-0 right-0 bg-[#f7fdfd] lg:hidden flex flex-col pl-8 gap-3 py-5 z-50 mr-12 ${isOpen ? 'visible' : 'hidden'}`}
      >
        <AiOutlineClose onClick={handleCloseNavbar} />
        <Link to="/user-auth" className="hover:hover:text-green-500">
          Home
        </Link>
        <Link to="/companies" className="hover:hover:text-green-500">
          Companies
        </Link>
        <Link to="/AboutPage" className="hover:hover:text-green-500">
          About
        </Link>
        <Link to="/ContactPage" className="hover:hover:text-green-500">
          Contact
        </Link>
        <div className="w-full py-10">
          {!user?.token ? (
            <button onClick={handleSignInRegister}>
              <CustomButton
                title="Sign In"
                containerStyles="text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600"
              />
            </button>
          ) : (
            <MenuList user={user} onClick={handleCloseNavbar} />
          )}
        </div>
      </div>
      {open && <SignUp open={open} setOpen={setOpen} />}
    </>
  )
}

export default Navbar
