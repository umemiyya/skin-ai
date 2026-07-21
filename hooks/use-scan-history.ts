'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ScanHistoryItem } from '@/types';

const STORAGE_KEY = 'SkinDetect_scan_history';

function readHistory(): ScanHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ScanHistoryItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useScanHistory() {
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setHistory(readHistory());
    setIsLoaded(true);
  }, []);

  const addScan = useCallback((item: Omit<ScanHistoryItem, 'id' | 'createdAt'>) => {
    const newItem: ScanHistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setHistory((prev) => {
      const updated = [newItem, ...prev].slice(0, 50); // batasi 50 riwayat terakhir
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    return newItem;
  }, []);

  const clearHistory = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  }, []);

  const removeScan = useCallback((id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((h) => h.id !== id);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { history, isLoaded, addScan, clearHistory, removeScan };
}
