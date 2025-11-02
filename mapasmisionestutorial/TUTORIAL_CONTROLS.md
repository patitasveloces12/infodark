# TUTORIAL_CONTROLS.md / Controles y Comportamiento Tipo Humano

Fuente: `resource_faq.xml` en el HAR `mapa.gbl3.darkorbit.com.har`. [user HAR dump]


## 1. Controles básicos según el tutorial oficial

| Acción humana normal            | Texto del tutorial                                                                 | Cómo lo replica el bot                                 |
|--------------------------------|-------------------------------------------------------------------------------------|--------------------------------------------------------|
| Mover la nave                  | “Vuelas haciendo clic con el ratón en el mapa.”                                    | Bot: clic hacia coordenadas                            |
| Seleccionar objetivo           | “Haz clic izquierdo en el enemigo.”                                                | Bot: lock/target por ID                                |
| Disparar láser                 | “Pulsa CTRL para disparar el láser continuamente.”                                 | Bot: bucle de disparo láser                            |
| Lanzar misiles                 | “Pulsa la barra espaciadora para lanzar misiles.”                                  | Bot: misil cada cooldown                               |
| Colocar minas                  | “Pulsa M (o Y en algunas configs) para desplegar minas.”                           | Bot: opcional (PvP)                                   |
| Saltar por portal              | “Cuando estés cerca del portal, pulsa J.”                                          | Bot: viajar físicamente al portal y ejecutar salto     |
| Cambiar configuración de nave  | “Pulsa 1 o 2 para cambiar. Debes esperar unos segundos antes de poder volver.”     | Bot: usar config rápida vs tanque respetando cooldown  |
| Desconexión segura             | “Pulsa L para desconectarte. Hay una cuenta atrás antes de irte.”                  | Bot: simular desconexión protegida                     |
| Uso del minimapa              | “En la esquina inferior derecha ves el minimapa; ahí también puedes hacer clic.”   | Bot: usar coords globales                              |
| Reparar en zona segura         | “En la base de tu empresa y en las puertas de teleportación de tus mapas base hay ZNA (zonas sin ataque).” | Bot: ir físicamente ahí para reparar |


## 2. Galaxy Gates / Puertas galácticas

- Construyes piezas en el “materializador”.
- Cuando completas una puerta, aparece un portal especial (Galaxy Gate).
- Saltas y entras a una zona con oleadas de NPC.
- Es un mapa instanciado, NO parte del grafo de portales normal. [user HAR dump]


## 3. Desbloqueos por nivel

El tutorial menciona que al subir a nivel 2, 3, 5, 6 y 10:
- Ganas acceso a nuevos mapas (por ejemplo X-5, X-6, X-7, X-8).
- Se activan misiones más avanzadas. [user HAR dump]

Conclusión: una cuenta baja no debería intentar farmear en 4-X o BL-X aún.
