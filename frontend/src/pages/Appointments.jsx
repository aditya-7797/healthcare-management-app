import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    patient_id: '', doctor_id: '', appointment_time: '', status: ''
  });

  const loadAppointments = async () => {
    const res = await API.get('/appointments');
    setAppointments(res.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await API.post('/appointments', form);
    setForm({ patient_id: '', doctor_id: '', appointment_time: '', status: '' });
    loadAppointments();
  };

  useEffect(() => { loadAppointments(); }, []);

  return (
    <div className="page">
      <h1>Appointments</h1>
      <form onSubmit={handleAdd}>
        <input placeholder="Patient ID" value={form.patient_id} onChange={e => setForm({ ...form, patient_id: e.target.value })} />
        <input placeholder="Doctor ID" value={form.doctor_id} onChange={e => setForm({ ...form, doctor_id: e.target.value })} />
        <input placeholder="Time (YYYY-MM-DD HH:MM)" value={form.appointment_time} onChange={e => setForm({ ...form, appointment_time: e.target.value })} />
        <input placeholder="Status" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} />
        <button type="submit">Schedule</button>
      </form>

      <ul>
        {appointments.map(a => (
          <li key={a.appointment_id}>
            🧑‍⚕️ Doctor #{a.doctor_id} with 🧍 Patient #{a.patient_id} on {a.appointment_time} — {a.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
