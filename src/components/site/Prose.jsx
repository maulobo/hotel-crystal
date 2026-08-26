export default function Prose({ children, className = "" }) {
  return (
    <div className={`max-w-[65ch] text-slate-600 ${className}`}>{children}</div>
  );
}
