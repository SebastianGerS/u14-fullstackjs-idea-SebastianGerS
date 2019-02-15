import React, { useEffect } from 'react';
import SearchInterface from '../Containers/SearchInterface';
import { scrollToTop } from '../Helpers/UserAgent';

function Search() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="Search">
      <SearchInterface />
    </div>
  );
}

export default Search;
