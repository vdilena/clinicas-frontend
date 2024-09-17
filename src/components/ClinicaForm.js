import React, { useState, useEffect } from 'react';
import { createClinica, getClinicaById, updateClinica } from '../services/clinicaService';
import { useNavigate, useParams } from 'react-router-dom';

const ClinicaForm = () => {
    const [clinica, setClinica] = useState({
        nombre: '',
        direccion: '',
        telefono: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            loadClinica();
        }
    }, [id]);

    const loadClinica = async () => {
        const result = await getClinicaById(id);
        setClinica(result.data);
    };

    const onInputChange = (e) => {
        setClinica({ ...clinica, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await updateClinica(id, clinica);
        } else {
            await createClinica(clinica);
        }
        navigate('/');
    };

    return (
        <div className="container">
            <h2 className="mt-4">{id ? 'Editar Clínica' : 'Agregar Clínica'}</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" className="form-control" name="nombre" value={clinica.nombre} onChange={onInputChange} />
                </div>
                <div className="form-group">
                    <label>Dirección</label>
                    <input type="text" className="form-control" name="direccion" value={clinica.direccion} onChange={onInputChange} />
                </div>
                <div className="form-group">
                    <label>Teléfono</label>
                    <input type="text" className="form-control" name="telefono" value={clinica.telefono} onChange={onInputChange} />
                </div>
                <button type="submit" className="btn btn-primary">{id ? 'Actualizar' : 'Agregar'}</button>
            </form>
        </div>
    );
};

export default ClinicaForm;
