import { Header } from "../components/Header";
import { Content } from "../components/Content";
import { Total } from "../components/Total";

/**
* - Header component renders the name of the course.
*
* - Content component uses Part component to render the
*   names and number of exercises.
*
* - Total component renders the sum of all exercises.
*
* - App entablishes the names and numer of exercises,
*   and then renders everything, by using the components.
*/

const App = () => {
  const course = {
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
  }

  return (
      <div>
        <Header course={ course.name } />
        <Content parts= { course.parts } />
        <Total parts= { course.parts } />
      </div>
  )
}

export default App;