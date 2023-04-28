import { Router } from 'express';
import { submitOpenAiRequest } from '../controllers/openAi';

const router = Router();

// POST request to /api/age
router.post('/api/journal', async (req, res) => {
  let { entry } = req.body;
  //call the completion method to summarize text
  console.log(entry)
  const responseText = await submitOpenAiRequest(entry);
  res.json({ responseText })
});

export default router;