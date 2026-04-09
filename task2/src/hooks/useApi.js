import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Хук для загрузки данных
 * @param {Function} apiFunction - async функция
 * @param {Array} dependencies - зависимости для повторного запроса
 */
export function useApi(apiFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isMounted = useRef(true);
  const abortController = useRef(null);

  const execute = useCallback(async () => {
    if (!apiFunction) return;

    if (abortController.current) {
      abortController.current.abort();
    }

    abortController.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const result = await apiFunction();

      if (isMounted.current) {
        setData(result);
        setError(null);
      }
    } catch (err) {
      if (err.name === 'AbortError') return;

      if (isMounted.current) {
        setError(err.message || 'An error occurred');
        setData(null);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [apiFunction, ...dependencies]);

  useEffect(() => {
    isMounted.current = true;
    execute();

    return () => {
      isMounted.current = false;

      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, [execute]);

  const refetch = useCallback(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch };
}

/**
 * Хук для POST / PUT / DELETE
 */
export function useMutation(apiFunction) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const mutate = useCallback(
    async (payload) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiFunction(payload);
        setData(result);
        return result;
      } catch (err) {
        setError(err.message || 'An error occurred');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return { mutate, loading, error, data };
}

/**
 * Хук для постраничной загрузки
 */
export function usePaginatedApi(apiFunction, pageSize = 10) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPage = useCallback(
    async (pageNum) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiFunction(pageNum, pageSize);

        if (result.length < pageSize) {
          setHasMore(false);
        }

        setData((prev) => (pageNum === 1 ? result : [...prev, ...result]));
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, pageSize]
  );

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPage(nextPage);
    }
  }, [loading, hasMore, page, fetchPage]);

  const reset = useCallback(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    fetchPage(1);
  }, [fetchPage]);

  return { data, loading, error, loadMore, hasMore, reset, page };
}

export default useApi;