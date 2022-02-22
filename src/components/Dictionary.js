import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import "../App.css";
const Dictionary = () => {
  const [search, setSearch] = useState("");
  const [meaning, setMeaning] = useState([]);
  const [audio, setAudio] = useState("");
  const [mean, setMean] = useState("");
  const fetchData = async (e) => {
    e.preventDefault();
    const fetchMeaning = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
    );
    const data = await fetchMeaning.json();
    setMeaning(data[0]);
    setAudio(data[0].phonetics);
    setMean(data[0].meanings);
    console.log(audio);
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      <form className="container" onSubmit={fetchData}>
        <TextField
          id="standard-basic"
          fullWidth
          label="Search ..."
          variant="standard"
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon
          onClick={fetchData}
          sx={{
            fontSize: 30,
            marginLeft: "5px",
            marginTop: "5px",
            cursor: "pointer",
          }}
        />
      </form>

      <h2 className="word">Word : {meaning && meaning.word}</h2>
      <p className="audio">
        Pronouncation :{" "}
        {audio &&
          audio.map((element) => {
            return element.audio === "" ? (
              " "
            ) : (
              <audio key={element.audio} controls src={element.audio}></audio>
            );
          })}{" "}
      </p>
      <div className="meaning">
        {mean &&
          mean.map((element) => {
            return (
              <>
                <h3>Part of Speech : {element.partOfSpeech}</h3>
                {element.definitions.map((e) => {
                  return (
                    <ul key={e.definition}className="ul">
                      <li>Definition : {e.definition}</li>
                      {e.example ? (
                        <p key={e.example}>Example : {e.example}</p>
                      ) : (
                        " "
                      )}
                    </ul>
                  );
                })}
                <hr />
                <br />
              </>
            );
          })}{" "}
      </div>
    </>
  );
};

export default Dictionary;
