// Beispiel-Datenbank (Array als Speicher)
const dataStore = [
    { id: 1, name: "Produkt A", value: 120 },
    { id: 2, name: "Produkt B", value: 250 },
    { id: 3, name: "Produkt C", value: 75 }
];

// Funktion zum Abrufen aller gespeicherten Daten
export const getData = () => {
    return dataStore;
};

// Funktion zum Hinzufügen eines neuen Eintrags
export const addData = (entry) => {
    dataStore.push(entry);
};
