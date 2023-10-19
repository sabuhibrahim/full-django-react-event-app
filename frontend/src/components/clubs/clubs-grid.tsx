import { useRef } from 'react';

import Paginate from '../paginate';
import ClubCard from '../../components/clubs/club-card';
import { Club } from '../../types/club';

export default function PostsGrid({ clubs }: { clubs: Club[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

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
        <p className="mt-10 text-center text-lg">No matching posts found</p>
      )}
      <Paginate totalPages={5} elementToScroll={rootRef.current} />
    </section>
  );
}
