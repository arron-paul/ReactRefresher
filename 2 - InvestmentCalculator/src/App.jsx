import Header from "./components/Header";
import UserInput from "./components/UserInput";
import Results from "./components/Results";
import { calculateInvestmentResults } from "./util/investment";

function App() {
  function updateResults(inputs) {
    // This function will be called by UserInput component
    // to update the results displayed in the Results component
    console.log("Updating inputs");
    let output = calculateInvestmentResults(inputs);
    console.log("Calculated");
  }

  return (
    <>
      <Header />
      <UserInput updateResults={updateResults} />
      <Results />
    </>
  );
}

export default App;
