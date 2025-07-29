import express from 'express';
import { createAppointment, getAllAppointments } from '../models/appointmentModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const appointment = await createAppointment(req.body);
    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

router.get('/', async (req, res) => {
  try {
    const appointments = await getAllAppointments();
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve appointments' });
  }
});

export default router;
