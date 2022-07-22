import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { IToken } from '../types/token'
import Header from './component/header'
import AppLogin from './login/AppLogin'
import { setUserTokenCntx, userTokenCntx } from './login/authToken'

const Home: NextPage = () => {
  const [token, setToken] = useState<IToken>({
    Token: undefined,
    TokenRefresh: undefined,
    Message: undefined,
    Tipo: undefined,
  });

  const setContextToken = React.createContext(setToken);

  function VerificaToken() {
    if (!sessionStorage.authorization || !sessionStorage.authorizationrefresh) {
      setToken({
        Token: undefined,
        TokenRefresh: undefined,
        Message: undefined,
        Tipo: undefined,
      });
    } else {
      setToken({
        Token: sessionStorage.authorization,
        TokenRefresh: sessionStorage.authorizationrefresh
      })
    }
  }

  useEffect(VerificaToken, []);

  if (token?.Token) {
    return (
      <div className={styles.corpo}>
        <Header Titulo={'Logado'} />
        <h1>Logou</h1>

        <div>
          Created by Haidon{' '}
          <span className={styles.logo}>
          </span>
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.corpo}>
        <userTokenCntx.Provider value={token}>
          <setUserTokenCntx.Provider value={setToken}>
            <Header Titulo={'Login'} />

            <div className={styles.formulariologin}>
              <AppLogin />
            </div>
            <div>
              <span className={styles.logo}></span>
            </div>
          </setUserTokenCntx.Provider>
        </userTokenCntx.Provider >
      </div>
    )
  }
}

export default Home
