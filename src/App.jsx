import React, {Component} from 'react';

import './App.css';
import Chart from 'chart.js';

class App extends Component {
  constructor(props){
    super(props);
    this.paginaSig = this.paginaSig.bind(this);
    this.paginaAnt = this.paginaAnt.bind(this);
    this.paginaUlt = this.paginaUlt.bind(this);
    this.paginaPrim = this.paginaPrim.bind(this);
    this.mostrarSubPagina = this.mostrarSubPagina.bind(this);
    this.guardarDatos = this.guardarDatos.bind(this);
    this.cambiarTitulo = this.cambiarTitulo.bind(this);
    this.validarFila = this.validarFila.bind(this);
    this.validarTabla = this.validarTabla.bind(this);
    this.state = {
      empresa: "",
      proposito: 0,
      herramientas: 0,
      procesos: 0,
      estructura: 0
    }
  }
  validarTabla(tabla){
    let i = 0;
    let flag = true;
    let fila = "";
    let campo  = "";
    while(i <= (tabla.length-1)){
      if(i===4 || i===8 || i===12 || i===16 || i===20 || i===23){
        if(this.validarFila(fila)){
          alert("En la tabla "+tabla[0].className+", hay campos sin diligenciar.");
          flag = false;
          break;
        }
      }
      console.log(i,tabla[i]);
      
      if(tabla[i].checked){
        const puntos = parseInt(tabla[i].id);
        switch(tabla[0].className){
          case 'proposito': this.setState({proposito: this.state.proposito += puntos});
            break;
          case 'herramientas': this.setState({herramientas: this.state.herramientas += puntos});
          break;
          case 'procesos': this.setState({procesos: this.state.procesos += puntos});
            break;
          case 'estructura': this.setState({estructura: this.state.estructura += puntos});
          break;
        }
      }
      fila = tabla[i].name;
      i++;
    }
    return flag;
  }
  validarFila(fila){
    let flag = true;
    const elementos = document.querySelectorAll('input[name='+fila+']');
    elementos.forEach((e)=>{
      if(e.checked){
        flag = false
      }
    });
    return flag;
  }
  cambiarTitulo(pagina){
      switch(pagina){
        case 1: document.querySelector('.titulo-modulo').innerHTML = "INTRODUCCIÓN A LOS CONCEPTOS";
          break;
        case 2: document.querySelector('.titulo-modulo').innerHTML = "INTELIGENCIA APLICADA A LAS ETAPAS DE DESARROLLO DE LOS PRODUCTOS";
          break;
        case 3: document.querySelector('.titulo-modulo').innerHTML = "ACTIVIDAD PRACTICA 1";
          break;
        case 4: document.querySelector('.titulo-modulo').innerHTML = "PROCESO DE INTELIGENCIA COMPETITIVA";
          break;
      }
  }
  guardarDatos(){
    const proposito = document.querySelectorAll('.proposito');
    const herramientas = document.querySelectorAll('.herramientas');
    const procesos = document.querySelectorAll('.procesos');
    const estructura = document.querySelectorAll('.estructura');
    const nombreEmpresa = document.querySelector('#nombre-empresa').value;
    this.setState({empresa: nombreEmpresa});
    if(this.validarTabla(proposito) && this.validarTabla(herramientas) && this.validarTabla(procesos) && this.validarTabla(estructura)){
      this.mostrarSubPagina(1,3);
    }
  }
  mostrarSubPagina(idCont,id){
    const contenedor = document.querySelector("#contenedor-"+idCont)
    const subPaginas = contenedor.querySelectorAll('.sub-pagina-'+idCont);
    subPaginas.forEach((sub,i)=>{
      if(sub.classList.contains('enable')){
        sub.classList.remove('enable')
      }else if(sub.id === 'sub-pagina-'+id){
        sub.classList.add('enable')
      }
    })
    if(idCont === 1 && id === 2){
      document.querySelector('.titulo-modulo').innerHTML = "PREGUNTAS DIAGNÓSTICO";
    }
    if(idCont===2){
      const botones = contenedor.querySelectorAll(".btn-subpagina");
      const boton = contenedor.querySelector("#btn-"+id);
      botones.forEach((btn,i)=>{
        if(btn.classList.contains('btn-on')){btn.classList.remove('btn-on')}
      });
      boton.classList.add("btn-on");
    }
    if(idCont===2 && id === 4){
      contenedor.querySelector("#btn-validar").style.display = "inline-block" 
    }else{
      contenedor.querySelector("#btn-validar").style.display = "none"
    }
    if(idCont === 1 && id === 3){
      document.querySelector('.titulo-modulo').innerHTML = "INFORME DE RESULTADOS (RADAR)";
      const ctx = document.getElementById('myChart');
      const promProposito = this.state.proposito / 6;
      const promProceso = this.state.procesos / 6;
      const promEstructura = this.state.estructura / 6;
      const promHerramienta = this.state.herramientas / 5;
      var myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: { 
          labels: ['PROPOSITOS','HERRAMIENTAS','PROCESOS','ESTRUCTURA'],
          datasets: [{
            label: 'Promedio',
            data:[promProposito , promHerramienta , promProceso , promEstructura],
            borderColor: 'rgb(255, 99, 132)'
          }]
        }
      });
    }
  }
  paginaSig(){
    const paginas = document.querySelectorAll('.pagina');
    let idActual = 0;
    let paginaActual = "";
    paginas.forEach((pagina,i)=>{
      if(pagina.classList.contains('enable')){
        idActual = parseInt(pagina.id.slice(7,8));
        paginaActual = pagina;
      }
    });
    if(idActual<=3){
      paginaActual.classList.remove("enable");
      let idSiguiente = idActual + 1;
      const pagSiguiente = document.querySelector('#pagina-'+idSiguiente);
      pagSiguiente.classList.add('enable');
      const numero = document.querySelector(".num-pagina");
      numero.innerHTML = "0"+idSiguiente+"/04" 
    }
    this.cambiarTitulo(idActual+1);
  }
  paginaAnt(){
    const paginas = document.querySelectorAll('.pagina');
    let idActual = 0;
    let paginaActual = "";
    paginas.forEach((pagina,i)=>{
      if(pagina.classList.contains('enable')){
        idActual = parseInt(pagina.id.slice(7,8));
        paginaActual = pagina;
      }
    });
    if(idActual>=2){
      paginaActual.classList.remove("enable");
      let idAnterior = idActual - 1;
      const pagAnterior = document.querySelector('#pagina-'+idAnterior);
      pagAnterior.classList.add('enable');
      const numero = document.querySelector(".num-pagina");
      numero.innerHTML = "0"+idAnterior+"/04" 
    }
    this.cambiarTitulo(idActual-1);
  }
  paginaUlt(){
    const paginas = document.querySelectorAll('.pagina');
    let idActual = 0;
    let paginaActual = "";
    paginas.forEach((pagina,i)=>{
      if(pagina.classList.contains('enable')){
        idActual = parseInt(pagina.id.slice(7,8));
        paginaActual = pagina;
      }
    });
    if(idActual>=0 && idActual<=3){
      paginaActual.classList.remove("enable");
      let idUltimo = 4;
      const pagUltimo = document.querySelector('#pagina-'+idUltimo);
      pagUltimo.classList.add('enable');
      const numero = document.querySelector(".num-pagina");
      numero.innerHTML = "0"+idUltimo+"/04" 
    }
    this.cambiarTitulo(4);
  }
  paginaPrim(){
    const paginas = document.querySelectorAll('.pagina');
    let idActual = 0;
    let paginaActual = "";
    paginas.forEach((pagina,i)=>{
      if(pagina.classList.contains('enable')){
        idActual = parseInt(pagina.id.slice(7,8));
        paginaActual = pagina;
      }
    });
    if(idActual>=1 && idActual<=4){
      paginaActual.classList.remove("enable");
      let idPrimero = 1;
      const pagPrimero = document.querySelector('#pagina-'+idPrimero);
      pagPrimero.classList.add('enable');
      const numero = document.querySelector(".num-pagina");
      numero.innerHTML = "0"+idPrimero+"/04" 
    }
    this.cambiarTitulo(1);
  }

  render(){
    return (
      <div className="App">
        <div className="row">
          <div className="col-1 menu">
            <div className="menu-head">
              <img src="./imagenes/logo-menu.png" alt="head-menu"/>
            </div>
            <div className="menu-body">
              <img src="./imagenes/btn-menu2.png" className="btn-menu2" alt="flecha"/>
            </div>
            <div className="menu-foot">
              <img src="./imagenes/02.png" alt="foot"/>
            </div>
          </div>
          <div className="col-11">
            <header className="row">
              <div className="col-3">
                <p className="subtitulo-modulo">Vigilancia Tecnologica <br/> Modulo 01</p>
              </div>
              <div className="col-7 fondo-verde">
                <h3 className="titulo-modulo">
                  INTRODUCCION A LOS CONCEPTOS
                </h3>
              </div>
              <div className="col-2 centrado">
                <img src="./imagenes/04.png" alt=" ? " className="ayuda"/>
              </div>
            </header>
            <div className="row contenido">
              <div className="col-10 offset-1">
                <div className="pagina enable" id="pagina-1">
                  <div className="row">
                    <div className="col-12">
                      <p>En el conexto empresarial suele usarse el término vigilancia tecnologica e inteligencia competitiva de forma intercambiada,
                        y por esto suelen aceptarce ambos terminos.
                      </p>
                      <p>Ambos procesos manejan metodologias y etapas similares, y se diferencian principalmente su alcance de busqueda,
                        y la puesta en valor de la información; procurando principalmente en el caso de inteligencia, que se contextualice la información
                        a la organizacion que la realiza. En adelante cuando se use el termino <b>Inteligencia Competitiva</b>, entenderemos que la
                        vigilancia tecnologica esta contenido dentro de su definición.
                      </p>
                      <p>
                        Para mayor entendimiento sobre sus diferencias, podemos ver las siguientes tablas:
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="tabla1" id="tabla1">
                        <div className="cabecera-tabla1">
                          <img src="./imagenes/icon01.png" alt="icono"/>
                          <span>Proceso de Vigilancia</span>
                        </div>
                        <div className="contenido-tabla1">
                          <p><span></span> Más centrado en captar información</p>
                          <p><span></span> Más centrado en explotar fuentes</p>
                          <p><span></span> Caracter más operativo</p>
                          <p><span></span> Aportación de valor más baja</p>
                          <p><span></span> Más enfasis en la difusión rapida</p>
                          <p><span></span> Más centrado en generar alertas</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                    <div className="tabla2" id="tabla2">
                        <div className="cabecera-tabla2">
                          <img src="./imagenes/icon02.png" alt="icono"/>
                          <span>Proceso de Inteligencia</span>
                        </div>
                        <div className="contenido-tabla2">
                          <p><span></span> Más centrado en analizar la información</p>
                          <p><span></span> Más centrado en recomendar acciones</p>
                          <p><span></span> Caracter más estrategico</p>
                          <p><span></span> Aportación de valor más alta</p>
                          <p><span></span> Más enfasis en la comunicación efectiva</p>
                          <p><span></span> Más centrado en generar informes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 texto-pie">
                      <p>Tabla: Paralelo entre el proceso de vigilancia tecnologica y de inteligencia competitiva. Fuente: (AENOR, 2018)</p>
                    </div>
                  </div>
                </div>
                <div className="pagina" id="pagina-2">
                  <div className="row">
                    <div className="col-6 texto-pag2">
                      <p>Las incertidumbres sobre los atributos del producto a 
                        desarrollar se abordan a traves de consecutivos ejercicios de 
                        vigilancia e inteligencia, que alimentan a los equipos encargados con ideas
                        sobre <b>tecnologias, atributos, segmentos, canales, tendencias,entre otras.</b></p>
                      <p>Ya que todas las compañias desarrollan productos o servicios,
                        de manera permanente toman informacion del entorno, ya sea de manera <b>formal</b> o <b>formal.</b></p>  
                    </div>
                    <div className="col-6 img-pag2">
                      <img src="./imagenes/block.png" alt="foto1"/>
                    </div> 
                  </div>
                </div>
                <div className="pagina" id="pagina-3">
                  <div className="contenedor" id="contenedor-1">
                    <div className="subpa sub-pagina-1 enable" id="sub-pagina-1">
                      <div className="row">
                        <div className="col-12 text-center">
                          <img src="./imagenes/activity.png" alt="logo" width="200px"/>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 top20">
                          <p>Acontinuación lo invitamos a diligenciar el siguiente <b>autodiagnóstico,</b> 
                          que consta de cuatro bloques de preguntas, eligiendo una respuesta para cada pregunta,
                          teniendo en cuenta una escala de puntuación de 1 a 4, siendo uno <b>NUNCA</b> y
                          cuatro <b>SIEMPRE</b>.</p>
                          <p>Importante: si el curso lo están realizando varias personas de la misma organización,
                            los resultados generados corresponden a las respuestas que diligencie usted por lo cual le recomendamos
                            alguna de estas 2 opciones:
                          </p>
                          <p className="texto-opciones"><span></span> Concertar previamente las respuestas a dar en cada
                          punto del diagnostico.</p>
                          <p className="texto-opciones"><span></span> Diligenciar individualmente y luego comparar los resultados
                          para reconocer un diagnostico unificado.</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 text-center top20">
                          <button className="btn-actividad" id="btn-inicio" onClick={()=>this.mostrarSubPagina(1,2)}>INICIAR</button>
                        </div>
                      </div>
                    </div>
                    <div className="subpa sub-pagina-1" id="sub-pagina-2">
                      <div className="row">
                        <div className="col-12">
                          <p>Bloques de preguntas que se convierten en 4 ejes: <b>proposito, herramienta, 
                            procesos, estructura.</b></p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 text-center">
                          <label className="nombre-empresa">NOMBRE DE LA EMPRESA: </label>
                          <input type="text" name="nombre-empresa" id="nombre-empresa"/><br/>
                          <p>Evalue de 1 a 4, donde 1 es <b>nunca</b> y 4 es <b>siempre.</b></p>
                        </div>
                      </div>
                      <div className="contenedor" id="contenedor-2">
                        <div className="subpa sub-pagina-2 enable" id="sub-pagina-1">
                          <div className="row">
                            <div className="col-12 text-center">
                              <p className="pregunta"><b>PROPÓSITOS:</b> Usted usa información del entorno
                              competitivo para:</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                            <table className="table" id="tabla1">
                              <thead>
                                <tr>
                                  <th scope="col"></th>
                                  <th scope="col"><span className="numero">1</span></th>
                                  <th scope="col"><span className="numero">2</span></th>
                                  <th scope="col"><span className="numero">3</span></th>
                                  <th scope="col"><span className="numero">4</span></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-verde">
                                  <th scope="row">Planeación estratégica</th>
                                  <td><input type="radio" className="proposito" name="row1" id="1"/></td>
                                  <td><input type="radio" className="proposito" name="row1" id="2"/></td>
                                  <td><input type="radio" className="proposito" name="row1" id="3"/></td>
                                  <td><input type="radio" className="proposito" name="row1" id="4"/></td>
                                </tr>
                                <tr>
                                  <th scope="row">Generación de ideas</th>
                                  <td><input type="radio" className="proposito" name="row2" id="1"/></td>
                                  <td><input type="radio" className="proposito" name="row2" id="2"/></td>
                                  <td><input type="radio" className="proposito" name="row2" id="3"/></td>
                                  <td><input type="radio" className="proposito" name="row2" id="4"/></td>
                                </tr>
                                <tr className="bg-verde">
                                  <th scope="row">Desarrollo de producto</th>
                                  <td><input type="radio" className="proposito" name="row3" id="1"/></td>
                                  <td><input type="radio" className="proposito" name="row3" id="2"/></td>
                                  <td><input type="radio" className="proposito" name="row3" id="3"/></td>
                                  <td><input type="radio" className="proposito" name="row3" id="4"/></td>
                                </tr>
                                <tr>
                                  <th scope="row">Acceso a nuevos mercados</th>
                                  <td><input type="radio" className="proposito" name="row4" id="1"/></td>
                                  <td><input type="radio" className="proposito" name="row4" id="2"/></td>
                                  <td><input type="radio" className="proposito" name="row4" id="3"/></td>
                                  <td><input type="radio" className="proposito" name="row4" id="4"/></td>
                                </tr>
                                <tr className="bg-verde">
                                  <th scope="row">Búsqueda de nuevos clientes</th>
                                  <td><input type="radio" className="proposito" name="row5" id="1"/></td>
                                  <td><input type="radio" className="proposito" name="row5" id="2"/></td>
                                  <td><input type="radio" className="proposito" name="row5" id="3"/></td>
                                  <td><input type="radio" className="proposito" name="row5" id="4"/></td>
                                </tr>
                                <tr>
                                  <th scope="row">Adquisición de tecnologias</th>
                                  <td><input type="radio" className="proposito" name="row6" id="1"/></td>
                                  <td><input type="radio" className="proposito" name="row6" id="2"/></td>
                                  <td><input type="radio" className="proposito" name="row6" id="3"/></td>
                                  <td><input type="radio" className="proposito" name="row6" id="4"/></td>
                                </tr>
                              </tbody>
                            </table>
                            </div> 
                          </div>
                        </div>
                        <div className="subpa sub-pagina-2" id="sub-pagina-2">
                          <div className="row">
                            <div className="col-12 text-center">
                              <p className="pregunta"><b>HERRAMIENTAS:</b> Usted hace uso de las siguientes herramientas:</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <table className="table" id="tabla2">
                                <thead>
                                  <tr>
                                    <th scope="col"></th>
                                    <th scope="col"><span className="numero">1</span></th>
                                    <th scope="col"><span className="numero">2</span></th>
                                    <th scope="col"><span className="numero">3</span></th>
                                    <th scope="col"><span className="numero">4</span></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="bg-verde">
                                    <th scope="row">Buscadores gratuitos de patentes</th>
                                    <td><input type="radio" className="herramientas" name="row7" id="1"/></td>
                                    <td><input type="radio" className="herramientas" name="row7" id="2"/></td>
                                    <td><input type="radio" className="herramientas" name="row7" id="3"/></td>
                                    <td><input type="radio" className="herramientas" name="row7" id="4"/></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Entrevistas a expertos</th>
                                    <td><input type="radio" className="herramientas" name="row8" id="1"/></td>
                                    <td><input type="radio" className="herramientas" name="row8" id="2"/></td>
                                    <td><input type="radio" className="herramientas" name="row8" id="3"/></td>
                                    <td><input type="radio" className="herramientas" name="row8" id="4"/></td>
                                  </tr>
                                  <tr className="bg-verde">
                                    <th scope="row">Bases de datos de mercado</th>
                                    <td><input type="radio" className="herramientas" name="row9" id="1"/></td>
                                    <td><input type="radio" className="herramientas" name="row9" id="2"/></td>
                                    <td><input type="radio" className="herramientas" name="row9" id="3"/></td>
                                    <td><input type="radio" className="herramientas" name="row9" id="4"/></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Visualizadores de datos</th>
                                    <td><input type="radio" className="herramientas" name="row10" id="1"/></td>
                                    <td><input type="radio" className="herramientas" name="row10" id="2"/></td>
                                    <td><input type="radio" className="herramientas" name="row10" id="3"/></td>
                                    <td><input type="radio" className="herramientas" name="row10" id="4"/></td>
                                  </tr>
                                  <tr className="bg-verde">
                                    <th scope="row">Software de Mineria de datos</th>
                                    <td><input type="radio" className="herramientas" name="row11" id="1"/></td>
                                    <td><input type="radio" className="herramientas" name="row11" id="2"/></td>
                                    <td><input type="radio" className="herramientas" name="row11" id="3"/></td>
                                    <td><input type="radio" className="herramientas" name="row11" id="4"/></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="subpa sub-pagina-2" id="sub-pagina-3">
                        <div className="row">
                            <div className="col-12 text-center">
                              <p className="pregunta"><b>PROCESOS:</b> Usted realiza las siguientes actividades:</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <table className="table" id="tabla3">
                                <thead>
                                  <tr>
                                    <th scope="col"></th>
                                    <th scope="col"><span className="numero">1</span></th>
                                    <th scope="col"><span className="numero">2</span></th>
                                    <th scope="col"><span className="numero">3</span></th>
                                    <th scope="col"><span className="numero">4</span></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="bg-verde">
                                    <th scope="row">Identifica en diferentes áreas sus necesitades de información</th>
                                    <td><input type="radio" className="procesos" name="row12" id="1"/></td>
                                    <td><input type="radio" className="procesos" name="row12" id="2"/></td>
                                    <td><input type="radio" className="procesos" name="row12" id="3"/></td>
                                    <td><input type="radio" className="procesos" name="row12" id="4"/></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Prioriza las temáticas de mayor interes con tomadores de decisión</th>
                                    <td><input type="radio" className="procesos" name="row13" id="1"/></td>
                                    <td><input type="radio" className="procesos" name="row13" id="2"/></td>
                                    <td><input type="radio" className="procesos" name="row13" id="3"/></td>
                                    <td><input type="radio" className="procesos" name="row13" id="4"/></td>
                                  </tr>
                                  <tr className="bg-verde">
                                    <th scope="row">Clasifica fuentes de información relevantes</th>
                                    <td><input type="radio" className="procesos" name="row14" id="1"/></td>
                                    <td><input type="radio" className="procesos" name="row14" id="2"/></td>
                                    <td><input type="radio" className="procesos" name="row14" id="3"/></td>
                                    <td><input type="radio" className="procesos" name="row14" id="4"/></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Llama a expertos para analizar información</th>
                                    <td><input type="radio" className="procesos" name="row15" id="1"/></td>
                                    <td><input type="radio" className="procesos" name="row15" id="2"/></td>
                                    <td><input type="radio" className="procesos" name="row15" id="3"/></td>
                                    <td><input type="radio" className="procesos" name="row15" id="4"/></td>
                                  </tr>
                                  <tr className="bg-verde">
                                    <th scope="row">Presenta resultados de inteligencia</th>
                                    <td><input type="radio" className="procesos" name="row16" id="1"/></td>
                                    <td><input type="radio" className="procesos" name="row16" id="2"/></td>
                                    <td><input type="radio" className="procesos" name="row16" id="3"/></td>
                                    <td><input type="radio" className="procesos" name="row16" id="4"/></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Documenta aprendizajes</th>
                                    <td><input type="radio" className="procesos" name="row17" id="1"/></td>
                                    <td><input type="radio" className="procesos" name="row17" id="2"/></td>
                                    <td><input type="radio" className="procesos" name="row17" id="3"/></td>
                                    <td><input type="radio" className="procesos" name="row17" id="4"/></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="subpa sub-pagina-2" id="sub-pagina-4">
                        <div className="row">
                            <div className="col-12 text-center">
                              <p className="pregunta"><b>ESTRUCTURA:</b> Su organización cuenta con:</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <table className="table" id="tabla4">
                                <thead>
                                  <tr>
                                    <th scope="col"></th>
                                    <th scope="col"><span className="numero">1</span></th>
                                    <th scope="col"><span className="numero">2</span></th>
                                    <th scope="col"><span className="numero">3</span></th>
                                    <th scope="col"><span className="numero">4</span></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="bg-verde">
                                    <th scope="row">Dedicación de tiempo para búsqueda de información</th>
                                    <td><input type="radio" className="estructura" name="row18" id="1"/></td>
                                    <td><input type="radio" className="estructura" name="row18" id="2"/></td>
                                    <td><input type="radio" className="estructura" name="row18" id="3"/></td>
                                    <td><input type="radio" className="estructura" name="row18" id="4"/></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Compra de estudios de inteligencia</th>
                                    <td><input type="radio" className="estructura" name="row19" id="1"/></td>
                                    <td><input type="radio" className="estructura" name="row19" id="2"/></td>
                                    <td><input type="radio" className="estructura" name="row19" id="3"/></td>
                                    <td><input type="radio" className="estructura" name="row19" id="4"/></td>
                                  </tr>
                                  <tr className="bg-verde">
                                    <th scope="row">Un lider que promueve los ejercicios de inteligencia</th>
                                    <td><input type="radio" className="estructura" name="row20" id="1"/></td>
                                    <td><input type="radio" className="estructura" name="row20" id="2"/></td>
                                    <td><input type="radio" className="estructura" name="row20" id="3"/></td>
                                    <td><input type="radio" className="estructura" name="row20" id="4"/></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Comité para priorizar necesidades de inteligencia</th>
                                    <td><input type="radio" className="estructura" name="row21" id="1"/></td>
                                    <td><input type="radio" className="estructura" name="row21" id="2"/></td>
                                    <td><input type="radio" className="estructura" name="row21" id="3"/></td>
                                    <td><input type="radio" className="estructura" name="row21" id="4"/></td>
                                  </tr>
                                  <tr className="bg-verde">
                                    <th scope="row">Espacios de presentación de resultados</th>
                                    <td><input type="radio" className="estructura" name="row22" id="1"/></td>
                                    <td><input type="radio" className="estructura" name="row22" id="2"/></td>
                                    <td><input type="radio" className="estructura" name="row22" id="3"/></td>
                                    <td><input type="radio" className="estructura" name="row22" id="4"/></td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Adquisición de tecnologías</th>
                                    <td><input type="radio" className="estructura" name="row23" id="1"/></td>
                                    <td><input type="radio" className="estructura" name="row23" id="2"/></td>
                                    <td><input type="radio" className="estructura" name="row23" id="3"/></td>
                                    <td><input type="radio" className="estructura" name="row23" id="4"/></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="botones top20">
                            <span className="btn-subpagina btn-on" id="btn-1" onClick={()=>this.mostrarSubPagina(2,1)}></span>
                            <span className="btn-subpagina" id="btn-2" onClick={()=>this.mostrarSubPagina(2,2)}></span>
                            <span className="btn-subpagina" id="btn-3" onClick={()=>this.mostrarSubPagina(2,3)}></span>
                            <span className="btn-subpagina" id="btn-4" onClick={()=>this.mostrarSubPagina(2,4)}></span>
                          </div>
                          <div className="col-12 text-center">
                            <button className="btn-actividad" id="btn-validar" onClick={()=>this.guardarDatos()}>VALIDAR</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="subpa sub-pagina-1" id="sub-pagina-3">
                      <div className="row">
                        <div className="col-12">
                          <p>El <b>resultado</b> de cada eje, es el promedio de la sumatoria de todas las preguntas
                          del respectivo bloque (proposito, herramientas, procesos, estructura). Rango de evaluación:
                          entre 1 y 4, siendo 1 el menor y 4 el mayor puntuación.</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-2">
                          <span className="muestra-nombre">{this.state.empresa}</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-8 offset-2">
                          <canvas id="myChart"></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pagina" id="pagina-4">
                  <div className="row">
                    <div className="col-6 text-izq">
                      <p>El proceso de inteligencia competitiva permite apoyar el desarrollo a nivel estratégico, táctico y operativo,
                        de acciones informadas. Captura la informacion que producen grupos de investigacion, empresas, gobierno y consumidores,
                        para proveer, luego de su analisis, señales y conclusiones para:
                      </p>
                      <div className="procesos-inteligencia">
                          <p><span></span> Desarrollar capacidades de innovacion en la organización a través de proyectos.</p>
                          <p><span></span> Describir el entorno competitivo para comprender los riesgos y oportunidades existentes.</p>
                          <p><span></span> Ajustar la estrategia de riesgo de acuerdo con el entorno, la competencia y la tecnologia.</p>
                          <p><span></span> Redefinir los supuestos del negocio al identificar cambios que retan la estrategia actual.</p>
                       </div>
                    </div>
                    <div className="col-6 img-procesos-inteligencia">
                      <div className="caja-superior">
                        <div className="cajas">
                          <img src="./imagenes/ico1.png" alt="ico1"/>
                          <p>Grupos de investigación</p>
                        </div>
                        <span className="etiqueta">Patentes</span>
                        <span className="etiqueta">Normatividad</span>
                      </div>
                      <div className="caja-superior">
                        <div className="cajas">
                          <img src="./imagenes/ico2.png" alt="ico2"/>
                          <p>Empresas</p>
                        </div>
                        <span className="etiqueta">Expertos</span>
                      </div>
                      <div className="caja-superior">
                        <div className="cajas">
                          <img src="./imagenes/ico3.png" alt="ico3"/> 
                          <p>Instituciones públicas</p>
                        </div>
                        <span className="etiqueta">Comercial</span>
                      </div>
                      <div className="caja-superior">
                        <div className="cajas">
                          <img src="./imagenes/ico4.png" alt="ico4"/>
                          <p>Consumidores</p>
                        </div>
                        <span className="etiqueta">Arituclos</span>
                        <span className="etiqueta">Indicadores</span>
                      </div>     
                      <div className="row clear">
                        <div className="col-12 torta">
                          <div className="pieza" id="pieza1">
                            <span>Apoyar el desarrollo de las capacidades de innovación</span>
                          </div>
                          <div className="pieza" id="pieza2">
                            <span>Describir el <br/> entorno <br/> competitivo</span>
                          </div>
                          <div className="pieza" id="pieza3">
                            <span>Ajustar la <br/> estrategia</span>
                          </div>
                          <div className="pieza" id="pieza4">
                            <span>Redefinir <br/> inpuestos</span>
                          </div>
                        </div>
                      </div>          
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row pie">
              <div className="col-7">
                <div className="row">
                  <div className="col-4 offset-8">
                    <div className="btn-pie">
                      <span className="btn-pie-inicio" onClick={()=>this.paginaPrim()}>{"<<"}</span>
                      <span className="btn-pie-anterior" onClick={()=>this.paginaAnt()}>{"<"}</span>
                      <span className="btn-pie-home"><img src="./imagenes/home.png" alt="home "/></span>
                      <span className="btn-pie-siguiente" onClick={()=>this.paginaSig()}>{">"}</span>
                      <span className="btn-pie-ultimo" onClick={()=>this.paginaUlt()}>{">>"}</span>
                    </div>
                    <div className="num-pagina">
                      01/04
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-5 down1"></div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }

}

export default App;
