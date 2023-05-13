import React from "react";

interface ExchangeFieldProps {
  exchange: string;
}

const ExchangeField: React.FC<ExchangeFieldProps> = ({ exchange }) => {
  return (
    <div>
      <label htmlFor="exchange">Minimize Exchange:</label>
      <input
        type="text"
        id="exchange"
        className="form-control"
        name="exchange"
        value={exchange}
        readOnly
      />
    </div>
  );
};

export default ExchangeField;
