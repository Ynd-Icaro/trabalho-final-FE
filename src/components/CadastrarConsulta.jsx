import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const CadastrarConsulta = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [Adress, setAdress] = useState('');

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsRes, doctorsRes, appointmentsRes] = await Promise.all([
          axios.get('http://localhost:3000/pacientes'),
          axios.get('http://localhost:3000/medicos'),
          axios.get('http://localhost:3000/consultas'),
        ]);
        setPatients(patientsRes.data);
        setDoctors(doctorsRes.data);
        setAppointments(appointmentsRes.data);
      } catch (error) {
        console.error('Erro ao buscar dados', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/consultas', {
        patientId,
        doctorId,
        date,
        time,
        Adress
      });
      setAppointments([...appointments, response.data]);
      alert('Consulta cadastrada com sucesso');
    } catch (error) {
      console.error('Erro ao cadastrar consulta', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-scree w-full">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6 text-center">Cadastrar Consulta</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Paciente:</label>
            <select
              className="w-full px-4 py-2 border rounded"
              value={patientId}
              onChange={e => setPatientId(e.target.value)}
              required
            >
              <option value="">Selecione um paciente</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Médico:</label>
            <select
              className="w-full px-4 py-2 border rounded"
              value={doctorId}
              onChange={e => setDoctorId(e.target.value)}
              required
            >
              <option value="">Selecione um médico</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Data:</label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Hora:</label>
            <input
              type="time"
              className="w-full px-4 py-2 border rounded"
              value={time}
              onChange={e => setTime(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Endereço:</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                value={Adress}
                onChange={e => setAdress(e.target.value)}
                required
              />
            </div>
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Cadastrar Consulta
          </button>
        </form>
         <button className='bg-black rounded p-2 content-center mt-5'>
            <Link className="flex  text-white hover:underline " to='/listar-consultas'>Listar Consultas</Link>
        </button>
      </div>
    </div>
  );
};

export default CadastrarConsulta;
