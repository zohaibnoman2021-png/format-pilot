"use client";

export default function QuickActions({
  onBeautify = () => {},
  onMinify = () => {},
  onCopy = () => {},
  onDownload = () => {},
  className = "",
}) {
  // Base style that force-overrides any global styles
  const base =
    "appearance-none select-none inline-flex items-center justify-center " +
    "!px-4 !py-2 !rounded-md !text-sm !font-medium " +
    "shadow-sm transition-transform hover:-translate-y-0.5 " +
    "focus:!outline-none focus:!ring-2";

  const btnBeautify = `${base} !bg-indigo-600 !text-white hover:!bg-indigo-700 focus:!ring-indigo-500`;
  const btnMinify   = `${base} !bg-slate-600  !text-white hover:!bg-slate-700  focus:!ring-slate-500`;
  const btnCopy     = `${base} !bg-emerald-600 !text-white hover:!bg-emerald-700 focus:!ring-emerald-500`;
  const btnDownload = `${base} !bg-slate-700  !text-white hover:!bg-slate-800  focus:!ring-slate-600`;

  return (
      <div className={`flex flex-wrap justify-center items-center gap-4 mb-6 text-center ${className}`}>
      <button type="button" onClick={onBeautify} className={btnBeautify}>
        Beautify
      </button>

      <button type="button" onClick={onMinify} className={btnMinify}>
        Minify
      </button>

      <button type="button" onClick={onCopy} className={btnCopy}>
        Copy
      </button>

      <button type="button" onClick={onDownload} className={btnDownload}>
        Download
      </button>
    </div>
  );
}
