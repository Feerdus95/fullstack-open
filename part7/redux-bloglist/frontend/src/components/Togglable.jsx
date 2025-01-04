import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Box } from '@mui/material'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <Box>
      <Box style={hideWhenVisible}>
        <Button
          variant="contained"
          onClick={toggleVisibility}
          sx={{ mb: 2 }}
        >
          {props.buttonLabel}
        </Button>
      </Box>
      <Box style={showWhenVisible}>
        {props.children}
        <Button
          variant="outlined"
          onClick={toggleVisibility}
          sx={{ mt: 2 }}
        >
          cancel
        </Button>
      </Box>
    </Box>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable