import React from 'react'
import { connect } from 'react-redux'
//import { useDispatch, useSelector } from 'react-redux'
//import { ClearNotification } from '../reducers/notificationReducer'


const Notification = (props) => {
  //const notification = useSelector(state => state.notification)
  console.log('notification ',props.notification)


  return (
    <div className = 'notificationShow'>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification