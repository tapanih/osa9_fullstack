import React from 'react';

type Part = {
    name: string;
    exerciseCount: number;
};

const Content: React.FC<{ parts: Part[] }> = ({ parts }) => (
  <>
    {parts.map((part: Part) => 
      <p>{part.name} {part.exerciseCount}</p>
    )}
  </>
);

export default Content;