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

  async addColor(color) {
    try {
      await this.post('colors', { ...color });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = ColorsDataSource;
