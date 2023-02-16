import React from 'react';
import '../styles/mainPage.css'

class Loading extends React.Component {
  render() {
    return (
      <div className='loading'>
        <img src={'https://i.gifer.com/4xjS.gif'} alt='pokebola' />
      </div>

    );
  }
}

export default Loading;