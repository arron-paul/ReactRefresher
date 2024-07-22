import { useState } from "react";
import { calculateInvestmentResults, formatter } from "../util/investment.js";
const INITIAL_RESULTS = [];
export default function ResultsTable({ userInput }) {
  // We dont need to store any state in this component
  // as we can calculate the results directly from the `userInput` prop
  const results = calculateInvestmentResults(userInput);

  let totalInterest = 0;
  let totalAmountInvested = 0;
  let tableData = results.map((yearData) => {
    totalInterest += yearData.interest;
    totalAmountInvested += yearData.annualInvestment + yearData.interest;
    return (
      <tr key={yearData.year}>
        <td>{yearData.year}</td>
        <td>{formatter.format(yearData.valueEndOfYear)}</td>
        <td>{formatter.format(yearData.interest)}</td>
        <td>{formatter.format(totalInterest)}</td>
        <td>{formatter.format(totalAmountInvested)}</td>
      </tr>
    );
  });

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>{tableData}</tbody>
    </table>
  );
}
