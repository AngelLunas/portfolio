import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Simular un timeout o error de red muy largo
  // Mandar sin respuesta (timeout) o con delay extremo
  const delay = parseInt(req.query.delay as string) || 60000; // 60 segundos por defecto

  // Simular timeout dejando la conexión abierta
  setTimeout(() => {
    try {
      // Nunca enviamos respuesta, simulando un timeout
      console.log('⏱️ Simulando timeout de red...');
    } catch (error) {
      console.error('Error en simulación de network:', error);
    }
  }, delay);
}