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
      {entry.sickLeave && (
        <Segment>
          <h4>Sick leave <Icon name="calendar alternate outline" /></h4>
          <div><b>Start date:</b> {entry.sickLeave.startDate}</div>
          <div><b>End date:</b> {entry.sickLeave.endDate}</div>
        </Segment>
      )}
    </Segment>
  );
};

export default OccupationalHealthcareEntryDetails;