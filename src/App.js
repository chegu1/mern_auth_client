import React, { useEffect } from 'react';
import Layout from './core/Layout';

const App = () => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position)
    });
  }, [])
  return (
    <Layout>
      hello world
    </Layout>
  );
}

export default App;
