import express from 'express';
import { createPrescription, getAllPrescriptions } from '../models/prescriptionModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const prescription = await createPrescription(req.body);
    res.status(201).json(prescription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create prescription' });
  }
});

router.get('/', async (req, res) => {
  try {
    const prescriptions = await getAllPrescriptions();
    res.json(prescriptions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve prescriptions' });
  }
});


// router.get('/:id', async (req, res) => {
//   try {
//     const prescription = await getPrescriptionById(req.params.id);
//     if (!prescription) {
//       return res.status(404).json({ error: 'Prescription not found' });
//     }
//     res.json(prescription);
//   } catch (err) {
//     console.error('❌ Failed to fetch prescription:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

router.get('/record/:recordId', async (req, res) => {
  try {
    const prescriptions = await getPrescriptionsByRecordId(req.params.recordId);
    res.json(prescriptions);
  } catch (err) {
    console.error('❌ Error fetching prescriptions by record ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
