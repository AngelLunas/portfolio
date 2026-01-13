import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    // Generar un error de consola deliberadamente
    console.error('❌ ERROR INTENCIONAL EN CONSOLA:', new Error('Este es un error de prueba en el servidor'));
    
    res.status(500).json({
      message: 'Se ha generado un error en la consola del servidor',
      error: 'Error intencional para demostración'
    });
  } catch (error) {
    console.error('Error inesperado:', error);
    res.status(500).json({
      message: 'Error interno del servidor',
      error: String(error)
    });
  }
}