import React, { useState, useEffect } from 'react';
import './FAQs.css';
import Question from './Question'

function FAQsPage({ api }) {

    const all = { 'id': -1, 'title': 'All' };
    const [selectedCategory, setCategory] = useState(all);
    const [categoryList, setCategoryList] = useState([]);
    const [questions, setQuestions] = useState([]);

    // Handling the email change
    const handleSelectedCategory = (category) => {
        setCategory(category);
    };

    // Filter the questions based on the selected category
    const filteredQuestions = selectedCategory.id !== all.id
        ? questions.filter(question => question.category.includes(selectedCategory.id))
        : questions;

    useEffect(() => {

        // Initial API get list of categories
        api.get('/api/faq/categories/')
            .then(response => {
                // Set the retrieved categories in the state
                var exampleList = response.data;
                exampleList.unshift(all);
                setCategoryList(exampleList);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

        // Initial API get list of questions
        api.get('/api/faq/questions/')
            .then(response => {
                // Set the retrieved categories in the state
                var questionsList = response.data;
                setQuestions(questionsList);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [api]);

    return (
        <div className="FAQPage">
            <div>
                <h1 className='FAQ-header'>FAQs</h1>
            </div>
            <div className='FAQ-categories'>
                {categoryList.map((category) => (
                    <button
                        key={category.id} // Add a unique key for each button
                        value={category.title}
                        onClick={() => handleSelectedCategory(category)}
                    >
                        {category.title}
                    </button>
                ))}
            </div>
            <div className='FAQ-questions'>
                {filteredQuestions.map((question) => (
                    <Question
                        key={question.id} // Add a unique key for each question
                        api={api}
                        question_name={question.question}
                        answer={question.answer}
                    />
                ))}
            </div>
        </div>
    );
}

export default FAQsPage;