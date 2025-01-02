import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_ANECDOTES':
      return action.payload
    case 'NEW_ANECDOTE':
      return [...state, action.payload]
    case 'VOTE': {
      const id = action.payload.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    }
    default:
      return state
  }
}

export const setAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'SET_ANECDOTES',
      payload: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      payload: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'VOTE',
      payload: updatedAnecdote
    })
  }
}

export default reducer