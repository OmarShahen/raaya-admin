import './patient.css'
import CardDate from './components/date'
import CardActions from './components/actions'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import { formatNumber } from '../../utils/numbers'
import CardTransition from '../transitions/card-transitions'
import { textShortener } from '../../utils/formatString'
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined'
import { serverRequest } from '../API/request'
import { toast } from 'react-hot-toast'


const ServiceCard = ({ service, setTarget, setIsShowForm, setIsShowDeleteModal, setIsUpdate, setReload, reload }) => {

    const updateServiceActivity = () => {
        serverRequest.patch(`/v1/services/${service._id}/activity`, { isActive: !service.isActive })
        .then(response => {
            setReload(reload + 1)
            toast.success(response.data.message, { duration: 3000, position: 'top-right' })
        })
        .catch(error => {
            console.error(error)
            toast.error(error?.response?.data?.message, { duration: 3000, position: 'top-right' })
        })
    }

    const cardActionsList = [
        {
            name: 'Delete Service',
            icon: <DeleteOutlineOutlinedIcon />,
            onAction: (e) => {
                e.stopPropagation()
                setTarget(service)
                setIsShowDeleteModal(true)
            }
        },
        {
            name: 'Update Service',
            icon: <CreateOutlinedIcon />,
            onAction: (e) => {
                e.stopPropagation()
                setTarget(service)
                setIsUpdate(true)
                setIsShowForm(true)
            }
        },
        {
            name: 'Update Activity',
            icon: <ToggleOffOutlinedIcon />,
            onAction: (e) => {
                e.stopPropagation()
                updateServiceActivity()
            }
        },
     ]

    return <CardTransition>
    <div className="patient-card-container disable-hover body-text">
        <div className="patient-card-header">
            <div className="patient-image-info-container">
                <div>
                    <strong>{service.title}</strong>
                    <span className="grey-text">#{service.serviceId}</span>
                </div>
            </div>
            <CardActions actions={cardActionsList} />
        </div>
        <div className="patient-card-body">
            <ul>
                <li>
                    <strong>Duration</strong>
                    <span>{service.duration} minutes</span>
                </li>
                <li>
                    <strong>Price</strong>
                    <span>{formatNumber(service.price)} EGP</span>
                </li>
                <li>
                    <strong>International Price</strong>
                    <span>{service.internationalPrice ? formatNumber(service.internationalPrice) : 0} EGP</span>
                </li>
                <li>
                    <strong>Status</strong>
                    {
                        service.isActive ?
                        <span className="status-btn done bold-text">Active</span>
                        :
                        <span className="status-btn declined bold-text">Inactive</span>
                    }
                </li>
                <li>
                    <strong>Description</strong>
                    <span>{service.description ? textShortener(service.description, 20) : 'Not Registered'}</span>
                </li>
            </ul>
        </div>
        <CardDate 
        creationDate={service.createdAt}  
        updateDate={service.updatedAt} 
        />
    </div>
    </CardTransition>
}

export default ServiceCard