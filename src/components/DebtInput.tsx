import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

//this component renders the input fields for debts and a remove button
const DebtInput = ({ debt, index, handleDebtChange, removeDebt }: any) => {
  const inputStyle = "w-full px-3 py-2 border-2 bg-[#f4fafd]";
  const inputDivStyle = "border-2 bg-[#f4fafd] flex items-center";
  const inputIconStyle = "px-3 py-2 bg-white text-gray-500 font-medium";
  
  return (
     <div className={`debt-input flex flex-col mt-2 gap-3 md:grid md:grid-cols-4 md:gap-2 ${index !== 0 ? 'max-md:border-t max-md:border-black max-md:pt-4 max-md:pb-4' : 'max-md:pb-4'}`}>
      <div className="md:col-span-1">
        <p className="md:hidden text-xs font-semibold text-gray-600 mt-2">DEBT NAME</p>
        <input
          className={inputStyle}
          type="text"
          name="name"
          placeholder="e.g. Medical"
          value={debt.name}
          onChange={(e) => handleDebtChange(e, index)}
        />
      </div>
      
      <div className="md:col-span-1">
        <p className="md:hidden text-xs font-semibold text-gray-600 mt-2">REMAINING DEBT AMOUNT</p>
        <div className={inputDivStyle}>
          <span className={`${inputIconStyle} border-r-2`}>$</span>
          <input
            className="bg-[#f4fafd] pl-2 py-2 w-full"
            type="number"
            name="amount"
            placeholder="5000"
            value={debt.amount}
            onChange={(e) => handleDebtChange(e, index)}
          />
        </div>
      </div>
      
      <div className="md:col-span-1">
        <p className="md:hidden text-xs font-semibold text-gray-600 mt-2">CURRENT APR</p>
        <div className={inputDivStyle}>
          <input
            className="bg-[#f4fafd] pl-2 py-2 w-full"
            type="number"
            name="apr"
            placeholder="15.99"
            value={debt.apr}
            onChange={(e) => handleDebtChange(e, index)}
          />
          <span className={`${inputIconStyle} border-l-2`}>%</span>
        </div>
      </div>
      
      <div className="md:col-span-1 flex items-start">
        <div className="flex-1">
          <p className="md:hidden text-xs font-semibold text-gray-600 mt-2">CURRENT MONTHLY PAYMENT</p>
          <div className={inputDivStyle}>
            <span className={`${inputIconStyle} border-r-2`}>$</span>
            <input
              className="bg-[#f4fafd] pl-2 py-2 w-full"
              type="number"
              name="payment"
              placeholder="200"
              value={debt.payment}
              onChange={(e) => handleDebtChange(e, index)}
            />
          </div>
        </div>
        {index !== 0 && (
          <button
            className="ml-2 mt-7 md:mt-2"
            onClick={() => removeDebt(index)}
          >
            <ClearIcon style={{ fontWeight: "bold" }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default DebtInput;
