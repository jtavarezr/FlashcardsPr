import React, { useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
import jsonData from "./components/card-content.json";

function App() {
  const [selectedCard, setSelectedCard] = useState(jsonData[0]); // Inicializa la tarjeta seleccionada con la primera del JSON
  const [previousCard, setPreviousCard] = useState(0);

  const handleButtonClick = (id) => {
    const card = jsonData.find((item) => item.id === id);
    setPreviousCard(selectedCard);
    setSelectedCard(card);
  };

const handleNextCardRandom = () => {
  const randomIndex = Math.floor(Math.random() * jsonData.length); // Genera un índice aleatorio dentro del rango del array de datos JSON
  const index =
    randomIndex >= 0 && randomIndex < jsonData.length ? randomIndex : 0; // Asegura que el índice esté dentro de los límites adecuados
  handleButtonClick(index); // Actualiza la tarjeta seleccionada con el índice seleccionado aleatoriamente
};

  const handlePreviousCard = () => {
    if (previousCard) {
      setSelectedCard(previousCard); // Actualiza la tarjeta seleccionada con la tarjeta anterior guardada
    }
  };

  return (
    <div className="app-container">
      <h1>Learn with Computer Science Questions</h1>
      <h2>Let's test your knowledge</h2>
      <h5>Number of cards: {jsonData.length}</h5>
      <br />
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
      <div className="button-container">
        <button className="buttonBlue" onClick={handlePreviousCard}>
          {`<`}
        </button>
        <> </>
        <button className="buttonBlue" onClick={handleNextCardRandom}>
          {`>`}
        </button>
      </div>
    </div>
  );
}

export default App;
