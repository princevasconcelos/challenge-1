import React, { useEffect } from 'react'
import GlobalStyles from 'GlobalStyles'
import styled from 'styled-components'
import { ReactComponent as SpotifyLogo } from 'assets/spotify.svg';
import theme from 'theme'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Home from 'pages/Home'
import Album from 'pages/Album'

import { SearchProvider } from 'contexts/searchContext'

const Container = styled.div`
  margin: 24px;

  @media (min-width: ${theme.media.sm}) {
    margin: 64px 32px;
  }
`

const SpotifyLogoContainer = styled.div`
  position: absolute;
  width: 48px;
  height: 48px;
  top: 24px;
  left: calc(50% - 24px);

  svg:hover {
    cursor: pointer;
    fill: #1DB954;
    transform: rotate(360)
  }
  
  @media (min-width: ${theme.media.sm}) {
    left: 32px;
  }
`
const Content = styled.div`
  width: 100%;
  margin: 100px auto 32px;

  @media (min-width: ${theme.media.md}) {
    margin: 32px auto;
    max-width: 650px;
  }

  @media (min-width: ${theme.media.lg}) {
    margin: 32px auto;
    max-width: 1100px;
  }
`

function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const access_token = params.get('access_token')
  
    if (!access_token) return

    localStorage.setItem('access_token', access_token)
    window.location.href = window.location.origin + process.env.PUBLIC_URL
  }, [])

  useEffect(() => {
    if (localStorage.getItem('access_token')) return
    window.location.href = process.env.REACT_APP_LOGIN_URL
  }, [])

  return (
      <Container>
          <GlobalStyles />
          <SpotifyLogoContainer>
            <SpotifyLogo fill="white" />
          </SpotifyLogoContainer>
          <Content>
            <SearchProvider>
              <Router basename="/">
                <Route exact path="/" component={Home} />
                <Route exact path="/album/:artist" component={Album} />
              </Router>
            </SearchProvider>
          </Content>
      </Container>
  )
}

export default App
