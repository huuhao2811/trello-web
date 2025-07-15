import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { Card as MuiCard} from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
function Card( { card } ) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: card._id, data: {...card} })
  const dndKitCardStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined
  };
  return (

    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...(!card?.FE_Placeholder ? listeners : {})}
      sx={{
        cursor: card?.FE_Placeholder ? 'default' : 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        color: (theme) => theme.palette.secondary.main,
        backgroundColor: (theme) => theme.palette.primary[700],
        overflow: 'unset',
        minHeight: 10,
        border: '1px solid transparent',
        '&:hover': { borderColor:  (theme) => theme.palette.secondary.main }
      }}
    >
      {!card?.FE_Placeholder && (
        <>
          {card?.cover && <CardMedia sx={{ height: 140 }} image={card.cover} />}
          <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
            <Typography>{card?.title}</Typography>
          </CardContent>
          <CardActions sx={{ p: '0 4px 8px 4px' }}>
            {!!card?.memberIds?.length && (
              <Button
                size="small"
                startIcon={<GroupIcon />}
                sx={{ color: (theme) => theme.palette.secondary.main }}
              >
                {card?.memberIds.length}
              </Button>
            )}
            {!!card?.comments?.length && (
              <Button
                size="small"
                startIcon={<CommentIcon />}
                sx={{ color: (theme) => theme.palette.secondary.main }}
              >
                {card?.comments.length}
              </Button>
            )}
            {!!card?.attachments?.length && (
              <Button
                size="small"
                startIcon={<AttachmentIcon />}
                sx={{ color: (theme) => theme.palette.secondary.main }}
              >
                {card?.attachments.length}
              </Button>
            )}
          </CardActions>
        </>
      )}
    </MuiCard>
  )
}

export default Card
