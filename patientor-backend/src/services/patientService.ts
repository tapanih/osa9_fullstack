import { v4 as uuid } from 'uuid';
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

const addPatient = (
  name: string, ssn: string, dateOfBirth: string, occupation: string, gender: string
  ): Patient => {

  const newPatient = {
    id: uuid(),
    name,
    ssn,
    dateOfBirth,
    occupation,
    gender,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatientsWithoutSensitiveInfo,
  addPatient,
};
