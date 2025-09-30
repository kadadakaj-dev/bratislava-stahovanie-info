import { useEffect } from 'react';
import { offlineService } from '../services/offlineService';

export const useOfflineQueue = () => {
  useEffect(() => {
    offlineService.initDB().then(() => {
      if (navigator.onLine) {
        offlineService.processQueue();
      }
    });
  }, []);
};
