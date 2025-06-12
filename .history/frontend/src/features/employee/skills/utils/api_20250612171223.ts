// utils/api.ts
type Slot = {
  slotId: string;
  trayType: string;
  plantedAt: string;
};

type RackLevel = {
  level: number;
  slots: Slot[];
};

type RackData = {
  rackId: string;
  levels: RackLevel[];
};

const getRackData = async (rackId: string): Promise<RackData> => {
  await wait(1000); // simulate delay

  return {
    rackId,
    levels: Array.from({ length: 4 }, (_, i) => ({
      level: i + 1,
      slots: Array.from({ length: 5 }, (_, j) => ({
        slotId: `S${i + 1}${j + 1}`,
        trayType: ["Leafy Greens", "Microgreens", "Herbs"][Math.floor(Math.random() * 3)],
        plantedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      })),
    })),
  };
};
