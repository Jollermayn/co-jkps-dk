import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLogo } from "@/components/SiteLogo";
import { MenuIcon } from "@/components/MenuIcon";
import { useIsMobile } from "@/hooks/use-mobile";

const PDF_URL = "/JKPS_CV_NY.pdf";

function MobileHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="md:hidden no-print" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: "#F8F7F4", height: 72, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "flex-end", borderBottom: "1px solid rgba(10, 22, 40, 0.08)" }}>
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
          <SiteLogo color="#0A1628" />
        </div>
        <button type="button" aria-label="Åbn menu" onClick={() => setOpen(true)} style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", display: "inline-flex" }}>
          <MenuIcon />
        </button>
      </nav>
      {open && (
        <div className="md:hidden no-print" style={{ position: "fixed", inset: 0, zIndex: 200, backgroundColor: "#E0D9C8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          <button type="button" aria-label="Luk menu" onClick={() => setOpen(false)} style={{ position: "absolute", top: 16, right: 24, background: "transparent", border: "none", color: "#0A1628", fontSize: "2rem", lineHeight: 1, padding: 0, cursor: "pointer" }}>
            ×
          </button>
          <Link to="/" onClick={() => setOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: "#0A1628", textDecoration: "none" }}>Portfolio</Link>
          <Link to="/tilgang" onClick={() => setOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: "#0A1628", textDecoration: "none" }}>Tilgang</Link>
          <Link to="/cv" onClick={() => setOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: "#0A1628", textDecoration: "none" }}>CV</Link>
          <a href="/#kontakt" onClick={() => setOpen(false)} style={{ fontFamily: "serif", fontSize: "1.8rem", color: "#0A1628", textDecoration: "none" }}>Kontakt</a>
        </div>
      )}
    </>
  );
}

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "CV — Jonas K.P. Sørensen" },
      {
        name: "description",
        content:
          "CV for Jonas K.P. Sørensen — digital konsulent med fokus på UX, servicedesign og forretning.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CVPage,
});

function CVPage() {
  const isMobile = useIsMobile();
  const handlePrint = () => {
    window.open(PDF_URL, "_blank");
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
        e.stopPropagation();
        window.open(PDF_URL, "_blank");
      }
    };
    const onBeforePrint = () => {
      window.open(PDF_URL, "_blank");
      window.stop();
    };
    window.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("beforeprint", onBeforePrint);
    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("beforeprint", onBeforePrint);
    };
  }, []);

  return (
    <>
      <MobileHeader />
      <div style={{ backgroundColor: "#1a1a1a", minHeight: "100vh", paddingTop: isMobile ? 72 : 0 }}>
        <div
          className="no-print"
          style={{
            backgroundColor: "#0A1628",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 24px",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <Link to="/" style={{ color: "#F5F3EE", textDecoration: "none", fontSize: "0.9rem" }}>
            ← Tilbage
          </Link>
          <div style={{ display: "flex", gap: 10 }}>
            <a
              href={PDF_URL}
              download
              className="rounded-full bg-[#C0281E] px-5 py-2.5 text-sm font-semibold text-[#F4EFE6] shadow-lg hover:opacity-90 transition-opacity"
            >
              Download CV
            </a>
            {!isMobile && (
              <button
                type="button"
                onClick={handlePrint}
                className="rounded-full border border-[#F4EFE6]/40 px-5 py-2.5 text-sm font-semibold text-[#F4EFE6] hover:bg-[#F4EFE6]/10 transition-colors"
              >
                Print
              </button>
            )}
          </div>
        </div>
        {isMobile ? (
          <div
            style={{
              backgroundColor: "#0A1628",
              minHeight: "calc(100vh - 72px - 64px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              padding: "48px 24px",
              textAlign: "center",
            }}
          >
            <h1 style={{ fontFamily: "serif", color: "#F5F3EE", fontSize: "2rem", margin: 0 }}>
              CV — Jonas K.P. Sørensen
            </h1>
            <p style={{ color: "#F5F3EE", opacity: 0.75, fontSize: "1rem", maxWidth: 320, margin: 0 }}>
              PDF vises bedst i din browsers indbyggede PDF-viewer. Åbn eller download nedenfor.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 280 }}>
              <a
                href={PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#C0281E] px-5 py-3 text-base font-semibold text-[#F4EFE6] shadow-lg text-center"
              >
                Åbn CV (PDF)
              </a>
              <a
                href={PDF_URL}
                download
                className="rounded-full border border-[#F4EFE6]/40 px-5 py-3 text-base font-semibold text-[#F4EFE6] text-center"
              >
                Download CV
              </a>
            </div>
          </div>
        ) : (
          <iframe
            src={PDF_URL}
            title="CV — Jonas K.P. Sørensen"
            style={{ width: "100%", height: "100vh", border: "none", display: "block" }}
          />
        )}
      </div>
    </>
  );
}
