const Config = require('../models/Config');

exports.getConfig = async (req, res) => {
  try {
    const config = await Config.findOne();
    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateConfig = async (req, res) => {
  try {
    const { interval } = req.body;
    const config = await Config.findOne();
    if (config) {
      config.interval = interval;
      await config.save();
    } else {
      await Config.create({ interval });
    }
    res.status(200).json({ message: 'Configuração atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
