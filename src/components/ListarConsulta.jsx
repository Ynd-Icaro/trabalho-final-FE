import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListarConsultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [editConsulta, setEditConsulta] = useState(null);
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [Adress, setAdress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [consultasRes, pacientesRes, medicosRes] = await Promise.all([
          axios.get('http://localhost:3000/consultas'),
          axios.get('http://localhost:3000/pacientes'),
          axios.get('http://localhost:3000/medicos'),
        ]);
        setConsultas(consultasRes.data);
        setPacientes(pacientesRes.data);
        setMedicos(medicosRes.data);
      } catch (error) {
        console.error('Erro ao buscar dados', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/consultas/${id}`);
      setConsultas(consultas.filter(consulta => consulta.id !== id));
    } catch (error) {
      console.error('Erro ao excluir consulta', error);
    }
  };

  const handleEdit = (consulta) => {
    setEditConsulta(consulta);
    setPatientId(consulta.patientId);
    setDoctorId(consulta.doctorId);
    setDate(consulta.date);
    setTime(consulta.time);
    setAdress(consulta.Adress);

  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/consultas/${editConsulta.id}`, {
        patientId,
        doctorId,
        date,
        time,
        Adress
      });
      setConsultas(consultas.map(c => (c.id === editConsulta.id ? response.data : c)));
      setEditConsulta(null);
      setPatientId('');
      setDoctorId('');
      setDate('');
      setTime('');
      setAdress('');
    } catch (error) {
      console.error('Erro ao atualizar consulta', error);
    }
  };

  const getPatientName = (id) => {
    const patient = pacientes.find(p => p.id === id);
    return patient ? patient.name : 'Desconhecido';
  };

  const getDoctorName = (id) => {
    const doctor = medicos.find(d => d.id === id);
    return doctor ? doctor.name : 'Desconhecido';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
      <div className="container">
        <div className='flex justify-between items-center mb-6'>
        <h1 className="text-3xl font-bold">Consultas</h1>
        <button
            onClick={() => navigate('/cadastrar-consulta')}
            className="py-2 px-4 ml-20 bg-green-500 text-white rounded hover:bg-green-600">
            Cadastrar Novo Médico
          </button>
        </div>
        <ul>
          {consultas.map(consulta => (
              <li key={consulta.id} className="py-2 px-4 border-b flex justify-between items-center">
              <span className='p-5'>
                Paciente: {getPatientName(consulta.patientId)}, Médico: {getDoctorName(consulta.doctorId)}, Data: {consulta.date}, Hora: {consulta.time}, Endereço: {consulta.Adress}
              </span>
              <div>
                <button
                  onClick={() => handleEdit(consulta)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(consulta.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
        {editConsulta && (
            <form onSubmit={handleUpdate} className="mt-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Editar Consulta</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Paciente:</label>
              <select
                className="w-full px-4 py-2 border rounded"
                value={patientId}
                onChange={e => setPatientId(e.target.value)}
                required
              >
                <option value="">Selecione um paciente</option>
                {pacientes.map(patient => (
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
                {medicos.map(doctor => (
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
              Atualizar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ListarConsultas;
