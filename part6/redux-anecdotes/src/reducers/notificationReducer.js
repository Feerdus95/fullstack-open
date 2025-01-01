const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.payload
      case 'CLEAR_NOTIFICATION':
        return null
      default:
        return state
    }
  }
  
  export const setNotification = (message, timeInSeconds) => {
    return async dispatch => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: message
      })
      
      setTimeout(() => {
        dispatch({
          type: 'CLEAR_NOTIFICATION'
        })
      }, timeInSeconds * 1000)
    }
  }
  
  export default notificationReducer