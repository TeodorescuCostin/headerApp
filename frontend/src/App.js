import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Trending } from './components/trending/Trending';
import { GlobalProvider } from './context/GlobalState';
import { Status } from './pages/Status';
import ScrollToTop from './utils/ScrollToTop';
import { Profile } from './pages/Profile';

function App() {
  const [logInfo, setLogInfo] = useState(false)
  return (
    <GlobalProvider >
      <Router >

        <ScrollToTop>
          <div className="App">
          {
            logInfo ? (
                <>
                  <div className="side-nav">
                    <Sidebar />
                  </div>
                  <div className="main">

                        <Route exact path="/" component={Home} />
                        <Route exact path="/:id" component={Profile} />
                        <Route exact path="/status/:id" component={Status} />
                  </div>
                  <div className="trending">
                    <Trending />
                  </div>
                </>  
            ) : (
              <div className="main">
                <Route exact path="/" >
                  <Login logInfo={logInfo} setLogInfo={setLogInfo} />
                </Route>
              </div>
            )
          }
                   
          </div>
        </ScrollToTop>

      </Router>
    </GlobalProvider>
  );
}

export default App;
