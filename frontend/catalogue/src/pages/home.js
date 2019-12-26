import React from "react";
import axios from "axios";
import "./pages.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      particularProduct:[],
    };
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/product/").then(res => {
      const product = res.data;
      this.setState({
        productList: product
      });
    });
  }

  displayBox(event, index) {
    axios.get(`http://127.0.0.1:8000/product/${index}/`).then(res => {
      
      const particular = res.data;
      // console.log("assign",particular);
      this.setState(
        {
          particularProduct: particular
        }
        // ()=>{
          // console.log("hey", this.state.particularProduct);
        // }
      );
    });
  }

  render() {
    return (
      <div>
        This is Home page
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Specification</th>
            </tr>
          </thead>
          <tbody>
            {this.state.productList.map((items, index) => (
              <tr key={index}>
                <td
                  onClick={(event, index) => this.displayBox(event, items.id)}
                >
                  {items.name}
                </td>
                <td>{items.brand.name}</td>
                <td>{items.category.name}</td>
                <td>
                  {items.specification.map((spec, index) => (
                    <div key={index}>
                      {spec.key}: {spec.value} {spec.unit ? spec.unit : ""}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(this.state.particularProduct.name) ? (
          
          <div className="particular-product">
            {console.log(this.state.particularProduct)};
            <div className="product-detail">
                {this.state.particularProduct.category.get_breadcrumbs}
              </div>
              <h1>Product Name: {this.state.particularProduct.name}</h1>
              <div className="product-detail">
                Brand: {this.state.particularProduct.brand.name}
              </div>
              <div className="product-detail">
                Category: {this.state.particularProduct.category.name}
              </div>
              <div className="product-detail">
                Specification: {this.state.particularProduct.specification.map((items, index) => (
                  <div className="product-detail" key={index} >
                     <div> {items.key}:{items.value} {(items.unit)? (items.unit) : ("")}</div>
                </div>
                ))}
              </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Home;
