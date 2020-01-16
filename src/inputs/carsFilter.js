const typedef = `
  input CarsFilterInput {
    modelsId: [Int]!
    colorId: Int
    engineVolumeId: Int
    price: PriceFilterInput
  }
`;

module.exports = {
  typedef
};
