# Global Loading State

This package provides a simple and efficient way to manage global loading states in React applications. It enables the seamless triggering of loading states across any component, serving as a minimalist state management system.

## Installation

```bash
npm install global-loading-state
```

usage

```code
import React from 'react';
import globalLoading from 'global-loading-state';

const Button = () => (
  <button disabled={globalLoading()}>Click Me</button>
);

export default Button;
```

then You can trigger the loading state from any component by using the setGlobalLoading to change loading state.

```code
setGlobalLoading(true);

```
