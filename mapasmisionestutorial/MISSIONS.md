# MISIONS.md / Sistema de Misiones

Fuente principal: `resource_quest.xml` dentro del HAR `mapa.gbl3.darkorbit.com.har`. [user HAR dump]


## 1. Estructura interna de una misión

| Campo en UI del juego        | Significado                                                                                  | Cómo lo debe usar el bot                       |
|------------------------------|----------------------------------------------------------------------------------------------|------------------------------------------------|
| Resumen                      | Historia / lore (“Te necesitamos para...”)                                                   | Opcional                                       |
| Objetivos / Desafíos         | Pasos concretos: matar NPC, recolectar mineral, viajar, volver vivo, etc.                    | CORE                                           |
| Recompensa                   | Créditos, experiencia, honor, munición, etc.                                                 | Priorizar misión rentable                      |
| Límite de tiempo             | A veces “hazlo en X minutos” o “tienes 24h desde que aceptas”                                | Activar cronómetro / decidir skip              |
| Zona objetivo                | A veces nombra el mapa: “ve al 1-3”, “en mapas 4-X”, “frente a la puerta del 1-1”…           | Seleccionar destino con pathfinding            |
| Condición de entrega final   | “Vuelve a la base / estación y entrégalo”                                                    | Bot debe regresar y no morir                   |

El tutorial también menciona que al subir a nivel 2, 3, 5, 6 y 10 se desbloquean más mapas
(y por lo tanto más misiones avanzadas). [user HAR dump]


## 2. Tipos de objetivos que aparecen

| Tipo de objetivo                         | Ejemplo literal interno                                                               | Implicación para el bot                                 |
|-----------------------------------------|----------------------------------------------------------------------------------------|----------------------------------------------------------|
| Matar NPC específicos                   | “Destruye tantos Streuners como sea posible en un minuto.”                            | Lockear NPC por nombre y mantener DPS                   |
| Cadena de NPC por orden                 | “Mata de forma sucesiva a un ejemplar de cada tipo de alienígena hasta llegar a los Cubikon. No pueden ser ni Boss ni Uber.” | Cambiar objetivo dinámicamente           |
| Varias opciones                         | “Tu elección: Destruye 12 Streuner o 2 Devolarium.”                                   | Elegir la opción más rápida/fácil                       |
| Recolectar mineral cronometrado         | “Recoge 15 Endurium en 4 minutos.”                                                    | Ruta de recursos + contador de tiempo                   |
| Farm largo de recursos                  | “Reúne 200 Prometium en 100 minutos en mapas enemigos.”                               | Recolección sostenida + supervivencia                   |
| PvP / jugadores                         | “Entra en los mapas 4-X y destruye Goliaths.”                                         | Activa modo PvP (alto riesgo)                            |
| Viajar / posicionarte / usar portales   | “Vuela hasta la puerta de teleportación en el 1-1 y destruye Streuners. Regresa después a la base…” | Bot debe navegar portales correctos     |
| Entregar recursos en base               | “Llévalos a la estación espacial para venderlos.”                                    | Volver vivo antes de marcar misión como terminada       |
| Evento / instancia                      | Misiones que mencionan P.E.T. salvajes o Galaxy Gate                                  | Tratar mapa/portal especial, no grafo normal            |


## 3. Flujo recomendado del bot de misiones

| Paso del bot                                        | Detalle técnico                                                                                       |
|----------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| Leer misión activa                                 | Parsear texto buscando patrones: “Destruye [NPC]”, “Recoge [mineral]”, “Vuela al [mapa]”               |
| Determinar mapa objetivo                            | Detectar referencias como “1-3”, “4-X”, “base”, “puerta del 1-1”, “mapa enemigo”, etc.                |
| Calcular ruta                                       | Usar `map_connections.json` para ir de mapa actual → mapa objetivo                                    |
| Ejecutar tarea                                     | Cambiar modo del bot: cazar NPC / recolectar cajas/mineral / PvP / escoltar hasta base                 |
| Controlar condición de entrega                     | Si la misión dice “vuelve a la base”: navegar de regreso y llegar vivo antes de completar              |
| Vigilar límite de tiempo                           | Si la tarea es cronometrada, máxima prioridad hasta terminar o abortar                                |
| Evaluar peligro                                    | Si la misión requiere 4-X / 5-X / BL-X y la nave es débil → saltar/posponer automáticamente            |
