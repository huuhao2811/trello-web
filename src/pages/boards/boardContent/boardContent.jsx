import ListColumns from './ListColumns/ListColums'
import Box from '@mui/material/Box'
import { mapOrder } from '~/utils/sort'
import { DndContext, useSensors, useSensor, DragOverlay, defaultDropAnimationSideEffects, closestCorners, pointerWithin, getFirstCollision} from '@dnd-kit/core'
import {
  arrayMove
} from '@dnd-kit/sortable'
import {useCallback, useEffect, useRef, useState } from 'react'
import Columns from './ListColumns/Columns/Columns'
import Card from './ListColumns/Columns/ListCards/Card/Card.jsx'
import { cloneDeep, isEmpty } from 'lodash'
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
import {MouseSensor, TouchSensor} from '~/customLibraries/DndKitSensor'
import { generatePlaceholderCard } from '~/utils/formatters'
function BoardContent({ board, createNewColumn, createNewCard, moveColumns, moveCardInTheSameColumn, moveCardToDifferentColumn, deleteColumnDetails }) {
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumnsState, setOrderedColumnsState] = useState([])
  const [activeDragItemId, setactiveDragItemId] = useState(null) 
  const [activeDragItemType, setactiveDragItemType] = useState(null)
  const [activeDragItemData, setactiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setoldColumnWhenDraggingCard] = useState(null)
  const lastOverId = useRef(null)
  useEffect(() => {
    setOrderedColumnsState(board.columns)
  }, [board])
  const handleDragStart = (event) => {
    setactiveDragItemId(event?.active?.id)
    setactiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setactiveDragItemData(event?.active?.data?.current)
    if (event?.active?.data?.current?.columnId) {
      setoldColumnWhenDraggingCard(findColumnById(event?.active?.id))
    }
  }
  const findColumnById = (cardId) => {
    return orderedColumnsState.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }
  const collisionDetectionStrategy = useCallback ( (args) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }
    const pointerIntersections = pointerWithin(args)
    if (!pointerIntersections?.length) return
    // const intersections = !!pointerIntersections?.length > 0 ? pointerIntersections : rectIntersection(args)
    let overId = getFirstCollision(pointerIntersections, 'id')
    if (!overId) {
      const checkColumn = orderedColumnsState.find(c => c._id === overId)
      if (checkColumn) {
        overId = closestCorners(
          { ...args, droppableContainers: args.droppableContainers.filter(container =>
          {return (container.id !== overId ) && checkColumn?.cardOrderIds?.includes(container.id) }) })[0]?.id
      }
      lastOverId.current = overId
      return [{ id : overId }]
    }
    return lastOverId.current ? [{ id: lastOverId.current }] : [{ id: overId }]
  }, [activeDragItemType])
  const moveCardBetweenDifferentColumns = (overColumn, overCardId, over, activeColumn, active, activeDraggingCardId, activeDraggingCardData, triggerFrom) => {
    setOrderedColumnsState(prevColumns => {
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(c => c._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(c => c._id === overColumn._id)
      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }
      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id // Update the columnId to the new column
        }
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_Placeholder)
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      if (triggerFrom === 'handleDragEnd') {
        moveCardToDifferentColumn(activeDraggingCardId, oldColumnWhenDraggingCard._id, nextOverColumn._id, nextColumns)
      }
      return nextColumns
    })
  }
  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return
    }
    const { active, over } = event
    if (!over || !active) { return }

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active

    const { id: overCardId } = over

    const activeColumn = findColumnById(activeDraggingCardId)
    const overColumn = findColumnById(overCardId)

    if (!activeColumn || !overColumn) {
      return
    }
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(overColumn, overCardId, over, activeColumn, active, activeDraggingCardId, activeDraggingCardData, 'handleDragOver')
    }
  }
  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over || !active) { return }
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over
      const activeColumn = findColumnById(activeDraggingCardId)
      const overColumn = findColumnById(overCardId)
      if (!activeColumn || !overColumn) {
        return
      }
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(overColumn, overCardId, over, activeColumn, active, activeDraggingCardId, activeDraggingCardData, 'handleDragEnd')
      }
      else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
        const dndOrderedCardsIds = dndOrderedCards.map(card => card._id)
        setOrderedColumnsState(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          const targetColumn = nextColumns.find(c => c._id === activeColumn._id)
          if (targetColumn) {
            targetColumn.cards = dndOrderedCards
            targetColumn.cardOrderIds = dndOrderedCardsIds
          }
          return nextColumns
        })
        moveCardInTheSameColumn(dndOrderedCards, dndOrderedCardsIds, oldColumnWhenDraggingCard._id)
      }
    }
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id != over.id) {
        const oldColumnIndex = orderedColumnsState.findIndex(c => c._id === active.id)
        const newColumnIndex = orderedColumnsState.findIndex(c => c._id === over.id)
        const dndOrderedColumns = arrayMove(orderedColumnsState, oldColumnIndex, newColumnIndex)
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        setOrderedColumnsState(dndOrderedColumns)
        moveColumns(dndOrderedColumns)
      }
    }
    setactiveDragItemId(null)
    setactiveDragItemType(null)
    setactiveDragItemData(null)
    setoldColumnWhenDraggingCard(null)
  }
  const customdropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles:{
        active: {
          opacity: 0.5
        }
      }
    })
  }
  return (
    <DndContext onDragEnd = { handleDragEnd } sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} collisionDetection={collisionDetectionStrategy}>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.secondary.main,
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0',
          borderTop: '2px solid #0000FF'
        }}>
        <ListColumns columns = {orderedColumnsState}
          createNewColumn = {createNewColumn}
          createNewCard = {createNewCard}
          deleteColumnDetails = {deleteColumnDetails}
        />
        <DragOverlay dropAnimation={customdropAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN ) && <Columns column={activeDragItemData} />}
          {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD ) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
