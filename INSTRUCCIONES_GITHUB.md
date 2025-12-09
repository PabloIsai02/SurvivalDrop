# Guía: Manejar Múltiples Cuentas de GitHub

## 🎯 Solución Rápida (Recomendada para este proyecto)

### Paso 1: Crear Personal Access Token

1. Inicia sesión en GitHub como **PabloIsai02**
2. Ve a: https://github.com/settings/tokens
3. Click en **"Generate new token"** → **"Generate new token (classic)"**
4. Configuración:
   - **Note**: "SurvivalDrop Project"
   - **Expiration**: 90 days (o Custom)
   - **Scopes**: Marca ✅ **repo** (todo)
5. Click en **"Generate token"**
6. **¡COPIA EL TOKEN!** (solo se muestra una vez)
   - Se verá algo así: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Paso 2: Hacer Push con el Token

```bash
cd /Users/alanortiz/Universidad/SurvivalDrop

git push origin main

# Cuando pida credenciales:
Username: PabloIsai02
Password: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🔄 Método Alternativo: Cambiar Credenciales de macOS

### Limpiar credenciales guardadas:

```bash
# Opción 1: Borrar credencial específica
git credential-osxkeychain erase
host=github.com
protocol=https
# Presiona Enter dos veces

# Opción 2: Desde Keychain Access (manual)
# 1. Abre "Acceso a Llaveros" (Spotlight: Keychain Access)
# 2. Busca "github.com" en la barra de búsqueda
# 3. Encuentra las entradas de GitHub
# 4. Click derecho → Eliminar
# 5. Confirma con tu password de Mac
```

Después de limpiar, el próximo `git push` te pedirá nuevas credenciales.

---

## 🌟 Método Pro: Usar GitHub CLI

### Instalar GitHub CLI:

```bash
# Con Homebrew
brew install gh

# Verificar instalación
gh --version
```

### Configurar cuenta de PabloIsai02:

```bash
# 1. Cerrar sesión actual (si hay alguna)
gh auth logout

# 2. Iniciar sesión con PabloIsai02
gh auth login

# Responde:
# ? What account do you want to log into? GitHub.com
# ? What is your preferred protocol for Git operations? HTTPS
# ? Authenticate Git with your GitHub credentials? Yes
# ? How would you like to authenticate GitHub CLI? Login with a web browser

# Se abrirá el navegador, ingresa como PabloIsai02
```

### Hacer push:

```bash
cd /Users/alanortiz/Universidad/SurvivalDrop
git push origin main
# ✅ Usará automáticamente las credenciales de PabloIsai02
```

### Volver a tu cuenta (AlanOrtiz10) después:

```bash
gh auth logout
gh auth login
# Inicia sesión con tu cuenta nuevamente
```

---

## 🔐 Método Avanzado: SSH Keys para Múltiples Cuentas

Si quieres usar ambas cuentas permanentemente sin cambiar credenciales:

### 1. Generar SSH key para PabloIsai02:

```bash
# Generar nueva SSH key
ssh-keygen -t ed25519 -C "a22311049@uthermosillo.edu.mx" -f ~/.ssh/id_ed25519_pablo

# Iniciar ssh-agent
eval "$(ssh-agent -s)"

# Agregar la key al ssh-agent
ssh-add ~/.ssh/id_ed25519_pablo

# Copiar la key pública
cat ~/.ssh/id_ed25519_pablo.pub
# Copia todo el contenido
```

### 2. Agregar la key a GitHub:

1. Inicia sesión como **PabloIsai02** en GitHub
2. Ve a: https://github.com/settings/keys
3. Click en **"New SSH key"**
4. Title: "Mac - SurvivalDrop"
5. Pega la key pública
6. Click en **"Add SSH key"**

### 3. Configurar SSH config:

```bash
# Editar archivo config
nano ~/.ssh/config

# Agregar esta configuración:
```

```
# Cuenta personal (Alan)
Host github.com-alan
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519

# Cuenta de Pablo
Host github.com-pablo
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_pablo
```

### 4. Cambiar la URL del repositorio a SSH:

```bash
cd /Users/alanortiz/Universidad/SurvivalDrop

# Cambiar a SSH con el host específico
git remote set-url origin git@github.com-pablo:PabloIsai02/SurvivalDrop.git

# Hacer push (sin pedir credenciales!)
git push origin main
```

---

## 📝 Resumen: ¿Cuál método usar?

| Método | Dificultad | Cuándo usarlo |
|--------|-----------|---------------|
| **Personal Access Token** | ⭐ Fácil | Solo necesitas hacer push una vez |
| **GitHub CLI** | ⭐⭐ Media | Cambias de cuenta ocasionalmente |
| **SSH Keys** | ⭐⭐⭐ Avanzada | Trabajas con múltiples cuentas frecuentemente |

---

## ✅ Recomendación para este proyecto:

**Usa el Personal Access Token** (Método 1):
1. Crea el token como PabloIsai02
2. Haz push usando el token
3. Listo! ✨

Es simple, rápido y funciona perfectamente para un proyecto académico.
