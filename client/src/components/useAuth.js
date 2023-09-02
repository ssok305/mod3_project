import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);

  useEffect(() => {
    axios
      .post('/api/your-server-endpoint-for-token', { code }) // Replace with your server endpoint that handles code exchange
      .then(res => {
        setAccessToken(res.data.access_token);
        setRefreshToken(res.data.refresh_token);
        setExpiresIn(res.data.expires_in);
      })
      .catch(err => console.error(err));
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      axios
        .post('/api/your-server-endpoint-for-refresh', { refreshToken }) // Replace with your server endpoint that handles token refresh
        .then(res => {
          setAccessToken(res.data.access_token);
          setExpiresIn(res.data.expires_in);
        })
        .catch(err => console.error(err));
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}