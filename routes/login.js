const express = require('express');
const router = express.Router();

// Usuário simulado (em produção, isso viria do banco de dados)
const usuarioFicticio = {
  email: "usuario@exemplo.com",
  senha: "senha123" // Em produção, senhas devem estar criptografadas
};

// Rota de login (POST)
router.post('/', (req, res) => {
  const { email, senha } = req.body;

  // Validação básica
  if (!email || !senha) {
    return res.status(400).json({ mensagem: "Email e senha são obrigatórios." });
  }

  // Verificação de credenciais simulada
  if (email === usuarioFicticio.email && senha === usuarioFicticio.senha) {
    return res.status(200).json({ mensagem: "Login bem-sucedido", token: "fake-jwt-token" });
  } else {
    return res.status(401).json({ mensagem: "Credenciais inválidas." });
  }
});

module.exports = router;
