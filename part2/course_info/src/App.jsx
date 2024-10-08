import './App.css'

const Header = ({ course }) => {
  return <h1>{ course }</h1>
}

const Part = ({ part }) => {
  return (
    <p>
      { part.name } { part.exercises }
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(( part ) => (
        <Part key={ part.id } part={ part } />
      ))}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce(( sum, part ) => sum + part.exercises, 0)
  return <p><strong>Total # of exercises: { total }</strong></p>
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={ course.name } />
      <Content parts={ course.parts } />
      <Total parts={ course.parts } />
    </div>
  )
}
const App = () => {
  const course = [
  {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ],
  },
  {
    name: 'React Native',
    id: 3,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 5,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 24,
        id: 3
      }
    ]
  }
]

  return (
    <>{ course.map(( course ) => ( <Course key={ course.id } course={ course } /> )) }</>
  )
}

export default App
