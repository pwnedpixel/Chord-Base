import React from 'react';
import HomeHeader from './HomeHeader';
import HomeBody from './HomeBody';
import BottomBar from './BottomBar';

class Home extends React.Component {
  render() {
    return (
      <div id="homePage">
        <HomeHeader />
        <HomeBody />
        <BottomBar />
      </div>
    );
  }
}

export default Home
