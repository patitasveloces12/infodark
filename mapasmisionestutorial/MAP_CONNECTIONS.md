# MAP_CONNECTIONS.md / Conexiones de Mapas y Portales

Fuente: `spacemap-config.xml` en el HAR `mapa.gbl3.darkorbit.com.har`. [user HAR dump]


## 1. Tabla de saltos por mapa

Cada fila es un mapa. “Salta a” = destinos directos por portal.
“Riesgo PvP” está basado en el tutorial oficial que dice que los mapas 4-X casi no tienen protección,
solo ~15s de zona segura tras saltar. [user HAR dump]

| Mapa  | Salta a                            | Riesgo PvP |
|-------|------------------------------------|------------|
| 1-1   | 1-2                                | Bajo       |
| 1-2   | 1-1, 1-3, 1-4                      | Bajo       |
| 1-3   | 1-2, 1-4, 2-3                      | Bajo       |
| 1-4   | 1-2, 1-3, 3-4, 4-1                 | Medio      |
| 1-5   | 1-6, 1-7, 4-4, 4-5                 | Medio      |
| 1-6   | 1-5, 1-8                           | Medio      |
| 1-7   | 1-5, 1-8                           | Medio      |
| 1-8   | 1-6, 1-7, BL-1                     | Alto       |
| 2-1   | 2-2                                | Bajo       |
| 2-2   | 2-1, 2-3, 2-4                      | Bajo       |
| 2-3   | 1-3, 2-2, 2-4                      | Bajo       |
| 2-4   | 2-2, 2-3, 3-3, 4-2                 | Medio      |
| 2-5   | 2-6, 2-7, 4-4, 4-5                 | Medio      |
| 2-6   | 2-5, 2-8                           | Medio      |
| 2-7   | 2-5, 2-8                           | Medio      |
| 2-8   | 2-6, 2-7, BL-2                     | Alto       |
| 3-1   | 3-2                                | Bajo       |
| 3-2   | 3-1, 3-3, 3-4                      | Bajo       |
| 3-3   | 2-4, 3-2, 3-4                      | Bajo       |
| 3-4   | 1-4, 3-2, 3-3, 4-3                 | Medio      |
| 3-5   | 3-6, 3-7, 4-4, 4-5                 | Medio      |
| 3-6   | 3-5, 3-8                           | Medio      |
| 3-7   | 3-5, 3-8                           | Medio      |
| 3-8   | 3-6, 3-7, BL-3                     | Alto       |
| 4-1   | 1-4, 4-2, 4-3, 4-4                 | Alto       |
| 4-2   | 2-4, 4-1, 4-3, 4-4                 | Alto       |
| 4-3   | 3-4, 4-1, 4-2, 4-4                 | Alto       |
| 4-4   | 1-5, 2-5, 3-5, 4-1, 4-2, 4-3       | Muy Alto   |
| 4-5   | 1-5, 2-5, 3-5, 5-1                 | Muy Alto   |
| 5-1   | 5-2                                | Muy Alto   |
| 5-2   | 5-3                                | Muy Alto   |
| 5-3   | 4-4                                | Muy Alto   |
| BL-1  | 1-8, BL-2, BL-3                    | Muy Alto   |
| BL-2  | 2-8, BL-1, BL-3                    | Muy Alto   |
| BL-3  | 3-8, BL-1, BL-2                    | Muy Alto   |


## 2. JSON de conexiones (lista-de-adyacencia)

Esta misma red vive como `map_connections.json` para que tu bot la lea directo.

```json
{
  "1-1":  ["1-2"],
  "1-2":  ["1-1", "1-3", "1-4"],
  "1-3":  ["1-2", "1-4", "2-3"],
  "1-4":  ["1-2", "1-3", "3-4", "4-1"],
  "1-5":  ["1-6", "1-7", "4-4", "4-5"],
  "1-6":  ["1-5", "1-8"],
  "1-7":  ["1-5", "1-8"],
  "1-8":  ["1-6", "1-7", "BL-1"],
  "2-1":  ["2-2"],
  "2-2":  ["2-1", "2-3", "2-4"],
  "2-3":  ["1-3", "2-2", "2-4"],
  "2-4":  ["2-2", "2-3", "3-3", "4-2"],
  "2-5":  ["2-6", "2-7", "4-4", "4-5"],
  "2-6":  ["2-5", "2-8"],
  "2-7":  ["2-5", "2-8"],
  "2-8":  ["2-6", "2-7", "BL-2"],
  "3-1":  ["3-2"],
  "3-2":  ["3-1", "3-3", "3-4"],
  "3-3":  ["2-4", "3-2", "3-4"],
  "3-4":  ["1-4", "3-2", "3-3", "4-3"],
  "3-5":  ["3-6", "3-7", "4-4", "4-5"],
  "3-6":  ["3-5", "3-8"],
  "3-7":  ["3-5", "3-8"],
  "3-8":  ["3-6", "3-7", "BL-3"],
  "4-1":  ["1-4", "4-2", "4-3", "4-4"],
  "4-2":  ["2-4", "4-1", "4-3", "4-4"],
  "4-3":  ["3-4", "4-1", "4-2", "4-4"],
  "4-4":  ["1-5", "2-5", "3-5", "4-1", "4-2", "4-3"],
  "4-5":  ["1-5", "2-5", "3-5", "5-1"],
  "5-1":  ["5-2"],
  "5-2":  ["5-3"],
  "5-3":  ["4-4"],
  "BL-1": ["1-8", "BL-2", "BL-3"],
  "BL-2": ["2-8", "BL-1", "BL-3"],
  "BL-3": ["3-8", "BL-1", "BL-2"]
}
```


## 3. Etapas / progreso / peligro

| Etapa                | Mapas típicos                   | Notas para el bot                                                                 |
|----------------------|---------------------------------|-----------------------------------------------------------------------------------|
| Inicial / Empresa    | 1-1..1-4 / 2-1..2-4 / 3-1..3-4  | Bases y zonas protegidas (ZNA). Misiones básicas, Streuner, Lordakia.            |
| Medio                | 1-5..1-8 / 2-5..2-8 / 3-5..3-8  | NPC más fuertes, más recompensa, todavía PvE.                                    |
| PvP global           | 4-1 / 4-2 / 4-3 / 4-4 / 4-5     | Casi sin ZNA; solo ~15s de protección al saltar. [user HAR dump]                 |
| Pirata               | 5-1 / 5-2 / 5-3                 | Muy agresivo. Mucho riesgo para cuentas débiles.                                 |
| Blacklight / endgame | BL-1 / BL-2 / BL-3              | Contenido late game / endgame.                                                   |
