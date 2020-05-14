/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatient, Entry, NewHealthCheckEntry, NewBaseEntry,
  Diagnosis, HealthCheckRating, NewEntry, NewHospitalEntry, Discharge,
  NewOccupationalHealthcareEntry, SickLeave} from './types';
import diagnosisService from './services/diagnosisService';

const SSN_REGEX = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([5-9]\d\+|\d\d-|[012]\dA)\d{3}[\dA-Z]$/;

// TYPE GUARDS

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

// FIELD PARSERS

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn) || !SSN_REGEX.test(ssn)) {
    throw new Error('Incorrect or missing SSN: ' + ssn);
  }
  return ssn;
};

const parseCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing criteria: ' + criteria);
  }
  return criteria;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description: " + description);
  }
  return description;
};

const parseDiagnosisCodes = (codes: any): Array<Diagnosis['code']> | undefined => {
  if (codes === undefined) {
    return undefined;
  }

  if (!Array.isArray(codes)) {
    throw new Error("DiagnosisCodes is neither an array or undefined: " + codes);
  }

  const knownCodes: string[] = diagnosisService.getDiagnoses()
    .map((diagnosis) => diagnosis.code);
  const unknownCode: string | undefined = codes
    .find((code) => !knownCodes.includes(code));
  if (unknownCode) {
    throw new Error("Unknown diagnosis code encountered: " + unknownCode);
  }
  return codes;
};

const parseDischarge = (object: any): Discharge => {
  return {
    date: parseDate(object.date),
    criteria: parseCriteria(object.criteria)
  };
};

const parseEmployerName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing employer name: ' + name);
  }
  return name;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseId = (id: any): string => {
  if (!id || !isString(id)) {
    throw new Error('Incorrect or missing id: ' + id);
  }
  return id;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (rating == null || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health check rating: ' + rating);
  }
  return rating;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const parseSickLeave = (object: any): SickLeave | undefined => {
  if (!object) {
    return undefined;
  }
  return {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate)
  };
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseType = (type: any): string => {
  const types = ["HealthCheck", "Hospital", "OccupationalHealthcare"];
  if (!type || !isString(type) || !Object.values(types).includes(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

// OBJECT VALIDATORS

const parseHealthCheckEntry = (baseEntry: NewBaseEntry, object: any): NewHealthCheckEntry => {
  return {
    type: "HealthCheck",
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    ...baseEntry
  };
};

const parseHospitalEntry = (baseEntry: NewBaseEntry, object: any): NewHospitalEntry => {
  return {
    type: "Hospital",
    discharge: parseDischarge(object.discharge),
    ...baseEntry
  };
};

const parseOccupationalHealthcareEntry = (baseEntry: NewBaseEntry, object: any): NewOccupationalHealthcareEntry => {
  return {
    type: "OccupationalHealthcare",
    employerName: parseEmployerName(object.employerName),
    sickLeave: parseSickLeave(object.sickLeave),
    ...baseEntry
  };
};

export const toNewEntry = (object: any): NewEntry => {
  const baseEntry = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
  };

  const type = parseType(object.type);
  switch (type) {
  case "HealthCheck":
    return parseHealthCheckEntry(baseEntry, object);
  case "Hospital":
    return parseHospitalEntry(baseEntry, object);
  case "OccupationalHealthcare":
    return parseOccupationalHealthcareEntry(baseEntry, object);
  default:
    throw new Error("Unhandled case: " + type);
  }
};

const parseEntry = (object: any): Entry => {
  return {
    id: parseId(object.id),
    ...toNewEntry(object)
  };
};

const parseEntries = (array: any[]): Entry[] => {
  if (!array) {
    return [];
  }
  return Object.values(array).map((obj: any) => parseEntry(obj));
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    ssn: parseSSN(object.ssn),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    entries: parseEntries(object.entries)
  };
};