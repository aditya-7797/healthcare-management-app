CREATE TABLE Patients (
    patient_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dob DATE NOT NULL,
    timing TIME NOT NULL, 
    gender VARCHAR(10),
    contact VARCHAR(50) NOT NULL,
    insurance_id VARCHAR(50)
);

CREATE TABLE Doctors (
    doctor_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialty VARCHAR(100),
    availability JSONB
);

CREATE TABLE Appointments (
    appointment_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES Patients(patient_id) NOT NULL,
    doctor_id INT REFERENCES Doctors(doctor_id) NOT NULL,
    appointment_time TIMESTAMP,
    status VARCHAR(20)
);

CREATE TABLE MedicalRecords (
    record_id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES Patients(patient_id) NOT NULL,
    doctor_id INT REFERENCES Doctors(doctor_id) NOT NULL,
    visit_date TIMESTAMP,
    diagnosis TEXT,
    notes TEXT
);

CREATE TABLE Prescriptions (
    prescription_id SERIAL PRIMARY KEY,
    record_id INT REFERENCES MedicalRecords(record_id) NOT NULL,
    medication TEXT NOT NULL,
    dosage TEXT NOT NULL,
    duration TEXT
);