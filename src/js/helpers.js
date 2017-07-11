import _ from 'lodash';

export const checkForUniqueness = (name, collection, field = null) => {
  return collection
    ? !collection.some((item) => field === null
      ? item === name
      : item[field] === name)
    : true;
}

export const shoulDisplayTitle = excerpts => {
  let titleIsProvided = [true];
  excerpts.forEach((item, i, arr) => {
    if (i === 0)
      return;

    const currTitle = arr[i - 1].title,
      nextTitle = arr[i].title;

    titleIsProvided.push(currTitle !== nextTitle);
  });
  return titleIsProvided;
};

export const sortByDate = (prev, next) => {
  return next.date - prev.date;
};

export const sortByTitle = (prev, next) => {
  return next.title.toLowerCase() < prev.title.toLowerCase();
};

export const search = (query, excerpts) => {
  const queryRegx = new RegExp(query, 'i');
  const foundExcerpts = excerpts.filter((excerpt) => {
    return (excerpt.title.search(queryRegx) !== -1 || excerpt.text.search(queryRegx) !== -1)
      ? true
      : false;
  });
  return foundExcerpts;
};

export const excerptsNumberToSlice = (excerpts, demandedAmount) => {
  const calculatedAmount = excerpts.length - demandedAmount - 1;
  return calculatedAmount > 0
    ? calculatedAmount
    : 0;
};

export const searchByCategory = (category, excerpts) => {
  return excerpts.filter((excerpt) => excerpt.category === category);
};

export const filterOffByCategory = (category, excerpts) => {
  return excerpts.filter((excerpt) => excerpt.name !== category);
};

export const searchByTitle = (title, excerpts) => {
  return excerpts.filter((excerpt) => excerpt.title === title);
};

export const searchByTitleInCategory = (title, category, excerpts) => {
  return searchByTitle(title, excerpts).filter((item) => item.category === category);
};

export const mapToFalseValues = (obj) => {
  return _.mapValues(obj, () => false);
}

export const reconcileCategories = (target, _excerpts, _categories) => {
  const excerpts = _excerpts.slice();
  const categories = _categories.slice();
  let newCategories;

  if (searchByCategory(target.category, excerpts).length <= 1) {
    newCategories = filterOffByCategory(target.category, categories);
  } else if (searchByTitleInCategory(target.title, target.category, excerpts).length <= 1) {
    newCategories = categories.map((cat) => {
      return _.assign({}, cat, {
        titles: cat.titles.filter((title) => title !== target.title)
      });
    });
  } else {
    newCategories = categories;
  }

  return newCategories;
}

export const reconcileExcerpts = (target, excerpts) => {
  return excerpts.filter((item) => item.id !== target.id);
}

export const validateField = (value, options) => {
  if (options) {
    let passed,
      message;
    const length = value.length
      ? value.length
      : 0;
    const name = options.name || 'Field';
    const {min, max} = options;

    if (min && max) {
      passed = length >= min && length <= max;
      message = name + ' should be in range from ' + min + ' to ' + max + ' characters';
    } else if (min) {
      passed = length >= min;
      message = name + ' should be at least ' + min + ' characters';
    } else {
      passed = true;
    }

    return passed
      ? null
      : message;
  }
  return null;
};

export const validate = results => {
  let passed,
    msg;

  if (Array.isArray(results)) {
    passed = !results.some((item) => item !== null)
    msg = passed
      ? null
      : results;
    return {validationIsPassed: passed, validationMessages: msg};
  }
}

export const paginationDataChunk = (arr, count, page) => {
  return arr.slice((page - 1) * count, page * count);
}
