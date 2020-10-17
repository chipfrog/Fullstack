import React from "react";
import ReactDOM from "react-dom";

const Header: React.FC<{ name: string }> = ({ name }) => {
  return <h1>{name}</h1>;
};

interface Element {
  name: string;
  exerciseCount: number;
}

const Content: React.FC<{ list: Element[] }> = ({ list }) => (
  <React.Fragment>
    {list.map(element => (
      <p key={element.name}>
        {element.name} {element.exerciseCount}
      </p>
    ))}
  </React.Fragment>
)

const Total: React.FC<{ list: Element[] }> = ({ list }) => {
  let sum = 0;
  for (let i = 0; i < list.length; i ++) {
    sum += list[i].exerciseCount
  }
  return <div>Number of exercises {sum}</div>
}


const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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
