import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { PaginationContext } from "src/Contexts";

function Pagination() {
  const { page, setPagination } = useContext(PaginationContext);
  const paginationMove = (e: React.MouseEvent, next: boolean) => {
    e.preventDefault();
    if (next) {
      setPagination((oldPage) => oldPage + 1);
    } else {
      setPagination((oldPage) => {
        if (oldPage === 1) return 1;
        return oldPage - 1;
      });
    }
    window.scrollTo(0, 0);
    window.location.href.replace(window.location.search, "");
  };

  return (
    <div className="w-full flex justify-center mt-2 space-x-10">
      {page > 1 ? (
        <MdArrowBackIos
          className="fill-purple-neko cursor-pointer  w-10 text-xl"
          data-testid="previous-button"
          onClick={(e) => paginationMove(e, false)}
        />
      ) : (
        ""
      )}
      <span>Page {page}</span>
      <MdArrowForwardIos
        className="fill-purple-neko  cursor-pointer  w-10 text-xl"
        data-testid="next-button"
        onClick={(e) => paginationMove(e, true)}
      />
    </div>
  );
}

export default Pagination;
