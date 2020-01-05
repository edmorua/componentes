import React from 'react';
import Switch from 'react-switch';
import '../App.css';

const preguntas = [
  {
    id: 1,
    content : "¿Con qué frecuencia verás a estas personas después?",
    selected : false,
  },
  {
    id: 2,
    content : "¿Cómo sería la presentación de tus sueños?",
    selected : false,
  },
  {
    id: 3,
    content: "¿Por qué te piden que des esta presentación?",
    selected: false,
  },
  {
    id: 4,
    content: "¿Que necesitas para terminar la presentación?",
    selected: false,
  }
]

class Pregunta extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
       switch_selected: false,
       self_selected: false,
       hover: false,
       checked: false,
       contador_seleccion : -1,
    }
    this.pregunta = this.props.pregunta;
    this.onHover = this.onHover.bind(this);
    this.handleToogle = this.handleToogle.bind(this);
    this.sending();
  }

  onHover(){
    if(this.state.contador_seleccion !== -1)
      this.setState({hover: !this.state.hover,contador_seleccion: -1})
    else
      this.setState({hover : !this.state.hover})
  }

  handleToogle(checked){
    if(checked)
      this.setState({checked, self_selected:checked, contador_seleccion:1 })
    else
      this.setState({checked, self_selected:checked, contador_seleccion:0 })

  }
  componentDidUpdate(){  
    this.sending();
  }
  async sending(){
    const {self_selected, contador_seleccion} = this.state;
    const {id,content} = this.pregunta;
    if(self_selected && contador_seleccion === 1){
      this.props.addToSelected({id,content,selected:true});
    }
    if(!self_selected && contador_seleccion === 0){
      this.props.removeOfSelected(id);
    }
  }
  render(){
    const {hover, self_selected} = this.state;
    const {content} = this.pregunta;
    let css_classes = "row text-black question "
    let bg;
    if(!self_selected)bg = "no-selected "; //default background
    if(hover && !self_selected) bg = "hover  " // al momento de pasar el mouse se oscurece un poc
    if(self_selected) bg = "selected " // cuando se selecciona cambia a color azulado
    css_classes += bg;

    return(
      <div className={css_classes} onMouseEnter={this.onHover} onMouseLeave={this.onHover}>
        <label htmlFor="pregunta1" className="h5 col-md-10 col-form-label form-check-label my-auto">
              {content}
        </label>
        <div className="col-md-2 text-center my-auto">
          <Switch onChange={this.handleToogle} checked={this.state.checked}></Switch>
        </div>
      </div>
    )
  }
  
}



export default class Switcher extends React.Component{
  constructor(props) {
    super(props)
    
    this.state = {
       checked: false,
    }

    this.lista_preguntas = [];
    this.preguntas_seleccionadas = []
    this.addToSelected = this.addToSelected.bind(this);
    this.removeOfSelected = this.removeOfSelected.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount(){
    this.getData();
  }
  async getData(){
    this.lista_preguntas = preguntas;
  }
  addToSelected(pregunta_seleccionada){
    if(this.preguntas_seleccionadas.length === 0 ){
      this.preguntas_seleccionadas.push(pregunta_seleccionada);
    }
    for(var i = 0; i < this.preguntas_seleccionadas.length; i++){
      if(pregunta_seleccionada.id === this.preguntas_seleccionadas[i].id){
        return;
      }
    }
    this.preguntas_seleccionadas.push(pregunta_seleccionada);  

  }
  removeOfSelected(id){
    for (let i = 0; i < this.preguntas_seleccionadas.length; i++) {
      if(this.preguntas_seleccionadas[i].id === id){
        this.preguntas_seleccionadas.splice(i,1);
        return;
      }
    }
    
  }
  handleSubmit(e){
    e.preventDefault();
    console.log(this.preguntas_seleccionadas);
  }

  render(){
    var preguntas = [];
    for(var i = 0; i < this.lista_preguntas.length; i++){
      var p = <Pregunta key={i} addToSelected={this.addToSelected} removeOfSelected={this.removeOfSelected} pregunta={this.lista_preguntas[i]}/>
      preguntas.push(p);
    }
    return(
      <div className="container-fluid margin-app row">
        <div className="col-md-6 offset-md-3 app-content">
          <h3 className="h3 row justify-content-center mt-2">Activa los contoles de las opciones corrects y haz clic en Enviar</h3>
          <form>
            {preguntas}
            <div className="row justify-content-center my-auto">
              <button onClick={this.handleSubmit} type="submit" className="btn btn-primary mb-2 btn-lg" >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
}