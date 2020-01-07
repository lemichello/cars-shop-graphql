const { RESTDataSource } = require('apollo-datasource-rest');
const config = require('../config/index');

class ModelsDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = config.apiUrl;
  }

  async getModelsCount() {
    return await this.get(`models/count`);
  }

  async getModels(vendorId, pagination) {
    return await this.get(`models/${vendorId}`, pagination);
  }
}

module.exports = ModelsDataSource;
