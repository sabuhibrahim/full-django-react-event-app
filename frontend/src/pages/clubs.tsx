import React from "react";
import SearchBar from "../components/search-bar";
import ClubsGrid from "../components/clubs/clubs-grid";

const Clubs = () => {

  return (
    <React.Fragment>
      <section className="mb-16 mt-0 space-y-8 md:mt-20">
        <SearchBar />
      </section>

      <ClubsGrid />
      
    </React.Fragment>
  );
};

export default Clubs;
