import React, { useEffect, useState } from 'react';
import { getClinicaById } from '../services/clinicaService';
import { useParams, Link } from 'react-router-dom';

const ClinicaDetail = () => {
    const [clinica, setClinica] = useState(null);
    const { id } = useParams(); // Obtenemos el ID de la URL

    useEffect(() => {
        loadClinica();
    }, []);

    const loadClinica = async () => {
        const result = await getClinicaById(id);
        setClinica(result.data);
    };

    if (!clinica) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Detalles de la Clínica</h2>
            <div className="card">
                <div className="card-header">
                    <h3>{clinica.nombre}</h3>
                </div>
                <div className="card-body">
                    <p><strong>Dirección:</strong> {clinica.direccion}</p>
                    <p><strong>Teléfono:</strong> {clinica.telefono}</p>
                </div>
                <div className="card-footer">
                    <Link to="/" className="btn btn-primary">Volver a la Lista</Link>
                    <Link to={`/edit/${clinica.clinicaId}`} className="btn btn-warning ml-2">Editar</Link>
                </div>
            </div>
        </div>
    );
};

export default ClinicaDetail;
