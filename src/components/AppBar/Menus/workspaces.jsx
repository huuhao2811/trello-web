import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

function Workspaces() {
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
        id="basic-button-workspaces"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx = {{ color: (theme) => theme.palette.primary[900] }} // color of button text
        endIcon={<KeyboardArrowDownIcon sx = {{ color: (theme) => theme.palette.primary[900] }} />}
      >
        Workspaces
      </Button>
      <Menu
        id="basic-menu-workspaces"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-workspaces'
        }}
        PaperProps={{
          sx: {
            backgroundColor: (theme) => theme.palette.secondary.main // Hoặc bất kỳ màu nào
          }
        }}
      >
        <MenuItem >
          <ListItemIcon>
            <ContentCut fontSize="small" color = "primary" />
          </ListItemIcon>
          <Typography variant="body2" sx = {{ color: (theme) => theme.palette.primary[900] }}>
            Cut  ⌘X
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" color = "primary" />
          </ListItemIcon>
          <Typography variant="body2" sx = {{ color: (theme) => theme.palette.primary[900] }}>
          Copy  ⌘C
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" color = "primary" />
          </ListItemIcon>
          <Typography variant="body2" sx = {{ color: (theme) => theme.palette.primary[900] }}>
          Paste  ⌘V
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="small" color = "primary" />
          </ListItemIcon>
          <Typography variant="body2" sx = {{ color: (theme) => theme.palette.primary[900] }}>
          Web Clipboard
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Workspaces