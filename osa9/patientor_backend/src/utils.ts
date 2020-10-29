/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NewPatientEntry, Gender, NewEntry, EntryType, Entry, HealthCheckRating } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: [] || parseEntries(object.entries)
  };
};

export const toNewEntry = (object: any): NewEntry => {
  const type = parseType(object.type);
  switch (type) {
    case "Hospital":
      return toNewHospitalEntry(object);
    case "OccupationalHealthcare":
      return toNewOccupationalHealthcareEntry(object);
    case "HealthCheck":
      return toNewHealthCheckEntry(object);
    default:
      throw new Error("Incorrect or missing entry type");
  }
};

const toNewHospitalEntry = (object: any): NewEntry => {
  return {
    type: parseTypeHospital(object.type),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    discharge: parseDischarge(object.discharge),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
  };
};

const toNewOccupationalHealthcareEntry = (object: any): NewEntry => {
  return {
    type: parseTypeOccupationalHealthcare(object.type),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    employerName: parseEmployer(object.employerName),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
  };
};

const toNewHealthCheckEntry = (object: any): NewEntry => {
  return {
    type: parseTypeHealthCheck(object.type),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
  };
};

// General type guards

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDate = (dateOfBirth: any): string => {
  if (!dateOfBirth ||!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth');
  }
  return dateOfBirth;
};

const isDate = (dateOfBirth: any): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

// Type guards for entry base cases

const parseDiagnosisCodes = (diagnoses: any): string[] => {
  if (!diagnoses || !Array.isArray(diagnoses) || !everyItemIsString(diagnoses)) {
    throw new Error("Incorrect diagnosis codes");
  }
  return diagnoses;
};

const everyItemIsString = (list: any): list is string[] => {
  for (let i= 0; i < list.length; i ++) {
    if (!isString(list[i])) {
      return false;
    }
  }
  return true;
};

const parseType = (entryType: any): EntryType  => {
  if (!entryType || !isType(entryType)) {
    throw new Error("Inccorect or missing entry type");
  }
  return entryType;
};

const isType = (type: any): type is EntryType => {
  return Object.values(EntryType).includes(type);
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

// Type guards for Hospital

const parseTypeHospital = (type: any): "Hospital" => {
  if (!type || !isHospital(type)) {
    throw new Error("Incorrect or missing type");
  }
  return type;
};

const isHospital = (type: any): type is "Hospital" => {
  return type === "Hospital";
};

const parseDischarge = (discharge: any): { date: string, criteria: string } => {
  if (!discharge || !isDate(discharge.date) || !isString(discharge.criteria)) {
    throw new Error("Incorrect or missing discharge");
  }
  const date = parseDate(discharge.date);
  const criteria = parseCriteria(discharge.criteria);
  return {date, criteria};
};

// Type guards for OccupationalHealthcare

const parseEmployer = (employer: any): string => {
  if (!employer || !isString(employer)) {
    throw new Error("Incorrect or missing employer");
  }
  return employer;
};

const parseTypeOccupationalHealthcare = (type: any): "OccupationalHealthcare" => {
  if (!type || !isOccupationalHealthCare(type)) {
    throw new Error("Incorrect or missing type");
  }
  return type;
};

const isOccupationalHealthCare = (type: any): type is "OccupationalHealthcare" => {
  return type === "OccupationalHealthcare";
};

const parseCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing criteria");
  }
  return criteria;
};

// Type guards for HealthCheck

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!isHealthCheckRating(healthCheckRating)) {
    throw new Error(`Incorrect or missing HealthCheckRating`);
  }
  return healthCheckRating;
};

const isHealthCheckRating = (healthCheckRating: any): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseTypeHealthCheck = (type: any): "HealthCheck" => {
  if (!type || !isHealthCheck(type)) {
    throw new Error("Inccorect or missing type");
  }
  return type;
};

const isHealthCheck = (type: any): type is "HealthCheck" => {
  return type === "HealthCheck";
};

// Type guards for patient

const isEntry = (entry: any): entry is Entry => {
  return Object.values(EntryType).includes(entry.type);
};

const arrayContainsOnlyEntries = (entries: any[]): entries is Entry[] => {
  for (let i= 0; i < entries.length; i ++) {
      if (!isEntry(entries[i])) {
        return false;
      }
    }
  return true;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries || !arrayContainsOnlyEntries(entries)) {
    throw new Error("Incorrect or missing entry");
  }
  return entries;
};

const parseName = (name: any): string => {
  if (!name ||!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseSsn = (ssn: any): string => {
  if (!ssn ||!isString(ssn)) {
    throw new Error('Incorrect or missing social security number');
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender ||!isGender(gender)) {
    throw new Error('Gender missing or in wrong format');
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation ||!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export default toNewPatientEntry;