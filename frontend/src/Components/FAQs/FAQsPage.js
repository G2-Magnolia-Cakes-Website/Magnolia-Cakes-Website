import React, { useState, useEffect } from 'react';
import './FAQs.css';
import Question from './Question'
import BarLoader from "react-spinners/BarLoader";

function FAQsPage({ api }) {

    const all = { 'id': -1, 'title': 'All' };
    const [selectedCategory, setCategory] = useState(all);
    const [categoryList, setCategoryList] = useState([]);
    const [questions, setQuestions] = useState([]);

    // Loading
    const [loading, setLoading] = useState(true);

    // Handling the email change
    const handleSelectedCategory = (category) => {
        setCategory(category);
    };

    // Filter the questions based on the selected category
    const filteredQuestions = selectedCategory.id !== all.id
        ? questions.filter(question => question.category.includes(selectedCategory.id))
        : questions;

    useEffect(() => {
        setLoading(true);

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

        setLoading(false);
    }, [api]);

    return (
        <div className="FAQPage">
            <div>
                <h1 className='FAQ-header'>FAQs</h1>
            </div>

            <BarLoader
                loading={loading}
                aria-label="Loading Spinner"
                data-testid="loader"
                width={"300px"}
            />

            <div className='FAQ-categories'>
                {categoryList.map((category) => (
                    <button
                        key={category.id} // Add a unique key for each button
                        value={category.title}
                        className={category.id === selectedCategory.id ? "selected-category" : "FAQ-category"}
                        onClick={() => handleSelectedCategory(category)}
                    >
                        {category.title.toUpperCase()}
                    </button>
                ))}
            </div>
            <div className='FAQ-questions'>
                {filteredQuestions.map((question) => (
                    <Question
                        key={question.id} // Add a unique key for each question
                        question_name={question.question}
                        answer={question.answer}
                    />
                ))}
            </div>
        </div>
    );
}

export default FAQsPage;