import React, { useState, useEffect } from 'react';
import { Button, Divider, TextField } from '@material-ui/core';
import { useSearch } from '..';
import Tables from './Tables';
import SearchIcon from '@material-ui/icons/Search';
function Search({ documents, searchText, docSetId, verbose, onBlur }) {
  const [label, setLabel] = useState('');
  const [startImport, setStartImport] = useState(false);
  const [startSearch, setStartSearch] = useState(false);
  useEffect(() => {
    if (!searchText && searchText === '') {
      setLabel('Введите запрос');
    } else {
      setStartImport(true);
    }
  }, [searchText]);
  const handleClick = () => {
    setStartSearch(true);
  };
  const { dataArray } = useSearch({
    documents: startImport ? documents : [],
    searchText,
    docSetId: startSearch ? docSetId : '',
    verbose,
  });

  console.log(dataArray);
  return (
    <>
      <TextField
        onClick={() => {
          setStartImport(true);
        }}
        label={label}
        onBlur={onBlur}
        id="search"
        defaultValue={searchText}
      />
      <Button onMouseUp={handleClick} variant="outlined">
        <SearchIcon />
      </Button>
      <p />
      <Divider />
      <p />
      <Tables dataArray={dataArray} />
    </>
  );
}

export default Search;
