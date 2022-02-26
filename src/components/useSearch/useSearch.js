import React from 'react';

import { log } from '../../utils';
import PropTypes from 'prop-types';
import { useProskomma, useImport, useSearchForPassages } from 'proskomma-react-hooks';

function useSearch({ documents, searchText, docSetId, verbose }) {
  console.log({ documents });
  const {
    stateId,
    newStateId,
    proskomma,
    errors: proskommaErrors,
  } = useProskomma({
    verbose,
  });
  const { errors: importErrors } = useImport({
    proskomma,
    stateId,
    newStateId,
    documents: documents,
    verbose,
  });
  const {
    stateId: searchStateId,
    bookCodes,
    passages,
    passagesBookCodes,
    dataArray,
    errors: searchErrors,
  } = useSearchForPassages({
    proskomma,
    stateId,
    text: searchText,
    docSetId,
    blocks: false,
    tokens: false,
    verbose,
  });

  log('test');
  return { dataArray };
}

useSearch.defaultProps = {
  text: 'Test',
};

useSearch.propTypes = {
  /** Title */
  text: PropTypes.string,
  /** Event by clicking on the button. */
  onClick: PropTypes.func,
};

export default useSearch;
