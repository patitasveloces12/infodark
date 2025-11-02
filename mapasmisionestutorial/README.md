# game_knowledge

Este directorio contiene conocimiento estático y reglas de comportamiento para tu bot
extraído del cliente DarkOrbit (tu HAR `mapa.gbl3.darkorbit.com.har`) y de
comportamiento estándar del juego hasta 2024.

## Archivos

| Archivo                     | Contenido                                                                                                 |
|----------------------------|-----------------------------------------------------------------------------------------------------------|
| `MISSIONS.md`              | Sistema de misiones, objetivos típicos y cómo debe actuar el bot para cumplirlas.                         |
| `MAP_CONNECTIONS.md`       | Grafo de portales entre mapas (1-1, 4-4, BL-1, etc.), niveles de riesgo PvP y etapas de progresión.       |
| `TUTORIAL_CONTROLS.md`     | Controles oficiales del juego (moverse, disparar, saltar portal, cambiar config, etc.).                   |
| `SAFETY_AND_ESCAPE.md`     | Zonas seguras, mapas peligrosos, y lógica de huida / reparación cuando tienes poca vida.                  |
| `MOVEMENT_AND_LOOT.md`     | Movimiento del jugador/nave, pathfinding entre mapas, kite/orbita, recolección de cajas y cajas de evento.|
| `map_connections.json`     | Lista de adyacencia lista para pathfinding automático entre mapas.                                       |

## Notas importantes
- Los mapas base (1-1 / 2-1 / 3-1) y los portales dentro de esos mapas se describen en el tutorial como ZNA
  (zonas sin ataque). Ahí puedes reparar seguro. [user HAR dump]
- Los mapas 4-X (4-1 / 4-2 / 4-3 / 4-4) son “mapas de batalla”: casi no hay protección.
  El tutorial dice que solo tienes ~15s de zona segura tras saltar y luego eres objetivo libre. [user HAR dump]
- Varias misiones cronometradas piden recolectar minerales específicos (Endurium, Prometium, etc.)
  y entregar vivos en base. Eso implica navegación segura + entrega final. [user HAR dump]
