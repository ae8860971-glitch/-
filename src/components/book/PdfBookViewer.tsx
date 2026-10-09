import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Upload,
  Trash2,
  BookOpen,
  CheckCircle2,
  Loader2,
  Maximize,
  Columns
} from 'lucide-react';

// Configure the worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

interface PdfBookViewerProps {
  pdfData: ArrayBuffer | Uint8Array | string;
  bookTitle?: string;
  onDeleteBook?: () => void;
  onReplaceBook?: (file: File) => void;
}

export const PdfBookViewer: React.FC<PdfBookViewerProps> = ({
  pdfData,
  bookTitle = 'الكتاب المعتمد',
  onDeleteBook,
  onReplaceBook
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [zoomScale, setZoomScale] = useState<number>(1.35);
  // Default to 'width' so the page is large, prominent, and clearly readable immediately!
  const [fitMode, setFitMode] = useState<'width' | 'page' | 'custom'>('width');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [jumpPageInput, setJumpPageInput] = useState<string>('1');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Render task cancellation token
  const renderTaskRef = useRef<any>(null);

  // Load PDF Document
  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);
    setErrorMessage(null);

    const loadDoc = async () => {
      try {
        let loadingTask;
        if (typeof pdfData === 'string') {
          loadingTask = pdfjsLib.getDocument({ url: pdfData });
        } else {
          const typedData = pdfData instanceof Uint8Array ? pdfData : new Uint8Array(pdfData);
          loadingTask = pdfjsLib.getDocument({ data: typedData });
        }

        const loadedPdf = await loadingTask.promise;
        if (isCancelled) return;

        setPdfDoc(loadedPdf);
        setTotalPages(loadedPdf.numPages);
        setCurrentPage(1);
        setJumpPageInput('1');
        setIsLoading(false);
      } catch (err: any) {
        console.error('Failed to load PDF document:', err);
        if (!isCancelled) {
          setErrorMessage('تعذر قراءة ملف الـ PDF. يرجى التأكد من صلاحية الملف أو إعادة رفعه.');
          setIsLoading(false);
        }
      }
    };

    loadDoc();

    return () => {
      isCancelled = true;
    };
  }, [pdfData]);

  // Render single page onto canvas with high resolution
  const renderCurrentPage = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current || !containerRef.current) return;

    try {
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // silent
        }
      }

      setIsRendering(true);
      const page = await pdfDoc.getPage(currentPage);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!ctx || !canvas) return;

      const container = containerRef.current;
      const containerWidth = container.clientWidth || 900;
      const containerHeight = container.clientHeight || 750;

      // Base unscaled viewport
      const unscaledViewport = page.getViewport({ scale: 1 });

      let calculatedScale = zoomScale;
      if (fitMode === 'width') {
        // Generous width fitting: page fills the readable width with comfortable margins
        const targetWidth = Math.min(containerWidth - 48, 1100);
        calculatedScale = Math.max(targetWidth / unscaledViewport.width, 1.15);
      } else if (fitMode === 'page') {
        // Fit entire page in view
        const scaleX = (containerWidth - 48) / unscaledViewport.width;
        const scaleY = (containerHeight - 48) / unscaledViewport.height;
        calculatedScale = Math.min(scaleX, scaleY);
      }

      // Ensure ultra-crisp render on high DPI and retina displays
      const dpr = Math.max(window.devicePixelRatio || 1, 2.5);
      const viewport = page.getViewport({ scale: calculatedScale * dpr });

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = `${viewport.width / dpr}px`;
      canvas.style.height = `${viewport.height / dpr}px`;

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      const task = page.render(renderContext);
      renderTaskRef.current = task;
      await task.promise;
      setIsRendering(false);
    } catch (err: any) {
      if (err?.name !== 'RenderingCancelledException') {
        console.warn('PDF page render error:', err);
      }
      setIsRendering(false);
    }
  }, [pdfDoc, currentPage, zoomScale, fitMode]);

  useEffect(() => {
    renderCurrentPage();
  }, [renderCurrentPage]);

  // Sync jump input
  useEffect(() => {
    setJumpPageInput(currentPage.toString());
  }, [currentPage]);

  // Window resize re-render for fit
  useEffect(() => {
    const handleResize = () => {
      if (fitMode === 'width' || fitMode === 'page') {
        renderCurrentPage();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fitMode, renderCurrentPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      // Scroll container to top smoothly on page change
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleZoomIn = () => {
    setFitMode('custom');
    setZoomScale((prev) => Math.min(prev + 0.25, 3.0));
  };

  const handleZoomOut = () => {
    setFitMode('custom');
    setZoomScale((prev) => Math.max(prev - 0.25, 0.75));
  };

  const handleFitToWidth = () => {
    setFitMode('width');
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFitToPage = () => {
    setFitMode('page');
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setJumpPageInput(currentPage.toString());
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onReplaceBook) {
      onReplaceBook(file);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FCFBF8] text-[#2C160B] select-none rounded-2xl overflow-hidden shadow-xl border-2 border-amber-300">
      
      {/* Top Toolbar - Luminous Warm Ivory Styling */}
      <div className="px-4 py-3 bg-[#FFFDF9] border-b border-amber-200 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm shadow-xs">
        
        {/* Book Title & Page Count */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="font-black text-[#2C160B] truncate max-w-[180px] sm:max-w-xs font-arabic">
            {bookTitle}
          </span>
          {totalPages > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[11px] font-bold text-amber-900 shrink-0">
              {totalPages} صفحة
            </span>
          )}
        </div>

        {/* Center Page Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1 || isLoading}
            className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 disabled:opacity-30 text-amber-950 font-bold border border-amber-300 transition-all flex items-center gap-1 cursor-pointer shadow-xs active:scale-95"
            title="الصفحة السابقة"
          >
            <ChevronRight className="w-4 h-4 text-amber-800" />
            <span className="hidden sm:inline text-xs font-arabic">السابق</span>
          </button>

          <form onSubmit={handleJumpSubmit} className="flex items-center gap-1.5 font-arabic">
            <span className="text-amber-900 text-xs font-bold">صفحة</span>
            <input
              type="text"
              value={jumpPageInput}
              onChange={(e) => setJumpPageInput(e.target.value)}
              className="w-13 text-center py-1 rounded-xl bg-white border border-amber-300 text-[#2C160B] font-black text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none shadow-xs"
            />
            <span className="text-amber-800 text-xs font-semibold">من {totalPages || '...'}</span>
          </form>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages || isLoading}
            className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 disabled:opacity-30 text-amber-950 font-bold border border-amber-300 transition-all flex items-center gap-1 cursor-pointer shadow-xs active:scale-95"
            title="الصفحة التالية"
          >
            <span className="hidden sm:inline text-xs font-arabic">التالي</span>
            <ChevronLeft className="w-4 h-4 text-amber-800" />
          </button>
        </div>

        {/* Right Controls: Large View, Zoom In/Out, Fit Page, Fullscreen */}
        <div className="flex items-center gap-1.5 flex-wrap">
          
          {/* Fit Width (Large Clear Size) - Highlighted Mode */}
          <button
            onClick={handleFitToWidth}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-arabic border transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              fitMode === 'width'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-[#24130A] border-amber-400 font-black shadow-amber-500/20'
                : 'bg-amber-50 text-amber-950 border-amber-300 hover:bg-amber-100'
            }`}
            title="عرض الصفحة بحجم كبير وواضح ومقروء"
          >
            <Maximize className="w-3.5 h-3.5" />
            <span>عرض كبير وواضح</span>
          </button>

          {/* Fit Full Page */}
          <button
            onClick={handleFitToPage}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold font-arabic border transition-all flex items-center gap-1 cursor-pointer shadow-xs ${
              fitMode === 'page'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-[#24130A] border-amber-400 font-black shadow-amber-500/20'
                : 'bg-amber-50 text-amber-950 border-amber-300 hover:bg-amber-100'
            }`}
            title="ملاءمة الصفحة كاملة"
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden md:inline">الصفحة كاملة</span>
          </button>

          {/* Zoom Buttons */}
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 transition-colors cursor-pointer shadow-xs"
            title="تكبير (Zoom In)"
          >
            <ZoomIn className="w-4 h-4 text-amber-800" />
          </button>

          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 transition-colors cursor-pointer shadow-xs"
            title="تصغير (Zoom Out)"
          >
            <ZoomOut className="w-4 h-4 text-amber-800" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 transition-colors hidden sm:inline-flex cursor-pointer shadow-xs"
            title="ملء الشاشة"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Re-upload Book */}
          {onReplaceBook && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-colors flex items-center gap-1 text-xs font-bold font-arabic cursor-pointer shadow-xs"
                title="استبدال أو رفع كتاب آخر (PDF)"
              >
                <Upload className="w-3.5 h-3.5 text-amber-800" />
                <span className="hidden md:inline">رفع كتاب آخر</span>
              </button>
            </>
          )}

          {/* Delete Book */}
          {onDeleteBook && (
            <button
              onClick={onDeleteBook}
              className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-800 border border-red-300 transition-colors cursor-pointer shadow-xs"
              title="حذف هذا الكتاب"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

        </div>
      </div>

      {/* Main Canvas Viewport Area - Comfortable Reading Parchment Desk */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-[#F5EFE6] flex items-center justify-center p-4 sm:p-8 relative select-none scrollbar-thin scrollbar-thumb-amber-300"
        style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, rgba(217, 119, 6, 0.08) 1.5px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      >
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-amber-900 space-y-3 font-arabic">
            <Loader2 className="w-10 h-10 animate-spin text-amber-600" />
            <p className="text-sm font-black">جارٍ معالجة صفحات الكتاب بدقة عالية ووضوح فائق...</p>
          </div>
        )}

        {errorMessage && (
          <div className="max-w-md p-6 bg-red-50 border-2 border-red-300 text-red-900 rounded-2xl text-center space-y-3 font-arabic shadow-md">
            <p className="font-bold">{errorMessage}</p>
            {onReplaceBook && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#24130A] rounded-xl text-xs font-black shadow-sm"
              >
                اختر ملف PDF آخر
              </button>
            )}
          </div>
        )}

        {/* The PDF Page Canvas - Prominent, Large, Elevated with Crisp White Page */}
        <div
          className={`relative transition-all duration-200 my-auto ${
            isLoading || errorMessage ? 'hidden' : 'flex items-center justify-center'
          }`}
        >
          <canvas
            ref={canvasRef}
            className="rounded-xl shadow-[0_20px_50px_rgba(42,22,11,0.22)] border-2 border-amber-300/80 bg-white"
          />

          {isRendering && (
            <div className="absolute inset-0 bg-white/30 flex items-center justify-center backdrop-blur-[1px] rounded-xl">
              <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Progress Bar & Navigation Advice */}
      <div className="px-4 py-2.5 bg-[#FFFDF9] border-t border-amber-200 flex items-center justify-between text-xs text-[#5C381E] font-arabic shadow-inner">
        <div className="flex items-center gap-2 font-bold">
          <span>الصفحة الحالية: {currentPage} من {totalPages}</span>
        </div>
        <div className="w-1/3 bg-amber-100 h-2 rounded-full overflow-hidden border border-amber-300">
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${totalPages > 0 ? (currentPage / totalPages) * 100 : 0}%` }}
          />
        </div>
        <div className="text-[11px] text-amber-800 font-semibold hidden sm:block">
          يمكنك استخدام الأسهم ◄ ► في لوحة المفاتيح للتنقل السريع
        </div>
      </div>

    </div>
  );
};
