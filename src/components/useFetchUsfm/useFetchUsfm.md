```jsx
import React, { useState, useEffect } from 'react';

import { useFetchUsfm } from '@texttree/search-proskomma-rcl';

function Component() {
  const [startFetch, setStartFetch] = useState(false);
  const bookCodes = ['tit', 'rut', '1ti'];
  const _bookCodes = startFetch ? bookCodes : [];
  const owner = 'ru_gl';
  const repo = 'ru_rob';
  const server = 'git.door43.org';

  const { projects, usfms } = useFetchUsfm({
    owner,
    repo,
    server,
    bookCodes: _bookCodes,
  });

  return (
    <>
      <button onClick={() => setStartFetch(true)}>Fetch USFM</button>
      <div>Projects : {projects && projects.length}</div>
      <div>USFMs : {usfms && usfms.length}</div>
    </>
  );
}
<Component />;
```
