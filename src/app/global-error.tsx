"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#000", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ textAlign: "center", padding: 24 }}>
          <h1 style={{ fontWeight: 400, fontSize: 28, marginBottom: 12 }}>Algo deu errado.</h1>
          <button
            type="button"
            onClick={() => reset()}
            style={{ padding: "12px 24px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.3)", background: "transparent", color: "#fff", cursor: "pointer", fontSize: 16 }}
          >
            Tentar de novo
          </button>
        </main>
      </body>
    </html>
  );
}
