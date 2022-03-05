```jsx
import React, { useState, useEffect } from 'react';

import { useFetchUsfm } from '@texttree/search-proskomma-rcl';

function Component() {
  const owner = 'ru_gl';
  const repo = 'ru_rob';
  const server = 'git.door43.org';
  const bookCodes = ['tit', 'rut', '1ti'];
  const { projects, usfms } = useFetchUsfm({ owner, repo, server, bookCodes });

  return (
    <>
      <div>Projects : {projects && projects.length}</div>
      <div>USFMs : {usfms && usfms.length}</div>
    </>
  );
}
<Component />;
```
