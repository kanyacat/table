import { IPaginationProps } from "../../types/types";
import styles from "./Pagination.module.css";

export const Pagination = (props: IPaginationProps) => {
  const { nav = null, hasPage, onNextPageClick, onPrevPageClick } = props;

  const handleNextPageClick = () => {
    onNextPageClick();
  };
  const handlePrevPageClick = () => {
    onPrevPageClick();
  };

  return (
    <div className={styles.root}>
      <button
        type="button"
        onClick={handlePrevPageClick}
        disabled={hasPage.hasPreviousPage}
      >
        {"<"}
      </button>
      {nav && (
        <span>
          {nav.current} / {nav.total}
        </span>
      )}
      <button
        type="button"
        onClick={handleNextPageClick}
        disabled={hasPage.hasNextPage}
      >
        {">"}
      </button>
    </div>
  );
};
