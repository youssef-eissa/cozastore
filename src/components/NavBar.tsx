import './NavBar.css'
import logo from '../components/assets/logo-01.png.webp'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import MenuAnimation from './MenuAnimation'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchOpen } from './Redux/SearchOpen'
import { logout } from './Redux/TheUser'
import Cart from './Cart';




function NavBar() {


    const token=useSelector((state:{TheUser:{token:string}})=>state.TheUser.token)

    const location=useLocation()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const FreeShipDiv = useRef<HTMLDivElement>(null)
    const NavBarRef = useRef<HTMLDivElement>(null)
    function handleNavBarScroll() {
        const scroll = window.scrollY
        if (FreeShipDiv.current && NavBarRef.current) {
            if (scroll > FreeShipDiv.current.offsetHeight) {
                NavBarRef.current.classList.add('ActionOnScroll')
                
            }  else {
                NavBarRef.current.classList.remove('ActionOnScroll')
            }
            
        }
        
    }

    useEffect(() => {
        window.addEventListener('scroll', handleNavBarScroll)
        return () => {
            window.removeEventListener('scroll', handleNavBarScroll)
        }
        
    },[])
    function handleLogout() {
        dispatch(logout())
        navigate('/')
        window.location.reload()
}


    return (
        <div className='container-fluid navbarContainer '>
            <div className='row d-flex justify-content-center align-items-center flex-column'>
                <div ref={FreeShipDiv} className='p-0 col-12 d-flex flex-column flex-md-row justify-content-center freeShipping  align-items-center '>
                    <p className='col-md-6 text-center text-md-start col-12 m-0 p-1 p-md-0'>Free shipping for standard order over $100</p>
                    <div className='col-md-4 col-12 p-1 p-md-0 rightBox d-flex justify-content-center'>
                        <span className='px-md-4 px-2 py-2 '>Help & FAQs</span>
                        <span onClick={()=>navigate(token==='' ? '/login' : '/profile')} className='px-md-4 px-1 py-2'>My Account</span>
                        <span className='px-md-4 px-2 py-2'>EN</span>
                        <span className='px-md-4 px-2 py-2'>USD</span>
                        {token!=='' && <span onClick={handleLogout} className='px-md-4 px-2 py-2'>Logout</span>}
                    </div>
                </div>
                <div ref={NavBarRef} className='col-12 NavBar justify-content-md-center justify-content-between d-flex p-0 px-3 px-md-0 '>
                    <Link reloadDocument to='/' className='col-md-2 col-4 logoCon d-flex align-items-center '>
                        <img style={{cursor:'pointer'}}   alt='logo' className='img-fluid' src={logo}/>
                    </Link>
                    <div className='col-5 d-none d-md-flex'>
                        <div className='p-3'>
                        <Link reloadDocument style={location.pathname === '/' ? {color:'#007bff'} : {color:'#333333'}} onClick={()=>window.scrollTo(0,0)} className='NavLink' to='/'>Home</Link>
                        </div>
                        <div className='p-3'>
                        <Link reloadDocument style={location.pathname === '/shop' ? {color:'#007bff'} : {color:'#333333'}} onClick={()=>window.scrollTo(0,0)} className='NavLink' to='/shop'>shop</Link>
                        </div>
                        <div className='p-3'>
                        <Link reloadDocument style={location.pathname === '/about' ? {color:'#007bff'} : {color:'#333333'}} onClick={()=>window.scrollTo(0,0)} className='NavLink' to='/about'>about</Link>
                        </div>
                        <div className='p-3'>
                        <Link reloadDocument style={location.pathname === '/contact' ? {color:'#007bff'} : {color:'#333333'}} onClick={()=>window.scrollTo(0,0)} className='NavLink' to='/contact'>contact</Link>
                        </div>
                    </div>
                    <div className='col-3 icons d-flex align-items-center justify-content-end'>
                        <SearchOutlined onClick={()=>dispatch(setSearchOpen())}  style={{ fontSize: 25,cursor: 'pointer',userSelect: 'none' }} />
                        <Cart />
                        <MenuAnimation />

                    </div>
                </div>
            </div>
    </div>
)
}

export default NavBar