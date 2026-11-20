# Anforderungsliste – Online-Terminbuchung (Friseursalon Schnittpunkt)

**Auftraggeberin:** Sabine Kowalski (Inhaberin, Friseurmeisterin)  
**Grundlage:** Gesprächsprotokoll mit der Inhaberin sowie Pflichtumfang des Projektauftrags  

## Legende
* **ID-Kategorien:**
  * `F-xx`: Funktionale Anforderung
  * `R-xx`: Geschäftsregel / Buchungslogik
  * `D-xx`: Daten- & Stammdatenanforderung
  * `N-xx`: Nicht-funktionale Anforderung (Sicherheit, Datenschutz, Technik)
  * `W-xx`: Wunsch / Bonusfunktion
* **Prioritäten:**
  * **Muss**: Pflichtumfang für die Abgabe
  * **Kann**: Optionale Erweiterung (Bonus)

---

## 1. Funktionale Anforderungen (`F`)

| ID | Anforderung | Bezug im Protokoll / Auftrag | Priorität |
| :--- | :--- | :--- | :--- |
| **F-01** | Kundinnen und Kunden können online selbstständig Termine buchen, ohne ein Benutzerkonto oder Passwort anlegen zu müssen. | *„Meine Kundschaft soll im Internet selbst einen Termin buchen können“*; *„Ein Konto mit Passwort will keiner, das schreckt ab.“* | Muss |
| **F-02** | Bei der Buchung wählen Kundinnen und Kunden eine Leistung, eine gewünschte Mitarbeiterin / einen gewünschten Mitarbeiter oder die Option „egal“, ein Datum sowie eine verfügbare Uhrzeit. | *„viele wollen zu Mara oder zu Jonas. Wer keinen Wunsch hat, soll ‚egal‘ wählen können“*; Pflichtumfang Frontend | Muss |
| **F-03** | Wird die Option „egal“ gewählt, weist das System automatisch eine verfügbare Person zu, die die gewählte Leistung ausführen darf. | *„dann nimmt die Anwendung jemanden, der frei ist“*; *„Wer welche Leistung macht, muss die Anwendung wissen“* | Muss |
| **F-04** | Bei der Buchung werden Name, Telefonnummer und E-Mail-Adresse der Kundin bzw. des Kunden erfasst. | *„Name, Telefonnummer und E-Mail.“* | Muss |
| **F-05** | Wiederkehrende Kundinnen und Kunden werden wiedererkannt, sodass ihre Kontaktdaten gespeichert bleiben und nicht bei jedem Besuch komplett neu gepflegt werden müssen. | *„Wer schon mal da war, soll nicht alles neu tippen müssen, die Daten dürfen also gespeichert bleiben.“* | Muss |
| **F-06** | Nach erfolgreicher Buchung erhalten Kundinnen und Kunden eine Bestätigung inklusive eines eindeutigen, schwer erratbaren Stornocodes. | Pflichtumfang Frontend: *„Bestätigung mit Stornocode“*; Tipps (`crypto.randomUUID()`) | Muss |
| **F-07** | Kundinnen und Kunden können ihren eigenen Termin ohne Login über eine Stornierungsseite mithilfe ihres Stornocodes stornieren (unter Einhaltung der Stornofrist). | *„Bis 24 Stunden vorher darf die Kundschaft selbst stornieren… Ohne Login, aber so, dass nicht jeder fremde Termine löschen kann.“* | Muss |
| **F-08** | Der Salon (die Inhaberin / das Team) kann im geschützten Bereich jeden Termin jederzeit stornieren – auch kurzfristiger als 24 Stunden vor Terminbeginn. | *„Ich selbst muss jeden Termin jederzeit stornieren können.“* | Muss |
| **F-09** | Stornierte Termine werden nicht aus der Datenbank gelöscht, sondern bleiben mit dem Status „storniert“ erhalten. | *„Die Termine will ich nicht löschen, ich möchte später noch sehen, was storniert wurde.“* | Muss |
| **F-10** | Im Salon-Bereich kann ein Termin als erledigt markiert („abgehakt“) werden, wenn die Kundin bzw. der Kunde erschienen ist. | *„Und wenn jemand da war, hake ich das ab.“* | Muss |
| **F-11** | Der Salon-Bereich zeigt eine Tagesübersicht (Uhrzeit, Leistung, Name und Telefonnummer der Kundschaft), strukturiert mit einer Spalte pro Mitarbeitendem, und ermöglicht das Blättern durch die Tage. | *„Ein Tag auf einen Blick: wer kommt wann, zu wem, wofür, mit Telefonnummer. Am liebsten pro Mitarbeiter eine Spalte. Und ich will durch die Tage blättern können.“* | Muss |
| **F-12** | Im Salon-Bereich können neue Leistungen angelegt und Preise bestehender Leistungen angepasst werden. | *„Preise ändern sich mal, das möchte ich selbst anpassen können, ohne dass ich Sie anrufen muss. Auch neue Leistungen will ich selbst eintragen.“* | Muss |

---

## 2. Geschäftsregeln & Buchungslogik (`R`)

| ID | Anforderung | Bezug im Protokoll / Auftrag | Priorität |
| :--- | :--- | :--- | :--- |
| **R-01** | Eine Person darf zur selben Zeit höchstens einen Termin haben. Doppelbuchungen (inklusive zeitgleicher Buchungsanfragen) müssen zuverlässig ausgeschlossen werden. | *„Letzte Woche habe ich denselben Termin zweimal vergeben… Das darf nie wieder passieren.“*; *„Mir ist wichtig, dass jede Person nur einen Termin gleichzeitig hat.“* | Muss |
| **R-02** | Die Dauer der ausgewählten Leistung bestimmt die belegte Zeitspanne des Termins (`Startzeit` bis `Startzeit + Dauer`). | Leistungsliste mit Minutenangaben (*15, 20, 30, 45, 90 Minuten*); Tipps (`DATETIME` Beginn und Ende) | Muss |
| **R-03** | Buchbare Startzeiten liegen ausschließlich im 15-Minuten-Takt (`:00`, `:15`, `:30`, `:45`). | *„Gebucht wird im Viertelstundentakt, also 9:00, 9:15, 9:30 und so weiter.“* | Muss |
| **R-04** | Ein Termin muss vollständig innerhalb der Öffnungszeiten liegen:<br>• **Di–Fr:** 09:00 bis 18:00 Uhr<br>• **Sa:** 09:00 bis 14:00 Uhr<br>• **Mo & So:** geschlossen | *„Dienstag bis Freitag von 9 bis 18 Uhr, samstags von 9 bis 14 Uhr. Sonntag und Montag ist zu. Ein Termin muss komplett in die Öffnungszeit passen. Wenn jemand um 17:45 Uhr eine Färbung buchen will, geht das nicht.“* | Muss |
| **R-05** | Für eine Leistung sind nur Mitarbeitende wählbar bzw. per „egal“ zuweisbar, die diese Leistung anbieten:<br>• **Sabine & Mara:** alle Leistungen (inkl. Damenschnitt & Färben)<br>• **Jonas:** Herrenschnitt, Kinderschnitt, Bartpflege, Waschen und Föhnen | *„Mara und ich färben, Jonas nicht, der macht Herren, Kinder und Bart, und Waschen und Föhnen kann er auch. Alles andere können Mara und ich. Wer welche Leistung macht, muss die Anwendung wissen, sonst bucht jemand Färben bei Jonas.“* | Muss |
| **R-06** | Termine in der Vergangenheit können nicht gebucht werden. | *„Nichts in der Vergangenheit natürlich.“* | Muss |
| **R-07** | Eine Online-Buchung muss mindestens **2 Stunden vor Terminbeginn** erfolgen. | *„Und kurzfristig bitte nicht: mindestens zwei Stunden vorher, danach nur telefonisch.“* | Muss |
| **R-08** | Termine können maximal **3 Monate im Voraus** gebucht werden. | *„Und nicht ewig weit voraus, drei Monate reichen.“* | Muss |
| **R-09** | Kundinnen und Kunden können nur bis mindestens **24 Stunden vor Terminbeginn** selbst stornieren; danach ist eine Stornierung nur durch den Salon möglich. | *„Bis 24 Stunden vorher darf die Kundschaft selbst stornieren, danach nur über mich.“* | Muss |

---

## 3. Daten- & Stammdatenanforderungen (`D`)

| ID | Anforderung | Bezug im Protokoll / Auftrag | Priorität |
| :--- | :--- | :--- | :--- |
| **D-01** | Die initialen Leistungen sind mit Name, Dauer und Preis in der Datenbank hinterlegt:<br>• Herrenschnitt (30 Min, 28 €)<br>• Damenschnitt (45 Min, 42 €)<br>• Waschen und Föhnen (30 Min, 22 €)<br>• Kinderschnitt (20 Min, 16 €)<br>• Bartpflege (15 Min, 12 €)<br>• Färben (90 Min, 75 €) | *„Herrenschnitt, 30 Minuten, 28 Euro. Damenschnitt, 45 Minuten, 42 Euro. Waschen und Föhnen, 30 Minuten, 22 Euro. Kinderschnitt, 20 Minuten, 16 Euro. Bartpflege, 15 Minuten, 12 Euro. Und Färben, das dauert 90 Minuten und kostet 75 Euro.“* | Muss |
| **D-02** | Die initialen Mitarbeitenden (**Sabine Kowalski**, **Mara**, **Jonas**) sowie die n:m-Zuordnung zu ihren jeweiligen Leistungen sind in der Datenbank gespeichert. | *„Wir sind zu dritt: Mara, Jonas und ich. Mara und ich färben, Jonas nicht…“* | Muss |
| **D-03** | Kundendaten, Leistungen, Mitarbeitende und Termine (inklusive Start-/Endzeit, Status und Stornocode) sind in einer normalisierten MySQL-Datenbank (mindestens 3 Tabellen mit Primär- und Fremdschlüsseln) gespeichert. | Pflichtumfang Datenbank; *„die Daten dürfen also gespeichert bleiben“*; *„Die Termine will ich nicht löschen“* | Muss |

---

## 4. Nicht-funktionale Anforderungen (`N`)

| ID | Anforderung | Bezug im Protokoll / Auftrag | Priorität |
| :--- | :--- | :--- | :--- |
| **N-01** | Der Salon-Bereich ist durch ein gemeinsames Passwort geschützt. Das Passwort sowie Datenbank-Zugangsdaten werden nicht im Quellcode hinterlegt, sondern über eine `.env`-Datei konfiguriert. | *„Den Bereich soll nicht jeder aufrufen können, ein Passwort für mich und das Team reicht, nichts Kompliziertes.“*; Pflichtumfang Backend | Muss |
| **N-02** | Datenschutz auf der Buchungsseite: Kundendaten dürfen ausschließlich im geschützten Salon-Bereich einsehbar sein. Die öffentliche Buchungsseite liefert und zeigt nur verfügbare Uhrzeiten (frei/belegt), keine Daten anderer Kundinnen und Kunden. | *„Die Kundendaten sehe nur ich und mein Team. Auf der Buchungsseite darf niemand sehen, wer sonst noch gebucht hat. Dort reicht, dass ein Zeitfenster belegt ist.“* | Muss |
| **N-03** | Das Buchungssystem ist rund um die Uhr (24/7) online erreichbar. | *„Meine Kundschaft soll im Internet selbst einen Termin buchen können, auch abends um zehn.“* | Muss |
| **N-04** | Alle Eingaben und Buchungsregeln werden serverseitig validiert; Datenbankzugriffe erfolgen ausschließlich über Prepared Statements (`?`-Platzhalter) und Doppelbuchungen werden durch Transaktionen/Zeilensperren verhindert. | Pflichtumfang Backend; Tipps (*Prepared Statements*, *Transaktion/Zeilensperre*) | Muss |
| **N-05** | Das Frontend ist ohne Frameworks in HTML, CSS und Vanilla JavaScript (`fetch`) umgesetzt und gibt verständliche Fehler- und Erfolgsmeldungen aus. | Rahmenvorgabe Frontend; Pflichtumfang Frontend | Muss |

---

## 5. Wünsche & Bonusfunktionen (`W`)

| ID | Anforderung | Bezug im Protokoll / Auftrag | Priorität |
| :--- | :--- | :--- | :--- |
| **W-01** | Versand bzw. Konsolenausgabe einer Bestätigungs-E-Mail nach erfolgreicher Buchung. | *„Schön wäre eine Bestätigungs-E-Mail.“*; Bonus-Abschnitt | Kann |
| **W-02** | Kombination mehrerer Leistungen in einem zusammenhängenden Termin (z. B. Herrenschnitt + Bartpflege). | *„Manche wollen Schnitt und Bart in einem Termin, das machen wir aktuell zweimal hintereinander.“*; Bonus-Abschnitt | Kann |
| **W-03** | Verwaltung freier Tage / Arbeitstage pro Person mit Berücksichtigung in der Terminberechnung (z. B. neue Mitarbeiterin Lena ab Januar nur dienstags). | *„Und Lena, die ab Januar bei uns anfängt, ist im ersten Monat nur dienstags da, so etwas wie freie Tage pro Person wäre gut.“*; Bonus-Abschnitt | Kann |
| **W-04** | Wochenansicht im Salon-Bereich zusätzlich zur Tagesansicht. | Bonus-Abschnitt: *„Wochenansicht im Salon-Bereich“* | Kann |
| **W-05** | Status „nicht erschienen“ sowie eine einfache Auswertung (z. B. Termine pro Woche, Umsatz je Leistung). | Bonus-Abschnitt: *„Status ‚nicht erschienen‘ und eine einfache Auswertung“* | Kann |
| **W-06** | Responsive Darstellung der Anwendung für Smartphones. | Bonus-Abschnitt: *„Responsive Darstellung für Smartphones“* | Kann |

---
