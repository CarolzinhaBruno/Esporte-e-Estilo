const { Client } = require('pg');

const client = new Client({
    user: 'seu_usuario',
    host: 'seu_host',
    database: 'seu_banco',
    password: 'sua_senha',
    port: 5432,
});

async function connectDB() {
    try {
        await client.connect();
        console.log('Conectado ao PostgreSQL');
    } catch (error) {
        console.error('Erro ao conectar:', error);
        throw error;
    }
}

async function disconnectDB() {
    try {
        await client.end();
        console.log('Desconectado do PostgreSQL');
    } catch (error) {
        console.error('Erro ao desconectar:', error);
        throw error;
    }
}

module.exports = { client, connectDB, disconnectDB };