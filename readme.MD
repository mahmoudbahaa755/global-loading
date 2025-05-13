# Global Loading State

This package provides a simple and efficient way to manage global loading states in React applications. It enables the seamless triggering of loading states across any component, serving as a minimalist state management system.

## Installation

```bash
npm install global-loading-state
# or
yarn add global-loading-state
```

## Usage

### Using the GlobalLoading Hook

```jsx
import React from "react";
import { useGlobalLoading } from "global-loading-state";

const Button = () => {
  const isLoading = useGlobalLoading();

  return (
    <button disabled={isLoading}>
      {isLoading ? "Loading..." : "Click Me"}
    </button>
  );
};

export default Button;
```

### Controlling the Loading State

```jsx
import React from "react";
import { setGlobalLoading } from "global-loading-state";

const DataFetcher = () => {
  const fetchData = async () => {
    setGlobalLoading(true);
    try {
      await fetch("https://api.example.com/data");
    } finally {
      setGlobalLoading(false);
    }
  };

  return <button onClick={fetchData}>Fetch Data</button>;
};
```

## API

| Function                           | Description                                               |
| ---------------------------------- | --------------------------------------------------------- |
| `useGlobalLoading()`               | React hook that returns the current loading state boolean |
| `setGlobalLoading(state: boolean)` | Function to set the global loading state                  |

## Advanced Usage

You can also directly access the event emitter for more complex scenarios:

```jsx
import { eventEmitter } from "global-loading-state";

// Set loading state to true
eventEmitter.emit("changeLoading", true);

// Set loading state to false
eventEmitter.emit("changeLoading", false);
```

## License

MIT
