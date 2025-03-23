import { useState } from 'react';
import api from '../services/axios';

const useDispositivos = () => {

    const [loading, setLoading] = useState(false);

    const asignarDispositivo = async (values: { macAddress: string; usuarioId: string; nombrePersonalizado: string }) => {
        try {
            setLoading(true);
            const response = await api.put(`/dispositivos/asignar`, values);
            console.log("Respuesta del servidor:", response.data);
        } catch (error) {
            console.error("Error al asignar el dispositivo:", error);
        } finally {
            setLoading(false);
        }
    };

    return { asignarDispositivo, loading };
};

export default useDispositivos