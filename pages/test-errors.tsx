import { useState } from 'react';
import styles from '../styles/TestErrors.module.css';

export default function TestErrors() {
  const [loadingConsole, setLoadingConsole] = useState(false);
  const [loadingNetwork, setLoadingNetwork] = useState(false);
  const [resultConsole, setResultConsole] = useState<string | null>(null);
  const [resultNetwork, setResultNetwork] = useState<string | null>(null);

  const handleConsoleError = async () => { // Fixed HTTP status check
    setLoadingConsole(true);
    setResultConsole(null);
    try {
      const response = await fetch('/api/console-error');
      const data = await response.json();
      if (!response.ok) {
        setResultConsole(`❌ Error ${response.status}: ${data.message}`);
      } else {
        setResultConsole(`Respuesta del servidor: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      setResultConsole(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setLoadingConsole(false);
    }
  };

  const handleNetworkError = async () => {
    setLoadingNetwork(true);
    setResultNetwork('Esperando... (esto causará timeout)');
    try {
      const response = await fetch('/api/network-error?delay=5000');
      const data = await response.json();
      if (!response.ok) {
        setResultNetwork(`❌ Error ${response.status}: ${typeof data === 'object' && data.message ? data.message : 'Error de servidor'}`);
      } else {
        setResultNetwork(`Respuesta: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      setResultNetwork(`❌ Error de Network: ${error instanceof Error ? error.message : 'Timeout'}`);
    } finally {
      setLoadingNetwork(false);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1>🧪 Prueba de Errores</h1>
        <p>Esta página demuestra diferentes tipos de errores en el sistema</p>
      </div>

      <div className={styles.grid}>
        {/* Error de Consola */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>📌 Error de Consola (Server)</h2>
            <p>Genera un error intencional en el servidor</p>
          </div>
          
          <button
            className={styles.button}
            onClick={handleConsoleError}
            disabled={loadingConsole}
          >
            {loadingConsole ? 'Cargando...' : 'Disparar Error de Consola'}
          </button>

          {resultConsole && (
            <div className={styles.result}>
              <strong>Resultado:</strong>
              <pre>{resultConsole}</pre>
              <p className={styles.note}>💡 Revisa los logs del servidor para ver el error</p>
            </div>
          )}
        </div>

        {/* Error de Network */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>🌐 Error de Network (Frontend)</h2>
            <p>Simula un timeout de conexión</p>
          </div>

          <button
            className={`${styles.button} ${styles.buttonDanger}`}
            onClick={handleNetworkError}
            disabled={loadingNetwork}
          >
            {loadingNetwork ? 'Esperando timeout...' : 'Disparar Error de Network'}
          </button>

          {resultNetwork && (
            <div className={styles.result}>
              <strong>Resultado:</strong>
              <pre>{resultNetwork}</pre>
              <p className={styles.note}>💡 Revisa la consola del navegador (F12) para ver el error</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.info}>
        <h3>📚 Información</h3>
        <ul>
          <li><strong>Error de Consola:</strong> Se genera un error en el servidor y se devuelve como respuesta 500</li>
          <li><strong>Error de Network:</strong> El servidor mantiene la conexión abierta hasta timeout (simula problemas de red)</li>
          <li>Ambos errores son intencionales para demostración</li>
        </ul>
      </div>
    </main>
  );
}