import { useState, useEffect } from 'react'
import './prescriptions.css'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { serverRequest } from "../components/API/request"
import { useSelector } from 'react-redux'
import PageHeader from '../components/sections/page-header'
import Card from '../components/cards/card';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import UpcomingOutlinedIcon from '@mui/icons-material/UpcomingOutlined'
import AppointmentFormModal from '../components/modals/appointment-form'
import TimerOffOutlinedIcon from '@mui/icons-material/TimerOffOutlined'
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined'
import NavigationBar from '../components/navigation/navigation-bar';
import CircularLoading from '../components/loadings/circular';
import FiltersSection from '../components/sections/filters/filters'
import FloatingButton from '../components/buttons/floating-button'
import AppointmentCard from '../components/cards/appointment'
import EmptySection from '../components/sections/empty/empty'
import SearchInput from '../components/inputs/search'
import { searchAppointments } from '../utils/searches/search-appointments'
import { format } from 'date-fns'
import { formatNumber } from '../utils/numbers'
import AppointmentDeleteConfirmationModal from '../components/modals/confirmation/appointment-delete-confirmation-modal'
import AppointmentStatusConfirmationModal from '../components/modals/confirmation/appointment-status-confirmation-modal'
import { isRolesValid } from '../utils/roles'
import { useNavigate, useSearchParams } from 'react-router-dom'
import translations from '../i18n'


const AppointmentsPage = ({ roles }) => {

    const [targetAppointment, setTargetAppointment] = useState({})
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowUpdateModal, setIsShowUpdateModal] = useState(false)
    const [status, setStatus] = useState()


    const [isLoading, setIsLoading] = useState(true)
    const [reload, setReload] = useState(1)
    const [showModalForm, setShowModalForm] = useState(false)
    const [appointments, setAppointments] = useState([])
    const [totalAppointments, setTotalAppointments] = useState(0)

    const [statsQuery, setStatsQuery] = useState({})

    useEffect(() => { 
        scroll(0,0) 
        //isRolesValid(user.roles, roles) ? null : navigate('/login')
    }, [])

    useEffect(() => {
        setIsLoading(true)
        const endpointURL = `/v1/appointments?status=PAID`

        serverRequest.get(endpointURL, { params: statsQuery })
        .then(response => {
            setIsLoading(false)
            setAppointments(response.data.appointments)
            setTotalAppointments(response.data.totalAppointments)
        })
        .catch(error => {
            setIsLoading(false)
            console.error(error)
        })
    }, [reload, statsQuery])


    return <div className="page-container">
         { 
        isShowDeleteModal ? 
        <AppointmentDeleteConfirmationModal 
        appointment={targetAppointment}
        reload={reload}
        setReload={setReload} 
        setIsShowModal={setIsShowDeleteModal}
        setViewStatus={setViewStatus}
        /> 
        : 
        null 
        }
        { 
        isShowUpdateModal ? 
        <AppointmentStatusConfirmationModal 
        appointment={targetAppointment}
        reload={reload}
        setReload={setReload} 
        setIsShowModal={setIsShowUpdateModal}
        status={status}
        setViewStatus={setViewStatus}
        /> 
        : 
        null 
        }
        <div className="padded-container">
            <PageHeader 
            pageName={'Appointments'} 
            setReload={setReload}
            reload={reload}
            totalNumber={totalAppointments}
            /> 
            
            <FiltersSection 
            statsQuery={statsQuery} 
            setStatsQuery={setStatsQuery} 
            isShowUpcomingDates={true}
            defaultValue={'LIFETIME'}
            />
            
            <br />
            {
                isLoading ?
                <CircularLoading />
                :
                appointments.length !== 0 ?
                <div className="cards-grey-container cards-3-list-wrapper">
                        {appointments.map(appointment => <AppointmentCard 
                        appointment={appointment} 
                        reload={reload} 
                        setReload={setReload} 
                        setIsShowDeleteModal={setIsShowDeleteModal}
                        setIsShowStatusModal={setIsShowUpdateModal}
                        setTargetAppointment={setTargetAppointment}
                        setStatus={setStatus}
                        />)}                    
                </div>
                :
                <EmptySection setIsShowForm={setShowModalForm} />
            }
        </div>
        
    </div>
}

export default AppointmentsPage