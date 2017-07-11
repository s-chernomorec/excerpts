import React from 'react';
import dateFormat from 'dateformat';

const DateBlock = props => {
  return (
    <div className="excerpt-date-wrapper">
      <span className="excerpt-date">{dateFormat(props.date, "d, mmm")}</span>
      <span className="excerpt-time">{dateFormat(props.date, "H:MM")}</span>
    </div>
  );
};

export default DateBlock;
