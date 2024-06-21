import { Router } from "express";
import { getComputationData } from "../../controllers/computation/computation";

const router = Router();

router.post("/data", async (req, res) => {
  try {
    const data = await getComputationData();
    return res.json(data);
  } catch (error) {
    return res.status(504).send({ error });
  }
});

export default router;