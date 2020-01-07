const { RESTDataSource } = require('apollo-datasource-rest');
const config = require('../config/index');

class CarsDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = config.apiUrl;
  }

  async getCarsCount() {
    return await this.get('cars/count');
  }

  async getMinMaxPrices() {
    return await this.get('cars/min-max-prices');
  }

  async getCars(pagination) {
    return await this.get('cars', pagination);
  }

  async getFilteredCars(filter, pagination) {
    if (pagination) {
      return await this.post(
        `cars/filtered?index=${pagination.index}&size=${pagination.size}`
      );
    }
    return await this.post(`cars/filtered`, filter);
  }
}

module.exports = CarsDataSource;
