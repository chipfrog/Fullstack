export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export enum EntryType {
  HospitalEntry = "Hospital",
  OccupationalHealthcareEntry = "OccupationalHealthcare",
  HealthCheckEntry = "HealthCheck"
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  }
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  }
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}
  
export type NewPatientEntry = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type NewEntry = Omit<HealthCheckEntry, 'id'> | Omit<HospitalEntry, 'id'> | Omit<OccupationalHealthcareEntry, 'id'>;
