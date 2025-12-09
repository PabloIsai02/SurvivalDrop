# Falling Ball: Survival Drop

Un juego arcade de supervivencia donde controlas una pelota que cae indefinidamente mientras evitas trampas, enemigos y plataformas peligrosas.

## Descripción

Falling Ball: Survival Drop es un juego arcade estilo indie desarrollado en JavaScript puro (sin frameworks). El jugador controla una pelota que cae continuamente y debe sobrevivir el mayor tiempo posible rebotando en plataformas, esquivando enemigos y evitando obstáculos.

## Características

- 🎮 Física realista con gravedad progresiva
- 🏗️ Generación procedural de plataformas
- 💥 Sistema de vidas y barra de vida
- 👾 Enemigos (drones) con sistema de disparo
- ✨ Efectos visuales (trail, partículas, degradados)
- 🎵 Sistema de sonidos (música de fondo, efectos)
- 📊 Sistema de puntuación con localStorage
- 🎨 Interfaz visual moderna y atractiva

## Tipos de Plataformas

- **Sólidas** (moradas): Plataformas normales y seguras
- **Frágiles** (naranjas): Se rompen después de 0.8 segundos de tocarlas
- **Móviles** (verdes): Se mueven horizontalmente
- **Con Púas**: Plataformas sólidas que causan daño al tocarlas

## Controles

- **Flecha Izquierda**: Mover la pelota hacia la izquierda
- **Flecha Derecha**: Mover la pelota hacia la derecha
- **P**: Pausar/Despausar el juego
- **Click en botones**: Navegar por los menús

## Cómo Ejecutar el Juego

### Opción 1: Ejecutar localmente

1. Clona este repositorio:
   ```bash
   git clone https://github.com/PabloIsai02/SurvivalDrop.git
   cd SurvivalDrop
   ```

2. Abre el archivo `index.html` en tu navegador favorito:
   - Doble click en el archivo
   - O desde la terminal: `open index.html` (Mac) o `start index.html` (Windows)

### Opción 2: Servidor local (recomendado)

Si quieres que los sonidos funcionen correctamente, ejecuta un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (si tienes npx)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego abre tu navegador en `http://localhost:8000`

## Estructura del Proyecto

```
SurvivalDrop/
├── index.html          # Estructura HTML del juego
├── estilos.css         # Estilos y diseño visual
├── juego.js            # Lógica principal del juego
├── README.md           # Este archivo
└── assets/
    ├── images/         # Imágenes del juego (si se necesitan)
    └── sounds/         # Archivos de sonido
        ├── musica_fondo.mp3
        ├── rebotar.mp3
        ├── daño.mp3
        └── gameover.mp3
```

## Configuración de Git (Para Desarrollo)

Si quieres contribuir o modificar el código, configura tu usuario de Git **solo para este repositorio**:

```bash
cd SurvivalDrop
git config user.name "PabloIsai02"
git config user.email "a22311049@uthermosillo.edu.mx"
```

Esto asegura que los commits se hagan con el usuario correcto.

## Historial de Desarrollo

El proyecto se desarrolló de manera incremental con los siguientes commits:

1. **Inicial: crear estructura del proyecto y assets** - Estructura base de carpetas
2. **Agregar canvas y probar render básico** - HTML y CSS base
3. **Implementar física básica de la pelota (gravedad y movimiento)** - Sistema de física
4. **Generación procedural de plataformas** - Creación dinámica de plataformas
5. **Añadir plataformas frágiles y móviles** - Tipos especiales de plataformas
6. **Sistema de colisiones y rebotes** - Detección de colisiones
7. **Añadir enemigos (drones) y proyectiles** - Sistema de enemigos
8. **Implementar barra de vida y sistema de vidas** - Gestión de vida del jugador
9. **HUD: puntaje, vidas y mejor puntaje en localStorage** - Interfaz de usuario
10. **Efectos visuales: trail, particulas y degradados** - Mejoras visuales
11. **Sonidos: rebotar, daño y game over** - Sistema de audio
12. **Pantallas: inicio, pausa y game over** - Navegación entre pantallas
13. **Refactor y limpieza final** - Optimización del código

## Sistema de Puntuación

- La puntuación se basa en la **distancia descendida**
- Cada 10 píxeles de caída = 1 punto
- La **dificultad aumenta** cada 500 puntos
- El mejor puntaje se guarda automáticamente en el navegador

## Mecánicas del Juego

### Sistema de Vidas
- Empiezas con **3 vidas**
- Cada vida tiene **100 puntos de vida**
- Pierdes vida al:
  - Caer fuera de la pantalla
  - Tocar plataformas con púas (20 de daño)
  - Ser golpeado por proyectiles de enemigos (15 de daño)

### Dificultad Progresiva
- La gravedad aumenta con el nivel de dificultad
- Más enemigos aparecen a medida que avanzas
- Las plataformas se generan de forma más espaciada

## Tecnologías Utilizadas

- **HTML5 Canvas** - Para el renderizado gráfico
- **JavaScript ES6+** - Lógica del juego
- **CSS3** - Diseño y animaciones
- **localStorage** - Guardado de puntuaciones

## Créditos

Desarrollado por **PabloIsai02** como proyecto académico.

## Licencia

Este proyecto es de código abierto y está disponible para fines educativos.

---

¡Diviértete jugando y trata de conseguir el mejor puntaje! 🎮✨
