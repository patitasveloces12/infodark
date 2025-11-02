# MOVEMENT_AND_LOOT.md / Movimiento de Jugador y Recolección de Cajas

Fuentes:
- `resource_faq.xml` en tu HAR `mapa.gbl3.darkorbit.com.har` (movimiento básico, portales, zonas seguras). [user HAR dump]
- `spacemap-config.xml` (rutas entre mapas). [user HAR dump]
- `resource_quest.xml` (misiones que obligan a recolectar recursos / entregar en base). [user HAR dump]
- Comportamiento estándar de DarkOrbit hasta 2024 (orbitar NPC, bots que recogen bonus box).


## 1. Movimiento del jugador / nave

### 1.1 Movimiento básico
- El tutorial dice: “Vuelas haciendo clic con el ratón en el mapa.” [user HAR dump]
- También explica que puedes hacer clic en el minimapa (esquina inferior derecha) para moverte hacia objetos visibles. [user HAR dump]
- Seleccionar objetivo: “Haz clic izquierdo en el enemigo para seleccionarlo.” [user HAR dump]

**Para el bot:**
- Moverse = enviar coordenadas destino (x,y).
- Seguir objetivo = actualizar destino continuamente cerca del NPC seleccionado.


### 1.2 Saltar portales
- El tutorial dice: “Cuando estés cerca del portal de teleportación, pulsa J.” [user HAR dump]
- Eso implica que NO puedes saltar desde cualquier punto del mapa.
- Tienes que volar físicamente hasta la posición del portal, luego ejecutar el salto.

**Para el bot:**
1. Pathfinding global con `map_connections.json` (ej: 1-1 → 1-2 → 1-3 …).
2. Movimiento local hasta las coordenadas del portal correcto en el mapa actual.
3. Activar salto.
4. Repetir hasta el mapa objetivo.


### 1.3 Cambio de configuración (velocidad/tanque)
- El tutorial dice que cambias configuración con `1` o `2` y que hay que esperar unos segundos antes de volver a cambiar. [user HAR dump]

**Para el bot:**
- Config “rápida”: más motores → para viajar / escapar.
- Config “tanque”: más escudo → para pelear / lootear en zona peligrosa.
- Registrar timestamp del último cambio para NO spammear el swap (el juego no deja).


### 1.4 Movimiento defensivo y zonas seguras
- ZNA = zonas sin ataque. El tutorial dice que la base de tu empresa y las puertas de teleportación en tus mapas base son ZNA. [user HAR dump]
- Mapas 4-X (4-1 / 4-2 / 4-3 / 4-4) casi no tienen protección, solo ~15s de seguridad tras saltar y luego cualquiera puede dispararte. [user HAR dump]

**Para el bot:**
- Si HP baja (<35% por ejemplo):
  - Cambiar a config rápida (si cooldown lo permite).
  - Navegar saltando portales hacia el mapa base (1-1 / 2-1 / 3-1).
  - Volar hasta la zona base/portal y quedarse ahí para reparar AFK porque es ZNA.
- Nunca quedarse AFK reparando en 4-4 o 5-2. Son zonas de muerte.


### 1.5 Órbita / kite
- El tutorial dice que atacas con CTRL (láser continuo) y barra espaciadora (misiles). [user HAR dump]
- Esto implica que el daño esperado viene a rango láser/misil, no pegado cuerpo a cuerpo.
- Jugadores reales orbitan al NPC / enemigo jugador en círculo/óvalo a distancia constante para:
  - Mantener DPS.
  - No quedarse quietos como bot fácil de matar.

**Para el bot:**
- Movimiento de combate debe ser “mantenerme a 500-600 de distancia y moverme en arco alrededor”, no quedarme quieto encima del NPC.


## 2. Recolección de recursos, cajas de bono y cajas de evento

### 2.1 Recursos/minerales de misión
El `resource_quest.xml` incluye muchos objetivos tipo:
- “Recoge 15 Endurium en 4 minutos.”
- “Reúne 200 Prometium en 100 minutos en mapas enemigos.”
- “Llévalos a la estación espacial para venderlos.”  
Esto confirma que:
- Las rocas/minerales se lootear al pasar encima.
- Hay misiones cronometradas que exigen recolección rápida.
- Algunas requieren entregar vivo en base. [user HAR dump]

**Para el bot:**
1. Detectar nodos de mineral (Endurium, Prometium, Terbium, etc.).  
2. Volar a la coordenada más cercana libre de peligro.  
3. Quedarse hasta recibir confirmación de loot.  
4. Llevar el recurso a base si la misión lo exige (eso implica pathfinding de vuelta).  


### 2.2 Cajas de bono (“bonus boxes”)
Comportamiento estándar DarkOrbit:
- Son cajas flotantes abiertas en el mapa normal.
- Dan créditos, uridium, munición, misiles, llaves, etc.
- Se recogen pasando encima, igual que el mineral.

**Ruta lógica del bot para bonus boxes:**
1. Escanear todas las cajas visibles alrededor.
2. Calcular distancia 2D desde tu nave a cada caja.
3. Aplicar “factor de riesgo”:
   - ¿Te obliga a entrar en zona PvP pesada? (4-4, 4-5, 5-2, etc.).
   - ¿Hay jugadores enemigos cerca?
   - ¿Tu HP está bajo?
4. Elegir la caja con mejor puntuación (corta + segura).
5. Volar hasta la caja con trayecto suave (no giros robóticos bruscos cada frame).
6. Esperar confirmación de loot.
7. Repetir con la siguiente caja.

Tips para parecer humano:
- Pequeñas pausas aleatorias entre caja y caja (50-200ms).
- Cambiar objetivo si un enemigo fuerte entra en rango.
- No hacer patrones rectilíneos perfectos infinitos.


### 2.3 Cajas de evento
Durante eventos, aparecen cajas especiales en el mapa:
- Se ven distintas visualmente.
- Contienen moneda de evento / llaves de evento / munición especial / potenciadores temporales.
- Para el juego son, básicamente, “otra caja lootable flotando en el mapa”.

**Para el bot:**
- Trátalas igual que bonus boxes, pero con prioridad más alta porque:
  - Suelen valer más por minuto.
  - Algunas misiones de evento y tareas especiales dependen de recolectarlas. [user HAR dump]

**Regla simple de priorización loot:**
1. Caja de evento segura.
2. Caja bonus normal segura.
3. Mineral requerido por misión cronometrada.
4. Cualquier otra cosa.
5. Si HP < umbral huida => cancelar loot y escapar.


## 3. Máquina de estados recomendada

### Estados principales
- `FARM_NPC`
- `FARM_BOX` (bonus / evento)
- `FARM_MINERAL_MISSION`
- `MISSION_TRAVEL` (ir a mapa destino de misión)
- `ESCAPE_REPAIR` (huir a base y reparar)

### Transiciones importantes
- Si HP < 35%  -> `ESCAPE_REPAIR`
- Si misión cronometrada activa y no cumplida -> forzar `FARM_MINERAL_MISSION`
- Si no hay misión urgente y estás en mapa seguro -> `FARM_BOX`
- Si misión dice “ve a mapa X-Y” y aún no estás ahí -> `MISSION_TRAVEL`

Esto hace que el movimiento no sea caótico.  
Tu bot siempre sabe “qué estoy haciendo AHORITA” y mueve la nave acorde,
en vez de mezclar loot y viaje y PvP todo al mismo tiempo.
