import { useState } from "react";

const initialInputs = {
  initialInvestment: 0,
  annualInvestment: 0,
  expectedReturn: 0,
  duration: 0,
};

export default function UserInput({ updateResults }) {
  const [inputs, setInputs] = useState(initialInputs);

  const handleInputChanged = (event) => {
    const { name, value } = event.target;
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: value,
      };
    });
    updateResults(inputs);
  };

  return (
    <>
      <section id="user-input">
        <div className="input-group">
          <p>
            <label>Initial Investment</label>
            <input
              name="initialInvestment"
              type="number"
              required
              onChange={handleInputChanged}
              value={inputs.initial_investment}
            />
          </p>
          <p>
            <label>Annual Investment</label>
            <input
              name="annualInvestment"
              type="number"
              required
              onChange={handleInputChanged}
              value={inputs.annual_investment}
            />
          </p>
        </div>
        <div className="input-group">
          <p>
            <label>Expected Return</label>
            <input
              name="expectedReturn"
              type="number"
              required
              onChange={handleInputChanged}
              value={inputs.expected_return}
            />
          </p>
          <p>
            <label>Duration</label>
            <input
              name="duration"
              type="number"
              required
              onChange={handleInputChanged}
              value={inputs.duration}
            />
          </p>
        </div>
      </section>
    </>
  );
}
