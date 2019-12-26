import React from "react";
import axios from "axios";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      brand: "",
      category: "",
      brandList: [],
      categoryList: [],
      specificationList: [],
      spec_key: "",
      spec_value: "",
      spec_unit: ""
    };
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/brand/").then(res => {
      const brand = res.data;
      this.setState({
        brandList: brand
      });
    });
    axios.get("http://127.0.0.1:8000/category/").then(res => {
      const category = res.data;
      this.setState({
        categoryList: category
      });
    });
  }

  addSpec() {
    // event.preventDefault();
    const key = this.state.spec_key;
    const value = this.state.spec_value;
    const unit = this.state.spec_unit;
    console.log("key value unit", key, value, unit);
    if (key && value) {
      const specification = [
        ...this.state.specificationList,
        { key: key, value: value, unit: unit }
      ];
      this.setState({
        specificationList: specification,
        spec_key: "",
        spec_value: "",
        spec_unit: "",
      });
    }
  }

  submitHandle() {
    // event.preventDefault();
    const name = this.state.name;
    const brand = this.state.brand;
    const category = this.state.category;
    const specification = this.state.specificationList;
    console.log("SubmitHandle", name, brand, category, specification);
    if((name) && (brand) && (category) && (specification)) {
    axios
      .post("http://127.0.0.1:8000/product/", {
        name,
        brand,
        category,
        specification
      })
      .then(res => {
        if (res.status === 201) {
          console.log(res.status);
          // this.state.history.push("/");
        }
      });
    }
    this.setState({
      name: "",
      
    })
  }

  render() {
    return (
      <div>
        This is Product page
        <div className="createProduct">
          <label>
            Product Name:
            <input
              type="text"
              placeholder="Enter the product name"
              value={this.state.name}
              onChange={() => this.setState({ name: event.target.value })}
            />
          </label>
          <label>
            Brand:
            <select
              value={this.state.value}
              onChange={() => this.setState({ brand: event.target.value })}
            >
              <option>select</option>
              {this.state.brandList.map((item, index) => (
                <option key={index} value={item.id}>
                 {item.id}: {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Category:
            <select
              value={this.state.value}
              onChange={event =>
                this.setState({ category: event.target.value })
              }
            >
              <option>select</option>
              {this.state.categoryList.map((item, index) => (
                <option key={index} value={item.id}>
                 {item.id}: {item.name}
                </option>
              ))}
            </select>
          </label>
          <div className="specification">
            Specifications:
            <div>
              {" "}
              Key:{" "}
              <input
                type="text"
                placeholder="Enter the key name"
                value={this.state.spec_key}
                onChange={() => this.setState({ spec_key: event.target.value })}
              />
            </div>
            <div>
              value:{" "}
              <input
                type="text"
                placeholder="Enter the value"
                value={this.state.spec_value}
                onChange={() =>
                  this.setState({ spec_value: event.target.value })
                }
              />
            </div>
            <div>
              unit:{" "}
              <input
                type="text"
                placeholder="Enter the units"
                value={this.state.spec_unit}
                onChange={() =>
                  this.setState({ spec_unit: event.target.value })
                }
              />
            </div>
            <button type="submit" onClick={() => this.addSpec()}>
              Add
            </button>
          </div>
          <button type="submit" onClick={() => this.submitHandle()}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default Product;
