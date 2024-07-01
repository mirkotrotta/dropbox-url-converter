import React, { useState } from 'react';
import { Button, TextInput, TextArea, ToastNotification } from 'carbon-components-react';

const UrlConverter = () => {
  const [dropboxUrl, setDropboxUrl] = useState('');
  const [convertedUrl, setConvertedUrl] = useState('');
  const [embedCode, setEmbedCode] = useState('');
  const [error, setError] = useState('');

  const validateInput = (url) => {
    return url.includes('www.dropbox.com');
  };

  const convertUrl = (url) => {
    let newUrl = url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
    newUrl = newUrl.replace('?dl=0', '');
    return newUrl;
  };

  const generateEmbedCode = (url) => {
    return `<video width='640' height='480' controls>
              <source src='${url}' type='video/mp4'>
              Your browser does not support the video tag.
            </video>`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (validateInput(dropboxUrl)) {
      const newUrl = convertUrl(dropboxUrl);
      const code = generateEmbedCode(newUrl);
      setConvertedUrl(newUrl);
      setEmbedCode(code);
    } else {
      setError('Invalid Dropbox URL. Please enter a valid URL.');
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  const handleClear = () => {
    setDropboxUrl('');
    setConvertedUrl('');
    setEmbedCode('');
    setError('');
  };

  return (
    <div className="url-converter">
      <p className="description">
        This app converts Dropbox video URLs to direct links that can be embedded in any website. Simply enter your Dropbox video URL below to get the direct link and the HTML embed code.
      </p>
      <form onSubmit={handleSubmit}>
        <TextInput
          id="dropboxUrl"
          labelText="Enter Dropbox Video URL:"
          value={dropboxUrl}
          onChange={(e) => setDropboxUrl(e.target.value)}
          required
        />
        <Button type="submit" style={{ backgroundColor: '#0f62fe', marginTop: '10px' }}>Convert</Button>
      </form>
      {error && (
        <ToastNotification
          kind="error"
          title="Error"
          subtitle={error}
          caption=""
          timeout={3000}
        />
      )}
      {convertedUrl && (
        <div className="results">
          <p>
            Converted URL: 
            <a href={convertedUrl} target="_blank" rel="noopener noreferrer">
              {convertedUrl}
            </a>
            <Button
              className="copy-button"
              style={{ backgroundColor: '#007d79' }}
              onClick={() => handleCopy(convertedUrl)}
            >
              Copy
            </Button>
          </p>
          <p>Embed Code:</p>
          <TextArea
            readOnly
            value={embedCode}
          />
          <Button
            className="copy-button"
            style={{ backgroundColor: '#007d79', marginTop: '10px' }}
            onClick={() => handleCopy(embedCode)}
          >
            Copy
          </Button>
        </div>
      )}
      <Button
        className="clear-button"
        style={{ backgroundColor: '#da1e28', marginTop: '20px' }}
        onClick={handleClear}
      >
        Clear
      </Button>
      <div className="developer-info">
        <p>Developed by Mirko Trotta</p>
        <p><a href="https://github.com/mirkotrotta/dropbox-url-converter">App Repository</a></p>
        <p>Email: <a href="mailto:hello@mirkotrotta.com">hello@mirkotrotta.com</a></p>
        <p>Email: <a href="mailto:mirko@metacubostudio.com">mirko@metacubostudio.com</a></p>
        <p><a href="https://mirkotrotta.com">mirkotrotta.com</a> and <a href="https://metacubostudio.com">metacubostudio.com</a></p>
      </div>
    </div>
  );
};

export default UrlConverter;
