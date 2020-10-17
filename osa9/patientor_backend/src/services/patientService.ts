import patients from '../../data/patients';
import { Patient, NewPatientEntry, PublicPatient } from '../types';
import { v4 as uuid } from 'uuid';

const getEntries = (): Array<Patient> => {
  return patients;
};

const getFilteredEntries = (): PublicPatient [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatientEntry = { id: uuid(), ...entry };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getFilteredEntries,
  addPatient,
  getPatient
}; 
