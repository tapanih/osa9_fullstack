import React from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Patient, Gender, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { Header, Icon } from "semantic-ui-react";

const PatientInfo: React.FC = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  React.useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
      } catch (e) {
        console.error("Patient not found");
      }
    };
    if (!patient || !patient.ssn) {
      fetchPatient(id);
    }
  }, [dispatch, patient, id]);

  const getIconName = (gender: Gender) => {
    switch(gender) {
      case Gender.Female:
        return "venus";
      case Gender.Male:
        return "mars";
      default:
        return "genderless";
    }
  };

  if (!patient) {
    return null;
  }

  return (
    <div className="App">
      <Header as="h1">{patient.name} <Icon name={getIconName(patient.gender)}/></Header>
      <div>SSN: {patient.ssn}</div>
      <div>Occupation: {patient.occupation}</div>
      <h3>entries</h3>
      {(!patient.entries || !patient.entries.length)
        ? <div>No entries yet</div>
        : Object.values(patient.entries).map((entry: Entry) => (
          <div key={entry.id}>
            <div>{entry.date} <i>{entry.description}</i></div>
            <ul>
            {!entry.diagnosisCodes ? null :
              Object.values(entry.diagnosisCodes).map((code: string) => (
                <li key={code}>
                  {code} {diagnoses[code] ? diagnoses[code].name : null}
                </li>
              ))}
            </ul>
          </div>)
      )}

    </div>
  );
};

export default PatientInfo;