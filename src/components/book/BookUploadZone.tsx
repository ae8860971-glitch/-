import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, Sparkles, BookOpen } from 'lucide-react';

interface BookUploadZoneProps {
  onFileSelected: (file: File) => void | Promise<void>;
  isUploading?: boolean;
}

export const BookUploadZone: React.FC<BookUploadZoneProps> = ({
  onFileSelected,
  isUploading = false
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    setErrorMsg(null);

    const file = e.dataTransfer.files?.[0];
    validateAndSelect(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const file = e.target.files?.[0];
    validateAndSelect(file);
  };

  const validateAndSelect = (file?: File) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setErrorMsg('يرجى اختيار ملف بصيغة PDF فقط.');
      return;
    }

    setSelectedFile(file);
    onFileSelected(file);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 text-center select-none font-arabic">
      {/* Decorative Heritage Header */}
      <div className="mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>تم حذف الكتاب السابق — جاهز لرفع كتابك الجديد</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-[#2B150A] tracking-wide">
          رفع كتاب المنهج الجديد (PDF)
        </h3>
        <p className="text-sm text-[#6A4021] font-semibold max-w-lg mx-auto">
          سيتم استخراج وعرض صفحات كتابك الأصلية كاملة بدون أي قص وبحجم كبير وواضح ومريح للعين.
        </p>
      </div>

      {/* Drop Zone Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`relative cursor-pointer rounded-3xl border-2 border-dashed p-8 sm:p-12 transition-all duration-300 ${
          isDragOver
            ? 'border-amber-500 bg-amber-100/60 scale-[1.01]'
            : 'border-amber-400 bg-white/95 hover:border-amber-500 hover:bg-amber-50/60'
        } shadow-xl backdrop-blur-sm`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleInputChange}
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-6">
            <Loader2 className="w-12 h-12 text-amber-600 animate-spin" />
            <div className="space-y-1">
              <p className="text-base font-black text-amber-950">جارٍ معالجة ورفع صفحات الكتاب...</p>
              <p className="text-xs text-amber-800 font-medium">يرجى الانتظار لحظات لتجهيز صفحات القارئ بأعلى دقة</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg border-2 border-amber-300 text-white group-hover:scale-105 transition-transform">
              <Upload className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <p className="text-lg font-black text-[#2B150A]">
                اسحب وأفلت ملف الـ PDF هنا، أو اضغط للاختيار من جهازك
              </p>
              <p className="text-xs text-[#7A4C27] font-semibold">
                يدعم كتب وملازم بصيغة PDF بأي عدد من الصفحات
              </p>
            </div>

            <button
              type="button"
              className="mt-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-[#24130A] font-black text-sm shadow-md transition-all border border-amber-300 inline-flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>اختر ملف الكتاب من جهازك</span>
            </button>
          </div>
        )}

        {/* Selected file preview */}
        {selectedFile && !isUploading && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs shadow-xs">
            <FileText className="w-4 h-4 text-amber-700" />
            <span className="font-bold">{selectedFile.name}</span>
            <span className="text-amber-700 font-semibold">({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-300 text-red-900 text-xs font-bold flex items-center justify-center gap-2 shadow-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Assurance Notes */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-right sm:text-center text-xs text-[#d8c2a8]">
        <div className="p-3 rounded-xl bg-[#200f07]/60 border border-amber-900/30">
          <p className="font-bold text-amber-300">✔ الحفاظ التام على المحتوى</p>
          <p className="text-[11px] text-amber-200/70">عرض صفحات الـ PDF الأصلية دون أي تعديل</p>
        </div>
        <div className="p-3 rounded-xl bg-[#200f07]/60 border border-amber-900/30">
          <p className="font-bold text-amber-300">✔ منع قص الهوامش</p>
          <p className="text-[11px] text-amber-200/70">الصفحة تظهر كاملة بأبعادها الدقيقة</p>
        </div>
        <div className="p-3 rounded-xl bg-[#200f07]/60 border border-amber-900/30">
          <p className="font-bold text-amber-300">✔ تقليب سلس وفوري</p>
          <p className="text-[11px] text-amber-200/70">تزامن دقيق بين رقم الصفحة ومحتواها</p>
        </div>
      </div>
    </div>
  );
};
