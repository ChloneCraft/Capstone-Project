export const PlantsService = {
  getListOfPlants(plants) {
    return plants.filter((plant) => plant.type === "plant");
  },
};
