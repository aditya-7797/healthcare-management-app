import { pool } from '../db.js';

export const createPatient = async (data) => {
  const { name, dob, timing, gender, contact, insurance_id } = data;

  const result = await pool.query(
    `INSERT INTO Patients(name, dob, timing, gender, contact, insurance_id)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      name,
      dob === '' ? null : dob,  
      timing,             // fix for date input
      gender ,
      contact ,
      insurance_id
    ]
  );

  return result.rows[0];
};


export const getAllPatients = async () => {
  const result = await pool.query('SELECT * FROM Patients');
  return result.rows;
};