import React from 'react'
import { useSelector } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams,
    useRouteMatch,
    useHistory,
  } from "react-router-dom"



const User = () => {

    const users = useSelector(state => state.users)

    console.log('users ', users)


    const match = useRouteMatch('/users/:id')
    console.log('match ', match)
    console.log(typeof(match.params.id))
    const user = match 
    ? users.find(user => user.id === match.params.id)
    : null

    if (!user) {
        return null
      }


    console.log('finded user ', user)


    if (user) {
        user.blogs.map(bl => {
            console.log(bl.title)})
      }




    return (
        <div>
            <h1>{user.name}</h1>

                <h3>added blogs</h3>
            
                    <ul> 
                        {user.blogs.map(bl => (
                        <li key = {bl.id}>{bl.title}</li> 
                        ))}
                    </ul>
        </div>
    
    )
}
export default User