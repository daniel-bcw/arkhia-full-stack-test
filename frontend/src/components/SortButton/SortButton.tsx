import React from "react";

interface SortButtonProps {
  sortByRank: boolean;
  sortByName: boolean;
  onSortByRank: () => void;
  onSortByName: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({
  sortByRank,
  sortByName,
  onSortByRank,
  onSortByName,
}) => {
  return (
    <div>
      <button
        className={`btn btn-primary me-2 ${sortByRank ? "active" : ""}`}
        onClick={onSortByRank}
      >
        Sort by Rank
      </button>
      <button
        className={`btn btn-primary ${sortByName ? "active" : ""}`}
        onClick={onSortByName}
      >
        Sort by Name
      </button>
    </div>
  );
};

export default SortButton;
