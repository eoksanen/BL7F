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

  import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Typography,
  } from '@material-ui/core'



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
            <Typography variant="h4" color="secondary" gutterBottom>{user.name}</Typography>

            <Typography variant="h5" color="textSecondary" gutterBottom>added blogs</Typography>
                <h3></h3>

                    <TableContainer component={Paper}>
                        <Table>
                        <TableBody>            
                            {user.blogs.map(bl => (
                            <TableRow key={bl.id}>
                                <TableCell>
                                <Link to={`/blogs/${bl.id}`}> {bl.title}</Link>
                                </TableCell>
                                <TableCell>
                                {`${bl.likes} likes`}
                                </TableCell>
                                <TableCell>
                                {bl.url}
                                </TableCell>
                            </TableRow>
                            ))}
                    </TableBody>
                    </Table>
                    </TableContainer>

        </div>
    
    )
}
export default User