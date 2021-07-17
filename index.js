const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const logger = require('@condor-labs/logger');

const writeCsvFile = async (filePath, data) => {
  try {
    const headers = new Map();
    for (const element of data.filter(Boolean)) {
      for (const key of Object.keys(element)) {
        if (key !== 'action' && key !== '$init') {
          headers.set(key, { id: key, title: key });
        }
      }
    }

    const csvWriter = createCsvWriter({
      path: filePath,
      header: [...headers.values(), { id: 'action', title: 'action' }],
    });
    await csvWriter.writeRecords(data.filter(Boolean));
  } catch (error) {
    logger.log(error);
  }
};

module.exports = { writeCsvFile };
