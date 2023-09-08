import React, { useState, useEffect } from 'react';
import './FAQs.css';

function Question({ api, question_name }) {
    const [content, setContent] = useState('');
    const [openQuestion, setOpen] = useState(false);

    // API get question_name's answer
    useEffect(() => {
        // Make a GET request using the passed api instance
        // api.get('/api/terms-and-conditions/')
        //   .then(response => {
        //     // Set the retrieved content in the state
        //     setContent(response.data.content);
        //   })
        //   .catch(error => {
        //     console.error('Error fetching data:', error);
        //   });
        setContent("test");
    }, [api, openQuestion]);

    // Handling the email change
    const handleQuestion = (e) => {
        setOpen(!openQuestion);
    };

    return (
        <div className="Question">

            <button onClick={handleQuestion}>{question_name}</button>

            {openQuestion &&
                <div className='Answer'>
                    {content}
                </div>
            }
            
        </div>
    );
}

export default Question;


