import { pool } from '../db.js';

export const createPrescription = async (data) => {
  const { record_id, medication, dosage, duration } = data;
  const result = await pool.query(
    `INSERT INTO Prescriptions (record_id, medication, dosage, duration)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [record_id, medication, dosage, duration]
  );
  return result.rows[0];
};

export const getAllPrescriptions = async () => {
  const result = await pool.query(
    `SELECT pr.*, mr.diagnosis, p.name AS patient_name, d.name AS doctor_name
     FROM Prescriptions pr
     JOIN MedicalRecords mr ON pr.record_id = mr.record_id
     JOIN Patients p ON mr.patient_id = p.patient_id
     JOIN Doctors d ON mr.doctor_id = d.doctor_id`
  );
  return result.rows;
};

export const getPrescriptionsByRecordId = async (recordId) => {
  const result = await db.query(
    'SELECT * FROM prescriptions WHERE record_id = $1',
    [recordId]
  );
  return result.rows;
};


