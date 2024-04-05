import { useState, useEffect } from "react";

const useFetch = (url, API_ACCESS_TOKEN) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("m-collection-access-token", API_ACCESS_TOKEN);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url, requestOptions);
        const json = await res.json();
        setResult(json);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, result, error };
};

export default useFetch;
