require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const operacaoRoutes = require('./routes/operacaoRoutes');
const cotacaoRoutes = require('./routes/cotacaoRoutes');

const app = express();

// Configuração CORS mais robusta para produção
const corsOptions = {
  origin: ['https://swingtradenovo.netlify.app', 'http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/operacoes', operacaoRoutes);
app.use('/api/cotacoes', cotacaoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});