import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { nper, pmt } from "financial";
import SavingsChart from "./SavingsChart";

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
      <div className="border-2 p-4 sm:p-5 grid gap-4 w-full max-md:justify-center">
        <div>
          <p className="font-semibold text-lg">Configure Your Consolidated Loan</p>
          <p className="text-sm text-gray-500">
            Use the slider below to simulate the new APR and loan term.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mb-4">
          <div className="md:col-span-3">
            <p className="text-sm font-bold text-gray-500">
              Desired APR
              <span className="block text-2xl font-extrabold text-[#06a9db]">
                {`${consolidatedAPR.toFixed(2)}%`}
              </span>
            </p>
            <input
              className="w-full mt-2"
              name="consolidatedAPR"
              type="range"
              min="4"
              max="36"
              value={consolidatedAPR}
              step="0.05"
              onChange={(e) => handleLoanChange(e)}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>4%</span>
              <span>36%</span>
            </div>
          </div>
          
          <div className="md:col-span-5">
            <p className="text-sm font-bold text-gray-500">
              Desired Loan Term
              <span className="block text-2xl font-extrabold text-[#06a9db]">
                {loanTerm} months
              </span>
            </p>
            <input
              className="w-full mt-2"
              name="loanTerm"
              type="range"
              min="12"
              max="60"
              value={loanTerm}
              step="1"
              onChange={(e) => handleLoanChange(e)}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>12 mo.</span>
              <span>60 mo.</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col lg:flex-row gap-4">
          <div className="lg:flex-1 border-2 p-2">
            <SavingsChart data={calulatedAmount} />
          </div>
          <div className="lg:flex-1 flex flex-col justify-center p-4 border-2">
            <p className="text-center font-bold text-lg mb-4">Savings Summary</p>
            <div className="text-center">
              <p className="text-sm font-semibold">Total Repayment Savings</p>
              <p className={`text-xl font-bold ${
                  calulatedAmount.totalRepaymentSavings >= 0
                    ? "text-[#00b290]"
                    : "text-[#ef4444]"
                }`}>
                ${calulatedAmount.totalRepaymentSavings.toLocaleString()}
              </p>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm font-semibold">Monthly Savings</p>
              <p className={`text-xl font-bold ${
                  calulatedAmount.totalMonthlySavings >= 0
                    ? "text-[#00b290]"
                    : "text-[#ef4444]"
                }`}>
                ${calulatedAmount.totalMonthlySavings.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-l-2 border-r-2 border-b-2 flex flex-col md:flex-row">
        <div className="border-r-0 md:border-r-2 flex-1">
          <div className="p-3 flex justify-between">
            <span>New Total Repayment</span>
            <span className="text-[#06a9db] font-bold">
              ${calulatedAmount.newTotalRepayment.toLocaleString()}
            </span>
          </div>
          <div className="p-3 flex justify-between">
            <span>Current Total Payment</span>
            <span className="font-semibold">
              ${calulatedAmount.currentTotalRepayment.toLocaleString()}
            </span>
          </div>
          <div className= {`${
                calulatedAmount.totalRepaymentSavings >= 0
                  ? "bg-[#f2fbf9]"
                  : "bg-[#fef2f2]"
              } p-3 font-semibold flex justify-between`}>
            <span>Total Repayment Savings</span>
            <span className={`${
                calulatedAmount.totalRepaymentSavings >= 0
                  ? "text-[#00b290]"
                  : "text-[#ef4444]"
              } font-bold`}>
              ${calulatedAmount.totalRepaymentSavings.toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="p-3 flex justify-between">
            <span>New Monthly Payment</span>
            <span className="text-[#06a9db] font-bold">
              ${calulatedAmount.newMonthlyPayment.toLocaleString()}
            </span>
          </div>
          <div className="p-3 flex justify-between">
            <span>Current Monthly Payment</span>
            <span className="font-semibold">
              ${calulatedAmount.currentMonthlyPayment.toLocaleString()}
            </span>
          </div>
          <div className={`${
                calulatedAmount.totalMonthlySavings >= 0
                  ? "bg-[#f2fbf9]"
                  : "bg-[#fef2f2]"
              } font-semibold p-3 flex justify-between`}>
            <span>Total Monthly Savings</span>
            <span className={`${
                calulatedAmount.totalMonthlySavings >= 0
                  ? "text-[#00b290]"
                  : "text-[#ef4444]"
              } font-bold`}>
              ${calulatedAmount.totalMonthlySavings.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanStimulator;
