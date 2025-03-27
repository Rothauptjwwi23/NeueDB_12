export default function AGB() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-3xl bg-card-bg rounded-lg shadow-xl p-6 sm:p-8 border border-gray-700/30">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>
        
        <div className="space-y-4 text-gray-300">
          <p className="mb-4">
            Willkommen bei EventBooker! Diese Allgemeinen Geschäftsbedingungen regeln die Nutzung unserer Plattform und die Buchung von Veranstaltungen.
          </p>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-primary">1. Geltungsbereich</h2>
            <p>
              Diese AGB gelten für sämtliche Rechtsgeschäfte zwischen der EventBooker GmbH (nachfolgend "Anbieter") und den Nutzern der Plattform (nachfolgend "Nutzer"). Abweichende Bedingungen des Nutzers werden nicht anerkannt, es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-primary">2. Vertragsgegenstand</h2>
            <p>
              Der Anbieter betreibt eine Online-Plattform zur Vermittlung und Buchung von Veranstaltungen verschiedener Art. Der Anbieter tritt dabei als Vermittler zwischen Veranstaltern und Nutzern auf.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-primary">3. Registrierung und Nutzerkonto</h2>
            <p>
              Die Nutzung der Buchungsfunktionen erfordert eine Registrierung. Der Nutzer verpflichtet sich, wahrheitsgemäße und vollständige Angaben zu machen und diese aktuell zu halten. Die Zugangsdaten sind sicher aufzubewahren und dürfen nicht an Dritte weitergegeben werden.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-primary">4. Buchung und Vertragsschluss</h2>
            <p>
              Mit Abschluss des Buchungsvorgangs gibt der Nutzer ein verbindliches Angebot zum Erwerb der Teilnahmeberechtigung ab. Der Vertrag kommt mit Bestätigung durch den Anbieter zustande, die per E-Mail erfolgt.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-primary">5. Zahlungsbedingungen</h2>
            <p>
              Die Zahlung erfolgt über die auf der Plattform angebotenen Zahlungsmethoden. Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-primary">6. Stornierung und Rückerstattung</h2>
            <p>
              Stornierungsbedingungen können je nach Veranstaltung variieren und werden bei der Buchung angezeigt. Bei Absage einer Veranstaltung durch den Veranstalter erhält der Nutzer den vollen Buchungsbetrag zurück.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-primary">7. Haftung</h2>
            <p>
              Der Anbieter haftet nur für Schäden, die auf vorsätzlichem oder grob fahrlässigem Verhalten beruhen. Die Haftung für die Durchführung der Veranstaltungen liegt beim jeweiligen Veranstalter.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-primary">8. Schlussbestimmungen</h2>
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
            </p>
          </section>
          
          <p className="text-sm text-gray-400 mt-8 text-center">
            Stand: März 2025 | EventBooker GmbH
          </p>
        </div>
      </div>
    </div>
  );
}