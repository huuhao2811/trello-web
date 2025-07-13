import Box from '@mui/material/Box'
import Columns from './Columns/Columns.jsx'
import AddBoxIcon from '@mui/icons-material/AddBox'
import Button from '@mui/material/Button'
import {SortableContext, horizontalListSortingStrategy} from '@dnd-kit/sortable'
function ListColumns({columns}) {
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
          return <Columns key = {column._id} column = {column}/>
        })}
        <Box
          sx = {{ minWidth: '200px',maxWidth: '200px', mx:2, borderRadius: '6px', height: 'fit-content', bgcolor: 'ffffff3d' }}
        >
          <Button startIcon = {<AddBoxIcon />}
            sx = {{
              color: (theme) => theme.palette.primary[900],
              width: '100%',
              justifyContent: 'flex-start',
              pl : 2.5,
              py : 1
            }}>
            Add new Columnn
          </Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns
