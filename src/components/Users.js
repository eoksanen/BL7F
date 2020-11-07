import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Typography,
  } from '@material-ui/core'



const Users = () => {

    const users = useSelector(state => state.users)


    return (
        <div>
  <Typography variant="h5" color="textSecondary" gutterBottom>Users</Typography>

            <TableContainer component={Paper}>
        <Table>
          <TableBody>            
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                <Link to={`/users/${user.id}`}> {user.name}</Link>
                </TableCell>
                <TableCell>
                  {`${user.blogs.length} blogs`}
                </TableCell>
              </TableRow>
            ))}
     </TableBody>
     </Table>
     </TableContainer>
</div>
    
    )}
export default Users