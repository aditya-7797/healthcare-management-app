// At top
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 🆕
import API from '../api/axios';

const Records = () => {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    patient_id: '', doctor_id: '', visit_date: '', diagnosis: '', notes: ''
  });

  const navigate = useNavigate(); // 🆕

  const loadRecords = async () => {
    const res = await API.get('/records');
    setRecords(res.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await API.post('/records', form);
    setForm({ patient_id: '', doctor_id: '', visit_date: '', diagnosis: '', notes: '' });
    loadRecords();
  };

  const goToPrescription = (recordId) => {
    navigate(`/prescriptions?recordId=${recordId}`); // 🆕 Pass in query param
  };

  useEffect(() => { loadRecords(); }, []);

  return (
    <div className="page">
      <h1>Medical Records</h1>
      <form onSubmit={handleAdd}>
        <input placeholder="Patient ID" value={form.patient_id} onChange={e => setForm({ ...form, patient_id: e.target.value })} />
        <input placeholder="Doctor ID" value={form.doctor_id} onChange={e => setForm({ ...form, doctor_id: e.target.value })} />
        <input placeholder="Visit Date" value={form.visit_date} onChange={e => setForm({ ...form, visit_date: e.target.value })} />
        <input placeholder="Diagnosis" value={form.diagnosis} onChange={e => setForm({ ...form, diagnosis: e.target.value })} />
        <input placeholder="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
        <button type="submit">Add Record</button>
      </form>

      <ul>
        {records.map(r => (
          <li key={r.record_id}>
            Patient #{r.patient_id} | Doctor #{r.doctor_id} | {r.visit_date}
            <br />
            <strong>Diagnosis:</strong> {r.diagnosis}<br />
            <strong>Notes:</strong> {r.notes}
            <br />
            <button onClick={() => goToPrescription(r.record_id)}>Add Prescription</button> {/* 🆕 */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Records;
