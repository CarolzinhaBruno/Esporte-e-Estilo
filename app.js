const express = require('express');
const bodyParser = require('body-parser');
const { client, connectDB, disconnectDB } = require('./conexao'); // Importe as funções de conexão

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/cadastrar-cliente', async (req, res) => {
    try {
        await connectDB(); // Conecte ao banco de dados
        const { nome, cpf_cnpj, data_nascimento, email, celular } = req.body;
        const result = await client.query(
            'INSERT INTO clientes (nome, cpf_cnpj, data_nascimento, email, celular) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nome, cpf_cnpj, data_nascimento, email, celular]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao cadastrar cliente' });
    } finally {
        await disconnectDB(); // Desconecte do banco de dados
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});