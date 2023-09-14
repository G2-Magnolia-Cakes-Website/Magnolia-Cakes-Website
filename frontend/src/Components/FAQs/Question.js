import React, { useState, useEffect } from 'react';
import './FAQs.css';

function Question({ api, question_name, answer }) {
    const [openQuestion, setOpen] = useState(false);

    // Handling the email change
    const handleQuestion = (e) => {
        setOpen(!openQuestion);
    };

    return (
        <div>

            <button className='Question' onClick={handleQuestion}>{question_name.toUpperCase()}</button>

            {openQuestion &&
                <div className='Answer'>
                    {answer}
                </div>
            }
            
        </div>
    );
}

export default Question;


