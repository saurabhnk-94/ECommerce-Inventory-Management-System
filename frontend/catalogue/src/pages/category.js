import React from "react";
import axios from "axios";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brandList: []
    };
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/category/").then(res => {
      const brand = res.data;
      this.setState({
        brandList: brand
      });
    });
  }
  render() {
    return (
      <div>
        This is Category page
        <div className="brand-page">
          {this.state.brandList.map((items, index) => (
            <div key={index} className="items-list">
              {index + 1} &nbsp;{items.name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Category;
