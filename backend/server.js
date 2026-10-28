require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Endpoint simple de verificación (healthcheck)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'SICEN API', timestamp: new Date().toISOString() });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Recurso no encontrado' });
});

// Manejo centralizado de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ message: err.message || 'Error interno del servidor' });
});

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[SICEN] API escuchando en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('[SICEN] No fue posible iniciar el servidor:', err.message);
    process.exit(1);
  });

module.exports = app;
