import React, { useState, useEffect } from 'react';
import { Book, Lesson } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { PdfBookViewer } from './PdfBookViewer';
import { BookUploadZone } from './BookUploadZone';
import {
  saveUploadedBook,
  getUploadedBook,
  deleteUploadedBook,
  isBookDeleted
} from '../../services/bookStorage';
import {
  X,
  Upload,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  FileText,
  RotateCcw,
  Sparkles,
  Trash2
} from 'lucide-react';

interface BookReaderModalProps {
  book?: Book;
  lessons?: Lesson[];
  onClose: () => void;
  onOpenPurchase?: () => void;
}

export const BookReaderModal: React.FC<BookReaderModalProps> = ({
  book,
  onClose
}) => {
  const { t, dir } = useLanguage();
  const { canDownloadBook } = useAuth();

  const [isLoadingStorage, setIsLoadingStorage] = useState<boolean>(true);
  const [uploadedBookData, setUploadedBookData] = useState<{
    name: string;
    size: number;
    data: ArrayBuffer;
    totalPages?: number;
  } | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Load book from storage on mount
  useEffect(() => {
    let isCancelled = false;

    const checkStorage = async () => {
      try {
        // If explicitly deleted by user, keep it empty
        if (isBookDeleted()) {
          if (!isCancelled) {
            setUploadedBookData(null);
            setIsLoadingStorage(false);
          }
          return;
        }

        const stored = await getUploadedBook();
        if (stored && !isCancelled) {
          setUploadedBookData(stored);
        } else {
          // Check server status
          try {
            const res = await fetch('/api/book/status');
            const data = await res.json();
            if (data.hasBook && data.url && !isCancelled) {
              const fileRes = await fetch(data.url);
              const buf = await fileRes.arrayBuffer();
              setUploadedBookData({
                name: 'كتاب النبيل المرفوع.pdf',
                size: buf.byteLength,
                data: buf
              });
            }
          } catch {
            // silent
          }
        }
      } catch (e) {
        console.warn('Error reading stored book:', e);
      } finally {
        if (!isCancelled) {
          setIsLoadingStorage(false);
        }
      }
    };

    checkStorage();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setNotification(null);

    try {
      // 1. Save to local IndexedDB
      await saveUploadedBook(file);
      const buffer = await file.arrayBuffer();

      // 2. Also send to server in background
      try {
        const reader = new FileReader();
        reader.onload = async () => {
          const base64Data = reader.result as string;
          await fetch('/api/book/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: file.name,
              base64Data
            })
          });
        };
        reader.readAsDataURL(file);
      } catch (err) {
        console.warn('Server upload background note:', err);
      }

      setUploadedBookData({
        name: file.name,
        size: file.size,
        data: buffer
      });

      setNotification({
        type: 'success',
        message: 'تم رفع كتابك الجديد بنجاح! تم تجهيز كافة الصفحات للقراءة.'
      });
    } catch (err: any) {
      console.error('Error saving uploaded book:', err);
      setNotification({
        type: 'error',
        message: 'حدث خطأ أثناء حفظ الكتاب، يرجى المحاولة مرة أخرى.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteBook = async () => {
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذا الكتاب؟ يمكنك رفع كتاب جديد في أي وقت.')) {
      await deleteUploadedBook();
      setUploadedBookData(null);
      setNotification({
        type: 'success',
        message: 'تم حذف الكتاب بنجاح. يمكنك الآن رفع كتابك الجديد.'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-md p-1 sm:p-3 select-none font-arabic">
      <div className="relative w-full max-w-7xl h-[98vh] sm:h-[96vh] flex flex-col bg-[#FCFBF8] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-300">
        
        {/* Modal Top Header - Luminous Ivory & Warm Gold */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-gradient-to-r from-[#FFFDF9] via-[#FAF3E7] to-[#FFFDF9] border-b border-amber-200 text-[#2C160B]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#2C160B]">
                {uploadedBookData ? uploadedBookData.name : 'قارئ ومنصة كتب النبيل'}
              </h2>
              <p className="text-xs text-[#6A4021] font-semibold">
                {uploadedBookData
                  ? 'عرض وقراءة صفحات الكتاب الأصلية بحجم كبير وبدقة عالية'
                  : 'تم حذف الكتاب السابق — مساحة القارئ جاهزة لاستقبال كتابك الجديد'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {uploadedBookData && (
              <button
                onClick={handleDeleteBook}
                className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-800 border border-red-300 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="حذف هذا الكتاب"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">حذف الكتاب</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors cursor-pointer shadow-xs"
              title="إغلاق القارئ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification Banner */}
        {notification && (
          <div
            className={`px-4 py-2 text-xs font-bold flex items-center justify-between transition-all ${
              notification.type === 'success'
                ? 'bg-amber-50 text-amber-900 border-b border-amber-300'
                : 'bg-red-50 text-red-900 border-b border-red-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {notification.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600" />
              )}
              <span>{notification.message}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-amber-800 hover:text-amber-950 px-2 py-0.5 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Modal Body: Either Upload Zone OR Pdf Book Viewer */}
        <div className="flex-1 overflow-hidden relative flex flex-col bg-[#FCFBF8]">
          {isLoadingStorage ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-3 text-amber-900">
              <Sparkles className="w-10 h-10 animate-spin text-amber-600" />
              <p className="text-sm font-black">جارٍ تهيئة مساحة القارئ...</p>
            </div>
          ) : uploadedBookData ? (
            <PdfBookViewer
              pdfData={uploadedBookData.data}
              bookTitle={uploadedBookData.name}
              onDeleteBook={handleDeleteBook}
              onReplaceBook={handleFileUpload}
            />
          ) : (
            <div className="flex-1 overflow-y-auto flex items-center justify-center p-4 sm:p-8 bg-[#FAF5ED]">
              <BookUploadZone
                onFileSelected={handleFileUpload}
                isUploading={isUploading}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
