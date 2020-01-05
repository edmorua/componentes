import React from 'react';




export default class Navbar extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {
      componente : -1, 
    }
    this.onChangeSelect = this.onChangeSelect.bind(this);
  }
  onChangeSelect(e){
    e.preventDefault();
    const id = e.target.selectedIndex;
    const changeSelect = this.props.changeSelect;
    changeSelect(id);
  }
  render(){

    return (
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark text-white-50">
        <span className="navbar-brand">Componentes</span>
        <button className="navbar-toggler" type="button" data-toggle="collapse">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse row" id="componentes">
          <select onChange={this.onChangeSelect} className="form-control my-1 ml-auto col-md-2 offset-md-10" id="select-componentes">
            <option value="" defaultValue>Seleccion un componente...</option>
            <option key={"1"}>Opción múltiple switchs</option>
            <option>Seleccion múltiple imágenes</option>
            <option>Opción imagen</option>
            <option>Tarjetas</option>
            <option>Preguntas y respuestas</option>
            <option>Notas</option>
            <option>Lista ordenada</option>
            <option>Arrastrar respuesta</option>
            <option>Pase de opciones</option>
            <option>Preguntas con respuesta</option>
          </select>
        </div>
      </nav>
    );
  }
}