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

  // testFunction(a, b) {
  //   const deviation = (a / b - 0.2) * 100;
  //   const factor = deviation ** 2;
  //   if (deviation >= 0) {
  //     return 500 - factor;
  //   } else return 500 + 2 * factor;
  // },

  getNumberOfItemsOnOneMarket(market) {
    const result = market
      .filter((item) => item.active)
      .map((item) => item.amount)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return result;
  },
  getAmountAllMarketItems(markets) {
    const amounts = markets.map((market) =>
      this.getNumberOfItemsOnOneMarket(market)
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
    const amountPlant = this.getNumberOfItemsOnOneMarket(
      this.getOneMarket(plants, plantId)
    );
    const deviation = (amountPlant / amountAllPlants - 0.2) * 100;
    const factor = deviation ** 2;
    if (deviation >= 0) {
      return (500 - factor).toFixed();
    } else {
      return (500 + 2 * factor).toFixed();
    }
  },

  filterPlantsByRegion(plants, region) {
    switch (region) {
      case "Katara":
        return plants.filter(
          (plant) =>
            (plant.name === "Blueberry" || plant.name === "Teak Tree") &&
            plant.type === "plant"
        );
    }
  },
};
