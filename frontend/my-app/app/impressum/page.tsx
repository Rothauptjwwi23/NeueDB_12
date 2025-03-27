export default function Impressum() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl bg-card-bg rounded-lg shadow-xl p-6 sm:p-8 border border-gray-700/30">
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-white">
            Impressum
          </h1>
        </div>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-primary">Angaben gemäß § 5 TMG</h2>
            <div className="bg-background/30 rounded-lg p-4 border border-gray-700/20">
              <p className="font-medium mb-1">EventBooker GmbH</p>
              <p>Musterstraße 1</p>
              <p>12345 Musterstadt</p>
              <p>Deutschland</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-primary">Kontakt</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-background/30 rounded-lg p-4 border border-gray-700/20">
                <p className="font-medium mb-1">Telefon:</p>
                <p>+49 (0) 123 456789</p>
              </div>
              <div className="bg-background/30 rounded-lg p-4 border border-gray-700/20">
                <p className="font-medium mb-1">E-Mail:</p>
                <p>info@eventbooker.de</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-primary">Vertreten durch</h2>
            <div className="bg-background/30 rounded-lg p-4 border border-gray-700/20">
              <p>Max Mustermann, Geschäftsführer</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-primary">Handelsregister</h2>
            <div className="bg-background/30 rounded-lg p-4 border border-gray-700/20">
              <p>Registergericht: Amtsgericht Musterstadt</p>
              <p>Registernummer: HRB 12345</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-primary">Umsatzsteuer-ID</h2>
            <div className="bg-background/30 rounded-lg p-4 border border-gray-700/20">
              <p>Umsatzsteuer-Identifikationsnummer gemäß §27a UStG:</p>
              <p>DE 123456789</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-primary">Aufsichtsbehörde</h2>
            <div className="bg-background/30 rounded-lg p-4 border border-gray-700/20">
              <p>Zuständige Aufsichtsbehörde:</p>
              <p>Stadt Musterstadt</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-primary">Streitschlichtung</h2>
            <p className="text-sm text-gray-400">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary ml-1 hover:underline">
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
          </section>
          
          <p className="text-sm text-gray-400 mt-8 text-center">
            Stand: März 2025
          </p>
        </div>
      </div>
    </div>
  );
}
