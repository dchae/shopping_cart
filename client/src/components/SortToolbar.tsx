import type { ReactNode } from "react";
import type { SortField, SortState } from "../hooks/useSorter";

interface SortButtonProps {
  active: boolean;
  isDescending: boolean;
  onClick: () => void;
  children: ReactNode;
}

const SortButton = ({
  active,
  isDescending,
  onClick,
  children,
}: SortButtonProps) => {
  const inactiveStyle = {
    color: "#07575b",
    border: "1px solid #07575b",
    background: "transparent",
  };

  const style = {
    border: "1px solid #07575b",
    ...(active ? {} : inactiveStyle),
  };

  return (
    <button style={style} onClick={onClick}>
      {children}
      {active && (
        <span style={{ paddingLeft: 4 }}>{isDescending ? "↓" : "↑"}</span>
      )}
    </button>
  );
};

interface SortToolbarProps {
  sortState: SortState;
  setSortState: React.Dispatch<React.SetStateAction<SortState>>;
}

const SortToolbar = ({ sortState, setSortState }: SortToolbarProps) => {
  const createHandler = (field: SortField) => {
    return () => {
      setSortState(({ sortBy, orderBy }) => {
        if (sortBy === field) {
          orderBy = orderBy === "ASC" ? "DESC" : "ASC";
        }

        return { sortBy: field, orderBy };
      });
    };
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "baseline",
        gap: 10,
        paddingBottom: 15,
      }}
    >
      <h3 style={{ margin: 0 }}>Sort By:</h3>
      <SortButton
        onClick={createHandler("name")}
        active={sortState.sortBy === "name"}
        isDescending={sortState.orderBy === "DESC"}
      >
        Name
      </SortButton>
      <SortButton
        onClick={createHandler("price")}
        active={sortState.sortBy === "price"}
        isDescending={sortState.orderBy === "DESC"}
      >
        Price
      </SortButton>
      <SortButton
        onClick={createHandler("quantity")}
        active={sortState.sortBy === "quantity"}
        isDescending={sortState.orderBy === "DESC"}
      >
        Quantity
      </SortButton>
    </div>
  );
};

export default SortToolbar;
