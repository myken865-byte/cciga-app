"use client";

export default function PrintBadgeButton() {
  return (
    <button onClick={() => window.print()} className="btn-primary print:hidden">
      Imprimer / Exporter en PDF
    </button>
  );
}
