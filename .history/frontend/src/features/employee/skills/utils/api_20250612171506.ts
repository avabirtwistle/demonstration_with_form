type LocationData = {
  rack: string;
  level: string;
  slotIndex: string;
};

const getFreeLocation = async (): Promise<LocationData> => {
  await wait(1000); // Simulate 1 second loading delay

  return {
    rack: "02",
    level: "02",
    slotIndex: "03",
  };
};

export { getFreeLocation };
