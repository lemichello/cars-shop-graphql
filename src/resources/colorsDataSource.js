const { RESTDataSource } = require('apollo-datasource-rest');
const config = require('../config/index');

class ColorsDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = config.apiUrl;
  }

  async getColors() {
    return await this.get(`colors`);
  }
}

module.exports = ColorsDataSource;
