# paginghelper [![Build Status](https://travis-ci.org/justlep/paginghelper.svg?branch=master)](https://travis-ci.org/justlep/paginghelper)
A utility for generating an object describing a paging, including an ellipse value between the "middle block" of displayed pages and the first and/or last page. 

Demo (based on KnockoutJS): [http://codepen.io/justlep/pen/YWbWxq](http://codepen.io/justlep/pen/YWbWxq)

Example:
```javascript
PagingHelper.getPagingInfo({
    currentPage: 5,
    lastPage: 9,
    displayedPages: 5,
    ellipseValue: '---',
});
// Returns:    
{
    pageNumbers: [0, '---', 3, 4, 5, 6, 7, '---', 9],
    ellipseValue: '---',
    currentPage: 5,
    lastPage: 9,
    previousPage: 4,
    nextPage: 6,
    hasPreviousPage: true,
    hasNextPage: true,
}
```

See [PagingHelper.js](./src/PagingHelper.js) or [PagingHelper.spec.js](./spec/PagingHelper.spec.js).

## Installation via Bower
```sh
$ bower install --save paginghelper
```


