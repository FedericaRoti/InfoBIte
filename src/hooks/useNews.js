import { useState, useEffect } from 'react';

export function useNews(date = null) {
  const [data, setData]       = useState(null);   
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const url = date ? `/api/news?date=${date}` : '/api/news';

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Errore ${res.status}`);
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [date]);

  return { data, loading, error };
}