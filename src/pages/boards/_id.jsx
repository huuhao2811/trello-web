import Container from '@mui/material/Container'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '../../theme.js'
import AppBar from '../../components/AppBar/AppBar.jsx'/* The board bar is the top bar of the board, it contains the board name and other actions */
import BoardBar from './boardBar/boardBar.jsx' /* The board bar is the top bar of the board, it contains the board name and other actions */
import BoardContent from './boardContent/boardContent.jsx'/* The board content is the main area of the board, it contains the lists and cards */
import { mockData } from '~/apis/mock-data.js' /* Import mock data for testing purposes */
import {useState,useEffect } from 'react'
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI, updateBoardDetailsAPI, updateColumnDetailsAPI, moveCardToDifferentColumnAPI, deleteColumnDetailsAPI } from '~/apis/index.js'
import {generatePlaceholderCard} from '~/utils/formatters.js' /* Import utility functions for formatting data */
import { isEmpty } from 'lodash'
import { mapOrder } from '~/utils/sort.js' /* Import utility functions for sorting data */
import { toast } from 'react-toastify' /* Import toast for notifications */
function Board() {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = '6874742e70be0c5795cebde0'
    fetchBoardDetailsAPI(boardId).then(board => {
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach(column => {
        // Add a placeholder card to each column
        if (isEmpty(column.cards)) {
          column.cards.push(generatePlaceholderCard(column))
          column.cardOrderIds.push(generatePlaceholderCard(column)._id)
        } else {
          // Ensure existing cards are mapped correctly
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, []
  )
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({...newColumnData, boardId: board._id })

    // Add a placeholder card to the new column
    createdColumn.cards.push(generatePlaceholderCard(createdColumn))
    createdColumn.cardOrderIds.push(generatePlaceholderCard(createdColumn)._id)
    // Update the board state with the new column
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }
  const createNewCard = async (newCardData) => {
    const createNewCard = await createNewCardAPI({...newCardData, boardId: board._id })
    // Update the board state with the new card
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createNewCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createNewCard)
      columnToUpdate.cardOrderIds.push(createNewCard._id)
    }
    setBoard(newBoard)
  }
  const moveColumns = async (dndOrderedColumns) => {
    // update the column order in the database
    const orderedColumnIds = dndOrderedColumns.map(column => column._id)
    const newBoard = { ...board }
    newBoard.columnOrderIds = orderedColumnIds
    newBoard.columns = dndOrderedColumns
    setBoard(newBoard)
    await updateBoardDetailsAPI(newBoard._id, { columnOrderIds: orderedColumnIds })
  }
  const moveCardInTheSameColumn = async (dndOrderedCards, dndOrderedCardsIds, columnId) => {
    // update the card order in the database
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardsIds
    }
    setBoard(newBoard)
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardsIds }) 
  }
  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const orderedColumnIds = dndOrderedColumns.map(column => column._id)
    const newBoard = { ...board }
    newBoard.columnOrderIds = orderedColumnIds
    newBoard.columns = dndOrderedColumns
    setBoard(newBoard)
    let prevCardOrderIds = dndOrderedColumns.find(column => column._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) { prevCardOrderIds = [] } // Remove placeholder card if it exists
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(column => column._id === nextColumnId)?.cardOrderIds
    })
  }
  const deleteColumnDetails =(columnId) => {
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(column => column._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(id => id !== columnId)
    setBoard(newBoard)
    deleteColumnDetailsAPI(columnId).then(res => {
      toast.success(res?.deleteResult)
    })
  }
  if (!board) {
    return <div>Loading...</div>
  }
  return (
    <CssVarsProvider theme={theme}>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar board = {board}/>
        <BoardContent board = {board}
          createNewColumn = {createNewColumn}
          createNewCard = {createNewCard}
          moveColumns = {moveColumns}
          moveCardInTheSameColumn = {moveCardInTheSameColumn}
          moveCardToDifferentColumn = {moveCardToDifferentColumn}
          deleteColumnDetails = {deleteColumnDetails}
        />
      </Container>
    </CssVarsProvider>
  )
}

export default Board