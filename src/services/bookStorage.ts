// Book storage service using IndexedDB and backend API

const DB_NAME = 'AlNabeelArabicDB';
const DB_VERSION = 1;
const STORE_NAME = 'uploaded_books';

interface StoredBook {
  id: string;
  name: string;
  size: number;
  type: string;
  totalPages?: number;
  data: ArrayBuffer;
  uploadedAt: number;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveUploadedBook(file: File, totalPages?: number): Promise<{ name: string; size: number; totalPages?: number }> {
  const buffer = await file.arrayBuffer();
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const record: StoredBook = {
      id: 'current_book',
      name: file.name,
      size: file.size,
      type: file.type || 'application/pdf',
      totalPages,
      data: buffer,
      uploadedAt: Date.now()
    };

    const req = store.put(record);
    req.onsuccess = () => {
      // Also update localStorage flag
      localStorage.setItem('alnabeel_has_uploaded_book', 'true');
      localStorage.setItem('alnabeel_book_title', file.name.replace(/\.pdf$/i, ''));
      if (totalPages) {
        localStorage.setItem('alnabeel_book_pages', totalPages.toString());
      }
      resolve({ name: file.name, size: file.size, totalPages });
    };
    req.onerror = () => reject(req.error);
  });
}

export async function getUploadedBook(): Promise<{ name: string; size: number; data: ArrayBuffer; totalPages?: number } | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get('current_book');
      req.onsuccess = () => {
        if (req.result) {
          resolve({
            name: req.result.name,
            size: req.result.size,
            data: req.result.data,
            totalPages: req.result.totalPages
          });
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch (e) {
    return null;
  }
}

export async function deleteUploadedBook(): Promise<void> {
  try {
    localStorage.removeItem('alnabeel_has_uploaded_book');
    localStorage.removeItem('alnabeel_book_title');
    localStorage.removeItem('alnabeel_book_pages');
    localStorage.setItem('alnabeel_book_is_deleted', 'true');

    const db = await openDB();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete('current_book');
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });

    // Also notify server if available
    try {
      await fetch('/api/book/current', { method: 'DELETE' });
    } catch {
      // silent
    }
  } catch (e) {
    console.warn('Error deleting book from storage:', e);
  }
}

export function isBookDeleted(): boolean {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem('alnabeel_book_is_deleted') === 'true' || !localStorage.getItem('alnabeel_has_uploaded_book');
}
