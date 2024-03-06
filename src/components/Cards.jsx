import React, { useState } from "react";

const Card = ({ title, question, answer,image, color, id, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false); // Estado para controlar si la tarjeta está volteada

  // Función para manejar el clic en la tarjeta y cambiar su estado volteado
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`flip-card ${isFlipped ? "clicked" : ""}`}
      onClick={handleCardClick}
    >
      <div className="flip-card-inner">
        <div
          className={`flip-card-front bg-${color}`}
          style={{ color: color === "light" ? "black" : "white" }}
        >
          <img
            src={image}
            alt="Avatar"
            style={{ width: "100px", height: "100px" }}
          />
          <h1>{title}</h1>
          <h2>{question}</h2>
        </div>
        <div
          className={`flip-card-back bg-${color}`}
          style={{ color: color === "light" ? "black" : "white" }}
        >
          
          <h1>Answer</h1>
          <h3>{id}</h3>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
