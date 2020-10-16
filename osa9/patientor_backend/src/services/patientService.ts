import patients from '../../data/patients';
import { Patient, NonSensitivePatientEntry } from '../types';

const getEntries = (): Array<Patient> => {
  return patients;
};

const getFilteredEntries = (): NonSensitivePatientEntry [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getEntries,
  getFilteredEntries
}; 
