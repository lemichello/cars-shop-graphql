const { RESTDataSource } = require('apollo-datasource-rest');
const config = require('../config/index');

class VendorsDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = config.apiUrl;
  }

  async getVendorsCount() {
    return await this.get('vendors/count');
  }

  async getVendors(pagination) {
    return await this.get('vendors', pagination);
  }

  async addVendor(vendor) {
    try {
      await this.post('vendors', { ...vendor });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = VendorsDataSource;
