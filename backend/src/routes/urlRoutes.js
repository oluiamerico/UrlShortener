import express from 'express';
import { UrlModel } from '../models/urlModel.js';
import cors from 'cors';



const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3002', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.post('/api/create-url', async (req, res) => {
  try {
    const url = req.body.url;
    const shortCode = await UrlModel.createUrl(url);

    res.status(200).json({
      encurtedUrl: `http://localhost:3000/${shortCode}`,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/:shortCode', async (req, res) => {
  try{
    const shortCode = req.params.shortCode;
    const originalUrl = await UrlModel.getOriginalUrl(shortCode);
    res.redirect(originalUrl);

  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Doesn't exist." });
  }
})

export default app;