import Header from "./components/Header";
import UserInput from "./components/UserInput";
import Results from "./components/Results";
import { calculateInvestmentResults } from "./util/investment";
import { useState } from "react";

const INITIAL_USER_INPUT = {
  initialInvestment: 10000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10,
};
const INITIAL_RESULTS = [];

function App() {
  let [userInput, setUserInput] = useState(INITIAL_USER_INPUT);
  const [results, setResults] = useState(INITIAL_RESULTS);

  function handleResultsChanged(inputs) {
    setResults(() => {
      return calculateInvestmentResults(inputs);
    });
  }

  function handleInputChanged(event) {
    const { name, value } = event.target;
    setUserInput((prevInput) => {
      const newInputs = {
        ...prevInput,
        [name]: value,
      };
      return newInputs;
    });
    handleResultsChanged(userInput);
  }

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleInputChanged} />
      <Results results={results} />
    </>
  );
}

export default App;
