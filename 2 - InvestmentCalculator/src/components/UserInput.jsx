export default function UserInput({ onChange, userInput }) {
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
              onChange={onChange}
              value={userInput.initialInvestment}
            />
          </p>
          <p>
            <label>Annual Investment</label>
            <input
              name="annualInvestment"
              type="number"
              required
              onChange={onChange}
              value={userInput.annualInvestment}
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
              onChange={onChange}
              value={userInput.expectedReturn}
            />
          </p>
          <p>
            <label>Duration</label>
            <input
              name="duration"
              type="number"
              required
              onChange={onChange}
              value={userInput.duration}
            />
          </p>
        </div>
      </section>
    </>
  );
}
