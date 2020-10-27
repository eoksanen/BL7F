import userService from '../services/users'

const reducer = (state = [], action) => {


  switch(action.type){
    case 'ADDNEW_USER': 
      return [...state, action.data]
    case 'REMOVE_USER':
      const idr = action.data
      console.log('removed item id ', idr)
      return [...state.filter(user => user.id !== idr)]
    case 'INIT_USERS':
      return action.data
        
    default:
    return state
  }
}

export const createUser = (newUserObject) => {
  return async dispatch => {
    const newUser = await userService.create(newUserObject)
    dispatch({
    type: 'ADDNEW_USER',
    data: newUser,
  })
  }
}

export const removeUser = (id) => {
  return async dispatch => {
    const req = await userService.remove(id)
    dispatch({
      type: 'REMOVE_USER',
      data: id
    })
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
    type: 'INIT_USERS',
    data: users,
  })
}
}


export default reducer