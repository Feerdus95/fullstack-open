const Total = (props) => {
    const exercises = props.exercises;

    return(
      <div>
        <p>Number of exercises { exercises[0] + exercises[1] + exercises[2] }</p>
      </div>
    )
  }

export { Total };