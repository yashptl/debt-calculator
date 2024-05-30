import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { nper, pmt } from "financial";

const LoanStimulator = ({ setIsCalculateToggled, debts }: any) => {
  const [consolidatedAPR, setConsolidatedAPR] = useState<number>(8.0);
  const [loanTerm, setLoanTerm] = useState<number>(24);
  const [calulatedAmount, setCalulatedAmount] = useState<any>({
    newTotalRepayment: 0,
    currentTotalRepayment: 0,
    totalRepaymentSavings: 0,
    newMonthlyPayment: 0,
    currentMonthlyPayment: 0,
    totalMonthlySavings: 0,
  });

  //Results are calculated as we land on this page with some tentative loan values
  useEffect(() => {
    calculateResults(debts, consolidatedAPR, loanTerm);
  }, []);

  //this is the function where all the resulting values are calculated, such as total repayment amount, new repayment amount, etc.
  function calculateResults(
    debts: any,
    currentConsolidateAPR: number,
    currentLoanTerm: number
  ) {
    const currentTotalRepayment = calculateCurrentTotalRepayment(debts);
    const [currentMonthlyPayment, newMonthlyPayment] = calculateMonthlyPayment(
      debts,
      currentConsolidateAPR,
      currentLoanTerm
    );

    //here I make a new object to update the state as I calculate new resulting values
    let newCalculatedAmount = { ...calulatedAmount };
    newCalculatedAmount.currentTotalRepayment = currentTotalRepayment;
    newCalculatedAmount.newTotalRepayment = Math.round(
      newMonthlyPayment * currentLoanTerm
    );
    newCalculatedAmount.totalRepaymentSavings = Math.round(
      currentTotalRepayment - newCalculatedAmount.newTotalRepayment
    );
    newCalculatedAmount.currentMonthlyPayment = currentMonthlyPayment;
    newCalculatedAmount.newMonthlyPayment = +newMonthlyPayment.toFixed(2);
    newCalculatedAmount.totalMonthlySavings = +(
      currentMonthlyPayment - newMonthlyPayment
    ).toFixed(2);

    setCalulatedAmount(newCalculatedAmount);
  }

  function calculateCurrentTotalRepayment(debts: any) {
    let monthlyInterstRate = 0,
      numberOfPayments = 0,
      currentTotalRepayment = 0;

    //here I iterate over the debt oject, getting the payment and amount to calculate the number of payments
    debts.forEach((e: any, i: number) => {
      monthlyInterstRate = e.apr / (12 * 100);
      numberOfPayments = Math.ceil(
        nper(monthlyInterstRate, -e.payment, +e.amount)
      );
      currentTotalRepayment += +e.payment * numberOfPayments;
    });
    return currentTotalRepayment;
  }

  function calculateMonthlyPayment(
    debts: any,
    currentConsolidateAPR: number,
    currentLoanTerm: number
  ) {
    let newMonthlyPayment = 0,
      currentMonthlyPayment = 0;
    const newMonthlyInterstRate = currentConsolidateAPR / (12 * 100);

    //I parse through the debts oject to calculate each new monthly payment by using the debt remaining amount
    debts.forEach((e: any, i: number) => {
      currentMonthlyPayment += +e.payment;
      newMonthlyPayment += pmt(
        newMonthlyInterstRate,
        currentLoanTerm,
        -e.amount
      );
    });

    return [currentMonthlyPayment, newMonthlyPayment];
  }

  //Here I handle the changing slider inputs
  function handleLoanChange(e: any) {
    const { name, value } = e.target;
    let tempConsolidatedAPR = 0,
      tempLoanTerm = 0;

    //I send in the current consolidate APR and loan term as they're defined in the state are always one behind the actual current values.
    if (name === "consolidatedAPR") {
      tempConsolidatedAPR = parseFloat(value);
      tempLoanTerm = loanTerm;
      setConsolidatedAPR(parseFloat(value));
    } else {
      tempLoanTerm = parseInt(value);
      tempConsolidatedAPR = consolidatedAPR;
      setLoanTerm(parseInt(value));
    }
    calculateResults(debts, tempConsolidatedAPR, tempLoanTerm);
  }

  return (
    <div>
      <button
        className="text-[#06a9db] flex items-center pb-3"
        onClick={() => {
          setIsCalculateToggled(false);
        }}
      >
        <ArrowBackIcon />
        <p className="text-medium font-semibold">Update Your Current Debts</p>
      </button>
      <div className="border-2 p-5 grid gap-y-2 grid-rows-3 w-full ">
        <div>
          <p className="font-semibold">Configure Your Consolidated Loan</p>
          <p className="text-sm text-gray-500">
            Use the slider below to simulate the new APR and loan term.
          </p>
        </div>
        <div className="grid grid-cols-8 mb-4">
          <span className="text-sm font-bold text-gray-500 col-span-1">
            Desired APR
            <p className="text-2xl font-extrabold text-[#06a9db]">
              {`${consolidatedAPR.toFixed(2)}%`}
            </p>
          </span>
          <span className="text-sm font-bold text-gray-500 col-span-5 pt-2">
            <input
              className="w-full"
              name="consolidatedAPR"
              type="range"
              min="4"
              max="36"
              value={consolidatedAPR}
              step="0.05"
              onChange={(e) => handleLoanChange(e)}
            />
            <div className="-mt-2 flex w-full justify-between">
              <span className="text-sm text-gray-600">4%</span>
              <span className="text-sm text-gray-600">36%</span>
            </div>
          </span>
        </div>
        <div className="grid grid-cols-8">
          <p className="text-sm font-bold text-gray-500">
            Desired Loan Term
            <p className="text-2xl font-extrabold text-[#06a9db]">
              {loanTerm} months
            </p>
          </p>
          <span className="text-sm font-bold text-gray-500 col-span-5 pt-2">
            <input
              className="w-full"
              name="loanTerm"
              type="range"
              min="12"
              max="60"
              value={loanTerm}
              step="1"
              onChange={(e) => handleLoanChange(e)}
            />
            <div className="-mt-2 flex w-full justify-between">
              <span className="text-sm text-gray-600">12 mo.</span>
              <span className="text-sm text-gray-600">60 mo.</span>
            </div>
          </span>
        </div>
      </div>
      <div className="border-l-2 border-r-2 border-b-2 flex">
        <div className="border-r-2  flex-1">
          <p className="justify-between p-3 flex block">
            New Total Repayment
            <span className="text-[#06a9db] text-lg font-bold">
              ${calulatedAmount.newTotalRepayment.toLocaleString()}
            </span>
          </p>
          <p className="justify-between p-3 flex">
            Current Total Payment
            <span className="text-lg font-semibold">
              ${calulatedAmount.currentTotalRepayment.toLocaleString()}
            </span>
          </p>
          <p className= {`${
                calulatedAmount.totalRepaymentSavings >= 0
                  ? "bg-[#f2fbf9]"
                  : "bg-[#fef2f2]"
              } p-3 font-semibold justify-between flex block`}>
            Total Repayment Savings
            <span className={`${
                calulatedAmount.totalRepaymentSavings >= 0
                  ? "text-[#00b290]"
                  : "text-[#ef4444]"
              } text-xl font-bold`}>
              ${calulatedAmount.totalRepaymentSavings.toLocaleString()}
            </span>
          </p>
        </div>
        <div className="flex-1">
          <p className="justify-between p-3 flex">
            New Monthly Payment
            <span className="text-[#06a9db] text-lg font-bold">
              ${calulatedAmount.newMonthlyPayment.toLocaleString()}
            </span>
          </p>
          <p className="justify-between p-3 flex">
            Current Monthly Payment
            <span className="text-lg font-semibold">
              ${calulatedAmount.currentMonthlyPayment.toLocaleString()}
            </span>
          </p>
          <p className={`${
                calulatedAmount.totalMonthlySavings >= 0
                  ? "bg-[#f2fbf9]"
                  : "bg-[#fef2f2]"
              } font-semibold p-3 justify-between flex`}>
            Total Monthly Savings
            <span className={`${
                calulatedAmount.totalMonthlySavings >= 0
                  ? "text-[#00b290]"
                  : "text-[#ef4444]"
              } text-xl font-bold`}>
              ${calulatedAmount.totalMonthlySavings.toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanStimulator;
