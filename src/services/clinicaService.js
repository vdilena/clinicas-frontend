import axios from 'axios';

const API_URL = 'http://localhost:8085/clinica';

export const getClinicas = async () => {
    return await axios.get(API_URL);
};

export const getClinicaById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const createClinica = async (clinica) => {
    return await axios.post(API_URL, clinica);
};

export const updateClinica = async (id, clinica) => {
    return await axios.put(`${API_URL}/${id}`, clinica);
};

export const deleteClinica = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};
