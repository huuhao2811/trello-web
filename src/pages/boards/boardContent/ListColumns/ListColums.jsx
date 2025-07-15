import Box from '@mui/material/Box'
import Columns from './Columns/Columns.jsx'
import AddBoxIcon from '@mui/icons-material/AddBox'
import Button from '@mui/material/Button'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { alpha } from '@mui/material/styles'
import {SortableContext, horizontalListSortingStrategy} from '@dnd-kit/sortable'
function ListColumns({columns, createNewColumn, createNewCard, deleteColumnDetails}) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const addNewColumn = async () => {
    if (!newColumnTitle) {
      return
    }
    const newColumnData = {
      title: newColumnTitle,
    }
    await createNewColumn(newColumnData)
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }
  return (
    <SortableContext items = {columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden'
        }}
      >
        {columns?.map((column) => {
          return <Columns key = {column._id} column = {column} createNewCard = {createNewCard} deleteColumnDetails = {deleteColumnDetails } />
        })}
        {
          !openNewColumnForm
            ?<Box onClick = {toggleOpenNewColumnForm}
              sx = {{ minWidth: '250px', maxWidth: '250px', mx:2, borderRadius: '6px', height: 'fit-content', bgcolor: 'ffffff3d' }}
            >
              <Button startIcon = {<AddBoxIcon />}
                sx = {{
                  color: (theme) => theme.palette.primary[900],
                  backgroundColor:  (theme) => alpha(theme.palette.primary[800], 0.2),
                  width: '100%',
                  justifyContent: 'flex-start',
                  pl : 2.5,
                  py : 1
                }}>
                Add new Columnn
              </Button>
            </Box>
            : <Box sx ={{ minWidth: '250px', maxWidth: '250px', mx: 2, p: 1, borderRadius: '6px', height: 'fit-content',
              backgroundColor:  (theme) => alpha(theme.palette.primary[800], 0.2), display: 'flex', flexDirection: 'column', gap: 1 }}>
              <TextField
                label = "Enter column title..."
                type = "text"
                size = "small"
                variant = "outlined"
                autoFocus
                value = {newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value) }
                sx = {{
                  '& label': { color: (theme) => theme.palette.primary[800] },
                  '& input': { color: (theme) => theme.palette.primary[800] },
                  '& label.Mui-focused': { color: (theme) => theme.palette.primary[800] },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: (theme) => theme.palette.primary[800] },
                    '&:hover fieldset': { borderColor: (theme) => theme.palette.primary[800] },
                    '&.Mui-focused fieldset': { borderColor: (theme) => theme.palette.primary[800] }
                  }
                }}
              />
              <Box sx ={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  onClick = { addNewColumn }
                  variant = "contained" color = "success" size = "small"
                  sx = {{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.primary[800],
                    '&hover': { bgcolor: (theme) => theme.palette.primary[800] }
                  }}
                >Add Column</Button>
                <CloseIcon
                  fontsize="small"
                  sx = {{
                    color: (theme) => theme.palette.primary[800],
                    cursor: 'pointer',
                    '&:hover': { color: (theme) => theme.palette.primary[100] }
                  }}
                  onClick={toggleOpenNewColumnForm}
                />
              </Box>
            </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns
