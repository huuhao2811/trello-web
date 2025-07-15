import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Tooltip from '@mui/material/Tooltip'
import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCards from './ListCards/ListCards.jsx'
import { mapOrder } from '~/utils/sort'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useConfirm } from 'material-ui-confirm'
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

function Columns({column, createNewCard, deleteColumnDetails }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: column._id, data: {...column} })
  const dndKitColumnStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const orderedCards = column.cards
  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)
  const [newCardTitle, setNewCardTitle] = useState('')
  const addNewCard = async () => {
    if (!newCardTitle) {
      return
    }
    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }
    await createNewCard(newCardData)
    toggleOpenNewCardForm()
    setNewCardTitle('')
  }
  const confirmDeleteColumn = useConfirm()
  const handleDeleteColumn = () => {
    confirmDeleteColumn({
      title: 'Delete Column',
      description: 'Are you sure you want to delete this column?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel',
      // dialogProps: { maxWidth: 'xs' },
      // confirmationButtonProps: { color: 'secondary', variant: 'outlined' },
      // cancellationButtonProps: { color: 'inherit' },
      // allowClose: false

    }).then(()=> {
      deleteColumnDetails(column._id)
    }).catch(() => {})
  }
  return (
    <div
      ref = {setNodeRef}
      style = {dndKitColumnStyles}
      {...attributes}
    >
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          backgroundColor: (theme) => theme.palette.primary[900],
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}
      >
        {/* Header */}
        <Box
          sx={{
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: (theme) => theme.palette.secondary.main,
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title="More options">
              <KeyboardArrowDownIcon
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                  color: (theme) => theme.palette.secondary.main,
                  cursor: 'pointer'
                }}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick ={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button-starred'
              }}
              PaperProps={{
                sx: {
                  backgroundColor: (theme) => theme.palette.secondary.main ,// Hoặc bất kỳ màu nào
                }
              }}
            >
              <MenuItem
                onClick = {toggleOpenNewCardForm}
                sx={{
                  '&:hover .menu-icon, &:hover .menu-text': {
                    color: 'success.light'
                  }
                }}
              >
                <ListItemIcon>
                  <AddCardIcon className="menu-icon" sx={{ color: (theme) => theme.palette.primary[900] }} fontSize="small" />
                </ListItemIcon>
                <Typography
                  variant="span"
                  className="menu-text"
                  sx={{ fontSize: '0.9rem', color: (theme) => theme.palette.primary[900] }}
                >
                  Add new card
                </Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut sx = {{ color: (theme) => theme.palette.primary[900] }} fontSize="small" />
                </ListItemIcon>
                <Typography variant='span' sx = {{ fontSize: '0.9rem', color: (theme) => theme.palette.primary[900]}}>Cut</Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy sx = {{ color: (theme) => theme.palette.primary[900] }} fontSize="small" />
                </ListItemIcon>
                <Typography variant='span' sx = {{ fontSize: '0.9rem', color: (theme) => theme.palette.primary[900]}}>Copy</Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste sx = {{ color: (theme) => theme.palette.primary[900] }} fontSize="small" />
                </ListItemIcon>
                <Typography variant='span' sx = {{ fontSize: '0.9rem', color: (theme) => theme.palette.primary[900]}}>Paste</Typography>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick = {handleDeleteColumn}
                sx={{
                  '&:hover': {
                    '& .menu-icon, & .menu-text': {
                      color: 'warning.dark'
                    }
                  }
                }}
              >
                <ListItemIcon>
                  <CancelIcon className="menu-icon" sx={{ color: (theme) => theme.palette.primary[900] }} fontSize="small" />
                </ListItemIcon>
                <Typography className="menu-text" variant="span" sx={{ fontSize: '0.9rem', color: (theme) => theme.palette.primary[900] }}>
                  Delete this column
                </Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud sx = {{ color: (theme) => theme.palette.primary[900] }} fontSize="small" />
                </ListItemIcon>
                <Typography variant='span' sx = {{ fontSize: '0.9rem', color: (theme) => theme.palette.primary[900]}}>Archive this column</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Cards Container */}
        <ListCards cards = {orderedCards} />

        {/* Footer */}
        <Box
          sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2
          }}
        >
          {
            !openNewCardForm
              ?
              <Box
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                <Button
                  startIcon={<AddCardIcon />}
                  sx={{ color: (theme) => theme.palette.secondary.main }}
                  onClick = {toggleOpenNewCardForm}
                >
                  Add new card
                </Button>
                <Tooltip title="Drag to move">
                  <DragHandleIcon
                    sx={{ color: (theme) => theme.palette.secondary.main, cursor: 'pointer' }}
                  />
                </Tooltip>
              </Box>
              :
              <Box sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
              >
                <TextField
                  label = "Enter card title..."
                  type = "text"
                  size = "small"
                  variant = "outlined"
                  autoFocus
                  data-no-dnd="true"
                  value = {newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value) }
                  sx = {{
                    '& label': { color: (theme) => theme.palette.secondary.main },
                    '& input': { color: (theme) => theme.palette.secondary.main },
                    '& label.Mui-focused': { color: (theme) => theme.palette.secondary.main },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: (theme) => theme.palette.secondary.main },
                      '&:hover fieldset': { borderColor: (theme) => theme.palette.secondary.main },
                      '&.Mui-focused fieldset': { borderColor: (theme) => theme.palette.secondary.main }
                    }
                  }}
                />
                <Box sx ={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button
                    onClick = { addNewCard }
                    variant = "contained" color = "success" size = "small"
                    data-no-dnd="true"
                    sx = {{
                      boxShadow: 'none',
                      border: '0.5px solid',
                      borderColor: (theme) => theme.palette.secondary.main,
                      '&hover': { bgcolor: (theme) => theme.palette.secondary.main }
                    }}
                  >Add</Button>
                  <CloseIcon
                    fontsize="small"
                    sx = {{
                      color: (theme) => theme.palette.secondary.main,
                      cursor: 'pointer',
                      '&:hover': { color: (theme) => theme.palette.primary[100] }
                    }}
                    onClick={toggleOpenNewCardForm}
                  />
                </Box>
              </Box>
          }
        </Box>
      </Box>
    </div>
  )
}

export default Columns
