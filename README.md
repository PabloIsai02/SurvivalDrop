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
- 🎨 **Menú con fondo pixelart** - Personalizable con imagen de cielo
- 📱 **Totalmente responsive** - Funciona en PC, tablet y móvil
- 🖥️ **Pantalla completa** - El juego ocupa el 100% del viewport
- 🎯 **Controles táctiles** optimizados para dispositivos móviles
- ⌨️ **WASD + Flechas** - Dos opciones de control en teclado
- 🔥 **Dificultad progresiva** que aumenta cada 300 puntos
- 🛡️ **Sistema anti-exploits mejorado** - Previene score infinito en esquinas
- 🎮 **ESC para salir** - Vuelve al menú principal en cualquier momento
- 📐 **Densidad adaptativa** - Más obstáculos en PC, optimizado en móvil
- 🎯 **Enemigos especiales** - Se generan extra si estás en las esquinas

## Tipos de Plataformas

- **Sólidas** (moradas): Plataformas normales y seguras
- **Frágiles** (naranjas): Se rompen después de 0.8 segundos de tocarlas
- **Móviles** (verdes): Se mueven horizontalmente
- **Con Púas**: Plataformas sólidas que causan daño al tocarlas

## Controles

### PC (Teclado)
- **Flecha Izquierda / A**: Mover la pelota hacia la izquierda
- **Flecha Derecha / D**: Mover la pelota hacia la derecha
- **P**: Pausar/Despausar el juego
- **ESC**: Salir al menú principal
- **Click en botones**: Navegar por los menús

### Móvil (Táctil)
- **Tocar lado izquierdo**: Mover la pelota hacia la izquierda
- **Tocar lado derecho**: Mover la pelota hacia la derecha
- **Tocar centro**: Dejar que la pelota caiga libremente
- **Tocar botones**: Navegar por los menús

> **Nota**: El juego es completamente responsive y se adapta automáticamente al tamaño de tu pantalla.

## Personalización del Fondo

El menú principal usa una **imagen de fondo pixelart del cielo**. Para personalizarla:

1. **Crea o descarga** una imagen pixelart de cielo
2. **Guárdala como**: `cielo-pixelart.png`
3. **Colócala en**: `assets/images/cielo-pixelart.png`
4. **Recomendaciones**:
   - Resolución: 1920x1080 o mayor
   - Estilo: Pixel art con cielo azul y nubes
   - Formato: PNG con transparencia (opcional)

Si no hay imagen, se usará un **color celeste (#87CEEB)** como fallback.

## Cómo Ejecutar el Juego

### Opción 1: Ejecutar localmente

1. Clona este repositorio:
   ```bash
   git clone https://github.com/PabloIsai02/SurvivalDrop.git
   cd SurvivalDrop
   ```

2. **(Opcional)** Agrega tu imagen de fondo:
   - Coloca `cielo-pixelart.png` en `assets/images/`

3. Abre el archivo `index.html` en tu navegador favorito:
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

### Commits Iniciales
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
14. **Agregar README con instrucciones completas** - Documentación

### Mejoras y Optimizaciones (V1.1)
15. **Arreglar bug de score infinito en esquinas** - Sistema anti-exploit inicial
16. **Aumentar dificultad progresiva del juego** - Balance y desafío mejorado
17. **Hacer el juego responsive y agregar controles táctiles** - Soporte móvil completo
18. **Actualizar README con nuevas características** - Documentación completa

### Versión 2.0 - Fullscreen y Anti-Exploit Mejorado
19. **Implementar modo fullscreen 100% viewport** - Juego a pantalla completa
20. **Agregar controles WASD y tecla ESC** - Más opciones de control
21. **Arreglar bug de esquinas definitivamente** - Plataformas en toda la pantalla
22. **Sistema anti-exploit mejorado** - Daño diferencial por zona

### Versión 2.1 - Densidad Adaptativa y Diseño Mejorado
23. **Densidad de obstáculos adaptativa** - Más plataformas en PC, menos en móvil
24. **Sistema de enemigos mejorado** - Extra enemigos en esquinas para prevenir exploits
25. **Rediseño del menú principal** - Soporte para fondo pixelart personalizable
26. **Estilos visuales mejorados** - Botones y textos con efecto pixel art

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
El juego se vuelve progresivamente más difícil:
- **Nivel de dificultad**: Aumenta cada 300 puntos
- **Gravedad**: Se incrementa de 0.4 a 1.2 máximo
- **Plataformas**: Se vuelven más pequeñas y espaciadas
- **Plataformas peligrosas**: Más frágiles y móviles en niveles altos
- **Velocidad de plataformas móviles**: Aumenta con el nivel
- **Púas**: Mayor probabilidad de aparecer (hasta 50%)
- **Enemigos**:
  - Aparecen con más frecuencia
  - Hasta 6 enemigos simultáneos en niveles altos
  - Se mueven más rápido
  - Disparan cada vez más rápido (de 2 segundos a 1 segundo)
  - Proyectiles más veloces
- **Sistema anti-exploit mejorado**:
  - Daño gradual si no avanzas verticalmente
  - Daño más fuerte (10 HP) en los bordes (1.5 segundos)
  - Daño normal (5 HP) en el centro (2.5 segundos)
  - Plataformas distribuidas en TODA la pantalla (esquinas incluidas)
  - Generación adicional de plataformas si hay pocas visibles
  - ¡Imposible hacer score infinito quedándose quieto!

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
