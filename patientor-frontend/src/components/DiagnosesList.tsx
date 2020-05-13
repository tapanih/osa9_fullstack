import React from 'react';
import { useStateValue } from '../state';
import { Segment, Icon } from 'semantic-ui-react';

const DiagnosesList: React.FC<({ codes: string[] | undefined })> = ({ codes }) => {
  const [{ diagnoses }] = useStateValue();

  if (!codes) {
    return null;
  }

  return (
    <Segment>
      <h4>Diagnoses <Icon name="clipboard" /></h4>
      {Object.values(codes).map((code: string) => (
        <div key={code}>
          <b>{code} </b>
          {diagnoses[code] ? diagnoses[code].name : null}
        </div>
      ))}
   </Segment>
  );
};

export default DiagnosesList;