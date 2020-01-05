import React from 'react';
import  Navbar from  './NavBar/Navbar.js';
import Switcher from './OpcionMultipleSwitcher/Switcher.js';
import Images from './MultipleImagenes/Images.js';
const COMP1 = 1;
const COMP2 = 2;

class App extends React.Component{
  constructor(props) {
    super(props)
  
    this.state = {
      componenteId: -1,
    }
    this.changeSelect = this.changeSelect.bind(this);
  }

  changeSelect(id){
    switch(id){
      case 1:
        this.setState({componenteId: 1});
        console.log("Swithcer");
        break;
      case 2:
        this.setState({componenteId: 2});
        break;
      default:
        break;
    }
  }
  render(){
    const {componenteId} = this.state;
    var componente = (<div></div>);
    switch(componenteId){
      case COMP1:
        componente = (<Switcher/>);
        break;
      case COMP2:
        componente = (<Images/>);
        break;
      default:
        break;
    }
    return (
      <div>
        <Navbar changeSelect={this.changeSelect}/>
        {componente}
      </div>
    );
  }
}

export default App;
