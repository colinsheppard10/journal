import { Computation } from "../../entity/computation/Computation";
import { submitOpenAiRequest } from "../openAiController";

export const getComputationData = async () => {
  try {
    return await Computation.createQueryBuilder("computation").getMany();
  } catch (error) {
    console.log(error);
  }
};

export const insertComputationData = async ({elapsedTime}: any) => {
  try {
    const computation = new Computation();
    computation.count = elapsedTime;
    computation.timestamp = Date.now().toString();
    await computation.save();
  } catch (error) {
    console.log(error);
  }
};