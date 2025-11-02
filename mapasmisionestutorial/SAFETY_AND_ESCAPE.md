# SAFETY_AND_ESCAPE.md / Seguridad, Huida y Reparación

Fuente: `resource_faq.xml` y `spacemap-config.xml`. [user HAR dump]


## 1. Zonas seguras (ZNA)

| Zona / mapa                             | ¿ZNA (zona sin ataque)?                                                                       | Nota táctica para el bot                                      |
|-----------------------------------------|------------------------------------------------------------------------------------------------|---------------------------------------------------------------|
| Base en 1-1 / 2-1 / 3-1                 | Sí, zonas protegidas                                                                          | Buen lugar para quedarse AFK y reparar                        |
| Portales dentro de tus mapas iniciales  | Sí, también cuentan como ZNA según el tutorial                                                | Huir al portal más cercano con poca vida                      |
| Mapas 4-1 / 4-2 / 4-3 / 4-4             | Prácticamente sin protección. Solo ~15s de “seguro” al aparecer tras saltar.                  | No quedarse AFK ahí                                           |
| Sector pirata (5-1 / 5-2 / 5-3)         | Sin mención de protección → asumir riesgo extremo                                            | Evitar huida hacia sector pirata                              |
| Blacklight (BL-1 / BL-2 / BL-3)         | Sin mención de protección → contenido endgame                                                | No usarlos para reparar                                       |


## 2. Lógica de huida recomendada

| Situación                                               | Acción sugerida para el bot                                                                                       |
|--------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| HP < 35% en mapa normal (1-2, 2-3, 3-4, etc.)          | Navegar hacia el portal que te acerque a tu mapa base (1-1 / 2-1 / 3-1 según facción).                            |
| HP < 35% en mapa de batalla 4-X                        | Saltar inmediatamente al mapa de empresa más cercano (1-4 / 2-4 / 3-4).                                           |
| Llegas al mapa base                                    | Volar hasta la zona base / portal inicial y quedarte ahí para reparar, porque es ZNA.                             |
| Misión cronometrada pero tienes que huir               | Si huir consume >50% del tiempo restante, marca esa misión como “skip” en vez de morir.                           |


## 3. Clasificación de riesgo por mapa

| Riesgo     | Mapas                                                                                   |
|------------|------------------------------------------------------------------------------------------|
| Bajo       | 1-1..1-4 / 2-1..2-4 / 3-1..3-4                                                           |
| Medio      | 1-5..1-7 / 2-5..2-7 / 3-5..3-7                                                           |
| Alto       | 1-8 / 2-8 / 3-8 / BL-1 / BL-2 / BL-3                                                     |
| Muy Alto   | 4-1 / 4-2 / 4-3 / 4-4 / 4-5 / 5-1 / 5-2 / 5-3                                            |

Conclusión: Nunca planear rutas AFK que pasen por 4-4, 4-5, 5-2, BL-X si la nave es débil o está baja de vida.
