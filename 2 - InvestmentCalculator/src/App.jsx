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
        // Convert the value to a number with +
        [name]: +value,
      };
    });
  }

  // Hide the table if the duration is less than 1 year
  const userInputValid = userInput.duration > 0;

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleInputChanged} />
      {!userInputValid && (
        <p className="center">Duration must be greater than 0</p>
      )}
      {userInputValid && <Results userInput={userInput} />}
    </>
  );
}

export default App;
