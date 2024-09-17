const cron = require('node-cron');
const speedTest = require('speedtest-net');
const { SpeedTestResult, Config } = require('./models');

const runSpeedTest = async () => {
  try {
    console.log('Iniciando o teste de velocidade...');
    
    const test = speedTest({ maxTime: 5000 });

    test.on('data', async data => {
      console.log('Resultado do teste de velocidade:', data);

      const result = {
        downloadSpeed: data.download.bandwidth / 1e6, // Convertendo para Mbps
        uploadSpeed: data.upload.bandwidth / 1e6, // Convertendo para Mbps
        ping: data.ping.latency,
        timestamp: new Date().toISOString()
      };

      try {
        await SpeedTestResult.create(result);
        console.log('Resultado do teste de velocidade salvo com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar resultado do teste de velocidade:', error);
      }
    });

    test.on('error', error => {
      console.error('Erro no teste de velocidade:', error);
    });
  } catch (error) {
    console.error('Erro ao realizar o teste de velocidade:', error);
  }
};

// Função para configurar o cron job com o intervalo do banco de dados
const setupCronJob = async () => {
  try {
    const config = await Config.findOne();
    const interval = config ? config.interval : 1; // Valor padrão de 1 minuto

    console.log(`Configurando tarefa cron para executar a cada ${interval} minuto(s).`);

    cron.schedule(`*/${interval} * * * *`, () => {
      runSpeedTest();
    });
  } catch (error) {
    console.error('Erro ao configurar tarefa cron:', error);
  }
};

setupCronJob();
