// ========================================
// FALLING BALL: SURVIVAL DROP
// Juego arcade de supervivencia
// ========================================

// Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Pantallas
const pantallaInicio = document.getElementById('pantallaInicio');
const pantallaJuego = document.getElementById('pantallaJuego');
const pantallaPausa = document.getElementById('pantallaPausa');
const pantallaGameOver = document.getElementById('pantallaGameOver');

// Botones
const botonJugar = document.getElementById('botonJugar');
const botonPuntuaciones = document.getElementById('botonPuntuaciones');
const botonCerrarPuntuaciones = document.getElementById('botonCerrarPuntuaciones');
const tablaPuntuaciones = document.getElementById('tablaPuntuaciones');
const botonPausa = document.getElementById('botonPausa');
const botonContinuar = document.getElementById('botonContinuar');
const botonMenuPausa = document.getElementById('botonMenuPausa');
const botonReintentar = document.getElementById('botonReintentar');
const botonMenuGameOver = document.getElementById('botonMenuGameOver');

// HUD
const puntuacionActual = document.getElementById('puntuacionActual');
const vidasActuales = document.getElementById('vidasActuales');
const mejorPuntuacion = document.getElementById('mejorPuntuacion');
const mejorPuntuacionInicio = document.getElementById('mejorPuntuacionInicio');
const puntuacionFinal = document.getElementById('puntuacionFinal');
const mejorPuntuacionFinal = document.getElementById('mejorPuntuacionFinal');
const barraVida = document.getElementById('barraVida');

// Configuración del juego
const CONFIG = {
    ancho: 800,
    alto: 600,
    gravedadInicial: 0.3,
    gravedadMaxima: 0.8,
    velocidadHorizontal: 5,
    vidaMaxima: 100,
    vidasIniciales: 3
};

// Estado del juego
let estadoJuego = {
    jugando: false,
    pausado: false,
    puntuacion: 0,
    vidas: CONFIG.vidasIniciales,
    vidaActual: CONFIG.vidaMaxima,
    mejorPuntuacion: 0,
    distanciaRecorrida: 0,
    tiempoInicio: 0,
    nivelDificultad: 1
};

// Pelota del jugador
let pelota = {
    x: CONFIG.ancho / 2,
    y: 100,
    radio: 15,
    velocidadX: 0,
    velocidadY: 0,
    color: '#fbbf24',
    trail: [] // rastro de la pelota para efecto visual
};

// Arrays de elementos del juego
let plataformas = [];
let enemigos = [];
let proyectiles = [];
let particulas = [];

// Control de teclas
let teclas = {
    izquierda: false,
    derecha: false
};

// Sistema de sonido
let sonidos = {
    rebotar: cargarSonido('assets/sounds/rebotar.mp3'),
    daño: cargarSonido('assets/sounds/daño.mp3'),
    gameOver: cargarSonido('assets/sounds/gameover.mp3'),
    musicaFondo: cargarSonido('assets/sounds/musica_fondo.mp3')
};

// ========================================
// FUNCIONES AUXILIARES
// ========================================

function cargarSonido(ruta) {
    // intento cargar el sonido, si no existe no pasa nada
    try {
        const audio = new Audio(ruta);
        audio.volume = 0.3;
        return audio;
    } catch (error) {
        return null;
    }
}

function reproducirSonido(sonido) {
    if (sonido) {
        sonido.currentTime = 0;
        sonido.play().catch(() => {});
    }
}

function obtenerMejorPuntuacion() {
    const mejor = localStorage.getItem('mejorPuntuacion');
    return mejor ? parseInt(mejor) : 0;
}

function guardarMejorPuntuacion(puntuacion) {
    const mejorActual = obtenerMejorPuntuacion();
    if (puntuacion > mejorActual) {
        localStorage.setItem('mejorPuntuacion', puntuacion);
        return true;
    }
    return false;
}

// numero aleatorio entre min y max
function aleatorio(min, max) {
    return Math.random() * (max - min) + min;
}

// ========================================
// INICIALIZACIÓN
// ========================================

function inicializarJuego() {
    // resetear estado del juego
    estadoJuego.puntuacion = 0;
    estadoJuego.vidas = CONFIG.vidasIniciales;
    estadoJuego.vidaActual = CONFIG.vidaMaxima;
    estadoJuego.distanciaRecorrida = 0;
    estadoJuego.tiempoInicio = Date.now();
    estadoJuego.nivelDificultad = 1;
    estadoJuego.jugando = true;
    estadoJuego.pausado = false;

    // resetear pelota
    pelota.x = CONFIG.ancho / 2;
    pelota.y = 100;
    pelota.velocidadX = 0;
    pelota.velocidadY = 0;
    pelota.trail = [];

    // limpiar arrays
    plataformas = [];
    enemigos = [];
    proyectiles = [];
    particulas = [];

    // generar plataformas iniciales
    generarPlataformasIniciales();

    // cargar mejor puntuación
    estadoJuego.mejorPuntuacion = obtenerMejorPuntuacion();
    actualizarHUD();

    // reproducir música de fondo
    if (sonidos.musicaFondo) {
        sonidos.musicaFondo.loop = true;
        sonidos.musicaFondo.play().catch(() => {});
    }
}

function generarPlataformasIniciales() {
    // crear primera plataforma segura bajo la pelota
    plataformas.push({
        x: CONFIG.ancho / 2 - 60,
        y: 250,
        ancho: 120,
        alto: 15,
        tipo: 'solida',
        color: '#8b5cf6',
        velocidad: 0
    });

    // generar más plataformas hacia abajo
    let yActual = 250;
    for (let i = 0; i < 15; i++) {
        yActual += aleatorio(80, 120);
        generarPlataforma(yActual);
    }
}

function generarPlataforma(y) {
    const tipos = ['solida', 'solida', 'solida', 'fragil', 'movil'];
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];

    const ancho = aleatorio(80, 150);
    const x = aleatorio(50, CONFIG.ancho - ancho - 50);

    let plataforma = {
        x: x,
        y: y,
        ancho: ancho,
        alto: 15,
        tipo: tipo,
        tiempoRomper: null,
        velocidad: 0,
        direccion: 1
    };

    // configurar según tipo
    if (tipo === 'fragil') {
        plataforma.color = '#f59e0b';
    } else if (tipo === 'movil') {
        plataforma.color = '#10b981';
        plataforma.velocidad = aleatorio(1, 2);
        plataforma.direccion = Math.random() > 0.5 ? 1 : -1;
    } else {
        plataforma.color = '#8b5cf6';
    }

    // algunas plataformas con púas (zona peligrosa)
    if (Math.random() < 0.2 && tipo === 'solida') {
        plataforma.tienePuas = true;
    }

    plataformas.push(plataforma);
}

// ========================================
// FÍSICA Y ACTUALIZACIÓN
// ========================================

function actualizarFisica() {
    if (!estadoJuego.jugando || estadoJuego.pausado) return;

    // calcular gravedad progresiva basada en dificultad
    const gravedad = Math.min(
        CONFIG.gravedadInicial + (estadoJuego.nivelDificultad * 0.05),
        CONFIG.gravedadMaxima
    );

    // aplicar gravedad
    pelota.velocidadY += gravedad;

    // movimiento horizontal con teclas
    if (teclas.izquierda) {
        pelota.velocidadX = -CONFIG.velocidadHorizontal;
    } else if (teclas.derecha) {
        pelota.velocidadX = CONFIG.velocidadHorizontal;
    } else {
        // inercia: reducir velocidad horizontal gradualmente
        pelota.velocidadX *= 0.85;
    }

    // actualizar posición
    pelota.x += pelota.velocidadX;
    pelota.y += pelota.velocidadY;

    // límites horizontales (la pelota rebota en los bordes)
    if (pelota.x - pelota.radio < 0) {
        pelota.x = pelota.radio;
        pelota.velocidadX *= -0.5;
    }
    if (pelota.x + pelota.radio > CONFIG.ancho) {
        pelota.x = CONFIG.ancho - pelota.radio;
        pelota.velocidadX *= -0.5;
    }

    // actualizar trail de la pelota
    pelota.trail.push({ x: pelota.x, y: pelota.y });
    if (pelota.trail.length > 10) {
        pelota.trail.shift();
    }

    // mover la cámara con la pelota (scroll vertical)
    if (pelota.y > CONFIG.alto / 2) {
        const desplazamiento = pelota.y - CONFIG.alto / 2;
        pelota.y = CONFIG.alto / 2;

        // mover todas las plataformas hacia arriba
        plataformas.forEach(plat => {
            plat.y -= desplazamiento;
        });

        // mover enemigos y proyectiles
        enemigos.forEach(enemigo => {
            enemigo.y -= desplazamiento;
        });
        proyectiles.forEach(proyectil => {
            proyectil.y -= desplazamiento;
        });

        // incrementar distancia recorrida y puntuación
        estadoJuego.distanciaRecorrida += desplazamiento;
        estadoJuego.puntuacion = Math.floor(estadoJuego.distanciaRecorrida / 10);

        // aumentar dificultad cada 500 puntos
        estadoJuego.nivelDificultad = Math.floor(estadoJuego.puntuacion / 500) + 1;

        // generar nuevas plataformas cuando sea necesario
        const plataformaMasBaja = plataformas.reduce((min, plat) =>
            plat.y > min ? plat.y : min, 0);

        if (plataformaMasBaja < CONFIG.alto + 200) {
            generarPlataforma(plataformaMasBaja + aleatorio(80, 120));
        }
    }

    // eliminar plataformas que salieron de la pantalla
    plataformas = plataformas.filter(plat => plat.y > -50);

    // actualizar plataformas móviles
    plataformas.forEach(plat => {
        if (plat.tipo === 'movil') {
            plat.x += plat.velocidad * plat.direccion;

            // cambiar dirección al tocar los bordes
            if (plat.x < 0 || plat.x + plat.ancho > CONFIG.ancho) {
                plat.direccion *= -1;
            }
        }

        // plataforma frágil con timer
        if (plat.tipo === 'fragil' && plat.tiempoRomper !== null) {
            if (Date.now() - plat.tiempoRomper > 800) {
                plat.rota = true;
            }
        }
    });

    // eliminar plataformas rotas
    plataformas = plataformas.filter(plat => !plat.rota);

    // verificar si la pelota cayó fuera de la pantalla (muerte)
    if (pelota.y - pelota.radio > CONFIG.alto + 100) {
        perderVida();
    }

    // actualizar enemigos
    actualizarEnemigos();

    // actualizar proyectiles
    actualizarProyectiles();

    // actualizar partículas
    actualizarParticulas();

    // detectar colisiones
    detectarColisiones();

    // actualizar HUD
    actualizarHUD();
}

// ========================================
// COLISIONES
// ========================================

function detectarColisiones() {
    // colisión con plataformas
    plataformas.forEach(plat => {
        if (pelota.velocidadY > 0) { // solo cuando cae
            if (pelota.x + pelota.radio > plat.x &&
                pelota.x - pelota.radio < plat.x + plat.ancho &&
                pelota.y + pelota.radio > plat.y &&
                pelota.y + pelota.radio < plat.y + plat.alto + 10) {

                // rebote
                pelota.y = plat.y - pelota.radio;
                pelota.velocidadY = -8; // fuerza del rebote

                reproducirSonido(sonidos.rebotar);

                // crear partículas de impacto
                crearParticulas(pelota.x, plat.y, plat.color);

                // plataforma frágil empieza a romperse
                if (plat.tipo === 'fragil' && plat.tiempoRomper === null) {
                    plat.tiempoRomper = Date.now();
                }

                // verificar si tiene púas
                if (plat.tienePuas) {
                    recibirDaño(20);
                }
            }
        }
    });

    // colisión con proyectiles
    proyectiles.forEach((proyectil, index) => {
        const distancia = Math.hypot(pelota.x - proyectil.x, pelota.y - proyectil.y);
        if (distancia < pelota.radio + proyectil.radio) {
            recibirDaño(15);
            proyectiles.splice(index, 1);
            crearParticulas(proyectil.x, proyectil.y, '#ef4444');
        }
    });
}

// ========================================
// ENEMIGOS Y PROYECTILES
// ========================================

function actualizarEnemigos() {
    // generar enemigos ocasionalmente
    if (Math.random() < 0.01 && enemigos.length < 3) {
        const lado = Math.random() > 0.5 ? 'izquierda' : 'derecha';
        enemigos.push({
            x: lado === 'izquierda' ? -30 : CONFIG.ancho + 30,
            y: aleatorio(100, CONFIG.alto - 100),
            ancho: 25,
            alto: 20,
            velocidad: lado === 'izquierda' ? 2 : -2,
            color: '#ef4444',
            ultimoDisparo: Date.now()
        });
    }

    // actualizar posición y disparos
    enemigos.forEach((enemigo, index) => {
        enemigo.x += enemigo.velocidad;

        // disparar cada 2 segundos
        if (Date.now() - enemigo.ultimoDisparo > 2000) {
            dispararProyectil(enemigo);
            enemigo.ultimoDisparo = Date.now();
        }

        // eliminar si sale de pantalla
        if (enemigo.x < -50 || enemigo.x > CONFIG.ancho + 50) {
            enemigos.splice(index, 1);
        }
    });
}

function dispararProyectil(enemigo) {
    // calcular dirección hacia la pelota
    const dx = pelota.x - enemigo.x;
    const dy = pelota.y - enemigo.y;
    const distancia = Math.hypot(dx, dy);

    proyectiles.push({
        x: enemigo.x,
        y: enemigo.y,
        radio: 5,
        velocidadX: (dx / distancia) * 4,
        velocidadY: (dy / distancia) * 4,
        color: '#f87171'
    });
}

function actualizarProyectiles() {
    proyectiles.forEach((proyectil, index) => {
        proyectil.x += proyectil.velocidadX;
        proyectil.y += proyectil.velocidadY;

        // eliminar si sale de pantalla
        if (proyectil.x < 0 || proyectil.x > CONFIG.ancho ||
            proyectil.y < 0 || proyectil.y > CONFIG.alto) {
            proyectiles.splice(index, 1);
        }
    });
}

// ========================================
// SISTEMA DE VIDAS Y DAÑO
// ========================================

function recibirDaño(cantidad) {
    estadoJuego.vidaActual -= cantidad;
    reproducirSonido(sonidos.daño);

    if (estadoJuego.vidaActual <= 0) {
        perderVida();
    }

    actualizarBarraVida();
}

function perderVida() {
    estadoJuego.vidas--;

    if (estadoJuego.vidas <= 0) {
        finalizarJuego();
    } else {
        // resetear posición y vida
        pelota.x = CONFIG.ancho / 2;
        pelota.y = 100;
        pelota.velocidadX = 0;
        pelota.velocidadY = 0;
        estadoJuego.vidaActual = CONFIG.vidaMaxima;
        actualizarBarraVida();
    }
}

function actualizarBarraVida() {
    const porcentaje = Math.max(0, (estadoJuego.vidaActual / CONFIG.vidaMaxima) * 100);
    barraVida.style.width = porcentaje + '%';
}

// ========================================
// PARTÍCULAS (EFECTOS VISUALES)
// ========================================

function crearParticulas(x, y, color) {
    for (let i = 0; i < 8; i++) {
        particulas.push({
            x: x,
            y: y,
            velocidadX: aleatorio(-3, 3),
            velocidadY: aleatorio(-3, 3),
            radio: aleatorio(2, 4),
            color: color,
            vida: 30
        });
    }
}

function actualizarParticulas() {
    particulas.forEach((particula, index) => {
        particula.x += particula.velocidadX;
        particula.y += particula.velocidadY;
        particula.vida--;

        if (particula.vida <= 0) {
            particulas.splice(index, 1);
        }
    });
}

// ========================================
// RENDERIZADO
// ========================================

function dibujar() {
    // limpiar canvas con degradado
    const gradiente = ctx.createLinearGradient(0, 0, 0, CONFIG.alto);
    gradiente.addColorStop(0, '#1e1b4b');
    gradiente.addColorStop(1, '#312e81');
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, CONFIG.ancho, CONFIG.alto);

    // dibujar trail de la pelota
    dibujarTrail();

    // dibujar plataformas
    dibujarPlataformas();

    // dibujar enemigos
    dibujarEnemigos();

    // dibujar proyectiles
    dibujarProyectiles();

    // dibujar partículas
    dibujarParticulas();

    // dibujar pelota
    dibujarPelota();
}

function dibujarTrail() {
    pelota.trail.forEach((punto, index) => {
        const alpha = index / pelota.trail.length;
        ctx.fillStyle = `rgba(251, 191, 36, ${alpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(punto.x, punto.y, pelota.radio * 0.8, 0, Math.PI * 2);
        ctx.fill();
    });
}

function dibujarPelota() {
    // sombra
    ctx.shadowBlur = 20;
    ctx.shadowColor = pelota.color;

    // gradiente radial para la pelota
    const gradiente = ctx.createRadialGradient(
        pelota.x - 5, pelota.y - 5, 0,
        pelota.x, pelota.y, pelota.radio
    );
    gradiente.addColorStop(0, '#fef08a');
    gradiente.addColorStop(1, pelota.color);

    ctx.fillStyle = gradiente;
    ctx.beginPath();
    ctx.arc(pelota.x, pelota.y, pelota.radio, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
}

function dibujarPlataformas() {
    plataformas.forEach(plat => {
        // efecto visual si está por romperse
        if (plat.tipo === 'fragil' && plat.tiempoRomper !== null) {
            const tiempo = Date.now() - plat.tiempoRomper;
            const vibracion = Math.sin(tiempo * 0.05) * 2;
            plat.y += vibracion;
        }

        // dibujar plataforma
        ctx.fillStyle = plat.color;
        ctx.fillRect(plat.x, plat.y, plat.ancho, plat.alto);

        // borde brillante
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(plat.x, plat.y, plat.ancho, plat.alto);

        // dibujar púas si las tiene
        if (plat.tienePuas) {
            ctx.fillStyle = '#ef4444';
            for (let i = 0; i < plat.ancho; i += 15) {
                ctx.beginPath();
                ctx.moveTo(plat.x + i, plat.y);
                ctx.lineTo(plat.x + i + 7, plat.y - 8);
                ctx.lineTo(plat.x + i + 14, plat.y);
                ctx.fill();
            }
        }
    });
}

function dibujarEnemigos() {
    enemigos.forEach(enemigo => {
        ctx.fillStyle = enemigo.color;
        ctx.fillRect(enemigo.x, enemigo.y, enemigo.ancho, enemigo.alto);

        // ojo del drone
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(enemigo.x + enemigo.ancho / 2, enemigo.y + enemigo.alto / 2, 5, 0, Math.PI * 2);
        ctx.fill();
    });
}

function dibujarProyectiles() {
    proyectiles.forEach(proyectil => {
        ctx.fillStyle = proyectil.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = proyectil.color;
        ctx.beginPath();
        ctx.arc(proyectil.x, proyectil.y, proyectil.radio, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    });
}

function dibujarParticulas() {
    particulas.forEach(particula => {
        const alpha = particula.vida / 30;
        ctx.fillStyle = particula.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
        ctx.beginPath();
        ctx.arc(particula.x, particula.y, particula.radio, 0, Math.PI * 2);
        ctx.fill();
    });
}

// ========================================
// HUD Y UI
// ========================================

function actualizarHUD() {
    puntuacionActual.textContent = estadoJuego.puntuacion;
    vidasActuales.textContent = estadoJuego.vidas;
    mejorPuntuacion.textContent = estadoJuego.mejorPuntuacion;
}

// ========================================
// CONTROL DE PANTALLAS
// ========================================

function mostrarPantallaInicio() {
    pantallaInicio.classList.remove('oculto');
    pantallaJuego.classList.add('oculto');
    pantallaPausa.classList.add('oculto');
    pantallaGameOver.classList.add('oculto');

    // mostrar mejor puntuación
    mejorPuntuacionInicio.textContent = obtenerMejorPuntuacion();
}

function mostrarPantallaJuego() {
    pantallaInicio.classList.add('oculto');
    pantallaJuego.classList.remove('oculto');
    pantallaPausa.classList.add('oculto');
    pantallaGameOver.classList.add('oculto');
}

function pausarJuego() {
    if (!estadoJuego.jugando) return;

    estadoJuego.pausado = !estadoJuego.pausado;

    if (estadoJuego.pausado) {
        pantallaPausa.classList.remove('oculto');
        if (sonidos.musicaFondo) {
            sonidos.musicaFondo.pause();
        }
    } else {
        pantallaPausa.classList.add('oculto');
        if (sonidos.musicaFondo) {
            sonidos.musicaFondo.play().catch(() => {});
        }
    }
}

function finalizarJuego() {
    estadoJuego.jugando = false;

    // guardar mejor puntuación
    guardarMejorPuntuacion(estadoJuego.puntuacion);

    // mostrar pantalla de game over
    puntuacionFinal.textContent = estadoJuego.puntuacion;
    mejorPuntuacionFinal.textContent = obtenerMejorPuntuacion();
    pantallaGameOver.classList.remove('oculto');

    reproducirSonido(sonidos.gameOver);

    if (sonidos.musicaFondo) {
        sonidos.musicaFondo.pause();
        sonidos.musicaFondo.currentTime = 0;
    }
}

// ========================================
// GAME LOOP
// ========================================

function gameLoop() {
    if (estadoJuego.jugando && !estadoJuego.pausado) {
        actualizarFisica();
    }

    if (estadoJuego.jugando) {
        dibujar();
    }

    requestAnimationFrame(gameLoop);
}

// ========================================
// EVENT LISTENERS
// ========================================

// Teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') teclas.izquierda = true;
    if (e.key === 'ArrowRight') teclas.derecha = true;
    if (e.key === 'p' || e.key === 'P') pausarJuego();
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') teclas.izquierda = false;
    if (e.key === 'ArrowRight') teclas.derecha = false;
});

// Botones de inicio
botonJugar.addEventListener('click', () => {
    inicializarJuego();
    mostrarPantallaJuego();
});

botonPuntuaciones.addEventListener('click', () => {
    tablaPuntuaciones.classList.remove('oculto');
});

botonCerrarPuntuaciones.addEventListener('click', () => {
    tablaPuntuaciones.classList.add('oculto');
});

// Botones de pausa
botonPausa.addEventListener('click', pausarJuego);
botonContinuar.addEventListener('click', pausarJuego);

botonMenuPausa.addEventListener('click', () => {
    estadoJuego.jugando = false;
    estadoJuego.pausado = false;
    if (sonidos.musicaFondo) {
        sonidos.musicaFondo.pause();
        sonidos.musicaFondo.currentTime = 0;
    }
    mostrarPantallaInicio();
});

// Botones de game over
botonReintentar.addEventListener('click', () => {
    inicializarJuego();
    mostrarPantallaJuego();
});

botonMenuGameOver.addEventListener('click', () => {
    mostrarPantallaInicio();
});

// ========================================
// INICIAR APLICACIÓN
// ========================================

mostrarPantallaInicio();
gameLoop();
