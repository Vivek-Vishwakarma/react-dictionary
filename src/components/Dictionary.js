import React, { useState } from "react";
import "../App.css";
import Words from "../word";
import { HiSearch } from "react-icons/hi";
const Dictionary = () => {
  const [search, setSearch] = useState("");
  const [meaning, setMeaning] = useState([]);
  const [audio, setAudio] = useState("");
  const [mean, setMean] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchData = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const fetchMeaning = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
      );
      const data = await fetchMeaning.json();
      setMeaning(data[0]);
      setAudio(data[0].phonetics);
      setMean(data[0].meanings);
      console.log(audio);
      setLoading(false);
    } catch (error) {
      alert("Not found !!");
    }
  };
  return (
    <>
      <form className="container" onSubmit={fetchData}>
        <input
        list="words"
        name="words"
          onChange={(e) => setSearch(e.target.value)}
          className="input"
          placeholder="Search ..."
        />
        <datalist id="words">
          {Words.map((e)=>{
            return (<option value={e}/>)
          })}
        </datalist>
        <HiSearch className="icon" onClick={fetchData} alt="search icon" />
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
        {loading && <h4>Searching ....</h4>}
        {mean &&
          mean.map((element) => {
            return (
              <>
                <h3>Part of Speech : {element.partOfSpeech}</h3>
                {element.definitions.map((e) => {
                  return (
                    <ul key={e.definition} className="ul">
                      <li>Definition : {e.definition}</li>
                      {e.example ? (
                        <p key={e.example}>Example : {e.example}</p>
                      ) : (
                        " "
                      )}
                    </ul>
                  );
                })}
                <br />
              </>
            );
          })}{" "}
      </div>
    </>
  );
};

export default Dictionary;
