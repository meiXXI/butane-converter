import React from 'react';

import Header from './common/Header'
import Footer from './common/Footer'
import ButaneConverter from './main/ButaneConverter'

class App extends React.Component {


  /**
   * Return HTML snippet
   */
  render() {
    return (
      <div>
        <Header></Header>

        <ButaneConverter></ButaneConverter>

        <Footer></Footer>
      </div>
    );
  }
}

export default App;
