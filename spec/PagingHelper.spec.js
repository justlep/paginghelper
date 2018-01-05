
var PagingHelper = require('../src/PagingHelper');

 // - [currentPage] (Number) current page (use this for giving an explicit current page)
 // - [lastPage] (Number) the last page
 //
 // - [firstItemOffset] (Number) offset of the first record in the current page,
 //                                   used to calculate the current page instead of using the `currentPage` param.
 // - [itemsPerPage] (Number) number of items per page.
 //
 // - displayedPages (Number) the number of pages in the main block
 // - showFirstLast (boolean) if true, the pageNumbers array will contain page numbers for the
 //                           doesn't contain them.
 // - [ellipseValue] (Number|String) value representing the gap between first/last page and main page block

describe('PagingHelper', function() {

    it('should work with explicit page info (currentPage, lastPage)', function() {

        var ELLIPSE = '...';

        expect(PagingHelper.getPagingInfo({
            currentPage: 0,
            lastPage: 9,
            displayedPages: 5,
            ellipseValue: ELLIPSE
        })).toEqual({
            ellipseValue: ELLIPSE,
            currentPage: 0,
            lastPage: 9,
            previousPage: -1,
            nextPage: 1,
            hasPreviousPage: false,
            hasNextPage: true,
            pageNumbers: [0, 1, 2, 3, 4, ELLIPSE, 9]
        });

        expect(PagingHelper.getPagingInfo({
            currentPage: 9,
            lastPage: 9,
            displayedPages: 5,
            ellipseValue: ELLIPSE
        })).toEqual({
            ellipseValue: ELLIPSE,
            currentPage: 9,
            lastPage: 9,
            previousPage: 8,
            nextPage: 10,
            hasPreviousPage: true,
            hasNextPage: false,
            pageNumbers: [0, ELLIPSE, 5, 6, 7, 8, 9]
        });
    });

    it('should work with implicit page info (totalItems, itemsPerPage, firstItemOffset)', function() {

        var ELLIPSE = -999;

        // page 0 of 9 (firstItemOffset == first item of first page)
        expect(PagingHelper.getPagingInfo({
            totalItems: 99,
            itemsPerPage: 10,
            firstItemOffset: 0,
            displayedPages: 5,
            ellipseValue: ELLIPSE
        })).toEqual({
            ellipseValue: ELLIPSE,
            currentPage: 0,
            lastPage: 9,
            previousPage: -1,
            nextPage: 1,
            hasPreviousPage: false,
            hasNextPage: true,
            pageNumbers: [0, 1, 2, 3, 4, ELLIPSE, 9]
        });

        // page 0 of 9 (firstItemOffset == *LAST* item of first page)
        expect(PagingHelper.getPagingInfo({
            totalItems: 99,
            itemsPerPage: 10,
            firstItemOffset: 9,
            displayedPages: 5,
            ellipseValue: ELLIPSE
        })).toEqual({
            ellipseValue: ELLIPSE,
            currentPage: 0,
            lastPage: 9,
            previousPage: -1,
            nextPage: 1,
            hasPreviousPage: false,
            hasNextPage: true,
            pageNumbers: [0, 1, 2, 3, 4, ELLIPSE, 9]
        });

        // page 9 of 9 (firstItemOffset = first item of last page)
        expect(PagingHelper.getPagingInfo({
            totalItems: 99,
            itemsPerPage: 10,
            firstItemOffset: 90,
            displayedPages: 5,
            ellipseValue: ELLIPSE
        })).toEqual({
            ellipseValue: ELLIPSE,
            currentPage: 9,
            lastPage: 9,
            previousPage: 8,
            nextPage: 10,
            hasPreviousPage: true,
            hasNextPage: false,
            pageNumbers: [0, ELLIPSE, 5, 6, 7, 8, 9]
        });

        // page 9 of 9 (firstItemOffset = first item of last page)
        expect(PagingHelper.getPagingInfo({
            totalItems: 99,
            itemsPerPage: 10,
            firstItemOffset: 98,
            displayedPages: 5,
            ellipseValue: ELLIPSE
        })).toEqual({
            ellipseValue: ELLIPSE,
            currentPage: 9,
            lastPage: 9,
            previousPage: 8,
            nextPage: 10,
            hasPreviousPage: true,
            hasNextPage: false,
            pageNumbers: [0, ELLIPSE, 5, 6, 7, 8, 9]
        });
    });

    it('should work for empty results', function() {
        var ELLIPSE = '___';

        // implicit page info
        expect(PagingHelper.getPagingInfo({
            totalItems: 0,
            itemsPerPage: 10,
            firstItemOffset: 0,
            displayedPages: 5,
            ellipseValue: ELLIPSE
        })).toEqual({
            ellipseValue: ELLIPSE,
            currentPage: 0,
            lastPage: 0,
            previousPage: -1,
            nextPage: 1,
            hasPreviousPage: false,
            hasNextPage: false,
            pageNumbers: [0]
        });

        // explicit page info
        expect(PagingHelper.getPagingInfo({
            currentPage: 0,
            lastPage: 0,
            displayedPages: 5,
            ellipseValue: ELLIPSE
        })).toEqual({
            ellipseValue: ELLIPSE,
            currentPage: 0,
            lastPage: 0,
            previousPage: -1,
            nextPage: 1,
            hasPreviousPage: false,
            hasNextPage: false,
            pageNumbers: [0]
        });
    });

    it('should place the ellipse correctly for ODD displayedPages', function() {

        var ELLIPSE = 'xx',
            DISPLAYED_PAGES = 5,
            LAST_PAGE = 9,
            PAGE_NUMBERS_BY_PAGE = {
                0: [0,          1, 2, 3, 4, ELLIPSE, LAST_PAGE],
                1: [0,          1, 2, 3, 4, ELLIPSE, LAST_PAGE],
                2: [0,          1, 2, 3, 4, ELLIPSE, LAST_PAGE],
                3: [0, ELLIPSE, 1, 2, 3, 4, 5, ELLIPSE, LAST_PAGE],
                4: [0, ELLIPSE, 2, 3, 4, 5, 6, ELLIPSE, LAST_PAGE],
                5: [0, ELLIPSE, 3, 4, 5, 6, 7, ELLIPSE, LAST_PAGE],
                6: [0, ELLIPSE, 4, 5, 6, 7, 8, ELLIPSE, LAST_PAGE],
                7: [0, ELLIPSE, 5, 6, 7, 8, 9],
                8: [0, ELLIPSE, 5, 6, 7, 8, 9],
                9: [0, ELLIPSE, 5, 6, 7, 8, 9]
            };

        for (var page = 0; page <= LAST_PAGE; page++) {
            expect(PagingHelper.getPagingInfo({
                currentPage: page,
                lastPage: LAST_PAGE,
                displayedPages: DISPLAYED_PAGES,
                ellipseValue: ELLIPSE
            })).toEqual({
                ellipseValue: ELLIPSE,
                currentPage: page,
                lastPage: LAST_PAGE,
                previousPage: page - 1,
                nextPage: page + 1,
                hasPreviousPage: page > 0,
                hasNextPage: page < LAST_PAGE ,
                pageNumbers: PAGE_NUMBERS_BY_PAGE[page]
            });
        }

    });

    it('should place the ellipse correctly for EVEN displayedPages', function() {

        var ELLIPSE = 'yy',
            DISPLAYED_PAGES = 10,
            LAST_PAGE = 19,
            PAGE_NUMBERS_BY_PAGE = {
                0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ELLIPSE, 19],
                1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ELLIPSE, 19],
                2: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ELLIPSE, 19],
                3: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ELLIPSE, 19],
                4: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ELLIPSE, 19],
                5: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ELLIPSE, 19],
                6: [0, ELLIPSE, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ELLIPSE, 19],
                7: [0, ELLIPSE, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ELLIPSE, 19],
                8: [0, ELLIPSE, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, ELLIPSE, 19],
                9: [0, ELLIPSE, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, ELLIPSE, 19],
                10: [0, ELLIPSE, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, ELLIPSE, 19],
                11: [0, ELLIPSE, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ELLIPSE, 19],
                12: [0, ELLIPSE, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, ELLIPSE, 19],
                13: [0, ELLIPSE, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, ELLIPSE, 19],
                14: [0, ELLIPSE, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, ELLIPSE, 19],
                15: [0, ELLIPSE, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                16: [0, ELLIPSE, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                17: [0, ELLIPSE, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                18: [0, ELLIPSE, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                19: [0, ELLIPSE, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
            };

        for (var page = 0; page <= LAST_PAGE; page++) {
            expect(PagingHelper.getPagingInfo({
                currentPage: page,
                lastPage: LAST_PAGE,
                displayedPages: DISPLAYED_PAGES,
                ellipseValue: ELLIPSE
            })).toEqual({
                ellipseValue: ELLIPSE,
                currentPage: page,
                lastPage: LAST_PAGE,
                previousPage: page - 1,
                nextPage: page + 1,
                hasPreviousPage: page > 0,
                hasNextPage: page < LAST_PAGE ,
                pageNumbers: PAGE_NUMBERS_BY_PAGE[page]
            });
        }

    });

    it('will provide a default ellipseValue if no explicit one was input', function() {
        expect(PagingHelper.getPagingInfo({
            currentPage: 0,
            lastPage: 0,
            displayedPages: 5
        })).toEqual({
            ellipseValue: '|',
            currentPage: 0,
            lastPage: 0,
            previousPage: -1,
            nextPage: 1,
            hasPreviousPage: false,
            hasNextPage: false,
            pageNumbers: [0]
        });
    });
});
