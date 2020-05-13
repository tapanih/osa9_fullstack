import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { Segment, Icon } from 'semantic-ui-react';
import DiagnosesList from './DiagnosesList';

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {

  return (
    <Segment>
      <h3>{entry.date} <Icon name="stethoscope" /> {entry.employerName}</h3>
      <div>{entry.description}</div>
      <DiagnosesList codes={entry.diagnosisCodes} />
    </Segment>
  );
};

export default OccupationalHealthcareEntryDetails;