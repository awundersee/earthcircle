# EarthCircle
Mein erstes GIT-Repository für den Kurs: IPWA01-01 – Programmierung von Webanwendungsoberflächen

## Inhaltsverzeichnis
- [Grundgedanken](#grundgedanken)
- [Aufbau](#aufbau)
- [Aufgabenstellung](#aufgabenstellung)

## Grundgedanken
Ich hab den Kurs genutzt, um meine bisherige Berufserfahrung zu erweitern und GIT zu verstehen und zu testen. Die eingesetzen Frameworks und Schriften sind für den Projektumfang überdimensioniert bzw. hätten auf relevante Bereiche reduziert werden können. Ich hab mich dafür entschieden Schriften, Icons und verschiedene Frameworks zu nutzen, damit das Projekt praxisnah aufgebaut und strukturiert ist.

- React (JS)
- Babel (JS)
- Bootstrap (CSS + JS)
- Montserrat (Schriftdateien + CSS)
- Phosphor (Schriftdateien + CSS)

## Aufbau

Es ist alles lokal integriert, damit das Projekt dsgvo-konform ist. Es werden also weder Schriften noch Frameworks von externen Servern geladen.

Die Tabelle mit den Emissionsdaten wird über React geladen und aktualisiert. Statische Elemente, wie beispielsweise das Menü oder auch das Input-Feld für die Suche, sind direkt in der HTML-Datei. Die Emissionsdaten werden über eine JSON-Datei integriert, so dass simuliert wird, dass die Seite externe Datensätze verarbeitet.

Relevante eigene Dateien:

```text
main/
|- index.html
|- css/
|  |- style.css
|- js/
|  |- script.js
|- img

## Aufgabenstellung

In einem interdisziplinären Team entwickelst Du professionelle Webseiten für eine große Non-Profit- Organisation, die sich mit dem Klimawandel beschäftigt. Um mehr Transparenz darüber zu schaffen, welche Unternehmen und Länder wie viel CO2 jährlich emittieren, soll eine öffentlich zugängliche Webseite ins Leben gerufen werden. Deine Aufgabe ist es, diese Seite zu entwerfen und umzusetzen.

a) Richte ein öffentliches Code-Repository für Deine Webseite ein, z. B. in GitHub.

b) Entwickle unter Zuhilfenahme moderner CSS- und/oder JavaScript-Frameworks eine Webanwendung, welche unter Berücksichtigung der oben beschriebenen Fallstudie die folgenden Anforderungen erfüllt:

- Die Webseite besitzt einen Titel und ein Logo.
- Die Webseite verfügt über einen Header mit einer globalen Navigation, einen Content-Bereich und einen Footer mit rechtlichen Hinweisen.
- Die Webseite besitzt ein Menü mit lokalen Links, das je nach Schriftkultur der Besuchenden rechts oder links dargestellt wird.
- Die Seite soll responsiv sein, sodass sie nicht nur mit einem breiten Desktop-Monitor, sondern auch auf Tablets oder Smartphones gut lesbar dargestellt wird.
- Die Seite soll eine Tabelle mit (fiktiven) CO2-Emissionsdaten enthalten, die nach Land und Unternehmen sortiert und gefiltert werden kann.
- Alle Eingabefelder müssen so abgesichert sein, dass kein injizierter Code ausgeführt werden kann.

c) Dokumentiere Dein Ergebnis schriftlich und lege den Code, falls nicht bereits im Schritt 2 geschehen, im Code-Repository ab.