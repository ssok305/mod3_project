import React, { useEffect } from 'react'
import axios from 'axios'
export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const[refreshToken, setRefreshToken] = useState()
  const[expiresIn, setExpiresIn] = useState()


  useEffect(() => {

},[]);
    return(
        <div>{code}</div>
    );
}