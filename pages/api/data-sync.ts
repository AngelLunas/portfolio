import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  data?: Array<{
    id: number;
    name: string;
    timestamp: number;
    processed: boolean;
    processingTime?: number;
  }>;
  itemsProcessed?: number;
  error?: string;
};

// Simular una "base de datos" en memoria para persistencia entre requests
let globalBuffer: any[] = [];
let processingInProgress = false;

// Función para procesar items con Promises para espera correcta
async function processItemsAsync(
  items: Array<{ id: number; name: string; timestamp: number; processed: boolean }>
): Promise<any[]> {
  const processPromises = items.map(
    (item, index) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            // Simular procesamiento
            const processed = {
              ...item,
              processed: true,
              processingTime: Math.random() * 100
            };
            // Guardar en buffer global de forma sincronizada
            globalBuffer.push(processed);
            resolve(processed);
          } catch (error) {
            console.error(`❌ Error procesando item ${index}:`, error);
            reject(error);
          }
        }, Math.random() * 50);
      })
  );

  return Promise.all(processPromises);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    // Crear items para procesar
    const items = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      timestamp: Date.now(),
      processed: false
    }));

    // ARREGLO #1: Implementar mutex/lock real
    if (processingInProgress) {
      return res.status(429).json({
        success: false,
        error: 'Processing already in progress. Please try again later.',
        itemsProcessed: 0
      });
    }

    processingInProgress = true;
    globalBuffer = []; // Limpiar buffer antes de procesar

    try {
      // ARREGLO #2 y #4: Usar await para esperar que terminen TODOS los items
      const results = await processItemsAsync(items);

      // ARREGLO #3: Solo respondemos después de que todo esté procesado
      const responseData: ResponseData = {
        success: true,
        data: results,
        itemsProcessed: results.length
      };

      res.status(200).json(responseData);
    } finally {
      // ARREGLO #5: Siempre limpiar el flag y buffer al terminar
      processingInProgress = false;
      globalBuffer = [];
    }
  } catch (error) {
    console.error('❌ Error en handler:', error);
    // ARREGLO #6: Retornar error real al cliente en lugar de éxito falso
    res.status(500).json({
      success: false,
      error: `Failed to process items: ${error instanceof Error ? error.message : 'Unknown error'}`,
      itemsProcessed: 0
    });
  }
}