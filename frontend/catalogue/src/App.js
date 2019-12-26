import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Product from "./pages/product";
import Brand from "./pages/brand";
import Category from "./pages/category";
import Home from "./pages/home";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="app-header">
            <div className="header-left">
              <div>CATALOGUE</div>
            </div>
            <div className="header-right">
              <Link to={"/"}>
                <button>Home</button>
              </Link>
              <Link to={"/product"}>
                <button>Products</button>
              </Link>
              <Link to={"/category"}>
                <button>Category</button>
              </Link>
              <Link to={"/brand"}>
                <button>Brand</button>
              </Link>
            </div>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/product" component={Product} />
            <Route exact path="/category" component={Category} />
            <Route exact path="/brand" component={Brand} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
