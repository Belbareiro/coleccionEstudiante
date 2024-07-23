const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Conectar a MongoDB
mongoose.connect('mongodb://localhost/my_first_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));


const estudianteSchema = new mongoose.Schema({
    nombre: String,
    home_state: String,
    lucky_number: Number,
    cumpleaños: {
        mes: Number,
        día: Number,
        año: Number
    },
    intereses: [String],
    belts_earned: Number,
    updated_on: Date
});

// Crear el modelo de estudiante
const Estudiante = mongoose.model('Estudiante', estudianteSchema);


app.use(express.json());

// Ruta para obtener todos los estudiantes
app.get('/estudiantes', async (req, res) => {
    try {
        const estudiantes = await Estudiante.find();
        res.json(estudiantes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.post('/estudiantes', async (req, res) => {
    const estudiante = new Estudiante({
        nombre: req.body.nombre,
        home_state: req.body.home_state,
        lucky_number: req.body.lucky_number,
        cumpleaños: req.body.cumpleaños,
        intereses: req.body.intereses,
        belts_earned: 0,
        updated_on: new Date()
    });

    try {
        const nuevoEstudiante = await estudiante.save();
        res.status(201).json(nuevoEstudiante);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});