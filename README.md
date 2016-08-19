# paginghelper [![Build Status](https://travis-ci.org/justlep/paginghelper.svg?branch=master)](https://travis-ci.org/justlep/paginghelper)
A utility for generating an array that describes a paging. The array contains:
* the first page number
* a defined number of page numbers including the current page
* the last page number
* an "ellipse" value between the first page and the "middle block" of pages if the middle block doesnt contain the first page
* an "ellipse" value between the "middle block" and the last page if the middle block doesn't contain the last page

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
