<h3 align="center">
    <img alt="Logo" title="#logo" width="300px" src="https://raw.githubusercontent.com/miguelslima/NextLevelWeek-01/6189e50720b8bca5158c99183fd6c192e4e74744/logoNLW01.svg">
    <h2 align="center">Projeto Desenvolvido</h2> 
    <img alt="Logo" title="#logo" width="450px" src="https://github.com/miguelslima/NextLevelWeek-01/blob/master/logoEcoleta.png?raw=true">
    <br><br>
    <br>
</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/miguelslima/NextLevelWeek-01?color=%2304D361">
	
  <a href="https://www.linkedin.com/in/miguelslima/">
    <img alt="Made by Miguel Lima" src="https://img.shields.io/badge/made%20by-miguelslima-%2304D361">
  </a>

  <a href="https://github.com/miguelslima/NextLevelWeek-01/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/miguelslima/NextLevelWeek-01">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
   <a href="https://github.com/miguelslima/NextLevelWeek-01">
  </a>
</p>

# Índice

- [Sobre](#sobre)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Layout](#layout)
- [Como Usar](#como-usar)

<a id="sobre"></a>

## :bookmark: Sobre

O <strong>Ecoleta</strong> é uma aplicação Web e Mobile para ajudar pessoas a encontrarem pontos de coleta para reciclagem.

Essa aplicação foi construída na trilha <strong>Booster</strong> da <strong>Next Level Week</strong> distribuída pela [Rocketseat](https://rocketseat.com.br/). A ideia de criar uma aplicação voltada ao meio ambiente surgiu da coincidência da data do curso e a data da <strong>semana do meio ambiente</strong>

<a id="tecnologias-utilizadas"></a>

## :rocket: Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)<br>
  Foram utilizado aqui:
  - Celebrate
  - Cors
  - Express
  - Knex
  - Multer
  - Sqlite3
- [ReactJS](https://reactjs.org/)<br>
Foram utilizado aqui:
  - Axios
  - Cep-promise
  - Leaflet
  - React-dropzone
  - React-icons
  - React-leaflet
- [React Native](https://reactnative.dev/) <br>
Foram utilizado aqui:
  - Axios
  - Expo
  - Expo-constants
  - Expo-font
  - React-native-gesture-handler
  - React-native-maps
  - React-native-reanimated
  - React-native-safe-area-context
  - React-native-screens
  - React-native-svg
  - React-native-web
  - Expo-location
  - Expo-mail-composer

<a id="layout"></a>

## 🔖 Layout

Para ver o layout da aplicação utilize o [Figma](https://www.figma.com/file/1SxgOMojOB2zYT0Mdk28lB/).

<a id="como-usar"></a>

## :fire: Como usar

- ### **Pré-requisitos**

  - É **necessário** possuir o **[Node.js](https://nodejs.org/en/)** instalado na máquina
  - Também, é **preciso** ter um gerenciador de pacotes seja o **[NPM](https://www.npmjs.com/)** ou **[Yarn](https://yarnpkg.com/)**.

1. Faça um clone :

```sh
  $ git clone https://github.com/miguelslima/NextLevelWeek-01
```

2. Executando a Aplicação:

```sh
  # Instale as dependências
  $ npm install

  ## Crie o banco de dados
  $ cd server
  $ npm run knex:migrate
  $ npm run knex:seed

  # Inicie a API
  $ npm run dev

  # Inicie a aplicação web
  $ cd web
  $ npm start

  # Inicie a aplicação mobile
  $ cd mobile
  $ npm start
```


## :mortar_board: Quem ministrou?

As aulas foram ministradas pelo mestre **[Diego Fernandes](https://github.com/diego3g)** nas aulas da **Next Level Week**.

## :memo: License

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

<h4 align="center">
    Feito com 💜 by <a href="https://www.linkedin.com/in/vitor-serrano/" target="_blank">Vitor Serrano</a>
</h4>
