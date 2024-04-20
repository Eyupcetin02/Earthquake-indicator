import React from 'react';
import Map from './map/Map';
import Navbar from './navbar/Navbar';

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Map />
    </div>
  );
}

export default App;
