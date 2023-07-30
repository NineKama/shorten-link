import React, { useState } from 'react';
import { Input, Button, Select } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import './App.css';

const { Option } = Select;

function App() {
  const [protocol, setProtocol] = useState('http');
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleUrlShorten = async () => {
    try {
      // Your code to make a POST request to the backend to handle URL shortening
      const response = await fetch('http://localhost:5000/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl: `${protocol}://${longUrl}` }),
      });
      const data = await response.json();
      setShortUrl(data.shortUrl); // Set the shortened URL received from the backend
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePasteChange = (e) => {
    e.preventDefault();
    // Remove "http://" or "https://" from the pasted URL, if present
    const pastedUrl = e.clipboardData.getData('text/plain');
    const cleanedUrl = pastedUrl.replace(/^(https?:\/\/)/i, '');

    console.log(pastedUrl)
    console.log(cleanedUrl)

    // Check if the pasted URL starts with "http://" or "https://"
    if (pastedUrl.startsWith('http://')) {
      setProtocol('http');
      console.log("11111")
    } else if (pastedUrl.startsWith('https://')) {
      setProtocol('https');
      console.log("22222")
    }

    setLongUrl(cleanedUrl);
  };

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <div>
        <Select defaultValue="http" style={{ width: 100, textAlign: 'left' }} onChange={(value) => setProtocol(value)}>
          <Option value="http">http://</Option>
          <Option value="https">https://</Option>
        </Select>
        <Input
          placeholder="Enter a long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          onPaste={handlePasteChange}
          prefix={<LinkOutlined />}
          style={{ flex: 1, maxWidth: 400 }}
        />
        <Button onClick={handleUrlShorten}>Shorten</Button>
      </div>
      {shortUrl && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;