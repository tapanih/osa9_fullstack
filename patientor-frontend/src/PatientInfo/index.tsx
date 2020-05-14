import React from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Patient, Gender, Entry, NewEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient, addEntry } from "../state";
import { Header, Icon, Button } from "semantic-ui-react";
import EntryDetails from "../components/EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientInfo: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const toNewEntry = (values: EntryFormValues): NewEntry =>  {
    const baseEntry = {
      description: values.description,
      date: values.date,
      specialist: values.specialist
    };
    switch (values.type) {
      case "Hospital":
        return {
          type: values.type,
          diagnosisCodes: values.diagnosisCodes,
          discharge: values.discharge,
          ...baseEntry
        };
      case "OccupationalHealthcare":
        return {
          type: values.type,
          employerName: values.employerName,
          sickLeave: values.sickLeave,
          ...baseEntry
        };
      case "HealthCheck":
        return {
          type: values.type,
          healthCheckRating: values.healthCheckRating,
          ...baseEntry
        };
      default:
        throw new Error("Unhandled case: " + values);
    }
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    const entry = toNewEntry(values);
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        entry
      );
      dispatch(addEntry(id, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
          <EntryDetails key={entry.id} entry={entry} />)
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientInfo;