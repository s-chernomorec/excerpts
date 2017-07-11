import _ from 'lodash';
import React from 'react';

import Header from './common/Header';
import Sidebar from './common/Sidebar';
import NewExcerpt from './popups/NewExcerpt';
import NewCategory from './popups/NewCategory';

const RenderPage = (Page, props, routeProps) => {

  const _props = routeProps !== undefined
    ? _.assign({}, props, routeProps)
    : props;

  return (
    <div className="wrapper">
      <Header/>
      <Sidebar excerpts={_props.excerpts} categories={_props.categories} categoriesIsOpened={_props.categoriesIsOpened} closeAllPopups={_props.closeAllPopups} getSearchQuery={(query) => _props.getSearchQuery(query)} toggleCategories={_props.toggleCategories} toggleNewExcerpt={_props.toggleNewExcerpt} toggleNewCategory={_props.toggleNewCategory}/>
      <Page {..._props}/>
      <NewExcerpt excerpts={_props.excerpts} categories={_props.categories} newExcerptIsOpen={_props.popups.newExcerptIsOpen} chosenCategory={_props.chosenCategory || ''} toggleNewExcerpt={_props.toggleNewExcerpt} chooseCategory={(chosenCategory) => _props.chooseCategory(chosenCategory)} addExcerpt={(excerpt) => _props.addExcerpt(excerpt)} addCategory={(catName, titleName) => _props.addCategory(catName, titleName)} addTitle={(catName, newTitleName) => _props.addTitle(catName, newTitleName)}/>
      <NewCategory categories={_props.categories} addCategory={(catName) => _props.addCategory(catName, null)} newCategoryIsOpen={_props.popups.newCategoryIsOpen} toggleNewCategory={_props.toggleNewCategory}/>
    </div>
  );
}

export default RenderPage;
