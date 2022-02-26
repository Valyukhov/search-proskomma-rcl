### Default example

```jsx
import React, { useState } from 'react';

import { useSearch } from '@texttree/search-proskomma-rcl';
import { loremIpsumBook } from 'lorem-ipsum-usfm';

const document = ({ bookCode, bookName, ...props }) => ({
  selectors: { org: 'unfoldingWord', lang: 'lat', abbr: 'lor' },
  data: loremIpsumBook({ bookCode, bookName, ...props }),
  bookCode,
});
const _documents = [
  document({ bookCode: 'mat', bookName: 'Matthew', chapterCount: 28 }),
  document({ bookCode: 'mar', bookName: 'Mark', chapterCount: 16 }),
  document({ bookCode: 'luk', bookName: 'Luke', chapterCount: 24 }),
  document({ bookCode: 'jhn', bookName: 'John', chapterCount: 21 }),
  document({ bookCode: '1jn', bookName: '1 Jean', chapterCount: 5 }),
  document({ bookCode: '2jn', bookName: '2 Jean', chapterCount: 1 }),
  document({ bookCode: '3jn', bookName: '3 Jean', chapterCount: 1 }),
];
const _docSetId = `unfoldingWord/lat_lor`;
const _searchText = 'adipisicing excepteur fugiat';

const verbose = true;
function Component() {
  const [startImport, setStartImport] = useState(false);
  const [startSearch, setStartSearch] = useState(false);
  const [searchText, setSearchText] = useState(_searchText);
  const documents = startImport ? _documents : [];
  const docSetId = startSearch ? _docSetId : '';

  const { dataArray } = useSearch({ documents, searchText, docSetId, verbose });
  console.log(dataArray);
  const tableMatches = (
    <table>
      {dataArray.map((el, i) => {
        return (
          <tr key={i}>
            <td>{el.docSet.document.bookCode}</td>
            <td>{el.docSet.document.cvMatching.length + ' matches'}</td>
            <td>
              {el.docSet.document.cvMatching.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{element.text.substr(0, 20) + '...'}</td>
                  </tr>
                );
              })}
            </td>
          </tr>
        );
      })}
    </table>
  );

  return (
    <>
      <input
        onBlur={(e) => {
          setSearchText(e.target.value);
        }}
        defaultValue={searchText}
      />
      <button
        onClick={() => {
          setStartImport(true);
        }}
      >
        Import
      </button>
      <button
        onClick={() => {
          setStartSearch(true);
        }}
      >
        Search
      </button>
      {dataArray.length > 0 && tableMatches}
    </>
  );
}
<Component />;
```
