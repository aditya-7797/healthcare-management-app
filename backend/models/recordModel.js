
import { pool } from '../db.js';

export const createMedicalRecord = async (data) => {
  const { patient_id, doctor_id, visit_date, diagnosis, notes } = data;
  const result = await pool.query(
    `INSERT INTO MedicalRecords (patient_id, doctor_id, visit_date, diagnosis, notes)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [patient_id, doctor_id, visit_date, diagnosis, notes]
  );
  return result.rows[0];
};

export const getAllMedicalRecords = async () => {
  const result = await pool.query(
    `SELECT mr.*, p.name as patient_name, d.name as doctor_name
     FROM MedicalRecords mr
     JOIN Patients p ON mr.patient_id = p.patient_id
     JOIN Doctors d ON mr.doctor_id = d.doctor_id`
  );
  return result.rows;
};
