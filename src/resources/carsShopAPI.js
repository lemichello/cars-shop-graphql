const { RESTDataSource } = require('apollo-datasource-rest');
const config = require('../config/index');

class CarsShopAPI extends RESTDataSource {
  constructor(props) {
    super(props);
    this.baseURL = config.apiUrl;
  }

  async getCarsCount(filter) {
    return await this.post('cars/count', { ...filter });
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
        `cars/filtered?index=${pagination.index}&size=${pagination.size}`,
        { ...filter }
      );
    }
    return await this.post(`cars/filtered`, { ...filter });
  }

  async getCarById(id) {
    return await this.get(`cars/${id}`);
  }

  async addCar(car) {
    try {
      return await this.post('cars', { ...car });
    } catch (e) {
      throw e;
    }
  }

  async updateCar(car) {
    try {
      return await this.put(`cars/${car.id}`, { ...car });
    } catch (e) {
      throw e;
    }
  }

  async getColors() {
    return await this.get(`colors`);
  }

  async addColor(color) {
    try {
      return await this.post('colors', { ...color });
    } catch (e) {
      throw e;
    }
  }

  async getEngineVolumes() {
    return await this.get(`enginevolumes`);
  }

  async addEngineVolume(engineVolume) {
    try {
      return await this.post('enginevolumes', { ...engineVolume });
    } catch (e) {
      throw e;
    }
  }

  async getModelsCount(vendorId) {
    return await this.get(`models/count/${vendorId}`);
  }

  async getModels(vendorId, pagination) {
    return await this.get(`models/${vendorId}`, pagination);
  }

  async addModel(model) {
    try {
      return await this.post('models', { ...model });
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
      return await this.post('vendors', { ...vendor });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = CarsShopAPI;
