import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import { PAGE_ITEM_COUNT } from '../constants';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';

export default function Paginate({
  totalItemCount,
  elementToScroll,
}: {
  totalItemCount: number;
  elementToScroll: HTMLElement | null;
}) {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  let currentPage = params.get("page") ?? "1"

  const [page, setPage] = useState<number>(+currentPage);

  const totalPages = Math.ceil(totalItemCount / PAGE_ITEM_COUNT);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);

    elementToScroll &&
      elementToScroll.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    
    params.set("page", `${selected + 1}`)
    navigate({
      pathname: location.pathname,
      search: createSearchParams(params).toString(),
    });
  };

  return (
    <ReactPaginate
      className="paginate"
      pageCount={totalPages}
      previousLabel={<AiOutlineLeft />}
      nextLabel={<AiOutlineRight />}
      breakLabel={<FiMoreHorizontal />}
      onPageChange={handlePageChange}
      forcePage={page - 1}
      renderOnZeroPageCount={() => null}
    />
  );
}
