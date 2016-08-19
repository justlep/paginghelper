/**
 * A helper for generating an object describing `how to build a result-paging navigation` for a
 * given number of max. consecutive pages to display and the first+last page separated by an `ellipse` value.
 *
 * Git: https://github.com/justlep/paginghelper
 *
 * Example:
 *   expect(PagingHelper.getPagingInfo({
 *       currentPage: 5,
 *       lastPage: 9,
 *       displayedPages: 5,
 *       ellipseValue: '---',
 *   })).toEqual({
 *       ellipseValue: '---',
 *       currentPage: 5,
 *       lastPage: 9,
 *       previousPage: 4,
 *       nextPage: 6,
 *       hasPreviousPage: true,
 *       hasNextPage: true,
 *       pageNumbers: [0, '---', 3, 4, 5, 6, 7, '---', 9]
 *   });
 *
 * See also: PagingHelper.spec.js
 *
 */
;(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && typeof (module||{}).exports === 'object') {
        module.exports = factory();
    } else {
        window.PagingHelper = factory();
    }
})(function() {

    'use strict';

    var DEFAULT_OPTS = {
            currentPage: 0,
            lastPage: 0,
            displayedPages: 5,
            showFirstLast: true,
            ellipseValue: -1
        },
        INFO_TEMPLATE = {
            ellipseValue: DEFAULT_OPTS.ellipseValue,
            currentPage: 0,
            lastPage: 0,
            previousPage: 0,
            nextPage: 0,
            hasPreviousPage: false,
            hasNextPage: false,
            pageNumbers: null  // e.g. [1, -1, 5,6,7,8,9, -1, 15] for (currentPage=7, lastPage=15, showFirstLast=true)
        },
        extend = function(target /*, ...sources */) {
            for (var i = 1, len = arguments.length; i < len; i++) {
                var src = arguments[i] || {};
                for (var k in src) {
                    if (src.hasOwnProperty(k)) {
                        target[k] = src[k];
                    }
                }
            }
            return target;
        };

    /**
     * Returns a paging info object that can be used to generate pagination links.
     * All page/item numbers are zero-based.
     * The current paging status can EITHER be given explicitly via
     *    `currentPage` + `lastPage'
     * or by specifying result set values
     *    `firstItemOffset` + `itemsPerPage` + `totalItems`
     *
     * @param options (Object) containing properties:
     *          - [currentPage] (Number) current page (use this for giving an explicit current page) (0-based)
     *          - [lastPage] (Number) the last page (0-based)
     *
     *          - [firstItemOffset] (Number) offset of the first record in the current page,
     *                                       used to calculate the current page instead of using the `currentPage` param.
     *          - [totalItems] (Number) total number of items, used to calculate the lastPage instead of using `lastPage`.
     *          - [itemsPerPage] (Number) number of items per page.
     *
     *          - displayedPages (Number) the number of pages in the main block
     *          - showFirstLast (boolean) if true, the pageNumbers array will contain page numbers for the
     *                                    first+last page (separated by ellipse values) if the main page number block
     *                                    doesn't contain them.
     *          - [ellipseValue] (Number|String) value representing the gap between first/last page and main page block
     *                                           (default: -1)
     *
     * @returns (Object) a clone of {@link INFO_TEMPLATE} filled with computed values
     */
    function getPagingInfo(options) {
        // util.assertObject(options, 'Missing options for PagingHelper.getPagingInfo');

        var opts = extend({}, DEFAULT_OPTS, options);

        if (typeof opts.itemsPerPage === 'number') {
            // util.assertNumberInRange(opts.itemsPerPage, 1, Number.MAX_VALUE, 'Invalid itemsPerPage');
            // util.assertNumberInRange(opts.firstItemOffset, 0, Number.MAX_VALUE, 'Missing/Invalid firstItemOffset');
            // util.assertNumberInRange(opts.totalItems, 0, Number.MAX_VALUE, 'Missing/Invalid totalItems');
            opts.currentPage = Math.floor(opts.firstItemOffset / opts.itemsPerPage);
            opts.lastPage = Math.max(0, Math.ceil(opts.totalItems / opts.itemsPerPage) - 1);
        }
        // else {
        //     util.assertNumberInRange(opts.currentPage, 0, Number.MAX_VALUE, 'Missing/Invalid currentPage');
        //     util.assertNumberInRange(opts.lastPage, 0, Number.MAX_VALUE, 'Missing/Invalid lastPage');
        // }

        var intervalStart = Math.max(0, opts.currentPage - Math.floor(opts.displayedPages / 2)),
            intervalEnd = Math.min(opts.lastPage, intervalStart + opts.displayedPages - 1),
            intervalSize = intervalEnd - intervalStart + 1,
            pageItems = [],
            ellipseValue = (typeof opts.ellipseValue === 'undefined') ? DEFAULT_OPTS.ellipseValue : opts.ellipseValue;

        // util.assert((typeof ellipseValue === 'number' && ellipseValue < 0) ||
        //    (typeof ellipseValue === 'string' && !!ellipseValue), 'Invalid ellipseValue');

        if (intervalStart && (intervalSize < opts.displayedPages)) {
            intervalStart = Math.max(0, intervalEnd - opts.displayedPages + 1);
        }

        for (var i=intervalStart; i<=intervalEnd; i++) {
            if (opts.showFirstLast && (i === intervalStart) && (i >= 1)) {
                pageItems.push(0);
                pageItems.push(ellipseValue);
            }
            pageItems.push(i);
        }

        if (opts.showFirstLast && (intervalEnd < opts.lastPage)) {
            pageItems.push(ellipseValue);
            pageItems.push(opts.lastPage);
        }

        return extend({}, INFO_TEMPLATE, {
            ellipseValue: ellipseValue,
            currentPage: opts.currentPage,
            lastPage: opts.lastPage,
            hasPreviousPage: opts.currentPage > 0,
            previousPage: opts.currentPage - 1,
            hasNextPage: opts.currentPage < opts.lastPage,
            nextPage: opts.currentPage + 1,
            pageNumbers: pageItems
        });
    }


    return {
        getPagingInfo: getPagingInfo
    };

});