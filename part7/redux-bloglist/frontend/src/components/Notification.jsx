import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification) {
    return null
  }

  return (
    <Alert
      severity={notification.type === 'error' ? 'error' : 'success'}
      sx={{
        fontSize: '20px',
        marginBottom: '10px'
      }}
    >
      {notification.message}
    </Alert>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
}

export default Notification