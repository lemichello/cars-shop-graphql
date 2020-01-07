const { RESTDataSource } = require('apollo-datasource-rest');
const config = require('../config/index');

class EngineVolumesDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = config.apiUrl;
  }

  async getEngineVolumes() {
    return await this.get(`enginevolumes`);
  }
}

module.exports = EngineVolumesDataSource;
