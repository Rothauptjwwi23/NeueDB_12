Hallo Herr Scharle, wir wünschen eine angenehme Korrektur und Bewertung

#################################################################
 


#################################################################

CouchDB Software installieren: https://couchdb.apache.org/#download

Installation ausführen und (lokalen-) Benutzer anlegen. user:admin ; password:passwort1234 -> damit die Daten mit Schnittstelle übereinstimmen und abgerufen werden (siehe backend/core/db.js)
Sie sollten automatisch nach installation eigentlich auf die CouchDb-Anwendung zugreifen können, falls nicht -> http://localhost:5984/_utils/

In CouchDD zu "Databases" navigieren. Dann: "Create Database" und eine mit "users" für die Benutzer anlegen. Es wird ein Admin Account benötigt, der nicht über die Webanwendung erstellt werden kann. Anschließend "All documents" > "+" > "New Doc". Hinter/unter des "_id" Wertes dann folgendes einfügen: 

,"name": "Max Mustermann",
  "email": "max@mustermann.com",
  "role": "admin",
  "password": "admin1234",
  "type": "user"

Anschließend "Create Document"
Somit sollte die Syntax klar sein, falls Sie über CouchDB Users anlegen möchten. Für einen normalen user "user" statt "admin" bei "role".
Sie können über "Registrieren" sich beliebig viele Testuser anlegen, allerdings kein admin. 

Note: Sie können, wenn Sie Lust haben auch eine Email testweise anlegen, auf die Sie Zugriff haben, um die Bestätigungsmail, die nach Buchungen eintritt, zu erhalten.

Sie müssen außerdem eine neue Database namens "bookings" anlegen, aber in diese können Sie leer lassen. Diese werden durch das buchen von Events automatisch befüllt.

Zuletzt brauchen Sie eine Database namens "events". Sie können events manuell auch als admin über die "Events hinzufügen" Funktion erstellen, aber falls Sie lieber ein paar Einfügen möchten, wären hier folgende, die sie auch einfach hinter dem "_id" Wert einfügen können:

,
"title": "Python Programmierworkshop",
  "location": "Berlin",
  "date": "2025-09-30",
  "capacity": 80,
  "available_seats": 64,
  "tags": [
    "Workshop",
    "workshop",
    "Programmieren",
    "programming",
    "Python",
    "Coding"
  ],
  "type": "Workshop",
  "short_description": "Programmieren leicht gemacht! Lerne Python von Grund auf.",
  "long_description": "Dieser Workshop vermittelt dir die Grundlagen der Programmiersprache Python. Ideal für Einsteiger und alle, die ihre Coding-Skills verbessern möchten."


,
"title": "Boxfight",
  "location": "Dresden",
  "date": "2025-06-10",
  "capacity": 2000,
  "available_seats": 137,
  "tags": [
    "sport",
    "Sport",
    "boxen",
    "Boxen",
    "mma",
    "MMA"
  ],
  "type": "Sport",
  "short_description": "Schlag auf Schlag! Erlebe den ultimativen Kampf live!",
  "long_description": "Zwei Top-Athleten treten im Ring gegeneinander an. Harte Schläge, pure Spannung und eine elektrisierende Atmosphäre erwarten dich."


,
 "title": "Die Toten Hosen Live",
  "location": "Stuttgart",
  "date": "2025-10-09",
  "capacity": 1500,
  "available_seats": 1198,
  "tags": [
    "Musik",
    "musik",
    "Band",
    "band",
    "Konzert",
    "konzert"
  ],
  "type": "Konzert",
  "short_description": "Punkrock pur! Erlebe die Toten Hosen live und laut!",
  "long_description": "Die Toten Hosen rocken Stuttgart mit ihren größten Hits! Sei dabei und erlebe ein Konzert voller Energie und Leidenschaft."


,
  "title": "IT Security Workshop",
  "location": "Stuttgart",
  "date": "2025-09-20",
  "capacity": 100,
  "available_seats": 72,
  "tags": [
    "Weiterbildung",
    "weiterbildung",
    "IT",
    "Cybersecurity",
    "Workshop",
    "workshop"
  ],
  "type": "Weiterbildung",
  "short_description": "Hacker-Angriffe verstehen und abwehren! Lerne IT-Security von Profis.",
  "long_description": "In diesem Workshop bekommst du praktische Einblicke in Cybersicherheit und Schutzmaßnahmen gegen Hackerangriffe. Perfekt für IT-Interessierte und Profis!"


  ,
  "title": "Startup Meetup Frankfurt",
  "location": "Frankfurt",
  "date": "2025-11-15",
  "capacity": 300,
  "available_seats": 243,
  "tags": [
    "Networking",
    "networking",
    "Startups",
    "startups",
    "Business",
    "business"
  ],
  "type": "Networking",
  "short_description": "Die Zukunft beginnt hier! Netzwerke mit Startups und Investoren!",
  "long_description": "Treffe Gründer, Investoren und Innovatoren in einer inspirierenden Umgebung. Erhalte Einblicke in die neuesten Startup-Trends und Geschäftsmöglichkeiten."

  ###############################################################

VERSIONEN npm -v 10.9.2 node -v22.14.0

#################################################################

npm install durchführen mit -integrated Terminal für jeweils backend und frontend/my-app
Zum starten bitte: -integrated Terminal für jeweils server.js und frontend/my-app

Müssen zusätzlich installiert werden mit integrated Terminal bei server.js:

npm install dotenv 

npm install jsonwebtoken

#################################################################

BACKEND npm run start

FRONTEND npm run dev


Auf http://localhost:3000/ finden Sie unsere Lösung.


#################################################################

