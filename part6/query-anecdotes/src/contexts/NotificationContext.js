import { useContext } from 'react'
import NotificationContext, { NotificationContextProvider } from './NotificationContext.jsx'

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export { NotificationContextProvider }