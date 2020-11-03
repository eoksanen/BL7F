import React from 'react'

const Notification = ({message}) => {
    if (message === null) {
      return null
    }
  else{
    return (
    
      <div className={message[1]}>
        {message[0]}
      </div>
    )
  }
}

export default Notification