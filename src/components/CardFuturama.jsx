import React, { useEffect, useState } from "react";

const CardFuturama = () => {
  const [dataCharacters, setDataCharacters] = useState([]);

  const urlInfoCharacters = `https://api.sampleapis.com/futurama/characters`;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(urlInfoCharacters);
        const data = await res.json();
        setDataCharacters(data);
        console.log(data);
      } catch (error) {
        console.log("Ocurrio un fallo en la solicitud");
        return;
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {dataCharacters ? (
        dataCharacters.map((character) => (
          <div className="container" key={character.id}>
            <h2>{character.name.first} {character.name.middle} {character.name.last}</h2>
            <img src={character.images.main} alt="" />
            <div className="grid-info">
              <p className="specie">{character.species}</p>
              <p className="age">{character.age}</p>
              <p className="work">{character.occupation}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="container">
          <h2>Futurama</h2>
        </div>
      )}
    </>
  );
};


export default CardFuturama;
