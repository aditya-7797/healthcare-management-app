import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: '', dob: '', timing:'',gender: '', contact: '', insurance_id: ''
  });

  const loadPatients = async () => {
    const res = await API.get('/patients');
    setPatients(res.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await API.post('/patients', form);
    setForm({ name: '', dob: '',timing:'', gender: '', contact: '', insurance_id: '' });
    loadPatients();
  };

  useEffect(() => { loadPatients(); }, []);

  return (
    <div className="page">
      <h1>Patients</h1>
      <form onSubmit={handleAdd}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input
  type="date"
  placeholder="DOB (YYYY-MM-DD)"
  value={form.dob ? form.dob.split('T')[0] : ''}
  onChange={e => setForm({ ...form, dob: e.target.value })}
/>

        <input placeholder="Time (HH-MM-SS)" value={form.timing} onChange={e => setForm({ ...form, timing: e.target.value })} />

        <input placeholder="Gender" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} />
        <input placeholder="Contact" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
        <input placeholder="Insurance ID" value={form.insurance_id} onChange={e => setForm({ ...form, insurance_id: e.target.value })} />
        <button type="submit">Add Patient</button>
      </form>

      <ul>
        {patients.map(p => (
          <li key={p.patient_id}>{p.name} ({p.gender}, {p.dob},{p.timing},{p.contact})</li>
        ))}
      </ul>
    </div>
  );
};

export default Patients;
