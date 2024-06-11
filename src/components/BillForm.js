import React, { useState } from 'react';
import jsPDF from 'jspdf';

const BillForm = () => {
  const [units, setUnits] = useState('');
  const [bill, setBill] = useState(null);

  const handleChange = (e) => {
    setUnits(e.target.value);
  };

  const calculateBill = (units) => {
    let billAmount = 0;
    if (units <= 50) {
      billAmount = units * 2.00;
    } else if (units <= 100) {
      billAmount = 50 * 2.00 + (units - 50) * 2.50;
    } else if (units <= 250) {
      billAmount = 50 * 2.00 + 50 * 2.50 + (units - 100) * 5.25;
    } else {
      billAmount = 50 * 2.00 + 50 * 2.50 + 150 * 4.50 + (units - 250) * 6.30;
    }
    return billAmount;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const billAmount = calculateBill(units);
    setBill(billAmount);
    generatePDF(billAmount);
  };

  const generatePDF = (billAmount) => {
    const doc = new jsPDF();
    doc.text(20, 20, `Electricity Bill`);
    doc.text(20, 30, `Units Consumed: ${units}`);
    doc.text(20, 40, `Bill Amount: ₹${billAmount}`);
    doc.save('electricity_bill.pdf');
  };

  return (
    <div>
      <h2>UHBVN Electricity Bill Calculator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Units Consumed:</label>
          <input type="number" value={units} onChange={handleChange} required />
        </div>
        <button type="submit">Calculate Bill</button>
      </form>
      {bill !== null && (
        <div>
          <h3>Your Bill: ₹{bill.toFixed(2)}</h3>
          <button onClick={() => generatePDF(bill)}>Download Bill</button>
        </div>
      )}
    </div>
  );
};

export default BillForm;
