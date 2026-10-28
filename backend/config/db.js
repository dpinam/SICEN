const mongoose = require('mongoose');

/**
 * Establece la conexión con la base de datos MongoDB Atlas usando Mongoose.
 * La cadena de conexión se toma de la variable de entorno MONGODB_URI
 * (ver .env.example).
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      'MONGODB_URI no está definida. Copie .env.example como .env y complete la cadena de conexión.'
    );
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(uri);

  console.log(`[SICEN] Conectado a MongoDB Atlas: ${mongoose.connection.name}`);

  mongoose.connection.on('error', (err) => {
    console.error('[SICEN] Error de conexión a MongoDB:', err.message);
  });
}

module.exports = connectDB;
