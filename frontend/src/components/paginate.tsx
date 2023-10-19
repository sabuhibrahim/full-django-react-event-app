import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';

export default function Paginate({
  totalPages,
  elementToScroll,
}: {
  totalPages: number;
  elementToScroll: HTMLElement | null;
}) {
  const [page, setPage] = useState<number>(1);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);

    elementToScroll &&
      elementToScroll.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
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
