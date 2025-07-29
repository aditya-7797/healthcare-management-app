import express from 'express';
import { createMedicalRecord, getAllMedicalRecords } from '../models/recordModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const record = await createMedicalRecord(req.body);
    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create medical record' });
  }
});

router.get('/', async (req, res) => {
  try {
    const records = await getAllMedicalRecords();
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve medical records' });
  }
});

export default router;
