import React, { useState, useEffect } from 'react';
import './FAQs.css';
import Question from './Question'

function FAQsPage({ api }) {

    const all = 'All'
    const [selectedCategory, setCategory] = useState(all);
    const [categoryList, setCategoryList] = useState([]);
    const [questions, setQuestions] = useState([]);

    // Handling the email change
    const handleSelectedCategory = (e) => {
        setCategory(e.target.value);
    };

    // Filter the questions based on the selected category
    const filteredQuestions = selectedCategory === all ? questions : questions.filter(question => question.category === selectedCategory);

    useEffect(() => {
        // Initial API get list of categories
        var exampleList = ["Category 1", "Category 2"]
        exampleList.unshift(all);
        setCategoryList(exampleList);

        // Initial API get list of questions
        var questionsList = ["Question 1", "Question 2"]
        setQuestions(questionsList);
    }, [api]);

    return (
        <div className="FAQPage">
            <div>
                <h1 className='FAQ-header'>FAQs</h1>
            </div>
            <div className='FAQ-categories'>
                {categoryList.map((category) => (
                    <button value={category} onClick={handleSelectedCategory}>
                        {/* {category.name} */}
                        {category}
                    </button>
                ))}
                {selectedCategory}
            </div>
            <div className='FAQ-questions'>
                {filteredQuestions.map((question) => (
                    <Question api={api} question_name={question} />
                ))}
            </div>
        </div>
    );
}

export default FAQsPage;