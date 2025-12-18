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
              const newHash = '#' + id
              setActive(newHash);
              // update URL hash without scrolling
              if (window && history && history.replaceState) {
                history.replaceState(null, '', newHash);
              }
            }
          });
        },
        { root: null, rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Shrink navbar on scroll and update progress bar
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setScrolled(y > 24);
      // progress bar
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      const bar = document.querySelector('.nav-progress > .bar');
      if (bar) bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on outside click or on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClick = (e) => {
      if (!open) return;
      const nav = document.querySelector('nav');
      if (nav && !nav.contains(e.target)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('click', onClick);
    };
  }, [open]);

  return (
    <nav className={`bg-white shadow-md fixed w-full z-50 ${scrolled ? 'nav-shrink' : ''}`} role="navigation" aria-label="Main navigation">
      <div className={`max-w-6xl mx-auto px-6 ${scrolled ? 'py-2' : 'py-4'} flex justify-between items-center`}> 
        <div className="text-2xl font-bold text-blue-600">Heart Analytics</div>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={`hover:text-blue-500 ${active === l.href ? 'text-indigo-600 font-semibold' : ''}`}>{l.label}</a>
            </li>
          ))}
          <li>
            <a href="/insight_report.html" target="_blank" rel="noreferrer" className="hover:text-blue-500">Report</a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

      </div>

      <div className="nav-progress" aria-hidden="true"><div className="bar" /></div>

      {/* Mobile menu panel (always in DOM for animation control) */}
      <div className={`md:hidden nav-backdrop ${open ? '' : ''}`}>
        <div className={`px-6 pt-4 pb-6 bg-white border-t mobile-menu ${open ? 'open' : 'closed'}`}>
          <ul className="flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block px-2 py-2 rounded hover:bg-gray-100 ${active === l.href ? 'text-indigo-600 font-semibold' : ''}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/insight_report.html" target="_blank" rel="noreferrer" className="block px-2 py-2 rounded hover:bg-gray-100">Report</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
