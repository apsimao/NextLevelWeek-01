// JSX: sintaxe de XML dentro do JavaScript

import React from 'react';
import './App.css';

import Routes from "./routes";

function App() {
  //a variável de estado retorna um vetor sendo [valor do estado, função para atualizar o valor do estado]
  //const [counter, setCounter] = useState(0);

  return (
      < Routes />
  );
}

export default App;
