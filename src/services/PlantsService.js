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
            (plant.name === "Oak Tree Seed" || plant.name === "Potato Seed") &&
            plant.type === "seed"
        );
      case "Bray Island":
        return plants.filter(
          (plant) =>
            (plant.name === "Pumpkin Seed" ||
              plant.name === "Blueberry Seed") &&
            plant.type === "seed"
        );
      case "Hanimaadhoo":
        return plants.filter(
          (plant) =>
            (plant.name === "Pumpkin Seed" ||
              plant.name === "Teak Tree Seed") &&
            plant.type === "seed"
        );
      case "Tortuga":
        return plants.filter(
          (plant) =>
            (plant.name === "Potato Seed" || plant.name === "Teak Tree Seed") &&
            plant.type === "seed"
        );
      case "Kontcha":
        return plants.filter(
          (plant) =>
            (plant.name === "Blueberry Seed" ||
              plant.name === "Pumpkin Seed") &&
            plant.type === "seed"
        );
      case "Torsgard":
        return plants.filter(
          (plant) =>
            (plant.name === "Blueberry Seed" ||
              plant.name === "Oak Tree Seed") &&
            plant.type === "seed"
        );
    }
  },
  getPlotPrice(numberUnlockedFields) {
    switch (numberUnlockedFields) {
      case 12:
        return {
          plant1: { id: "64ec84e797da227ff2d81c96", amount: 1 },
          money: 1800,
          plant2: { id: "", amount: 0 },
          plant3: { id: "", amount: 0 },
        };
      case 13:
        return {
          plant1: { id: "64ec81c397da227ff2d81c8d", amount: 5 },
          money: 2500,
          plant2: { id: "", amount: 0 },
          plant3: { id: "", amount: 0 },
        };
      case 14:
        return {
          plant1: { id: "64f8b2dcec1cbef6647a8190", amount: 4 },
          money: 5000,
          plant2: { id: "", amount: 0 },
          plant3: { id: "", amount: 0 },
        };
      case 15:
        return {
          plant1: { id: "64f8b238ec1cbef6647a818d", amount: 5 },
          money: 8000,
          plant2: { id: "64f6e73232e5ea1ee8540236", amount: 10 },
          plant3: { id: "", amount: 0 },
        };
      case 16:
        return {
          plant1: { id: "64ec850497da227ff2d81c97", amount: 20 },
          money: 10000,
          plant2: { id: "64ec81c397da227ff2d81c8d", amount: 10 },
          plant3: { id: "", amount: 0 },
        };
      case 17:
        return {
          plant1: { id: "64ec850497da227ff2d81c97", amount: 10 },
          money: 13000,
          plant2: { id: "64f8b2dcec1cbef6647a8190", amount: 10 },
          plant3: { id: "", amount: 0 },
        };
      case 18:
        return {
          plant1: { id: "64ec84e797da227ff2d81c96", amount: 25 },
          money: 18000,
          plant2: { id: "64f8b238ec1cbef6647a818d", amount: 25 },
          plant3: { id: "64f8b2dcec1cbef6647a8190", amount: 20 },
        };
      case 19:
        return {
          plant1: { id: "64ec850497da227ff2d81c97", amount: 50 },
          money: 25000,
          plant2: { id: "64ec81c397da227ff2d81c8d", amount: 50 },
          plant3: { id: "64f8b2dcec1cbef6647a8190", amount: 50 },
        };
    }
  },
};
