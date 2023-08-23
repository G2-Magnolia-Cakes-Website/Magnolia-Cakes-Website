import React, { useState, useEffect } from 'react';

function TermsAndConditions({ api }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Make a GET request using the passed api instance
    api.get('/api/terms-and-conditions/')
      .then(response => {
        // Set the retrieved content in the state
        setContent(response.data.content);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [api]);

  return (
    <div>
      <h1>Terms & Conditions</h1>
      <p>{content}</p>
    </div>
  );
}

export default TermsAndConditions;


