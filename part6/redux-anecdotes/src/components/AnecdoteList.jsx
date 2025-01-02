import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteListComponent = (props) => {
  
    const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(`You voted for '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

AnecdoteListComponent.propTypes = {
  anecdotes: PropTypes.array.isRequired,
  voteAnecdote: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const anecdotes = [...state.anecdotes]
      .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)

  return { anecdotes }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const AnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteListComponent)

export default AnecdoteList