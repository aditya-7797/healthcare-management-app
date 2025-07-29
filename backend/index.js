import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import patientRoutes from './routes/patients.js';
import doctorRoutes from './routes/doctors.js';
import appointmentRoutes from './routes/appointments.js';
import recordRoutes from './routes/records.js';
import prescriptionRoutes from './routes/prescriptions.js';

import { connectRedis } from './redis.js';
import { connectKafka } from './kafka.js';
import { pool } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Healthcare Backend API is running ✅');
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  try {
    await pool.connect();
    console.log('✅ Connected to PostgreSQL');

    await connectRedis();
    console.log('✅ Redis connected');

    await connectKafka();
    console.log('✅ Kafka connected');
  } catch (err) {
    console.error('❌ Startup Error:', err);
  }
});
