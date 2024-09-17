const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const cron = require('node-cron');
const speedTest = require('speedtest-net');
const { SpeedTestResult, Config } = require('./models');

// Inicializa o app
const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use('/', routes);

// Função para executar o teste de velocidade
const runSpeedTest = async () => {
    try {
        console.log('Iniciando o teste de velocidade...');
        const result = await speedTest({ acceptLicense: true, acceptGdpr: true });
        
        const data = {
            downloadSpeed: (result.download.bandwidth * 8) / 1e6, // Convertendo de bps para Mbps
            uploadSpeed: (result.upload.bandwidth * 8) / 1e6, // Convertendo de bps para Mbps
            ping: result.ping.latency,
            timestamp: new Date(result.timestamp)
        };

        await SpeedTestResult.create(data);
        console.log('Teste de velocidade salvo no banco de dados:', data);
    } catch (error) {
        console.error('Erro ao executar o teste de velocidade:', error);
    }
};

// Cron job para executar o teste de velocidade em intervalos configuráveis
const setupCronJob = async () => {
    const config = await Config.findOne();
    const interval = config ? config.interval : '*/30 * * * *'; // Padrão para cada 30 minutos

    cron.schedule(interval, runSpeedTest);
    console.log(`Cron job configurado para executar a cada: ${interval}`);
};

// Inicializa o cron job
setupCronJob();

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
