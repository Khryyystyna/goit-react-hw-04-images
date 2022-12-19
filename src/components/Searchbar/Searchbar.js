import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { GrSearch } from 'react-icons/gr';
import {
  SearchBox,
  SearchButton,
  SearchForm,
  SearchInput,
} from './Searchbar.styled';
import { useState } from 'react';

export const Searchbar = ({onSubmit}) => {
    const [query, setQuery] = useState('');

  const handleQuery = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast('Sorry, the search field is empty!');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

    return (
      <SearchBox>
        <SearchForm onSubmit={handleSubmit}>
          <SearchButton type="submit">
            <GrSearch />
          </SearchButton>
          <SearchInput
            type="text"
            placeholder="Search images"
            value={query}
            onChange={handleQuery}
          />
        </SearchForm>
      </SearchBox>
    );
  }


Searchbar.propTypes = {
  query: PropTypes.string.isRequired,
};
