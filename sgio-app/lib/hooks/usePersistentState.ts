import { useState, useEffect, Dispatch, SetStateAction } from 'react';

/**
 * Hook personalizado para estado persistente en localStorage
 * Guarda automáticamente en localStorage cada vez que cambia el estado
 * 
 * @param key - Clave única para localStorage
 * @param initialValue - Valor inicial si no existe en localStorage
 * @returns [value, setValue] - Como useState pero con persistencia
 */
export function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  // Estado inicial desde localStorage o valor por defecto
  const [value, setValue] = useState<T>(() => {
    // Solo en el cliente (no en SSR)
    if (typeof window === 'undefined') return initialValue;
    
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error(`Error leyendo ${key} de localStorage:`, error);
    }
    
    return initialValue;
  });

  // Efecto para guardar en localStorage cuando cambia el valor
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error guardando ${key} en localStorage:`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

/**
 * Hook para auto-guardado periódico
 * Útil para formularios largos o datos críticos
 */
export function useAutoSave<T>(
  key: string,
  data: T,
  intervalMs: number = 30000 // 30 segundos por defecto
) {
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        localStorage.setItem(`${key}-autosave`, JSON.stringify({
          data,
          timestamp: new Date().toISOString()
        }));
        console.log(`✅ Auto-guardado: ${key}`);
      } catch (error) {
        console.error(`Error en auto-guardado de ${key}:`, error);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [key, data, intervalMs]);
}

/**
 * Hook para recuperar borrador auto-guardado
 */
export function useRecoverDraft<T>(key: string): T | null {
  const [draft, setDraft] = useState<T | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`${key}-autosave`);
      if (saved) {
        const { data, timestamp } = JSON.parse(saved);
        const savedDate = new Date(timestamp);
        const now = new Date();
        const hoursDiff = (now.getTime() - savedDate.getTime()) / (1000 * 60 * 60);
        
        // Solo recuperar si es del mismo día (menos de 24 horas)
        if (hoursDiff < 24) {
          setDraft(data);
        } else {
          // Limpiar borradores viejos
          localStorage.removeItem(`${key}-autosave`);
        }
      }
    } catch (error) {
      console.error(`Error recuperando borrador de ${key}:`, error);
    }
  }, [key]);

  return draft;
}

/**
 * Función helper para limpiar borrador después de recuperarlo
 */
export function clearDraft(key: string) {
  try {
    localStorage.removeItem(`${key}-autosave`);
  } catch (error) {
    console.error(`Error limpiando borrador de ${key}:`, error);
  }
}
