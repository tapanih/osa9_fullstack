import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => (
  <>
    {parts.map((part: CoursePart) => <Part key={part.name} part={part} />)}
  </>
);

export default Content;