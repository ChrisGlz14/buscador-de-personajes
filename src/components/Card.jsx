import "../components/card.css";
import React, { useEffect, useState } from "react";

const urlBase = "https://dragonball-api.com/api";
const urlCharacter = `${urlBase}/characters`;

const Card = () => {
  const [dataCharacter, setDataCharacter] = useState([]);
  const [character, setCharacter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [characterFound, setCharacterFound] = useState(null);
  const [searching, setSearching] = useState(false); // Estado para controlar la búsqueda

  const fetchData = async (page) => {
    try {
      const res = await fetch(`${urlCharacter}?page=${page}`);
      const data = await res.json();
      return data.items;  // Devuelve los items en lugar de actualizar directamente el estado
    } catch (error) {
      console.error("Ha ocurrido un error al obtener los datos");
      return [];  // Devuelve un array vacío en caso de error
    }
  };

  const handleSetCharacter = (e) => {
    setCharacter(e.target.value);
    setCharacterFound(null);
  };

  const handleSearch = async () => {
    if (!searching) {
      setSearching(true);
  
      let foundCharacter = null;
  
      try {
        for (let page = 1; page <= 6; page++) {
          const items = await fetchData(page);
  
          const selectedCharacter = items.find(
            (char) => char.name.toLowerCase() === character.toLowerCase()
          );
  
          if (selectedCharacter) {
            foundCharacter = selectedCharacter;
            break;
          } else {
            console.log(`Personaje no encontrado en la página ${page}`);
          }
        }
  
        if (foundCharacter) {
          setCharacterFound(foundCharacter);
        } else {
          console.log("Personaje no encontrado en ninguna página");
          // Puedes agregar lógica adicional aquí si es necesario
        }
      } catch (error) {
        console.error("Error en la búsqueda:", error);
      } finally {
        setSearching(false);
      }
    }
  };

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      const items = await fetchData(currentPage);
      setDataCharacter(items);
    };

    fetchDataAndUpdateState();
  }, [currentPage]);

  return(
    <>
      <div className="container">
        <input
          type="text"
          name="character"
          placeholder="Busca a tu personaje de Dragon Ball"
          onChange={handleSetCharacter}
          value={character}
        />
        <button onClick={handleSearch}>Buscar</button>

        {characterFound && (
          <div className="container-stats">
            <h2>{characterFound.name}</h2>
            <img src={characterFound.image} alt={characterFound.name} />
            <p className="name">Equipo: {characterFound.affiliation}</p>
                <p className="ki">Ki: {characterFound.ki}</p>
                <p className="maxKi">Ki Max: {characterFound.maxKi}</p>
                <p className="race">Raza: {characterFound.race}</p>
                <p className="description">
                  Descripcion: {characterFound.description}
                </p>
          </div>
        )}
       
      </div>
    </>
  );
};

export default Card;
