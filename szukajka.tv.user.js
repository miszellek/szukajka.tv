// ==UserScript==
// @name         szukajka.tv
// @namespace    szukajka.tv
// @version      0.4
// @description  tools for szukajka.tv
// @author       miszel
// @match        http://szukajka.tv/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    //footer
    var footer = document.getElementsByTagName('footer');
    for (var i = footer.length; i--; ) {
        footer[i].style.display = 'none';
    }

    //cookies
    try {
        document.getElementsByClassName('cookie-policy')[0].style.display = 'none';
    } catch(err) {}

    //header
    try {
        document.querySelectorAll('body header')[0].style.position = 'static';
    } catch(err) {}

    //search box
    try {
        document.querySelectorAll('main.search div.fix')[0].style.position = 'static';
    } catch(err) {}

    //search box
    try {
        document.querySelectorAll('main.search div.content')[0].style.margin = '10px 0 0 0';
    } catch(err) {}

    //linki
    function changeLinks() {
        var search_results = document.getElementById('search_results');

        if (search_results) {

            var a = search_results.getElementsByTagName('a');

            if (a.length > 0) {
                for (var i = 0; i < a.length; i++) {
                    var id = a[i].href.match(/http:\/\/szukajka\.tv\/(.+?)\-/);
                    if (id) {
                        a[i].href = 'http://szukajka.tv/link/' + id[1];
                    }

                    try {
                        a[i].style.padding = '0';
                    } catch(err) {}

                    try {
                        a[i].querySelectorAll('span.img')[0].style.width = '20px';
                    } catch(err) {}

                    try {
                        a[i].querySelectorAll('span.title div')[0].style.height = 'auto';
                        a[i].querySelectorAll('span.title div')[0].style.whiteSpace = 'normal';
                    } catch(err) {}

                    try {
                        a[i].querySelectorAll('span.version')[0].style.paddingRight = '0';
                        a[i].querySelectorAll('span.version')[0].style.width = '50px';
                    } catch(err) {}

                    try {
                        a[i].querySelectorAll('span.author')[0].style.display = 'none';
                    } catch(err) {}

                    try {
                        a[i].querySelectorAll('span.source')[0].style.display = 'none';
                    } catch(err) {}

                    try {
                        a[i].querySelectorAll('span.comments')[0].style.display = 'none';
                    } catch(err) {}

                    try {
                        a[i].querySelectorAll('span.size')[0].style.width = '70px';
                    } catch(err) {}

                }
            }

            var tooltip = search_results.querySelectorAll('div.tooltip img');
            for (i = 0; i < tooltip.length; ++i) {
                tooltip[i].src = '';
            }

        }
    }

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutationRecord) {
            changeLinks();
        });
    });

    var checkExistLoader = setInterval(function () {
        var search_results = document.getElementById('search_results');
        if (search_results) {
            clearInterval(checkExistLoader);
            observer.observe(search_results, { childList: true });
            changeLinks();
        }
    }, 100);

})();