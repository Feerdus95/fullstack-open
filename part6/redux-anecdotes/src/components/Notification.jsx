import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Named component
const NotificationComponent = (props) => {
  const notification = props.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  if (!notification) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

NotificationComponent.propTypes = {
  notification: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

// Connect the named component
const Notification = connect(
  mapStateToProps
)(NotificationComponent)

export default Notification