/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NewPatientEntry, Gender, EntryType, Entry } from './types';

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

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export default toNewPatientEntry;