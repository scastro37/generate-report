const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const logger = require('@condor-labs/logger');

const writeCsvFile = async (filePath, data) => {
  try {
    const headers = new Map();
    for (const element of data) {
      for (const key in element) {
        if (key !== 'action') {
          headers.set(key, { id: key, title: key });
        }
      }
    }
    const csvWriter = createCsvWriter({
      path: filePath,
      header: [...headers.values(), { id: 'action', title: 'action' }],
    });
    await csvWriter.writeRecords(data);
  } catch (error) {
    logger.log(error);
  }
};

module.exports = { writeCsvFile };
