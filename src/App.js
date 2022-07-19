import React from 'react';
import CoinConverter from './components/CoinConverter/CoinConverter';
/* import TempConverter from './components/TempConverter'; */

function App() {
  return (
    <div>
      {/*       <h2>Conversão de temperatura</h2>
      <TempConverter /> */}
      <h2>Conversão de moedas</h2>
      <CoinConverter />
    </div>
  );
}

export default App;
