const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite ler JSON no corpo das requisições
app.use(express.static(__dirname)); // Serve arquivos estáticos

// Mock user (em produção, isso viria de um banco de dados)
const USER = {
  email: 'admin@intesticare.com',
  senha: '123456' // em produção, a senha seria criptografada
};

// Rota pública de informações
app.get('/api/info', (req, res) => {
  res.json({
    nome: "IntestiCare",
    descricao: "Seu app de cuidados com a saúde intestinal",
    contato: "contato@intesticare.com"
  });
});

// Rota de login
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  if (email === USER.email && senha === USER.senha) {
    // Aqui poderia gerar um JWT ou similar
    res.json({
      sucesso: true,
      mensagem: "Login realizado com sucesso!",
      token: "fake-jwt-token" // apenas ilustrativo
    });
  } else {
    res.status(401).json({
      sucesso: false,
      mensagem: "Email ou senha inválidos."
    });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});



// Rota de cadastro (mock simples)
app.post('/api/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "Todos os campos são obrigatórios."
    });
  }

  // Em produção, salvaríamos o usuário em um banco de dados
  res.json({
    sucesso: true,
    mensagem: "Cadastro realizado com sucesso!",
    usuario: { nome, email }
  });
});
