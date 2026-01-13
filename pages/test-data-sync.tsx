import { useState } from 'react';

interface DataItem {
  id: number;
  name: string;
  timestamp: number;
  processed: boolean;
  processingTime?: number;
}

interface ApiResponse {
  success: boolean;
  data?: DataItem[];
  itemsProcessed?: number;
  warning?: string;
}

export default function TestDataSync() {
  const [responses, setResponses] = useState<ApiResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [inconsistencies, setInconsistencies] = useState<string[]>([]);

  const testSingleRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/data-sync');
      const data: ApiResponse = await response.json();
      setResponses(prev => [data, ...prev]);

      // Detectar inconsistencias
      if (data.data && data.data.length === 0 && data.success) {
        setInconsistencies(prev => [...prev, `Request devolvió 0 items pero success=true`]);
      }
      if (data.warning) {
        setInconsistencies(prev => [...prev, data.warning as string]);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const testMultipleRequests = async () => {
    setLoading(true);
    try {
      // Enviar 10 requests simultáneos para aumentar probabilidad de race condition
      const promises = Array(10).fill(null).map(() =>
        fetch('/api/data-sync').then(r => r.json())
      );
      const results = await Promise.all(promises);
      setResponses(prev => [...results, ...prev]);

      // Analizar inconsistencias
      const newInconsistencies: string[] = [];
      results.forEach((resp, idx) => {
        if (resp.data?.length !== 5 && resp.success) {
          newInconsistencies.push(`Request ${idx}: esperaba 5 items, obtuvo ${resp.data?.length || 0}`);
        }
        if (resp.warning) {
          newInconsistencies.push(`Request ${idx}: ${resp.warning}`);
        }
      });

      if (newInconsistencies.length > 0) {
        setInconsistencies(prev => [...newInconsistencies, ...prev]);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResponses([]);
    setInconsistencies([]);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🐛 Test Data Sync - Race Condition Demo</h1>
      
      <p>Este endpoint tiene un bug real: race condition que causa corrupción de datos intermitente.</p>
      <p><strong>¿El problema?</strong> Devuelve HTTP 200 aunque los datos estén incompletos.</p>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={testSingleRequest} disabled={loading}>
          {loading ? 'Cargando...' : 'Test Single Request'}
        </button>
        <button onClick={testMultipleRequests} disabled={loading} style={{ marginLeft: '10px' }}>
          {loading ? 'Cargando...' : 'Test 10 Requests Simultáneos'}
        </button>
        <button onClick={clearResults} style={{ marginLeft: '10px' }}>
          Limpiar Resultados
        </button>
      </div>

      {inconsistencies.length > 0 && (
        <div style={{ 
          backgroundColor: '#fee', 
          border: '2px solid #f00', 
          padding: '10px', 
          marginBottom: '20px',
          borderRadius: '4px'
        }}>
          <h3>🔴 Inconsistencias Detectadas ({inconsistencies.length}):</h3>
          <ul>
            {inconsistencies.map((inc, idx) => (
              <li key={idx}>{inc}</li>
            ))}
          </ul>
        </div>
      )}

      <h3>Últimas Respuestas ({responses.length}):</h3>
      <div style={{ 
        maxHeight: '600px', 
        overflow: 'auto',
        backgroundColor: '#f5f5f5',
        padding: '10px',
        borderRadius: '4px'
      }}>
        {responses.map((resp, idx) => (
          <div key={idx} style={{ 
            marginBottom: '15px', 
            padding: '10px', 
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}>
            <strong>Response #{idx + 1}</strong>
            <pre style={{ fontSize: '12px', overflow: 'auto' }}>
              {JSON.stringify(resp, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}