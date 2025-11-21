import { useState,useEffect } from "react"
import axios from 'axios'
import countries from "./assets/countries"

const Display = ({country}) => {
  if (!country){
    return null
  }
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital : {country.capital[0]}</p>
      <p>Area : {country.area}</p>
      <h3>Languages :</h3>
      <ul>
        {Object.values(country.languages).map((l, i) => {
          return <li key={i}>{l}</li>
        })}
      </ul>
      <img src={country.flags.png}></img>
    </div>
  )
}


const App = () => {
  const randomCountry = countries[Math.floor(Math.random() * countries.length)]
  const [country, setCountry] = useState(null)
  const [newCountry, setNewCountry] = useState(randomCountry)
  
  const handleInputChange = (event) => {
    setNewCountry(event.target.value)
  } 

  const fetchCountry = (event) => {
    const randomCountry = countries[Math.floor(Math.random() * countries.length)]
    event.preventDefault()
    const fetchUrl = `https://studies.cs.helsinki.fi/restcountries/api/name/${newCountry}`
    axios
      .get(fetchUrl)
      .then(response => setCountry(response.data))
      .catch(error => alert('invalid country name'))
    setNewCountry(randomCountry)
  }

  
  return (
    <div>
      <h1>Countries information</h1>
      <p>Type a country name or try the suggested ones :</p>
      <form onSubmit={fetchCountry}>
        <input value={newCountry} onChange={handleInputChange}/>
        <br />
        <br />
        <button type='submit'>Try it !</button>
      </form>
      <Display country={country}/>
    </div>
  )
}

export default App
