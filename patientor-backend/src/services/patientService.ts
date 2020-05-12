import patientData from '../../data/patients.json';
import { Patient, PatientWithoutSensitiveInfo } from '../types';

const patients: Array<Patient> = patientData;

const getPatientsWithoutSensitiveInfo = (): PatientWithoutSensitiveInfo[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = () => {
  return null;
};

export default {
  getPatientsWithoutSensitiveInfo,
  addPatient,
};
