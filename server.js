const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27018/presentation-db';
mongoose.connect(mongoURI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Seed data if collection is empty
    const Task = require('./server/models/Task');
    const count = await Task.countDocuments();
    if (count === 0) {
      await Task.create([
        { title: 'Configurar Proyecto MEAN', description: 'Instalar dependencias y configurar servidor.', completed: true },
        { title: 'Desarrollar API REST', description: 'Crear rutas de Express y modelos de Mongoose.', completed: true },
        { title: 'Diseñar Frontend', description: 'Implementar UI premium con Angular y Glassmorphism.', completed: false }
      ]);
      console.log('Initial data seeded');
    }
  })
  .catch(err => console.error('Connection error:', err));

// API Routes
app.use('/api/tasks', require('./server/routes/tasks'));

app.get('/', (req, res) => {
  res.send('API is running');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
