import ModeSelect from '~/components/ModeSelect/index.jsx'
import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloLogo } from '~/assets/trello.svg'
import { SvgIcon, Typography } from '@mui/material'
import Workspaces from './Menus/workspaces'
import Recent from './Menus/recent'
import Starred from './Menus/starred'
import Templates from './Menus/templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/profiles'
import AddBoxIcon from '@mui/icons-material/AddBox';
function AppBar() {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#F5F5DC',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // tach 2 box ra khỏi nhau span inline // Box responsive: ẩn khi xs, hiện flex khi sm trở lên
        paddingX : 2,
        gap : 2,
        overflowX: 'auto'
      }}>
      <Box sx = {{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx = {{ color: (theme) => theme.palette.primary[900] }} />
        <Box sx = {{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={TrelloLogo} fontSize = 'small' inheritViewBox sx = {{ color: (theme) => theme.palette.primary[900] }} />
          <Typography variant='span' sx = {{ fontSize: '1.2rem', fontWeight: 'bold', color: (theme) => theme.palette.primary[900]}}>Trello</Typography>
        </Box>

        <Box sx = {{ display: { xs : 'none', sm: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button variant="outlined" startIcon = {<AddBoxIcon/>} sx = {{ color: (theme) => theme.palette.primary[900] }}>Create</Button>
        </Box>
      </Box>


      <Box sx = {{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField id="outlined-search" label="Search..." type="search" size = "small" sx = {{ minWidth: '120px' }} />
        <ModeSelect />
        <Tooltip title="Notifications">
          <Badge color="secondary" variant="dot" sx = {{ cursor : 'pointer' }}>
            <NotificationsNoneIcon sx = {{ color: (theme) => theme.palette.primary[900] }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <Badge color="secondary" variant="dot" sx = {{ cursor : 'pointer' }}>
            <HelpOutlineIcon sx = {{ color: (theme) => theme.palette.primary[900] }} />
          </Badge>
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar