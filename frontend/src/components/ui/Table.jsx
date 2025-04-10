// src/components/ui/Table.jsx
export function Table({ children, className = "" }) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="min-w-full text-sm text-left">{children}</table>
    </div>
  );
}

export function TableHeader({ children }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr className="border-b">{children}</tr>;
}

export function TableHead({ children }) {
  return <th className="px-4 py-2 font-semibold text-gray-600">{children}</th>;
}

export function TableCell({ children }) {
  return <td className="px-4 py-2">{children}</td>;
}
