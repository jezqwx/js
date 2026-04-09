import { useState, useEffect, useCallback, useRef } from 'react';

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

function getCachedData(key) {
  const cached = cache.get(key);

  if (!cached) return null;

  if (Date.now() - cached.timestamp > CACHE_DURATION) {
    cache.delete(key);
    return null;
  }

  return cached.data;
}

function setCachedData(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cacheHit, setCacheHit] = useState(false);

  const abortControllerRef = useRef(null);

  const fetchData = useCallback(async () => {
    if (!url) return;

    abortControllerRef.current = new AbortController();

    const cacheKey = `${url}:${JSON.stringify(options)}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      setData(cachedData);
      setLoading(false);
      setCacheHit(true);
      return;
    }

    setLoading(true);
    setError(null);
    setCacheHit(false);

    try {
      const response = await fetch(url, {
        ...options,
        signal: abortControllerRef.current.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setCachedData(cacheKey, result);
      setData(result);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  const refetch = useCallback(() => {
    if (url) {
      const cacheKey = `${url}:${JSON.stringify(options)}`;
      cache.delete(cacheKey);
      fetchData();
    }
  }, [fetchData, url, options]);

  const clearCache = useCallback(() => {
    cache.clear();
  }, []);

  return { data, loading, error, cacheHit, refetch, clearCache };
}

export function useFetchSWR(url, options = {}) {
  const { data, error, loading, cacheHit, refetch } = useFetch(url, options);
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    if (data && !loading) {
      setIsStale(false);

      const timer = setTimeout(() => {
        setIsStale(true);
      }, CACHE_DURATION);

      return () => clearTimeout(timer);
    }
  }, [data, loading]);

  const revalidate = useCallback(() => {
    setIsStale(false);
    refetch();
  }, [refetch]);

  return { data, loading, error, cacheHit, isStale, revalidate };
}

export default useFetch;