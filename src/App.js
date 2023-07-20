import { useState } from "react";
import CalculateForm from "./Components/Calculate/CalculateForm/CalculateForm";
import CalculateTable from "./Components/Calculate/CalculateTable/CalculateTable";
import Header from "./Components/Header/Header";

function App() {
  const [userInput, setUserInput] = useState(null);

  function calculateHandler(userInput) {
    setUserInput(userInput);
  }

  const yearlyData = [];

  if (userInput) {
    let currentSavings = +userInput["current-savings"]; // feel free to change the shape of this input object!
    const yearlyContribution = +userInput["yearly-contribution"]; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header />
      <CalculateForm onCalculate={calculateHandler} />
     {!userInput && <p style={{textAlign:'center'}} >No investment calculated yet.</p>}
      {userInput && <CalculateTable data={yearlyData} initialInvestment = {userInput["current-savings"]} />}
    </div>
  );
}

export default App;
