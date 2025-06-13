import { AutocompleteOption } from "@/features/form/components/controllers/autocomplete";
import { wait } from "@/utils/wait";

const category = [
  {
    label: "Leafy Greens",
    value: "1",
    sub_cat: [
      { label: "Leaf Lettuce", value: "1" },
      { label: "Romaine Lettuce", value: "2" },
      { label: "Butterhead Lettuce", value: "3" },
      { label: "Kale", value: "4" },
      { label: "Spinach", value: "5" },
      { label: "Arugula", value: "6" },
      { label: "Rainbow Swiss Chard", value: "7" },
    ],
  },
  {
    label: "Herbs",
    value: "2",
    sub_cat: [
      { label: "Italian Basil", value: "8" },
      { label: "Cinnamon Basil", value: "9" },
      { label: "Lemon Basil", value: "10" },
      { label: "Cilantro", value: "11" },
      { label: "Parsley", value: "12" },
      { label: "Mint", value: "13" },
    ],
  },
  {
    label: "Fruiting Plants",
    value: "3",
    sub_cat: [
      { label: "Albion Strawberry", value: "14" },
    ],
  },
  {
    label: "Microgreens",
    value: "4",
    sub_cat: [
      { label: "", value: "" },
    ],
  },
];

const getPlants = async (): Promise<AutocompleteOption[]> => {
  await wait();
  return category.map((item) => ({
    label: item.label,
    value: item.value,
  }));
};

const getVariety = async (categoryId: string): Promise<AutocompleteOption[]> => {
  await wait();
  return (
    category.find((item) => item.value === categoryId)
      ?.sub_cat.map((item) => ({
        label: item.label,
        value: item.value,
      })) ?? []
  );
};


export { getPlants, getVariety };
