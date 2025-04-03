const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Permitir requisições do frontend

// Dados estáticos para exibição no frontend
const dados = {
    titulo: "Bem-vindo ao DII+",
    mensagem: "Este é um sistema para monitoramento da saúde intestinal."
};

// Rota GET para fornecer os dados ao frontend
app.get('/dados', (req, res) => {
    res.json(dados);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
