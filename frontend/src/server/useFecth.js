import { useState, useEffect } from "react";
import axios from "axios";

// Duplicado desde https://github.com/joskr2/pokeapp/blob/master/src/Hooks/useFetch.js

function useFetch(url) {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    setLoading("Cargando...");
    setData(null);
    setError(null);

    const source = axios.CancelToken.source();

    axios
      .get(url, { cancelToken: source.token })
      .then((response) => {
        setData(response.data || []);
        setTotal(response.headers['x-total-count'])
        setLoading(null);
      })
      .catch((error) => {
        setError(error);
        setLoading(null);
      });

      return () => {
        source.cancel();
      }

  }, [url]);

  return { data, loading, error, total };
}

export default useFetch;