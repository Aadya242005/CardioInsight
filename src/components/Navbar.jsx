import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#about");
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: "#about", label: "About" },
    { href: "#results", label: "Results" },
    { href: "#visuals", label: "Visuals" },
    { href: "#analysis", label: "Analysis" },
    { href: "#consult", label: "Consult" },
  ];

  /* Track active section */
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observers = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const newHash = "#" + id;
              setActive(newHash);
              history.replaceState(null, "", newHash);
            }
          });
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* Shrink navbar on scroll */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on Escape / outside click */
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onClick = (e) => {
      if (!open) return;
      const nav = document.querySelector("nav");
      if (nav && !nav.contains(e.target)) setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white shadow-md ${
        scrolled ? "nav-shrink" : ""
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className={`max-w-6xl mx-auto px-6 flex justify-between items-center ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="text-2xl font-bold text-blue-600">
          Heart Analytics
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`hover:text-blue-500 ${
                  active === l.href
                    ? "text-indigo-600 font-semibold"
                    : ""
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/insight_report.html"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500"
            >
              Report
            </a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <ul className="flex flex-col gap-2 px-6 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block px-2 py-2 rounded hover:bg-gray-100 ${
                    active === l.href
                      ? "text-indigo-600 font-semibold"
                      : ""
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/insight_report.html"
                target="_blank"
                rel="noreferrer"
                className="block px-2 py-2 rounded hover:bg-gray-100"
              >
                Report
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
