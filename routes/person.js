import express from 'express';

const router = express.Router();

// Definir las rutas para este archivo en particular
router.get('/', (req, res) => {
    res.send('¡Hola desde /users!');
});

export default router;

