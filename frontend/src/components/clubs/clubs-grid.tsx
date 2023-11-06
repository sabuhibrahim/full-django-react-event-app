import { useRef } from 'react';

import Paginate from '../paginate';
import ClubCard from '../../components/clubs/club-card';
import { useLocation } from 'react-router-dom';
import { Query } from '../../types/query';
import useClubs from '../../hooks/use-clubs';

 const ClubsGrid = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const query: Query = {
    search: null,
    page: 1,
  };
  if (location.search) {
    const params = new URLSearchParams(location.search);
    query.search = params.get("search");
    if(!!params.get("page")) {
      query.page = params.get("page");
    }
  }
  const { clubs, count } = useClubs(query)

  return (
    <section
      ref={rootRef}
      className="flex scroll-mt-12 flex-col items-center space-y-16"
    >
      {clubs.length ? (
        <ul
          id="clubs-grid"
          className="grid w-full grid-cols-1 gap-x-8 gap-y-32 md:grid-cols-2 xl:grid-cols-3"
        >
          {clubs.map((club) => (
            <li key={club.id}>
              <ClubCard club={club} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-center text-lg">No matching clubs found</p>
      )}
      <Paginate totalItemCount={count} elementToScroll={rootRef.current} />
    </section>
  );
}


export default ClubsGrid;
