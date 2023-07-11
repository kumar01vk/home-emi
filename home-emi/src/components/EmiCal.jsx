import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import './EmiCal.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const EmiCal = () => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTenure, setLoanTenure] = useState(0);
//   const [emi, setEmi] = useState(0);
  const [interest, setInterest] = useState(0);
  const [principal, setPrincipal] = useState(0);

  const calculateEmi = () => {
    const principalAmount = parseInt(loanAmount);
    const rateOfInterest = parseFloat(interestRate) / 100 / 12;
    const loanDuration = parseInt(loanTenure) * 12;

    const emi =
      (principalAmount *
        rateOfInterest *
        Math.pow(1 + rateOfInterest, loanDuration)) /
      (Math.pow(1 + rateOfInterest, loanDuration) - 1);
    const totalInterest = emi * loanDuration - principalAmount;

    // setEmi(emi.toFixed(2));
    setInterest(totalInterest.toFixed(2));
    setPrincipal(principalAmount.toFixed(2));
  };

  const data = {
    labels: ["Principal Amount", "Total Interest"],
    datasets: [
      {
        label: "Ratio of Principle and Interest",
        data: [principal, interest],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
        borderWidth: 1,
      },
    ],
  };

  return (  
<div className="container align-baseline ">
      <h1 className="mt-2">Loan EMI Calculator</h1>
      <div className="row mt-2 cal">
        <div className="col-md-6">
          <div>
            <div className="col-md-6">
              <label className="form-label">Loan Amount:</label>
              <input type="number" className="form-control" onChange={(e) => setLoanAmount(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Interest Rate (% per annum):</label>
              <input
                type="number" className="form-control"
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Loan Tenure (in years):</label>
              <input type="number" className="form-control" onChange={(e) => setLoanTenure(e.target.value)} />
            </div>
          <div className="p-4 col-md-2 ">
            <button className="btn btn-primary" onClick={calculateEmi}>Calculate</button>
          </div>
          </div>
        </div>
        <div className="col-md-4">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
};

export default EmiCal;
