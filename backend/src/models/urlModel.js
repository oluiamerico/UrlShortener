import pool from '../config/db.js';

export const UrlModel = {
  async createUrl(url) {
    const shortCode = Math.random().toString(36).substring(2, 8);
    await pool.query(
      'INSERT INTO urls (url_original, url_encurtada) VALUES ($1, $2)',
      [url, shortCode]
    );
    return shortCode;
  },

  async getOriginalUrl(shortCode) {
    const result = await pool.query(
      'SELECT url_original FROM urls WHERE url_encurtada = $1',
      [shortCode]
    );
    return result.rows[0].url_original;
  },
}