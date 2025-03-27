export default function Datenschutz() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-3xl bg-card-bg rounded-lg shadow-xl p-6 sm:p-8 border border-gray-700/30">
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-white">
            Datenschutzerklärung
          </h1>
        </div>
        
        <div className="space-y-4 text-gray-300">
          <p className="mb-4">
            Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Diese Datenschutzerklärung informiert Sie über die Erhebung, Verarbeitung und Nutzung Ihrer Daten gemäß der Datenschutz-Grundverordnung (DSGVO).
          </p>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-primary">1. Verantwortliche Stelle</h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <div className="pl-4 mt-2 border-l-2 border-primary/30">
              <p>EventBooker GmbH</p>
              <p>Musterstraße 1</p>
              <p>12345 Musterstadt</p>
              <p>E-Mail: datenschutz@eventbooker.de</p>
            </div>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-primary">2. Erhebung und Speicherung personenbezogener Daten</h2>
            <p>
              Bei der Nutzung unserer Plattform erheben wir folgende personenbezogene Daten:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Name und E-Mail-Adresse bei der Registrierung</li>
              <li>Buchungshistorie und Zahlungsinformationen</li>
              <li>Nutzungsdaten wie IP-Adresse und Browserinformationen</li>
              <li>Optional: Profilbild und Telefonnummer</li>
            </ul>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-primary">3. Zweck der Datenverarbeitung</h2>
            <p>
              Wir verarbeiten Ihre Daten für folgende Zwecke:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Bereitstellung unserer Plattform und Dienste</li>
              <li>Abwicklung von Buchungen und Zahlungen</li>
              <li>Kommunikation bezüglich Ihrer Buchungen und Veranstaltungen</li>
              <li>Verbesserung unserer Dienste und Website</li>
            </ul>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-primary">4. Weitergabe von Daten</h2>
            <p>
              Eine Weitergabe Ihrer personenbezogenen Daten erfolgt nur:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>An Veranstalter, soweit für die Durchführung der Buchung erforderlich</li>
              <li>An Zahlungsdienstleister zur Abwicklung von Zahlungen</li>
              <li>Bei gesetzlicher Verpflichtung oder behördlicher Anordnung</li>
            </ul>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-primary">5. Cookies und Analyse-Tools</h2>
            <p>
              Wir verwenden Cookies, um Ihnen die bestmögliche Nutzererfahrung zu bieten. Diese können in Ihren Browsereinstellungen deaktiviert werden. Zudem nutzen wir Analyse-Tools zur anonymisierten Auswertung des Nutzerverhaltens.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-primary">6. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Auskunft über Ihre gespeicherten Daten</li>
              <li>Berichtigung unrichtiger Daten</li>
              <li>Löschung Ihrer Daten</li>
              <li>Einschränkung der Datenverarbeitung</li>
              <li>Datenübertragbarkeit</li>
              <li>Widerruf erteilter Einwilligungen</li>
            </ul>
          </section>
          
          <p className="text-sm text-gray-400 mt-8 text-center">
            Stand: März 2025 | Diese Datenschutzerklärung wird regelmäßig aktualisiert.
          </p>
        </div>
      </div>
    </div>
  );
}
