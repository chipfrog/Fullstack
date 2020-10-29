import React from "react";
import ReactDOM from "react-dom";

const Header: React.FC<{ name: string }> = ({ name }) => {
  return <h1>{name}</h1>;
};

const Content: React.FC<{list: CoursePart[] }> = ({ list }) => (
  <React.Fragment>
    {list.map(part => (
      <Part key={part.name} props={part}/>
    ))}
  </React.Fragment>
)

const Total: React.FC<{ list: CoursePart[] }> = ({ list }) => {
  let sum = 0;
  for (let i = 0; i < list.length; i ++) {
    sum += list[i].exerciseCount
  }
  return <div>Number of exercises {sum}</div>
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CourseCombination {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CourseCombination {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CourseCombination {
  name: "Random part";
  difficulty: number;
}

interface CourseCombination extends CoursePartBase {
  description: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled error: ${JSON.stringify(value)}`
  );
};

interface PartProps {
  props: CoursePart
}

const Part: React.FC<PartProps> = ({ props }) => {
  switch (props.name) {
    case 'Fundamentals':
      return (
        <div>
          <p>name: {props.name}, exercises: {props.exerciseCount}, description: {props.description}</p>
        </div>
      )
    case 'Using props to pass data':
      return (
        <div>
          <p>name: {props.name}, exercises: {props.exerciseCount}, group projects: {props.groupProjectCount}</p>
        </div>
      )
    case "Deeper type usage":
      return (
        <div>
          <p>name: {props.name}, exercises: {props.exerciseCount}, description: {props.description}, submission link: {props.exerciseSubmissionLink}</p>
        </div>
      )
    case "Random part":
      return(
        <div>
          <p>name: {props.name}, exercises: {props.exerciseCount}, description: {props.description}, difficulty: {props.difficulty}</p>
        </div>
      )  
    default:
      return assertNever(props); 
  }
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Random part",
      exerciseCount: 100,
      description: "Very difficult",
      difficulty: 7
    }
  ];

  return (
    <div>
      <Header name={courseName}/>
      <Content list={courseParts}/>
      <Total list={courseParts}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));