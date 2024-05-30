import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

//this component renders the input fields for debts and a remove button
const DebtInput = ({ debt, index, handleDebtChange, removeDebt }: any) => {
  const inputStyle = "col-span-1 px-5 py-2 border-2 w-[90%] mt-2 bg-[#f4fafd]";
  const inputDivStyle =
    "col-span-1 border-2 w-[90%] mt-2 bg-[#f4fafd] flex items-center";
  const inputIconStyle = "px-3 py-2 bg-white text-gray-500 font-medium";
  return (
    <div className="debt-input grid grid-cols-4">
      <input
        className={inputStyle}
        type="text"
        name="name"
        placeholder="e.g. Medical"
        value={debt.name}
        onChange={(e) => handleDebtChange(e, index)}
      />
      <div className={inputDivStyle}>
        <span className={`${inputIconStyle} border-r-2`}>$</span>
        <input
          className="bg-[#f4fafd] pl-5 py-2 w-full"
          type="number"
          name="amount"
          placeholder="5000"
          value={debt.amount}
          onChange={(e) => handleDebtChange(e, index)}
        />
      </div>
      <div className={inputDivStyle}>
        <input
          className="bg-[#f4fafd] pl-5 py-2 w-full"
          type="number"
          name="apr"
          placeholder="15.99"
          value={debt.apr}
          onChange={(e) => handleDebtChange(e, index)}
        />
        <span className={`${inputIconStyle} border-l-2`}>%</span>
      </div>
      <div className="flex">
        <div className={inputDivStyle}>
          <span className={`${inputIconStyle} border-r-2`}>$</span>
          <input
            className="bg-[#f4fafd] pl-5 py-2 w-full"
            type="number"
            name="payment"
            placeholder="200"
            value={debt.payment}
            onChange={(e) => handleDebtChange(e, index)}
          />
        </div>
        {index !== 0 && (
          <button onClick={() => removeDebt(index)}>
            <ClearIcon className="ml-2" style={{ fontWeight: "bold" }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default DebtInput;
