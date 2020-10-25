const notificationReducer = (state = ['', ''], action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        console.log('SET_NOTIFICATION')
        return action.notification
      case 'CLEAR_NOTIFICATION':
          console.log('CLEAR_NOTIFICATION')
          return ['','']
      default:
        return state
    }
  }
  
  let timeID
  
  export const setNotification = (notification, delay) => {

  
    function delayFunction(res) {
  
        console.log('OLD ',timeID)
      if (typeof timeID === 'number') {
        clearTimeout(timeID);
      }
      timeID = setTimeout(res, delay * 1000);
      console.log('NEW ',timeID)
    }
  
      return async dispatch => {
        dispatch({
          type: 'SET_NOTIFICATION',
          notification,
        })
        console.log('NOTification ',notification)
        await new Promise(res => delayFunction(res));
        console.log('Waited ',delay * 1000 + ' second')
        dispatch({
        type: 'CLEAR_NOTIFICATION',
      })  
    }
  }
  
  
      export const ClearNotification = () => {
        const empty = []
        console.log('Clear ')
        return async dispatch => {
          await new Promise(res => setTimeout(res, (3000)));
          console.log('Waited ',' second')
          dispatch({
          type: 'CLEAR_NOTIFICATION',
          empty,
        })
        }
      }
    
    export default notificationReducer
    