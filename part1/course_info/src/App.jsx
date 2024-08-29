const App = () => {
  const course = [{
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }]

  const Header = ({ course }) => {
    return (
      <div>
        <h1>{course}</h1>
      </div>
    )
  }

  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    )
  }

  const Content = () => {
    return (
      <div>
        <Part part={course[0].parts[0].name} exercises={course[0].parts[0].exercises} />
        <Part part={course[0].parts[1].name} exercises={course[0].parts[1].exercises} />
        <Part part={course[0].parts[2].name} exercises={course[0].parts[2].exercises}/>
      </div>
    )
  }

  const Total = () => {
    return (
      <div>
        <p>Number of exercises {course[0].parts[0].exercises + course[0].parts[1].exercises + course[0].parts[2].exercises}</p>
      </div>
    )
  }

  return (
    <div>
      <Header course={course[0].name} />
      <Content />
      <Total />
    </div>
  )
}

export default App