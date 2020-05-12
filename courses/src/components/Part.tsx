import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <p>
          {part.name} <br/>
          Exercise count: {part.exerciseCount} <br/>
          {part.description}
        </p>
      );
    case "Using props to pass data":
      return (
        <p>
          {part.name} <br/>
          Exercise count: {part.exerciseCount} <br/>
          Project count: {part.groupProjectCount} <br/>
        </p>
      );
    case "Deeper type usage":
      return (
        <p>
          {part.name} <br/>
          Exercise count: {part.exerciseCount} <br/>
          {part.description} <br/>
          <a href={part.exerciseSubmissionLink}>Submit exercises</a>
        </p>
      );
    case "Data Structures and Algorithms":
      return (
        <p>
          {part.name} <br/>
          Exercise count: {part.exerciseCount} <br/>
          {part.description} <br/>
          Passing rate: {part.passingRate} %
        </p>
      );
    default:
      return assertNever(part);
  }
}

export default Part;