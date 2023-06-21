import express from 'express';

const router = express.Router();

// Definir las rutas para este archivo en particular
router.get('/getPerson', (req, res) => {
    res.send('¡Hola desde /users!');
});

router.get('/getPersons', (req, res) => {
    res.send('Hello')
})

export { router }

