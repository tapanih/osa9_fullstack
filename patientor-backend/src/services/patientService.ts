import { v4 as uuid } from 'uuid';
import patientData from '../../data/patients.json';
import { NewPatient, Patient, PublicPatient } from '../types';
import toNewPatient from '../utils';

const patients: Array<Patient> = patientData.map(obj => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getPatientsWithoutSensitiveInfo = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = ( patient: NewPatient ): Patient => {

  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  findById,
  getPatientsWithoutSensitiveInfo,
  addPatient,
};
