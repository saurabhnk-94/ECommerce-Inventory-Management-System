import React from "react";
import axios from "axios";
import "./pages.css";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      categoryName: "",
      parentName:""
    };
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/category/").then(res => {
      const category = res.data;
      this.setState({
        categoryList: category
      });
    });
  }

  addCategory() {
    const name = this.state.categoryName;
    const parent_category = this.state.parentName;
    console.log("category", name, parent_category);
    axios.post("http://127.0.0.1:8000/category/", {
      name,
      parent_category
    }).then(res => {
      console.log(res.status);
    })
    this.setState({
      categoryName:"",
      parentName:""
    })

  }

  render() {
    return (
      <div>
        This is Category page
        <div className="brand-page">
          {this.state.categoryList.map((items, index) => (
            <div key={index} className="items-list">
              {index + 1} &nbsp;{items.name}
            </div>
          ))}
        </div>
        <div className="specification">
            Create a Category:
            <div>Category Name:
              <input type="text" placeholder="Enter the Category name" value={this.state.categoryName} onChange={(event) => this.setState({categoryName:event.target.value})}/>
            </div>
            <div>Parent Category:
            <select
              value={this.state.value}
              onChange={(event) =>
                this.setState({ parentName: event.target.value })
              }
            >
              <option>select</option>
              {this.state.categoryList.map((item, index) => (
                <option key={index} value={item.id}>
                 {item.id}: {item.name}
                </option>
              ))}
            </select>
            </div>
            <button type="submit" onClick={() => this.addCategory()}>Submit</button>

          </div>
      </div>
    );
  }
}

export default Category;
