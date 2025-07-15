import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'
const MENU_STYLE = {
  color: (theme) => theme.palette.primary[900],
  backgroundColor: (theme => theme.palette.secondary.main),
  border : 'none',
  borderRadius: '4px',
  paddingX: '5px',
  '& .MuiSvgIcon-root': {
    color: (theme) => theme.palette.primary[900]
  },
  '&:hover': {
    backgroundColor: (theme => theme.palette.secondary.main)
  }
}
function BoardBar({ board }) {
  return (
    <Box 
      sx={{
        width: '100%',
        backgroundColor: (theme => theme.palette.secondary.main),
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap : 2,
        paddingX : 2,
        overflowX: 'auto',
        borderTop: '2px solid #0000FF'
      }}>
      <Box sx = {{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title = {board?.description}>
          <Chip sx = { MENU_STYLE }
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
          //onClick = {() => {}}
          />
        </Tooltip>
        <Chip sx = { MENU_STYLE }
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        //onClick = {() => {}}
        />
        <Chip sx = { MENU_STYLE }
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        //onClick = {() => {}}
        />
        <Chip sx = { MENU_STYLE }
          icon={<BoltIcon />}
          label="Automation"
          clickable
        //onClick = {() => {}}
        />
        <Chip sx = { MENU_STYLE }
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        //onClick = {() => {}}
        />
      </Box>

      <Box sx = {{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant="outlined" startIcon = {<PersonAddIcon/>} sx = {{ color: (theme) => theme.palette.primary[900] }}>Invite</Button>
        <AvatarGroup sx = {{ '& .MuiAvatar-root': { width: 34, height: 34, fontSize : 16} }} max={4}>

          <Tooltip title="Huuhao2811" arrow>
            <Avatar alt="Huuhao2811" src="https://mobiagri.vn/wp-content/uploads/2023/02/hoa-huong-duong.jpg" />
          </Tooltip>
          <Tooltip title="Huuhao2811" arrow>
            <Avatar alt="Huuhao2811" src="https://tse2.mm.bing.net/th?id=OIP.hTN29Y9HogR4Ct5NeChYQwHaFj&pid=Api&P=0&h=220" />
          </Tooltip>
          <Tooltip title="Huuhao2811" arrow>
            <Avatar alt="Huuhao2811" src="https://naruto-official.com/anime/series/naruto2_visual.webp" />
          </Tooltip>
          <Tooltip title="Huuhao2811" arrow>
            <Avatar alt="Huuhao2811" src="https://imagesv2.desimartini.com/images/202307/naruto-1688749134.jpeg" />
          </Tooltip>
          <Tooltip title="Huuhao2811" arrow>
            <Avatar alt="Huuhao2811" src="http://static.zerochan.net/Uzumaki.Naruto.full.1953900.jpg" />
          </Tooltip>
          <Tooltip title="Huuhao2811" arrow>
            <Avatar alt="Huuhao2811" src="https://s-cdn-sj.eu-central-1.linodeobjects.com/naruto-shippuden/hdtv.webp" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar