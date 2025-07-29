import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../api/axios';

const Prescriptions = () => {
  const [searchParams] = useSearchParams();
  const initialRecordId = searchParams.get('recordId') || '';

  const [recordId, setRecordId] = useState(initialRecordId);
  const [prescriptions, setPrescriptions] = useState([]);
  const [form, setForm] = useState({
    medication: '',
    dosage: '',
    duration: ''
  });

  const fetchPrescriptions = async () => {
    if (!recordId) return;
    try {
      const res = await API.get(`/prescriptions/record/${recordId}`); // ✅ updated path
      setPrescriptions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddPrescription = async (e) => {
    e.preventDefault();
    try {
      await API.post('/prescriptions', {
        record_id: recordId,
        ...form
      });
      setForm({ medication: '', dosage: '', duration: '' });
      fetchPrescriptions();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (recordId) fetchPrescriptions();
  }, [recordId]);

  return (
    <div className="page">
      <h1>Prescriptions</h1>

      <label>Medical Record ID:</label>
      <input
        type="text"
        value={recordId}
        onChange={(e) => setRecordId(e.target.value)}
        placeholder="e.g., 1"
        disabled={!!initialRecordId}
      />
      <button onClick={fetchPrescriptions}>Load Prescriptions</button>

      <h2>Add Prescription</h2>
      <form onSubmit={handleAddPrescription}>
        <input
          type="text"
          value={recordId}
          placeholder="Medical Record ID"
          disabled
        />
        <input
          type="text"
          placeholder="Medication"
          value={form.medication}
          onChange={(e) => setForm({ ...form, medication: e.target.value })}
        />
        <input
          type="text"
          placeholder="Dosage"
          value={form.dosage}
          onChange={(e) => setForm({ ...form, dosage: e.target.value })}
        />
        <input
          type="text"
          placeholder="Duration"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>

      <h2>Prescription List</h2>
      {prescriptions.length === 0 ? (
        <p>No prescriptions found.</p>
      ) : (
        <ul>
          {prescriptions.map((p) => (
            <li key={p.prescription_id}>
              <strong>{p.medication}</strong> - {p.dosage} ({p.duration})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Prescriptions;
