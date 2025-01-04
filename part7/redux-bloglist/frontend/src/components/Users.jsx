import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="right">Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link
                    to={`/users/${user.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'primary.main'
                    }}
                  >
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell align="right">{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users