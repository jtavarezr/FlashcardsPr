import React, { useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
import jsonData from "./components/card-content.json";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

function App() {
  // State for available cards
  const [cards, setCards] = useState([...jsonData]);
  // State for the currently selected card
  const [selectedCard, setSelectedCard] = useState(cards[0]);
  // State for tracking the current streak of correct answers
  const [currentStreak, setCurrentStreak] = useState(0);
  // State for the longest streak of correct answers
  const [longestStreak, setLongestStreak] = useState(0);
  // State for the border color of the input
  const [inputBorderColor, setInputBorderColor] = useState("black");
  // State for storing mastered cards
  const [masteredCards, setMasteredCards] = useState([]);

  // Function to randomly shuffle the cards
  const handleRandomizeCards = () => {
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setSelectedCard(shuffledCards[0]);
  };

  // Function to select the next card
  const handleNextCard = () => {
    const currentId = selectedCard.id;
    const currentIndex = cards.findIndex((item) => item.id === currentId);
    const nextIndex = (currentIndex + 1) % cards.length;
    setSelectedCard(cards[nextIndex]);
  };

  // Function to select the previous card
  const handlePreviousCard = () => {
    const currentId = selectedCard.id;
    const currentIndex = cards.findIndex((item) => item.id === currentId);
    const previousIndex =
      currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
    setSelectedCard(cards[previousIndex]);
  };

  // Function to check if the answer is correct
  const isAnswerCorrect = (userAnswer, targetAnswer) => {
    const formattedUserAnswer = userAnswer.toLowerCase().trim();
    const formattedTargetAnswer = targetAnswer.toLowerCase().trim();
    return formattedUserAnswer === formattedTargetAnswer;
  };

  // Function to handle checking the user's answer
  const checkAnswer = () => {
    const userInput = document.querySelector('input[name="userAnswer"]').value;
    const isCorrect = isAnswerCorrect(userInput, selectedCard.answer);

    if (isCorrect) {
      setInputBorderColor("border-success"); // Set the border color to green if the answer is correct
      setCurrentStreak(currentStreak + 1);
      setLongestStreak(Math.max(longestStreak, currentStreak + 1));
    } else {
      setInputBorderColor("border-danger"); // Set the border color to red if the answer is incorrect
      setCurrentStreak(0);
    }
  };

  // Function to handle input change
  const handleInputChange = () => {
    setInputBorderColor("black");
  };

  // Function to mark a card as mastered
  const handleCardMastered = () => {
    // Check if the selected card is already in the list of mastered cards
    const isAlreadyMastered = masteredCards.some(
      (card) => card.id === selectedCard.id
    );

    // If it's not already mastered, add it to the list
    if (!isAlreadyMastered) {
      setMasteredCards([...masteredCards, selectedCard]);
    }

    // Remove the selected card from the pool of available cards
    const updatedCards = cards.filter((card) => card.id !== selectedCard.id);
    setCards(updatedCards);

    // Select the next card from the updated pool of available cards
    if (updatedCards.length > 1) {
      const nextIndex = Math.min(
        cards.findIndex((card) => card.id === selectedCard.id),
        updatedCards.length - 1
      );
      setSelectedCard(updatedCards[nextIndex]);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {/* Headings */}
        <h1>Learn with Computer Science Questions</h1>
        <h2>Let's test your knowledge</h2>
        <h5>Number of cards: {cards.length}</h5>

        <div className="app-container">
          <div className="col-md-8">
            {/* Card container */}
            <div className="card_container">
              {selectedCard && (
                <>
                  <h1>{selectedCard.title}</h1>
                  <Cards
                    question={selectedCard.question}
                    answer={selectedCard.answer}
                    color={selectedCard.color}
                    id={selectedCard.id}
                    image={selectedCard.image}
                  />
                </>
              )}
            </div>

            {/* Input for answer */}
            <div className="guessing">Guess the answer here:</div>
            <input
              type="text"
              name="userAnswer"
              className={`form-control ${inputBorderColor}`} // Utiliza la clase inputBorderColor para establecer el color del borde
              onChange={handleInputChange}
            />

            {inputBorderColor === "red" && (
              <div className="invalid-feedback">Incorrect answer</div>
            )}

            {/* Button to submit answer */}
            <button
              type="submit"
              className="btn btn-primary mt-2"
              onClick={checkAnswer}
            >
              Submit Guess
            </button>
            <> </>

            {/* Button to mark card as mastered */}
            <button
              onClick={handleCardMastered}
              className="btn btn-success mt-2"
            >
              Mark as Mastered
            </button>

            {/* Navigation buttons */}
            <div className="button-container">
              <button
                className="btn btn-primary mt-2"
                onClick={handlePreviousCard}
              >
                {"<"}
              </button>
              <> </>
              <button className="btn btn-primary mt-2" onClick={handleNextCard}>
                {">"}
              </button>
              <> </>
              <button
                className="btn btn-success mt-2"
                onClick={handleRandomizeCards}
              >
                Shuffle Cards
              </button>
            </div>
          </div>

          {/* Container for mastered cards */}
          <div className="col-md-4">
            <div className="mastered-cards-container">
              <div>
                <label>Current Streak: {currentStreak}</label>
                <br />
                <label>Longest Streak: {longestStreak}</label>
              </div>
              <h3>Mastered Cards</h3>
              <ul className="list-group">
                {masteredCards.map((card) => (
                  <li key={card.id} className="list-group-item">
                    {card.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row"></div>
    </div>
  );
}

export default App;
