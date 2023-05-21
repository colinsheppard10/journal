import { Router } from "express";
import {
  handleJournalGet,
  handleJournalPost,
  handleSummaryPost,
} from "../controllers/journalController";
import { authMiddleware } from "../controllers/authController";

const router = Router();
router.use(authMiddleware);

router.post("/user/get", async (req, res) => {
  try {
    let { user } = req;
    res.json({ user });
  } catch (error) {
    return res.status(504).send({ error });
  }
});

router.post("/journal/create", async (req, res) => {
  try {
    let { user } = req;
    let { entry, timestamp, date } = req.body;
    let responseText = await handleJournalPost({
      userId: user.id,
      entry,
      timestamp,
      date,
    });
    res.json({ responseText });
  } catch (error) {
    console.log(error);
    return res.status(504).send({ error });
  }
});

router.post("/journal/get", async (req, res) => {
  try {
    let { user } = req;
    let journal = await handleJournalGet({ userId: user.id });
    res.json({ journal });
  } catch (error) {
    return res.status(504).send({ error });
  }
});

router.post("/summary/create", async (req, res) => {
  try {
    let { user } = req;
    let { timeFrame } = req.body;
    let responseText = await handleSummaryPost({ user, timeFrame });
    res.json({ responseText });
  } catch (error) {
    console.log(error);
    return res.status(504).send({ error });
  }
});

export default router;
