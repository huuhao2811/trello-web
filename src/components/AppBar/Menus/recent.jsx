import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Check from '@mui/icons-material/Check'
import Typography from '@mui/material/Typography'
function Recent() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box>
      <Button
        id="basic-button-recent"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx = {{ color: (theme) => theme.palette.primary[900] }} // color of button text
        endIcon={<KeyboardArrowDownIcon sx = {{ color: (theme) => theme.palette.primary[900] }} />}
      >
        Recent
      </Button>
      <Menu
        id="basic-menu-recent"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-recent'
        }}
        PaperProps={{
          sx: {
            backgroundColor: (theme) => theme.palette.secondary.main // Hoặc bất kỳ màu nào
          }
        }}
      >
        <MenuItem>
          <Typography variant="body2" sx = {{ color: (theme) => theme.palette.primary[900] }}>
              Single
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body2" sx = {{ color: (theme) => theme.palette.primary[900] }}>
            1.15
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body2" sx = {{ color: (theme) => theme.palette.primary[900] }}>
              Double
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Check sx = {{ color: (theme) => theme.palette.primary[900] }}/>
          </ListItemIcon>
          <Typography variant="body2" sx = {{ color: (theme) => theme.palette.primary[900] }}>
            Custom: 1.2
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Typography variant="body2" sx = {{ color: (theme) => theme.palette.primary[900] }}>
          Add space before paragraph
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body2" sx = {{ color: (theme) => theme.palette.primary[900] }}>
          Add space after paragraph
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Typography variant="body2" sx = {{ color: (theme) => theme.palette.primary[900] }}>
          Custom spacing...
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Recent