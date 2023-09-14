import React, { useState, useEffect } from 'react';
import './FAQs.css';

function Question({ api, question_name, answer }) {
    const [openQuestion, setOpen] = useState(false);

    // Handling the email change
    const handleQuestion = (e) => {
        setOpen(!openQuestion);
    };

    return (
        <div className="Question">

            <button onClick={handleQuestion}>{question_name}</button>

            {openQuestion &&
                <div className='Answer'>
                    {answer}
                </div>
            }
            
        </div>
    );
}

export default Question;


