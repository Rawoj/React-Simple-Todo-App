import React from 'react';
import { Route, BrowserRouter, Switch, withRouter } from 'react-router-dom';
import Navbar from "./components/navbar";
import Todo from "./components/TodoApp";
import Home from "./components/home";
import GithubFooter from "./components/footer";

import './App.css';

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false }
];

function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={withRouter(Home)} />
          <Route exact path="/todo">
            <Todo tasks={DATA} />
          </Route>
        </Switch>
      </BrowserRouter>
      <GithubFooter />
    </div>
  );
}

export default App;
