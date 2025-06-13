import { Schema } from "@/features/newPlant/wrapper/types/schema";
import { wait } from "@/utils/wait";

const create = async (data: Schema) => {
  await wait();
  console.log(data);
};

export { create };
