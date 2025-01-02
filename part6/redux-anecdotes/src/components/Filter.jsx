import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setFilter } from '../reducers/filterReducer'

const FilterComponent = (props) => {
  const handleChange = (event) => {
    props.setFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

FilterComponent.propTypes = {
  setFilter: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  setFilter,
}

const Filter = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterComponent)

export default Filter