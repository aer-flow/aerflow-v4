# Aerflow Studio Template

Versiunea curenta a site-ului este salvata ca baseline reutilizabil pentru alte proiecte.

Baseline-ul "Studio template" este commit-ul cu mesajul exact:

```text
chore: save studio template baseline
```

Scriptul `./scripts/studio-template.sh` te ajuta sa il gasesti rapid si sa il refolosesti fara sa cauti manual prin istoric.

## Comenzi utile

Afla ce commit este baseline-ul salvat:

```bash
./scripts/studio-template.sh show
```

Creeaza o ramura noua pornind exact din sablonul Studio:

```bash
./scripts/studio-template.sh branch site-nou
```

Copiaza sablonul intr-un folder nou, fara istoricul Git:

```bash
./scripts/studio-template.sh copy ../site-nou
```

## Workflow recomandat

1. Pastrezi `main` ca istoric complet al proiectului.
2. Cand vrei un site nou, rulezi `branch` sau `copy` din script.
3. Pentru revenire rapida la sablon, verifici commit-ul cu `show` si deschizi o ramura noua din acel punct.

## Dezvoltare

```bash
npm install
npm run dev
```

Verificari locale:

```bash
npm run lint
npm run build
```
