import { NavLink } from 'react-router-dom'
import './sidebar.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useDispatch, useSelector } from 'react-redux'
import { setIsShowSidebar } from '../../redux/slices/sidebarSlice'
import { motion, AnimatePresence } from "framer-motion";
import logoImage from '../../assets/memories.png'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'

const SideBar = ({ width, isHideText, setHideSideBar }) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    

    return <div className="side-bar-container body-text" style={{ width }}>
        <AnimatePresence>
      <motion.div
        className="sidebar"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
      >
        <div className="side-bar-arrow-container show-mobile">
            <span onClick={e => dispatch(setIsShowSidebar(false))}>
                <ArrowBackIcon />
            </span>
        </div>
        <div className="center side-bar-logo-container">
            <img src={logoImage} />
        </div>
        <ul>
            <ul className="nav-nested-list-container">
                <li>
                    <div>
                        <NavLink to="/payments">
                            <PaymentOutlinedIcon />
                            Payments
                        </NavLink>
                    </div>
                </li>
                <li>
                    <div>
                        <NavLink to="/appointments">
                        <CalendarMonthOutlinedIcon />
                        Appointments
                        </NavLink>
                    </div>
                </li>
                <li>
                    <div>
                        <NavLink to="/users/seekers">
                        <PersonOutlineOutlinedIcon />
                        Seekers
                        </NavLink>
                    </div>
                </li>
                <li>
                    <div>
                        <NavLink to="/users/experts">
                            <BadgeOutlinedIcon />
                            Experts
                        </NavLink>
                    </div>
                </li>
                <li>
                    <div>
                        <NavLink to="/specialties">
                            <CategoryOutlinedIcon />
                            Specialties
                        </NavLink>
                    </div>
                </li>
                <li>
                    <div>
                        <NavLink to="/reviews">
                            <MapsUgcOutlinedIcon />
                            Reviews
                        </NavLink>
                    </div>
                </li>
                <li>
                    <div>
                        <NavLink to="/experts-verifications">
                            <VerifiedOutlinedIcon />
                            Verifications
                        </NavLink>
                    </div>
                </li>
            </ul>
        </ul>
    </motion.div>
    </AnimatePresence>
    </div>
}

export default SideBar