import useSWR from "swr";

export default async function getSeeds() {
  const { data: plants } = useSWR("/api/plants");
  if (plants) {
    return plants.filter((plant: any) => plant.type === "seed");
  } else return "error";
}
