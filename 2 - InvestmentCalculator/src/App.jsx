import Header from "./components/Header";
import UserInput from "./components/UserInput";
import Results from "./components/Results";
import { useState } from "react";

const INITIAL_USER_INPUT = {
  initialInvestment: 10000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10,
};

function App() {
  let [userInput, setUserInput] = useState(INITIAL_USER_INPUT);

  function handleInputChanged(event) {
    const { name, value } = event.target;
    setUserInput((prevInput) => {
      // Combine the old input state and change the key that was updated
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleInputChanged} />
      <Results userInput={userInput} />
    </>
  );
}

export default App;
