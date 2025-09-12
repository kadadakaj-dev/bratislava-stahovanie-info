import { QuoteFormData } from "../types";

const DB_NAME = 'viandmo-requests';
const DB_VERSION = 1;
const STORE_NAME = 'quote_requests';

let db: IDBDatabase;

const initDB = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        if (db) {
            return resolve(true);
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const dbInstance = (event.target as IDBOpenDBRequest).result;
            if (!dbInstance.objectStoreNames.contains(STORE_NAME)) {
                dbInstance.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onsuccess = (event) => {
            db = (event.target as IDBOpenDBRequest).result;
            resolve(true);
        };

        request.onerror = (event) => {
            console.error("Database error:", (event.target as IDBOpenDBRequest).error);
            reject(false);
        };
    });
};

const addRequestToQueue = async (data: QuoteFormData): Promise<void> => {
    if (!db) await initDB();
    
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const requestData = { ...data, id: new Date().toISOString() };
        
        const request = store.add(requestData);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (event) => {
            console.error("Error adding request to queue:", (event.target as IDBRequest).error);
            reject();
        };
    });
};

const processQueue = async (): Promise<void> => {
    if (!db) await initDB();
    if (!navigator.onLine) {
        return;
    }

    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const getAllRequest = store.getAll();

    getAllRequest.onsuccess = async () => {
        const requests = getAllRequest.result;
        for (const req of requests) {
            try {
                // In a real app, this would be a fetch call to your API endpoint
                // const response = await fetch('/api/quote', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(req),
                // });
                // if (!response.ok) throw new Error('Server error');
                
                // Mocking API call success
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Remove from queue on success
                const deleteTransaction = db.transaction([STORE_NAME], 'readwrite');
                const deleteStore = deleteTransaction.objectStore(STORE_NAME);
                deleteStore.delete(req.id);

            } catch (error) {
                console.error('Failed to send queued request, will retry later:', req.id, error);
            }
        }
    };
};

window.addEventListener('online', processQueue);

export const offlineService = {
  initDB,
  addRequestToQueue,
  processQueue,
};