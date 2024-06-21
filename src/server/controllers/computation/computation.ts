import { Computation } from "../../entity/computation/Computation";

export const getComputationData = async () => {
  try {
    return await Computation.createQueryBuilder("computation").getMany();
  } catch (error) {
    console.log(error);
  }
};
