import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const Users = () => {

    const users = useSelector(state => state.users)


    return (
        <div>
            <h1>Users</h1>

            <table>
                <tbody>
                <tr>
                    <td></td>
                    <td>blogs created</td>
                </tr>
                
            {users.map(user => {
  

  return (

    <tr key = {user.id}>
        <td> <Link to={`/users/${user.id}`}> {user.name}</Link></td>
        <td>{user.blogs.length}</td>
    </tr>
  
            )})}
                </tbody>
            </table>
        </div>
    
     ) }
export default Users