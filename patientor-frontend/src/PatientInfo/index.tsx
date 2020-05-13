import React from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Patient, Gender } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Header, Icon } from "semantic-ui-react";

const PatientInfo: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  React.useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "UPDATE_PATIENT", payload: patientFromApi });
      } catch (e) {
        console.error(e.response.data);
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
  } 

  if (!patient) {
    return null;
  }

  return (
    <div className="App">
      <Header as="h1">{patient.name} <Icon name={getIconName(patient.gender)}/></Header>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Date of Birth: {patient.dateOfBirth}</p>
    </div>
  );
};

export default PatientInfo;