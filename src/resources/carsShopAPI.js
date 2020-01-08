const { RESTDataSource } = require('apollo-datasource-rest');
const config = require('../config/index');

class CarsShopAPI extends RESTDataSource {
  constructor(props) {
    super(props);
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

  async getEngineVolumes() {
    return await this.get(`enginevolumes`);
  }

  async addEngineVolume(engineVolume) {
    try {
      await this.post('enginevolumes', { ...engineVolume });
    } catch (e) {
      throw e;
    }
  }

  async getModelsCount() {
    return await this.get(`models/count`);
  }

  async getModels(vendorId, pagination) {
    return await this.get(`models/${vendorId}`, pagination);
  }

  async addModel(model) {
    try {
      await this.post('models', { ...model });
    } catch (e) {
      throw e;
    }
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

module.exports = CarsShopAPI;
