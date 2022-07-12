import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import FirstScreen from './components/first-screen/FirstScreen';
import SecondScreen from './components/second-screen/SecndScreen';

const App: FC = () => {
  return (
    <div className="app">
      <div className="container">
        <h2 className="title">GitHub Searcher</h2>
        <Routes>
          <Route path="/" element={<FirstScreen />} />
          <Route path="/:userName" element={<SecondScreen />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
