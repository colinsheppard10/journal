import { Router } from "express";
import { createFlashCard, getComputationData, insertComputationData } from "../../controllers/computation/computationController";

const router = Router();

router.post("/data", async (req, res) => {
  try {
    const data = await getComputationData();
    return res.json(data);
  } catch (error) {
    return res.status(504).send({ error });
  }
});

router.post("/topic", async (req, res) => {
  try {
    let { topic } = req.body;
    const response = await createFlashCard({topic});
    const parsed = JSON.parse(response);
    return res.json(parsed);
  } catch (error) {
    return res.status(504).send({ error });
  }
});

router.post("/insert", async (req, res) => {
  try {
    let { elapsedTime } = req.body;
    await insertComputationData({elapsedTime});
    return res.json({elapsedTime});
  } catch (error) {
    return res.status(504).send({ error });
  }
});

export default router;