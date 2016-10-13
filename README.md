# paginghelper [![Build Status](https://travis-ci.org/justlep/paginghelper.svg?branch=master)](https://travis-ci.org/justlep/paginghelper) ![Bower](https://img.shields.io/bower/v/paginghelper.svg)
A utility for generating an object describing a paging, including an ellipse value between the "middle block" of displayed pages and the first and/or last page. 

Demo (based on KnockoutJS): [http://codepen.io/justlep/pen/YWbWxq](http://codepen.io/justlep/pen/YWbWxq)

**Example** (using explicit *currentPage* and *lastPage*):
```javascript
expect(PagingHelper.getPagingInfo({
    currentPage: 5,
    lastPage: 9,
    displayedPages: 5,
    ellipseValue: '---',
})).toEqual({
    ellipseValue: '---',
    currentPage: 5,
    lastPage: 9,
    previousPage: 4,
    nextPage: 6,
    hasPreviousPage: true,
    hasNextPage: true,
    pageNumbers: [0, '---', 3, 4, 5, 6, 7, '---', 9]
});
```

**Example** (using *firstItemOffset*, *itemsPerPage* and *totalItems*):
```javascript
expect(PagingHelper.getPagingInfo({
    totalItems: 99,
    itemsPerPage: 10,
    firstItemOffset: 90,
    displayedPages: 5,
    ellipseValue: '----'
})).toEqual({
    ellipseValue: '----',
    currentPage: 9,
    lastPage: 9,
    previousPage: 8,
    nextPage: 10,
    hasPreviousPage: true,
    hasNextPage: false,
    pageNumbers: [0, '----', 5, 6, 7, 8, 9]
});
```

See [PagingHelper.js](./src/PagingHelper.js) or [PagingHelper.spec.js](./spec/PagingHelper.spec.js).

## Installation via Bower
```sh
$ bower install --save paginghelper
```


