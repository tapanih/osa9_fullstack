import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsWithoutSensitiveInfo());
});

router.post('/', (req, res) => {
  const { name, ssn, dateOfBirth, occupation, gender } = req.body;
  const newPatient = patientService.addPatient(
    name,
    ssn,
    dateOfBirth,
    occupation,
    gender
  );
  res.json(newPatient);
})

export default router;
