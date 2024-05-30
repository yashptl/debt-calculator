import React from "react";
import DebtInput from "./DebtInput";
import AddIcon from "@mui/icons-material/Add";

const DebtForm = ({ setIsCalculateToggled, debts, setDebts }: any) => {
  //here I update the debts as input is given in
  function handleDebtChange(e: any, index: number) {
    const { name, value } = e.target;
    const newDebts = [...debts];
    newDebts[index][name] = value;
    setDebts(newDebts);
  }

  function removeDebt(index: number) {
    //I filter out the index for which the debt is being removed
    const newDebts = debts.filter((_: any, i: number) => i !== index);
    setDebts(newDebts);
  }

  function addDebt() {
    let lastDebt = debts.slice(-1)[0];
    //I check here if the last input field is complete to add a new one
    lastDebt.name &&
      lastDebt.amount &&
      lastDebt.apr &&
      lastDebt.payment &&
      setDebts([
        ...debts,
        { name: "", amount: null, apr: null, payment: null },
      ]);
  }

  return (
    <div>
      <p className="font-semibold pb-3">ENTER YOUR CURRENT DEBTS</p>
      <div className="grid grid-cols-4">
        <p className="col-span-1 text-sm font-semibold text-gray-600">
          DEBT NAME
        </p>
        <p className="col-span-1 text-sm font-semibold text-gray-600">
          REMAINING DEBT AMOUNT
        </p>
        <p className="col-span-1 text-sm font-semibold text-gray-600">
          CURRENT APR
        </p>
        <p className="col-span-1 text-sm font-semibold text-gray-600">
          CURRENT MONTHLY PAYMENT
        </p>
      </div>
      {debts?.length > 0 &&
        debts.map((debt: any, index: number) => (
          <DebtInput
            key={index}
            debt={debt}
            index={index}
            handleDebtChange={handleDebtChange}
            removeDebt={removeDebt}
          />
        ))}
      <button
        className="text-[#06a9db] flex items-center mt-3"
        onClick={addDebt}
      >
        <AddIcon />
        <p className="text-sm font-semibold">Add Another Debt</p>
      </button>
      <button
        className="w-full text-white bg-[#06a9db] mt-5 py-3 font-semibold text-lg"
        onClick={() => {
          let lastDebt = debts.slice(-1)[0];
          //this is to check if all the fields are complete or not
          lastDebt.name && lastDebt.amount && lastDebt.apr && lastDebt.payment
            ? setIsCalculateToggled(true)
            : alert("please complete the input debt feild calculate");
        }}
      >
        Calculate Savings
      </button>
    </div>
  );
};

export default DebtForm;
