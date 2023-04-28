import { Router } from 'express';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization : "add_keys",
  apiKey : "add_keys",
});
const openai = new OpenAIApi(configuration);

const router = Router();

// GET request to /api/name
router.get('/api/name', function (req, res) {
  let name = req.query.name;
  res.json({ name: name });
});

// POST request to /api/age
router.post('/api/journal', async (req, res) => {
  let { entry } = req.body;
  //call the completion method to summarize text
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `You are a therapist. Summarize this journal entry: ${entry}`,
    max_tokens: 2048,
    temperature: 0,
  });

  const responseText = response.data.choices[0].text
  res.json({ responseText })
});

export default router;