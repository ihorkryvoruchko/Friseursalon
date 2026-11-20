# Installation:
### 1 Repository clonen und Abhängigkeiten installieren
```bash
git clone https://github.com/ihorkryvoruchko/Friseursalon.git
```
```bash
cd Friseursalon/backend
```
```bash
npm install
```

### 2 Umgebungsvariablen einrichten (PowerShell)
```bash
Copy-Item .env.example .env
```
### 3 Migrations und Seeders ausführen (leere DatenBank: schnittpunkt muss exestieren)
```bash
node ./util/migrations.js
```
```bash
node ./util/seeders.js
```
    
# Start: (PORT 3000 muss frei sein)
### Backend
```bash
npm run dev     
```
### Frontend
```bash
./frontend/index.html in Live Server öffnen
```

# Test:
```bash
npm run test
```

