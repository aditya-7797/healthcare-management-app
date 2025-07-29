import { pool } from '../db.js';

export const createAppointment = async (data) => {
  const { patient_id, doctor_id, appointment_time, status } = data;
  const result = await pool.query(
    `INSERT INTO Appointments (patient_id, doctor_id, appointment_time, status)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [patient_id, doctor_id, appointment_time, status]
  );
  return result.rows[0];
};

export const getAllAppointments = async () => {
  const result = await pool.query(
    `SELECT a.*, p.name as patient_name, d.name as doctor_name
     FROM Appointments a
     JOIN Patients p ON a.patient_id = p.patient_id
     JOIN Doctors d ON a.doctor_id = d.doctor_id`
  );
  return result.rows;
};
