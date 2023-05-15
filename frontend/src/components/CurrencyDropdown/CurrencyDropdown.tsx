import React from "react";

interface CurrencyDropdownProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  selectedCurrency,
  onCurrencyChange,
}) => {
  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const currency = event.target.value;
    onCurrencyChange(currency);
  };

  return (
    <select
      className="form-select"
      id="currencyChange"
      name="currencyChange"
      value={selectedCurrency}
      onChange={handleCurrencyChange}
    >
      <option value="HKD">HKD</option>
      <option value="KRW">KRW</option>
      <option value="SGD">SGD</option>
      <option value="USD">USD</option>
    </select>
  );
};

export default CurrencyDropdown;
