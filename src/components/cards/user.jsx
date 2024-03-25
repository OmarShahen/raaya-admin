import './patient.css'
import { getAge } from '../../utils/age-calculator'
import CardDate from './components/date'
import CardActions from './components/actions'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import CardTransition from '../transitions/card-transitions'
import { capitalizeFirstLetter } from '../../utils/formatString'
import { useSelector } from 'react-redux'
import translations from '../../i18n'
import { formatDistance  } from 'date-fns'
import CardImage from './components/image'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { serverRequest } from '../API/request'
import { toast } from 'react-hot-toast'
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined'
import { useNavigate } from 'react-router-dom'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'


const UserCard = ({ user, setTargetUser, setIsShowDeleteModal, setIsShowUpdateModal, reload, setReload }) => {

    const lang = useSelector(state => state.lang.lang)

    const navigate = useNavigate()

    const userName = `${user.firstName}`

    const updateOnboardingStatus = (isOnBoarded) => {
        serverRequest.patch(`/v1/experts/${user._id}/onboarding`, { isOnBoarded })
        .then(response => {
            toast.success(response.data.message, { duration: 3000, position: 'top-right' })
            setReload(reload + 1)
        })
        .catch(error => {
            console.error(error)
            toast.error(error?.response?.data?.message, { duration: 3000, position: 'top-right' })
        })
    }

    
    const updatePromoCodeAcceptance = (isAcceptPromoCodes) => {
        serverRequest.patch(`/v1/experts/${user._id}/promo-codes-acceptance`, { isAcceptPromoCodes })
        .then(response => {
            toast.success(response.data.message, { duration: 3000, position: 'top-right' })
            setReload(reload + 1)
        })
        .catch(error => {
            console.error(error)
            toast.error(error?.response?.data?.message, { duration: 3000, position: 'top-right' })
        })
    }

    const cardActionsList = [
        {
            name: 'Delete User',
            icon: <DeleteOutlineOutlinedIcon />,
            onAction: (e) => {
                e.stopPropagation()
                setTargetUser(user)
                setIsShowDeleteModal(true)
            }
        },
        {
            name: 'View Profile',
            icon: <RemoveRedEyeOutlinedIcon />,
            onAction: (e) => {
                e.stopPropagation()
                window.location.href = `https://ra-aya.web.app/experts/${user._id}`
            }
        },
        {
            name: 'Update Profile',
            icon: <CreateOutlinedIcon />,
            onAction: (e) => {
                e.stopPropagation()
                setTargetUser(user)
                setIsShowUpdateModal(true)
            }
        },
        {
            name: 'Update Onboarding',
            icon: <HomeOutlinedIcon />,
            onAction: (e) => {
                e.stopPropagation()
                updateOnboardingStatus(!user.isOnBoarded)
            }
        },
        {
            name: 'Update Coupons',
            icon: <LoyaltyOutlinedIcon />,
            onAction: (e) => {
                e.stopPropagation()
                updatePromoCodeAcceptance(!user.isAcceptPromoCodes)
            }
        }
    ]

    return <CardTransition>
        <div 
        className="patient-card-container body-text disable-hover hoverable">
            <div className="patient-card-header">
                <div className="patient-image-info-container">
                    <CardImage 
                    name={userName}  
                    imageURL={user.profileImageURL}
                    />
                    <div>
                        <strong>{userName}</strong>
                        <span className="grey-text">{user.email}</span>
                    </div>
                </div>
                <CardActions actions={cardActionsList} />
            </div>
            <div className="patient-card-body">
                <ul>
                    <li>
                        <strong>ID</strong>
                        <span>#{user.userId}</span>
                    </li>
                    <li>
                        <strong>Phone</strong>
                        <span>+{user.countryCode}{user.phone}</span>
                    </li>
                    <li>
                        <strong>{translations[lang]['Gender']}</strong>
                        <span>{user.gender ? translations[lang][capitalizeFirstLetter(user.gender)] : translations[lang]['Not registered']}</span>
                    </li>
                    <li>
                        <strong>{translations[lang]['Age']}</strong>
                        <span>{user.dateOfBirth ? getAge(user.dateOfBirth) : translations[lang]['Not Registered']}</span>
                    </li>
                    <li>
                        <strong>Speciality</strong>
                        {
                            user.speciality && user.speciality.length !== 0 ?
                            <span>{user.speciality[0].name}</span>
                            :
                            <span>Not Registered</span>
                        }
                    </li>
                    <li>
                        <strong>Status</strong>
                        {
                            user?.isVerified ?
                            <span className="status-btn done bold-text">Verified</span>
                            :
                            <span className="status-btn rejected bold-text">Not Verified</span>
                        }
                    </li>
                    <li>
                        <strong>Type</strong>
                        <span>{user.type ? capitalizeFirstLetter(user.type) : 'Not Registered'}</span>
                    </li>
                    <li>
                        <strong>Onboarding</strong>
                        {
                            user.isOnBoarded ?
                            <span className="status-btn done bold-text">Done</span>
                            :
                            <span className="status-btn pending bold-text">Pending</span>
                        }
                    </li>
                    <li>
                        <strong>Setup</strong>
                        <span>{user.profileCompletion ? `${user.profileCompletion}%` : 'Not Registered'}</span>
                    </li>
                    {
                        user.type === 'EXPERT' ?
                        <li>
                            <strong>Accept Coupons</strong>
                            <span>{user.isAcceptPromoCodes ? 'Yes' : 'No'}</span>
                        </li>
                        :
                        null
                    }
                    <li>
                        <strong>Last Login</strong>
                        <span>{user.lastLoginDate ? formatDistance(new Date(user.lastLoginDate), new Date(), { addSuffix: true }) : 'Not Registered'}</span>
                    </li>
                </ul>
            </div>
            <CardDate 
            creationDate={user.createdAt}  
            updateDate={user.updatedAt} 
            />
        </div>
    </CardTransition>
}

export default UserCard