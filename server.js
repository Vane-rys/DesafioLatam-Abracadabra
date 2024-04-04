const express = require('express');
const app = express();
const PORT = 3000;

// Definir la carpeta "assets" como carpeta pública del servidor
app.use(express.static('assets'));

// Arreglo de nombres
const nombres = [
    "Juan",
    "Jocelyn",
    "Astrid",
    "María",
    "Ignacia",
    "Javier",
    "Brian"
];

// Ruta para obtener el arreglo de nombres en formato JSON
app.get("/abracadabra/usuarios", (req, res) => {
    res.json({ usuarios: nombres });
});

// Middleware para validar si el usuario existe en el arreglo de nombres
function validarUsuario(req, res, next) {
    const usuario = req.params.usuario;
    if (nombres.includes(usuario)) {
        next(); // Permitir el paso a la siguiente ruta
    } else {
        res.sendFile(__dirname + '/assets/who.jpeg'); // Devolver la imagen "who.jpeg" si el usuario no existe
    }
}

// Ruta /abracadabra/juego/:usuario que utiliza el middleware para validar el usuario
app.get('/abracadabra/juego/:usuario', validarUsuario, (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Aquí envia la página HTML correspondiente
});

// Ruta /abracadabra/conejo/:n que devuelve la imagen del conejo o de Voldemort según el número generado
app.get("/abracadabra/conejo/:n", (req, res) => {
    // Paso 2
    const n = Math.floor(Math.random() * (4 - 1)) + 1;
    // Paso 3
    const numero = req.params.numero;
    // Paso 3
    numero == n //si numero es igual a n
    ? res.send("/assets/conejito.jpg") // signo de interrogacion significa entonces
    : res.send("/assets/voldemort.jpg"); // dos puntos significan si no
});

// Ruta genérica para manejar rutas no definidas
app.get("*", (req, res) => {
    res.status(404).send("Esta página no existe...");
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
