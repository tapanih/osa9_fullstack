import { Gender, NewPatient } from './types';

const SSN_REGEX = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([5-9]\d\+|\d\d-|[012]\dA)\d{3}[\dA-Z]$/;

// TYPE GUARDS

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

// FIELD PARSERS

/* eslint-disable @typescript-eslint/no-explicit-any */
const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn) || !SSN_REGEX.test(ssn)) {
    throw new Error('Incorrect or missing SSN: ' + ssn);
  }
  return ssn;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// OBJECT VALIDATORS

/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    ssn: parseSSN(object.ssn),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender)
  };
};

export default toNewPatient;