import React from "react";
import {AaronImage, EllipseOrange, EvanImage, JadaImage, ScoreBackground, TwitterCard} from "../../../assets/Image";

function Quotes() {
  const card = [
    {
      image: EvanImage,
      name: "evan lathi",
      profession: "PC Gamer",
      quotes: "One of my gaming highlights of the year.",
      date: "June 18, 2021",
    },
    {
      image: JadaImage,
      name: "jada griffin",
      profession: "Nerdreactor",
      quotes: "The next big thing in the world of streaming and survival games.",
      date: "July, 10, 2021",
    },
    {
      image: AaronImage,
      name: "aaoron williams",
      profession: "Uproxx",
      quotes: "Snoop Dogg playing the wildly entertaining 'SOS' is ridiculous.",
      date: "December 24, 2018",
    },
  ];

  return (
    <section className="top-score" id="quotes" style={{backgroundImage: `url(${ScoreBackground})`}}>
      <div className="scores">
        <div className="title">
          <h2>top scores</h2>
        </div>
        <p>This top score from various games provided on this platform</p>
        <button className="btn">see more</button>
      </div>
      <div className="card-container">
        {card.map((card) => {
          return (
            <div key={card.name} className="card" style={{backgroundImage: `url(${EllipseOrange})`}}>
              <img src={card.image} alt={card.name} className="rounded-circle img-cstm" />
              <div className="profile">
                <h4>{card.name}</h4>
                <p>{card.profession}</p>
              </div>
              <div className="twt-icon">
                <img src={TwitterCard} alt="twt-icon" />
              </div>
              <p className="quotes">"{card.quotes}"</p>
              <div className="dates">{card.date}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Quotes;
