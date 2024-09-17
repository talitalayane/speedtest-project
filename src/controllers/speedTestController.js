const { SpeedTestResult, Config } = require('../models');
const speedTest = require('speedtest-net');

exports.createSpeedTestResult = async (req, res) => {
  try {
    console.log('Iniciando o teste de velocidade...');
    const testResult = await speedTest({ acceptLicense: true, acceptGdpr: true });
    console.log('Resultado do teste de velocidade:', testResult);

    const downloadSpeed = testResult.download.bandwidth / 125000; // Convertendo para Mbps
    const uploadSpeed = testResult.upload.bandwidth / 125000; // Convertendo para Mbps
    const ping = testResult.ping.latency;
    const timestamp = testResult.timestamp;

    console.log('Dados convertidos:', { downloadSpeed, uploadSpeed, ping, timestamp });

    if (downloadSpeed && uploadSpeed && ping && timestamp) {
      const result = await SpeedTestResult.create({
        downloadSpeed: downloadSpeed,
        uploadSpeed: uploadSpeed,
        ping: ping,
        timestamp: timestamp
      });

      console.log('Registro criado:', result);
      res.status(201).json(result);
    } else {
      console.log('Dados do teste de velocidade inválidos');
      res.status(400).json({ error: 'Invalid speed test result' });
    }
  } catch (error) {
    console.error('Erro ao criar registro de teste de velocidade:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getSpeedTestResults = async (req, res) => {
  try {
    const results = await SpeedTestResult.findAll();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSpeedTestResult = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await SpeedTestResult.destroy({ where: { id } });
    if (result) {
      res.status(200).json({ message: 'Record deleted successfully' });
    } else {
      res.status(404).json({ mesge: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};