import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';

import LoginRegister from './components/LoginRegister';

import Home from './components/Home';

import Protected from "./components/Protected";

import Laptops from "./components/Laptops";

import Drafters from "./components/Drafters";

import Bikes from "./components/Bikes";

import Cameras from "./components/Cameras";

import Gatebooks from "./components/Gatebooks";

import PostTheItem from "./components/PostTheItem";

import AllMyProducts from './components/AllMyProducts';

import Updatation from "./components/Updatation";

import Guidelines from "./components/Guidelines";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginRegister} /> 
      <Protected exact path="/" component={Home} />
      <Protected exact path="/laptops" component ={Laptops}/>
      <Protected exact path="/drafters" component = {Drafters} /> 
      <Protected exact path="/bikes" component={Bikes}/> 
      <Protected exact path="/cameras" component={Cameras}/>
      <Protected exact path='/gatebooks' component = {Gatebooks}/> 
      <Protected exact path ='/rent' component={PostTheItem}/> 
      <Protected exact path = '/my-products' component = {AllMyProducts} /> 
      <Protected exact path = '/update-stocks' component = {Updatation} /> 
      <Protected exact path = '/guidelines' component = {Guidelines} />
    </Switch>
  </BrowserRouter>
);

export default App;