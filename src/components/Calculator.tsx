import React from "react";
import DebtForm from "./DebtForm";
import { useState } from "react";
import LoanStimulator from "./LoanStimulator";

const Calculator = () => {
  const [debts, setDebts] = useState([
    { name: "", amount: "", apr: "", payment: "" },
  ]);
  const [isCalculateToggled, setIsCalculateToggled] = useState(false);

  return (
    <div className="debt-calculator p-14">
      <h1 className="text-3xl font-semibold pb-2">
        Debt Consolidation Saving Calculator
      </h1>
      <p className="text-gray-500 pb-5">
        Enter the details of your current unsecured debt and see how much you
        may be able to save after consolidating the debts into a single loan.
        Only include credit card debt, medical debt, personal loan debt, and
        other types of unsecured debt.
      </p>
      <div className="Debt-info-input">
        {isCalculateToggled ? (
          <LoanStimulator
            setIsCalculateToggled={setIsCalculateToggled}
            debts={debts}
          />
        ) : (
          <DebtForm
            setIsCalculateToggled={setIsCalculateToggled}
            debts={debts}
            setDebts={setDebts}
          />
        )}
      </div>
    </div>
  );
};

export default Calculator;
