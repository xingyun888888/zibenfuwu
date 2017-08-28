(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function recalc() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 13 * (clientWidth / 320) + 'px';
    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfMzNmNzI2ZGIuanMiXSwibmFtZXMiOlsiZG9jIiwid2luIiwiZG9jRWwiLCJkb2N1bWVudEVsZW1lbnQiLCJyZXNpemVFdnQiLCJ3aW5kb3ciLCJyZWNhbGMiLCJjbGllbnRXaWR0aCIsInN0eWxlIiwiZm9udFNpemUiLCJhZGRFdmVudExpc3RlbmVyIiwiZG9jdW1lbnQiXSwibWFwcGluZ3MiOiI7O0FBQ0EsQ0FBQyxVQUFTQSxHQUFULEVBQWNDLEdBQWQsRUFBbUI7QUFDaEIsUUFBSUMsUUFBUUYsSUFBSUcsZUFBaEI7QUFBQSxRQUNJQyxZQUFZLHVCQUF1QkMsTUFBdkIsR0FBZ0MsbUJBQWhDLEdBQXNELFFBRHRFO0FBQUEsUUFFSUMsU0FBUyxTQUFUQSxNQUFTLEdBQVc7QUFDaEIsWUFBSUMsY0FBY0wsTUFBTUssV0FBeEI7QUFDQSxZQUFJLENBQUNBLFdBQUwsRUFBa0I7QUFDbEJMLGNBQU1NLEtBQU4sQ0FBWUMsUUFBWixHQUF1QixNQUFJRixjQUFjLEdBQWxCLElBQXlCLElBQWhEO0FBQ0gsS0FOTDtBQU9BLFFBQUksQ0FBQ1AsSUFBSVUsZ0JBQVQsRUFBMkI7QUFDM0JULFFBQUlTLGdCQUFKLENBQXFCTixTQUFyQixFQUFnQ0UsTUFBaEMsRUFBd0MsS0FBeEM7QUFDQU4sUUFBSVUsZ0JBQUosQ0FBcUIsa0JBQXJCLEVBQXlDSixNQUF6QyxFQUFpRCxLQUFqRDtBQUNILENBWEQsRUFXR0ssUUFYSCxFQVdhTixNQVhiIiwiZmlsZSI6ImZha2VfMzNmNzI2ZGIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbihmdW5jdGlvbihkb2MsIHdpbikge1xuICAgIHZhciBkb2NFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgIHJlc2l6ZUV2dCA9ICdvcmllbnRhdGlvbmNoYW5nZScgaW4gd2luZG93ID8gJ29yaWVudGF0aW9uY2hhbmdlJyA6ICdyZXNpemUnLFxuICAgICAgICByZWNhbGMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjbGllbnRXaWR0aCA9IGRvY0VsLmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgaWYgKCFjbGllbnRXaWR0aCkgcmV0dXJuO1xuICAgICAgICAgICAgZG9jRWwuc3R5bGUuZm9udFNpemUgPSAxMyooY2xpZW50V2lkdGggLyAzMjApICsgJ3B4JztcbiAgICAgICAgfTtcbiAgICBpZiAoIWRvYy5hZGRFdmVudExpc3RlbmVyKSByZXR1cm47XG4gICAgd2luLmFkZEV2ZW50TGlzdGVuZXIocmVzaXplRXZ0LCByZWNhbGMsIGZhbHNlKTtcbiAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHJlY2FsYywgZmFsc2UpO1xufSkoZG9jdW1lbnQsIHdpbmRvdyk7XG4iXX0=
},{}]},{},[1])