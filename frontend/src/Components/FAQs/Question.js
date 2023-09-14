import React, { useState, useEffect } from 'react';
import './FAQs.css';

function Question({ question_name, answer }) {
    const [openQuestion, setOpen] = useState(false);

    // Handling the email change
    const handleQuestion = (e) => {
        setOpen(!openQuestion);
    };

    // Function to check and add a question mark
    const addQuestionMark = (text) => {
        if (!text.endsWith('?')) {
            return text + '?';
        }
        return text;
    };

    return (
        <div>

            <button className='Question' onClick={handleQuestion}>
                {addQuestionMark(question_name.toUpperCase())}
            </button>

            {openQuestion &&
                <div className='Answer'>
                    {answer}
                </div>
            }

        </div>
    );
}

export default Question;


