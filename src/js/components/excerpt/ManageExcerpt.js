import React from 'react';

const ManageExcerptBlock = props => {

  const addToFavourites = () => {
    props.addToFavourites(props.excerptID);
  };

  return (
    <div className="manage-excerpt" style={props.manageExcerptStyle}>
      <span className={`fa fa-${props.leftBtnCls} manage-excerpt-button`} onClick={props.leftBtnAction}></span>
      <span className={`fa fa-${props.rightBtnCls} manage-excerpt-button`} onClick={props.rightBtnAction}></span>
      <span className={`fa fa-${props.favouriteCls} manage-excerpt-button favourite-button`} onClick={addToFavourites}></span>
    </div>
  );
}

const ManageExcerpt = props => {
  return (
    <div className="manage-excerpt-wrapper">
      {props.manageIsActive
        ? <ManageExcerptBlock leftBtnCls="check" rightBtnCls="close" favouriteCls={props.favouriteCls} excerptID={props.excerptID} leftBtnAction={props.acceptEdit} rightBtnAction={props.cancelEdit} addToFavourites={(id) => props.addToFavourites(id)} manageExcerptStyle={props.manageExcerptStyle}/>
        : <ManageExcerptBlock leftBtnCls="pencil" rightBtnCls="minus" favouriteCls={props.favouriteCls} excerptID={props.excerptID} leftBtnAction={props.edit} rightBtnAction={props.remove} addToFavourites={(id) => props.addToFavourites(id)} manageExcerptStyle={props.manageExcerptStyle}/>
}

    </div>

  );
}

export default ManageExcerpt;
