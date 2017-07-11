import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Search from './Search';
import {IconWithText} from '../other/Icons';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.newExcerpt = this.newExcerpt.bind(this);
    this.newCategory = this.newCategory.bind(this);
  }

  newExcerpt(e) {
    e.preventDefault();
    this.props.toggleNewExcerpt();
  }

  newCategory(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.toggleNewCategory();
  }

  render() {
    const submenu = this.props.categories.map((category) => {
      return <li key={category.name} onClick={this.props.closeAllPopups}>
        <NavLink to={"/category/" + category.name} activeClassName="submenu-item-active">{category.name}</NavLink>
      </li>
    });

    return (
      <nav className="main-navigation">
        <ul className="menu">
          <li>
            <Search excerpts={this.props.excerpts} getSearchQuery={(query) => this.props.getSearchQuery(query)} closeAllPopups={this.props.closeAllPopups}/>
          </li>

          <li onClick={this.props.closeAllPopups}>
            <NavLink to="/" exact activeClassName="menu-item-active">
              <IconWithText fa="archive" text="Latest"/>
            </NavLink>
          </li>

          <li>
            <a href="#" onClick={this.newExcerpt}>
              <IconWithText fa="file-text-o" text="New Excerpt"/>
            </a>
          </li>

          <li onClick={this.props.closeAllPopups}>
            <NavLink to="/favourites" activeClassName="menu-item-active">
              <IconWithText fa="heart" text="Favourites"/>
            </NavLink>
          </li>

          <li>
            <a href="#" className='categories-button categories-open' onClick={this.props.toggleCategories}>
              <IconWithText fa="list" text="Categories"/>
              <span className="fa fa-plus-circle add-category-btn" role="button" onClick={this.newCategory}></span>
            </a>
            <ul className="submenu submenu-categories">
              {this.props.categoriesIsOpened
                ? submenu
                : ''}
            </ul>
          </li>

          <li onClick={this.props.closeAllPopups}>
            <NavLink to="/about" activeClassName="menu-item-active">
              <IconWithText fa="info-circle" text="About"/>
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Sidebar;
