const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27018/presentation-db';
mongoose.connect(mongoURI)
  .then(async () => {
    console.log('✅ MongoDB Connected on Port 27018');
    
    // Seed initial data if empty (Presentation logic)
    const Task = require('./server/models/Task');
    const count = await Task.countDocuments();
    if (count === 0) {
      await Task.create([
        { title: '🚀 Configurar Proyecto MEAN', description: 'Instalar dependencias y configurar servidor.', completed: true },
        { title: '💻 Desarrollar API REST', description: 'Crear rutas de Express y modelos de Mongoose.', completed: true },
        { title: '🎨 Diseñar Frontend', description: 'Implementar UI premium con Angular y Glassmorphism.', completed: false }
      ]);
      console.log('🌱 Seed: Tareas de ejemplo insertadas');
    }
  })
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/tasks', require('./server/routes/tasks'));

// Root route
app.get('/', (req, res) => {
  res.send('MEAN Presentation API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Internal Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
