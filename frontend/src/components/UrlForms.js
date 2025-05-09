import { useState } from 'react';
import axios from 'axios';

function UrlForms() {
  const [input, setInput] = useState('');
  const [shortUrl, setShortUrl] = useState(''); // Add this line
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    try {
      const response = await axios.post(`http://localhost:3000/api/create-url`, { url: input });
      setShortUrl(response.data.encurtedUrl); // Store the short URL
    } catch (error) {
      console.error('Error shortening URL:', error);
    } finally {
      setIsLoading(false);
    }

    setInput('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="url-form">
        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your long URL here..."
            className="url-input"
          />
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span> Shortening...
              </>
            ) : (
              'Shorten'
            )}

          </button>
        </div>
      </form>

      {shortUrl && (
        <div className="result-container">
          <p className="success-message">Your shortened URL:</p>
          <div className="url-result">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="short-url"
            >
              {shortUrl}
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(shortUrl);
                alert('Copied to clipboard!');
              }}
              className="copy-btn"
            >
              Copy
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default UrlForms;

