import { Link } from 'react-router-dom';

import { Club } from '../../types/club';
import { getImageUrl } from '../../api/urls';


const ClubCard = ({
  club: { id, title, description, image, created_at, updated_at},
}: {
  club: Club;
}) => {
  return (
    <Link to={`/clubs/${id}`}>
      <article className="mx-auto flex max-w-[25rem] flex-col overflow-hidden rounded-xl shadow-xl shadow-gray-400 transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl dark:shadow-black">
        <div className="relative h-auto">
          <img
            src={getImageUrl(image)}
            alt="cover image"
            style={{ objectFit: 'cover' }}
            placeholder="blur"
          />
        </div>
        <div className="flex h-48 flex-col p-4">
          <h3 className="line-clamp-2 h-16 text-2xl font-bold">{title}</h3>
          <p className="mb-4 mt-2 pl-2 text-sm text-gray-400">{description}</p>
          <time className="mb-4 mt-2 pl-2 text-sm text-gray-400">{created_at}</time>
          <time className="mb-4 mt-2 pl-2 text-sm text-gray-400">{updated_at}</time>
        </div>
      </article>
    </Link>
  );
}


export default ClubCard;