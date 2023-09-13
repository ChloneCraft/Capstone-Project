export const PlantsService = {
  getListOfPlants(plants) {
    return plants.filter((plant) => plant.type === "plant");
  },

  getAllMarkets(plants) {
    const plantMarkets = this.getListOfPlants(plants).map(
      (item) => item.market
    );
    return plantMarkets;
  },

  getOneMarket(plants, plantId) {
    return plants.find((item) => item._id === plantId).market;
  },

  getAmountAllMarketItems(markets) {
    const amounts = markets.map((market) =>
      getNumberOfItemsOnOneMarket(market)
    );
    return amounts.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  },

  calcMarketPrice(plants, plantId) {
    const amountAllPlants = this.getAmountAllMarketItems(
      this.getAllMarkets(plants)
    );
    const amountPlant = getNumberOfItemsOnOneMarket(
      getOneMarket(plants, plantId)
    );
    const deviation = (amountPlant / amountAllPlants - 0.2) * 100;
    const factor = (deviation ** 1.8 * (0.001 * deviation)) / 3;
    console.log("factor", factor);
  },
  testFunction(a, b) {
    const deviation = (a / b - 0.2) * 100;
    const factor = deviation * 2 ** 1.2 * 2;
    return 500 - factor;
  },

  getNumberOfItemsOnOneMarket(market) {
    const result = market
      .filter((item) => item.active)
      .map((item) => item.amount)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return result;
  },
};
