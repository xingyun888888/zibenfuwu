(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by gaochao on 8/28/17.
 */
/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
if (!window.jQuery) {

    var jQuery = Zepto;

    (function ($) {

        ['width', 'height'].forEach(function (dimension) {
            $.fn[dimension] = function (value) {
                var offset,
                    body = document.body,
                    html = document.documentElement,
                    Dimension = dimension.replace(/./, function (m) {
                    return m[0].toUpperCase();
                });
                if (value === undefined) {
                    return this[0] == window ? html['client' + Dimension] : this[0] == document ? Math.max(body['scroll' + Dimension], body['offset' + Dimension], html['client' + Dimension], html['scroll' + Dimension], html['offset' + Dimension]) : (offset = this.offset()) && offset[dimension];
                } else {
                    return this.each(function (idx) {
                        $(this).css(dimension, value);
                    });
                }
            };
        });

        ['width', 'height'].forEach(function (dimension) {
            var offset,
                Dimension = dimension.replace(/./, function (m) {
                return m[0].toUpperCase();
            });
            $.fn['outer' + Dimension] = function (margin) {
                var elem = this;
                if (elem) {
                    var size = elem[0]['offset' + Dimension],
                        sides = { 'width': ['left', 'right'], 'height': ['top', 'bottom'] };
                    sides[dimension].forEach(function (side) {
                        if (margin) {
                            size += parseInt(elem.css('margin-' + side), 10);
                        }
                    });
                    return size;
                } else {
                    return null;
                }
            };
        });

        ['width', 'height'].forEach(function (dimension) {
            var offset,
                Dimension = dimension.replace(/./, function (m) {
                return m[0].toUpperCase();
            });
            $.fn['inner' + Dimension] = function () {
                var elem = this;
                if (elem[0]['inner' + Dimension]) {
                    return elem[0]['inner' + Dimension];
                } else {
                    var size = elem[0]['offset' + Dimension],
                        sides = { 'width': ['left', 'right'], 'height': ['top', 'bottom'] };
                    sides[dimension].forEach(function (side) {
                        size -= parseInt(elem.css('border-' + side + '-width'), 10);
                    });

                    return size;
                }
            };
        });

        ["Left", "Top"].forEach(function (name, i) {
            var method = "scroll" + name;

            function isWindow(obj) {
                return obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === "object" && "setInterval" in obj;
            }

            function getWindow(elem) {
                return isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
            }

            $.fn[method] = function (val) {
                var elem, win;
                if (val === undefined) {
                    elem = this[0];
                    if (!elem) {
                        return null;
                    }
                    win = getWindow(elem);
                    // Return the scroll offset
                    return win ? "pageXOffset" in win ? win[i ? "pageYOffset" : "pageXOffset"] : win.document.documentElement[method] || win.document.body[method] : elem[method];
                }

                // Set the scroll offset
                this.each(function () {
                    win = getWindow(this);
                    if (win) {
                        var xCoord = !i ? val : $(win).scrollLeft(),
                            yCoord = i ? val : $(win).scrollTop();
                        win.scrollTo(xCoord, yCoord);
                    } else {
                        this[method] = val;
                    }
                });
            };
        });

        // Fix zepto.js extend to work with undefined parameter
        $._extend = $.extend;
        $.extend = function () {
            arguments[0] = arguments[0] || {};
            return $._extend.apply(this, arguments);
        };
    })(jQuery);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfNzY3NWE4ZmYuanMiXSwibmFtZXMiOlsid2luZG93IiwialF1ZXJ5IiwiWmVwdG8iLCIkIiwiZm9yRWFjaCIsImRpbWVuc2lvbiIsImZuIiwidmFsdWUiLCJvZmZzZXQiLCJib2R5IiwiZG9jdW1lbnQiLCJodG1sIiwiZG9jdW1lbnRFbGVtZW50IiwiRGltZW5zaW9uIiwicmVwbGFjZSIsIm0iLCJ0b1VwcGVyQ2FzZSIsInVuZGVmaW5lZCIsIk1hdGgiLCJtYXgiLCJlYWNoIiwiaWR4IiwiY3NzIiwibWFyZ2luIiwiZWxlbSIsInNpemUiLCJzaWRlcyIsInNpZGUiLCJwYXJzZUludCIsIm5hbWUiLCJpIiwibWV0aG9kIiwiaXNXaW5kb3ciLCJvYmoiLCJnZXRXaW5kb3ciLCJub2RlVHlwZSIsImRlZmF1bHRWaWV3IiwicGFyZW50V2luZG93IiwidmFsIiwid2luIiwieENvb3JkIiwic2Nyb2xsTGVmdCIsInlDb29yZCIsInNjcm9sbFRvcCIsInNjcm9sbFRvIiwiX2V4dGVuZCIsImV4dGVuZCIsImFyZ3VtZW50cyIsImFwcGx5Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7OztBQUdBO0FBQ0EsSUFBSSxDQUFDQSxPQUFPQyxNQUFaLEVBQW9COztBQUVoQixRQUFJQSxTQUFTQyxLQUFiOztBQUVBLEtBQUMsVUFBVUMsQ0FBVixFQUFhOztBQUVWLFNBQUMsT0FBRCxFQUFVLFFBQVYsRUFBb0JDLE9BQXBCLENBQTRCLFVBQVVDLFNBQVYsRUFBcUI7QUFDN0NGLGNBQUVHLEVBQUYsQ0FBS0QsU0FBTCxJQUFrQixVQUFVRSxLQUFWLEVBQWlCO0FBQy9CLG9CQUFJQyxNQUFKO0FBQUEsb0JBQ0lDLE9BQU9DLFNBQVNELElBRHBCO0FBQUEsb0JBRUlFLE9BQU9ELFNBQVNFLGVBRnBCO0FBQUEsb0JBR0lDLFlBQVlSLFVBQVVTLE9BQVYsQ0FBa0IsR0FBbEIsRUFBdUIsVUFBVUMsQ0FBVixFQUFhO0FBQUUsMkJBQU9BLEVBQUUsQ0FBRixFQUFLQyxXQUFMLEVB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QUFMLENBSEo7QUFJSDs7QUFFRDtBQUNBLHFCQUFLWCxJQUFMLENBQVUsWUFBWTtBQUNsQm1CLDBCQUFNTCxVQUFVLElBQVYsQ0FBTjtBQUNBLHdCQUFJSyxHQUFKLEVBQVM7QUFDTCw0QkFBSUMsU0FBUyxDQUFDVixDQUFELEdBQUtRLEdBQUwsR0FBV25DLEVBQUVvQyxHQUFGLEVBQU9FLFVBQVAsRUFBeEI7QUFBQSw0QkFDSUMsU0FBU1osSUFBSVEsR0FBSixHQUFVbkMsRUFBRW9DLEdBQUYsRUFBT0ksU0FBUCxFQUR2QjtBQUVBSiw0QkFBSUssUUFBSixDQUFhSixNQUFiLEVBQXFCRSxNQUFyQjtBQUNILHFCQUpELE1BSU87QUFDSCw2QkFBS1gsTUFBTCxJQUFlTyxHQUFmO0FBQ0g7QUFDSixpQkFURDtBQVVILGFBMUJEO0FBMkJILFNBdENEOztBQXdDQTtBQUNBbkMsVUFBRTBDLE9BQUYsR0FBWTFDLEVBQUUyQyxNQUFkO0FBQ0EzQyxVQUFFMkMsTUFBRixHQUFXLFlBQVk7QUFDbkJDLHNCQUFVLENBQVYsSUFBZUEsVUFBVSxDQUFWLEtBQWdCLEVBQS9CO0FBQ0EsbUJBQU81QyxFQUFFMEMsT0FBRixDQUFVRyxLQUFWLENBQWdCLElBQWhCLEVBQXNCRCxTQUF0QixDQUFQO0FBQ0gsU0FIRDtBQUtILEtBMUdELEVBMEdHOUMsTUExR0g7QUE0R0giLCJmaWxlIjoiZmFrZV83Njc1YThmZi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBnYW9jaGFvIG9uIDgvMjgvMTcuXG4gKi9cbi8qanNsaW50IGVxZXE6IHRydWUsIHBsdXNwbHVzOiB0cnVlLCB1bmRlZjogdHJ1ZSwgc2xvcHB5OiB0cnVlLCB2YXJzOiB0cnVlLCBmb3JpbjogdHJ1ZSAqL1xuaWYgKCF3aW5kb3cualF1ZXJ5KSB7XG5cbiAgICB2YXIgalF1ZXJ5ID0gWmVwdG87XG5cbiAgICAoZnVuY3Rpb24gKCQpIHtcblxuICAgICAgICBbJ3dpZHRoJywgJ2hlaWdodCddLmZvckVhY2goZnVuY3Rpb24gKGRpbWVuc2lvbikge1xuICAgICAgICAgICAgJC5mbltkaW1lbnNpb25dID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgYm9keSA9IGRvY3VtZW50LmJvZHksXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIERpbWVuc2lvbiA9IGRpbWVuc2lvbi5yZXBsYWNlKC8uLywgZnVuY3Rpb24gKG0pIHsgcmV0dXJuIG1bMF0udG9VcHBlckNhc2UoKTsgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbMF0gPT0gd2luZG93ID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWxbJ2NsaWVudCcgKyBEaW1lbnNpb25dIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbMF0gPT0gZG9jdW1lbnQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgubWF4KGJvZHlbJ3Njcm9sbCcgKyBEaW1lbnNpb25dLCBib2R5WydvZmZzZXQnICsgRGltZW5zaW9uXSwgaHRtbFsnY2xpZW50JyArIERpbWVuc2lvbl0sIGh0bWxbJ3Njcm9sbCcgKyBEaW1lbnNpb25dLCBodG1sWydvZmZzZXQnICsgRGltZW5zaW9uXSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgKG9mZnNldCA9IHRoaXMub2Zmc2V0KCkpICYmIG9mZnNldFtkaW1lbnNpb25dO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGlkeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoZGltZW5zaW9uLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIFsnd2lkdGgnLCAnaGVpZ2h0J10uZm9yRWFjaChmdW5jdGlvbiAoZGltZW5zaW9uKSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0LCBEaW1lbnNpb24gPSBkaW1lbnNpb24ucmVwbGFjZSgvLi8sIGZ1bmN0aW9uIChtKSB7IHJldHVybiBtWzBdLnRvVXBwZXJDYXNlKCk7IH0pO1xuICAgICAgICAgICAgJC5mblsnb3V0ZXInICsgRGltZW5zaW9uXSA9IGZ1bmN0aW9uIChtYXJnaW4pIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNpemUgPSBlbGVtWzBdWydvZmZzZXQnICsgRGltZW5zaW9uXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZGVzID0geyd3aWR0aCc6IFsnbGVmdCcsICdyaWdodCddLCAnaGVpZ2h0JzogWyd0b3AnLCAnYm90dG9tJ119O1xuICAgICAgICAgICAgICAgICAgICBzaWRlc1tkaW1lbnNpb25dLmZvckVhY2goZnVuY3Rpb24gKHNpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXJnaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplICs9IHBhcnNlSW50KGVsZW0uY3NzKCdtYXJnaW4tJyArIHNpZGUpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICBbJ3dpZHRoJywgJ2hlaWdodCddLmZvckVhY2goZnVuY3Rpb24gKGRpbWVuc2lvbikge1xuICAgICAgICAgICAgdmFyIG9mZnNldCwgRGltZW5zaW9uID0gZGltZW5zaW9uLnJlcGxhY2UoLy4vLCBmdW5jdGlvbiAobSkgeyByZXR1cm4gbVswXS50b1VwcGVyQ2FzZSgpOyB9KTtcbiAgICAgICAgICAgICQuZm5bJ2lubmVyJyArIERpbWVuc2lvbl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW0gPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmIChlbGVtWzBdWydpbm5lcicgKyBEaW1lbnNpb25dKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtWzBdWydpbm5lcicgKyBEaW1lbnNpb25dO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzaXplID0gZWxlbVswXVsnb2Zmc2V0JyArIERpbWVuc2lvbl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlcyA9IHsnd2lkdGgnOiBbJ2xlZnQnLCAncmlnaHQnXSwgJ2hlaWdodCc6IFsndG9wJywgJ2JvdHRvbSddfTtcbiAgICAgICAgICAgICAgICAgICAgc2lkZXNbZGltZW5zaW9uXS5mb3JFYWNoKGZ1bmN0aW9uIChzaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplIC09IHBhcnNlSW50KGVsZW0uY3NzKCdib3JkZXItJyArIHNpZGUgKyAnLXdpZHRoJyksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgW1wiTGVmdFwiLCBcIlRvcFwiXS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lLCBpKSB7XG4gICAgICAgICAgICB2YXIgbWV0aG9kID0gXCJzY3JvbGxcIiArIG5hbWU7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGlzV2luZG93KG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiBcInNldEludGVydmFsXCIgaW4gb2JqO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRXaW5kb3coZWxlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpc1dpbmRvdyhlbGVtKSA/IGVsZW0gOiBlbGVtLm5vZGVUeXBlID09PSA5ID8gZWxlbS5kZWZhdWx0VmlldyB8fCBlbGVtLnBhcmVudFdpbmRvdyA6IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkLmZuW21ldGhvZF0gPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW0sIHdpbjtcbiAgICAgICAgICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbSA9IHRoaXNbMF07XG4gICAgICAgICAgICAgICAgICAgIGlmICghZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd2luID0gZ2V0V2luZG93KGVsZW0pO1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIHNjcm9sbCBvZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbiA/IChcInBhZ2VYT2Zmc2V0XCIgaW4gd2luKSA/IHdpbltpID8gXCJwYWdlWU9mZnNldFwiIDogXCJwYWdlWE9mZnNldFwiXSA6XG4gICAgICAgICAgICAgICAgICAgIHdpbi5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbbWV0aG9kXSB8fFxuICAgICAgICAgICAgICAgICAgICB3aW4uZG9jdW1lbnQuYm9keVttZXRob2RdIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1bbWV0aG9kXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIHNjcm9sbCBvZmZzZXRcbiAgICAgICAgICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB3aW4gPSBnZXRXaW5kb3codGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh3aW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4Q29vcmQgPSAhaSA/IHZhbCA6ICQod2luKS5zY3JvbGxMZWZ0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeUNvb3JkID0gaSA/IHZhbCA6ICQod2luKS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbi5zY3JvbGxUbyh4Q29vcmQsIHlDb29yZCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW21ldGhvZF0gPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEZpeCB6ZXB0by5qcyBleHRlbmQgdG8gd29yayB3aXRoIHVuZGVmaW5lZCBwYXJhbWV0ZXJcbiAgICAgICAgJC5fZXh0ZW5kID0gJC5leHRlbmQ7XG4gICAgICAgICQuZXh0ZW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYXJndW1lbnRzWzBdID0gYXJndW1lbnRzWzBdIHx8IHt9O1xuICAgICAgICAgICAgcmV0dXJuICQuX2V4dGVuZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuXG4gICAgfSkoalF1ZXJ5KTtcblxufSJdfQ==
},{}]},{},[1])