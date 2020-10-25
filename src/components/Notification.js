import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state =>  state.notification)

  console.log('notification ',notification)


  let style
  Array.isArray(notification) ? style = 'notificationhide' : style = 'update' 


  return (
    <div className = {style}>
      {notification}
    </div>
  )
}

export default Notification