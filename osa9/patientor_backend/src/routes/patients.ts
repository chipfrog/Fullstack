import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry } from '../utils';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getFilteredEntries());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(patientService.getPatient(id));
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(newEntry, req.params.id);
    res.json(addedEntry);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

export default router;