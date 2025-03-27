import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      {/* Content-Footer separator */}
      <div className="footer-separator"></div>
      
      {/* Main footer content */}
      <div className="footer-main">
        {/* Legal section */}
        <div className="footer-section">
          <h4 className="text-lg font-semibold mb-4">Rechtliches</h4>
          <ul className="footer-links">
            <li>
              <Link href="/impressum" className="hover:text-primary">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/agb" className="hover:text-primary">
                AGB
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="hover:text-primary">
                Datenschutz
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Contact section */}
        <div className="footer-section">
          <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
          <p className="mb-2">Haben Sie Fragen?</p>
          <Link href="/kontakt" className="text-primary hover:text-secondary">
            Kontaktieren Sie uns!
          </Link>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="footer-copyright py-4 border-t border-gray-800 mt-8">
        © {new Date().getFullYear()} EventBooker - Alle Rechte vorbehalten
      </div>
    </footer>
  );
}