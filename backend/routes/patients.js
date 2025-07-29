import express from 'express';
import { createPatient, getAllPatients } from '../models/patientModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const patient = await createPatient(req.body);
  res.status(201).json(patient);
});

router.get('/', async (req, res) => {
  const patients = await getAllPatients();
  res.json(patients);
});

export default router;