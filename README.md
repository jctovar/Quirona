🌸 Proyecto Quirona Empower Her

Bienvenida al repositorio del proyecto Quirona Empower Her.
Este documento te guiará paso a paso para instalar las herramientas necesarias, clonar el repositorio y ejecutar el proyecto correctamente en tu computadora.

Instalar Node.js
Node.js es necesario para ejecutar el proyecto y manejar las dependencias.

Ingresa a la página oficial: https://nodejs.org/

Descarga la versión LTS (recomendada).

Ejecuta el instalador y deja las opciones por defecto.

Verifica que la instalación se haya realizado correctamente con los comandos:
node -v
npm -v
Si ambos comandos muestran una versión, todo está correcto.

Instalar Git
Git permite gestionar el control de versiones y clonar el repositorio del proyecto.

Descarga Git desde: https://git-scm.com/downloads

Instálalo dejando las opciones por defecto y asegúrate de marcar “Add Git to PATH”.

Verifica la instalación con:
git --version

Vincular GitHub con Visual Studio Code

Abre Visual Studio Code.

Dirígete a la pestaña Control de código fuente (ícono de ramita o con Ctrl + Shift + G).

Inicia sesión con tu cuenta de GitHub (clic en “Iniciar sesión con GitHub” o “Publicar en GitHub”).

Autoriza a Visual Studio Code para acceder a tu cuenta.

Comprueba que tu usuario de GitHub aparezca correctamente en la esquina inferior izquierda.

Clonar el repositorio
Con Git instalado y GitHub vinculado, ahora puedes clonar el proyecto.

Abre una terminal en Visual Studio Code o PowerShell.

Ejecuta el comando:
git clone https://github.com/leyvaortiznazli/quirona-empower-her.git

Entra en la carpeta del proyecto:
cd quirona-empower-her

Instalar dependencias
Antes de ejecutar el proyecto, instala todas las dependencias necesarias con:
npm install
Este comando descargará los paquetes definidos en el archivo package.json.

Ejecutar el proyecto
Una vez instaladas las dependencias, inicia el proyecto con:
npm run dev
El servidor se iniciará automáticamente.
Podrás abrir el proyecto en tu navegador en una dirección similar a:
http://localhost:5173

Solución de posibles errores
Si encuentras errores, revisa lo siguiente:

Asegúrate de tener Node.js y Git correctamente instalados.

Verifica que estás dentro de la carpeta del proyecto antes de ejecutar los comandos (cd quirona-empower-her).

Si el error está relacionado con permisos o versiones, intenta ejecutar:
npm cache clean --force
npm install