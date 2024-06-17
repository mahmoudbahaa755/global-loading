# Global Loading State

This package provides a simple and efficient way to manage global loading states in React applications using an event-driven approach.

## Installation

```bash
npm install global-loading-state


```

usage

```code

import React from 'react';
import GlobalLoading from 'global-loading-state';

const Button = () => (
  <button disabled={GlobalLoading()}>Click Me</button>
);

export default Button;
```

then You can trigger the loading state from any component by using the eventEmitter to emit a change.

```code
eventEmitter.emit("changeLoading", true);

```
