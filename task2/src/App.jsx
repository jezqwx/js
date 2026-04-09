import React, { useState } from 'react';
import { useApi } from './hooks/useApi';
import useLocalStorage from './hooks/useLocalStorage';
import useDebounce from './hooks/useDebounce';
import useFetch from './hooks/useFetch';

function App() {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);

  const [savedName, setSavedName, removeSavedName] = useLocalStorage('username', '');

  const {
    data: apiData,
    loading: apiLoading,
    error: apiError,
    refetch: apiRefetch,
  } = useApi(async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }, []);

  const {
    data: fetchData,
    loading: fetchLoading,
    error: fetchError,
    cacheHit,
    refetch: fetchRefetch,
    clearCache,
  } = useFetch('https://jsonplaceholder.typicode.com/users/1');

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Lab 13.2 — Custom Hooks</h1>

      <hr />

      <h2>1. useLocalStorage</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={savedName}
        onChange={(e) => setSavedName(e.target.value)}
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <button onClick={removeSavedName}>Clear</button>
      <p>Saved name: {savedName || 'No value'}</p>

      <hr />

      <h2>2. useDebounce</h2>
      <input
        type="text"
        placeholder="Type something..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ padding: '8px' }}
      />
      <p>Current value: {inputValue}</p>
      <p>Debounced value: {debouncedValue}</p>

      <hr />

      <h2>3. useApi</h2>
      <button onClick={apiRefetch} style={{ marginBottom: '10px' }}>
        Refetch API
      </button>
      {apiLoading && <p>Loading...</p>}
      {apiError && <p style={{ color: 'red' }}>Error: {apiError}</p>}
      {apiData && (
        <pre style={{ background: '#f4f4f4', padding: '10px' }}>
          {JSON.stringify(apiData, null, 2)}
        </pre>
      )}

      <hr />

      <h2>4. useFetch with cache</h2>
      <button onClick={fetchRefetch} style={{ marginRight: '10px' }}>
        Refetch Fetch
      </button>
      <button onClick={clearCache}>Clear Cache</button>

      {fetchLoading && <p>Loading...</p>}
      {fetchError && <p style={{ color: 'red' }}>Error: {fetchError}</p>}
      <p>Cache hit: {cacheHit ? 'Yes' : 'No'}</p>

      {fetchData && (
        <pre style={{ background: '#f4f4f4', padding: '10px' }}>
          {JSON.stringify(fetchData, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;