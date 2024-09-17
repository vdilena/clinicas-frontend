import React, { useEffect, useState } from 'react';
import { getClinicas, deleteClinica } from '../services/clinicaService';
import { Link } from 'react-router-dom';

const ClinicaList = () => {
    const [clinicas, setClinicas] = useState([]);
    const [clinicaIdToDelete, setClinicaIdToDelete] = useState(null);

    useEffect(() => {
        loadClinicas();
    }, []);

    const loadClinicas = async () => {
        const result = await getClinicas();
        setClinicas(result.data);
    };

    const deleteHandler = async (id) => {
        await deleteClinica(id);
        loadClinicas();
    };

    const confirmDelete = async () => {
        if (clinicaIdToDelete) {
            await deleteClinica(clinicaIdToDelete);
            setClinicaIdToDelete(null);
            loadClinicas();
        }
    };

    return (
        <div className="container">
            <h2 className="mt-4">Lista de Clínicas</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clinicas.map(clinica => (
                        <tr key={clinica.clinicaId}>
                            <td>{clinica.nombre}</td>
                            <td>{clinica.direccion}</td>
                            <td>{clinica.telefono}</td>
                            <td>
                                <Link to={`/detail/${clinica.clinicaId}`} className="btn btn-info">Ver Detalles</Link>
                                <Link to={`/edit/${clinica.clinicaId}`} className="btn btn-warning">Editar</Link>
                                <button className="btn btn-danger ml-2" onClick={() => deleteHandler(clinica.clinicaId)} data-toggle="modal" data-target="#deleteModal">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Modal de Confirmación para Eliminar */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Confirmar Eliminación</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ¿Estás seguro que deseas eliminar esta clínica?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={confirmDelete}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClinicaList;
