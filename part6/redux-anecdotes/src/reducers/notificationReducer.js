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

  let timeoutId
  
  export const setNotification = (message, timeInSeconds) => {
    return async dispatch => {

      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      dispatch({
        type: 'SET_NOTIFICATION',
        payload: message
      })
      
      timeoutId = setTimeout(() => {
        dispatch({
          type: 'CLEAR_NOTIFICATION'
        })
      }, timeInSeconds * 1000)
    }
  }
  
  export default notificationReducer