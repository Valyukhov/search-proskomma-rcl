### Default example

```jsx
import React, { useState } from 'react';

import { Search } from '@texttree/search-proskomma-rcl';
import { loremIpsumBook } from 'lorem-ipsum-usfm';

const document = ({ bookCode, bookName, ...props }) => ({
  selectors: { org: 'unfoldingWord', lang: 'lat', abbr: 'lor' },
  data: loremIpsumBook({ bookCode, bookName, ...props }),
  bookCode,
});
const documents = [
  document({ bookCode: 'mat', bookName: 'Matthew', chapterCount: 28 }),
  document({ bookCode: 'mar', bookName: 'Mark', chapterCount: 16 }),
  document({ bookCode: 'luk', bookName: 'Luke', chapterCount: 24 }),
  document({ bookCode: 'jhn', bookName: 'John', chapterCount: 21 }),
  document({ bookCode: '1jn', bookName: '1 Jean', chapterCount: 5 }),
  document({ bookCode: '2jn', bookName: '2 Jean', chapterCount: 1 }),
  document({ bookCode: '3jn', bookName: '3 Jean', chapterCount: 1 }),
];
const docSetId = `unfoldingWord/lat_lor`;
const [searchText, setSearchText] = useState('');
// const _searchText = 'adipisicing excepteur fugiat';

const verbose = true;
function Component() {
  const onBlur = (el) => {
    setSearchText(el.target.value);
  };
  return (
    <Search
      onBlur={onBlur}
      verbose={verbose}
      docSetId={docSetId}
      documents={documents}
      searchText={searchText}
    />
  );
}
<Component />;
```
