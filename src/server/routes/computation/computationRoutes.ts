import { Router } from "express";

const router = Router();

router.post("/test", async (req, res) => {
  try {
    return res.json({
        success: true,
        message: "ok",
      });
  } catch (error) {
    return res.status(504).send({ error });
  }
});

export default router;