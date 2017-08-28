(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Mobiscroll v2.13.2
 * http://mobiscroll.com
 *
 * Copyright 2010-2014, Acid Media
 * Licensed under the MIT license.
 *
 */
(function ($, undefined) {

    function testProps(props) {
        var i;
        for (i in props) {
            if (mod[props[i]] !== undefined) {
                return true;
            }
        }
        return false;
    }

    function testPrefix() {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
            p;

        for (p in prefixes) {
            if (testProps([prefixes[p] + 'Transform'])) {
                return '-' + prefixes[p].toLowerCase() + '-';
            }
        }
        return '';
    }

    function init(that, options, args) {
        var ret = that;

        // Init
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            return that.each(function () {
                if (!this.id) {
                    this.id = 'mobiscroll' + ++id;
                }
                if (instances[this.id]) {
                    instances[this.id].destroy();
                }
                new $.mobiscroll.classes[options.component || 'Scroller'](this, options);
            });
        }

        // Method call
        if (typeof options === 'string') {
            that.each(function () {
                var r,
                    inst = instances[this.id];

                if (inst && inst[options]) {
                    r = inst[options].apply(this, Array.prototype.slice.call(args, 1));
                    if (r !== undefined) {
                        ret = r;
                        return false;
                    }
                }
            });
        }

        return ret;
    }

    var id = +new Date(),
        touches = {},
        instances = {},
        extend = $.extend,
        mod = document.createElement('modernizr').style,
        has3d = testProps(['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective']),
        hasFlex = testProps(['flex', 'msFlex', 'WebkitBoxDirection']),
        prefix = testPrefix(),
        pr = prefix.replace(/^\-/, '').replace(/\-$/, '').replace('moz', 'Moz');

    $.fn.mobiscroll = function (method) {
        extend(this, $.mobiscroll.components);
        return init(this, method, arguments);
    };

    $.mobiscroll = $.mobiscroll || {
        version: '2.13.2',
        util: {
            prefix: prefix,
            jsPrefix: pr,
            has3d: has3d,
            hasFlex: hasFlex,
            testTouch: function testTouch(e) {
                if (e.type == 'touchstart') {
                    touches[e.target] = true;
                } else if (touches[e.target]) {
                    delete touches[e.target];
                    return false;
                }
                return true;
            },
            isNumeric: function isNumeric(a) {
                return a - parseFloat(a) >= 0;
            },
            getCoord: function getCoord(e, c) {
                var ev = e.originalEvent || e;
                return ev.changedTouches ? ev.changedTouches[0]['page' + c] : e['page' + c];
            },
            constrain: function constrain(val, min, max) {
                return Math.max(min, Math.min(val, max));
            }
        },
        tapped: false,
        presets: {
            scroller: {},
            numpad: {}
        },
        themes: {
            listview: {}
        },
        i18n: {},
        instances: instances,
        classes: {},
        components: {},
        defaults: {
            theme: 'mobiscroll',
            context: 'body'
        },
        userdef: {},
        setDefaults: function setDefaults(o) {
            extend(this.userdef, o);
        },
        presetShort: function presetShort(name, c, p) {
            this.components[name] = function (s) {
                return init(this, extend(s, { component: c, preset: p === false ? undefined : name }), arguments);
            };
        }
    };

    $.scroller = $.scroller || $.mobiscroll;
    $.fn.scroller = $.fn.scroller || $.fn.mobiscroll;
})(jQuery);

(function ($) {
    $.mobiscroll.i18n.zh = $.extend($.mobiscroll.i18n.zh, {
        // Core
        setText: '确定',
        cancelText: '取消',
        clearText: '明确',
        selectedText: '选',
        // Datetime component
        dateFormat: 'yy/mm/dd',
        dateOrder: 'yymmdd',
        dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        dayText: '日',
        hourText: '时',
        minuteText: '分',
        monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        monthText: '月',
        secText: '秒',
        timeFormat: 'HH:ii',
        timeWheels: 'HHii',
        yearText: '年',
        nowText: '当前',
        pmText: '下午',
        amText: '上午',
        // Calendar component
        dateText: '日',
        timeText: '时间',
        calendarText: '日历',
        closeText: '关闭',
        // Daterange component
        fromText: '开始时间',
        toText: '结束时间',
        // Measurement components
        wholeText: '合计',
        fractionText: '分数',
        unitText: '单位',
        // Time / Timespan component
        labels: ['年', '月', '日', '小时', '分钟', '秒', ''],
        labelsShort: ['年', '月', '日', '点', '分', '秒', ''],
        // Timer component
        startText: '开始',
        stopText: '停止',
        resetText: '重置',
        lapText: '圈',
        hideText: '隐藏'
    });
})(jQuery);

// theme : android
(function ($) {

    $.mobiscroll.themes.android = {
        dateOrder: 'Mddyy',
        mode: 'clickpick',
        height: 50,
        showLabel: false,
        btnStartClass: 'mbsc-ic mbsc-ic-play3',
        btnStopClass: 'mbsc-ic mbsc-ic-pause2',
        btnResetClass: 'mbsc-ic mbsc-ic-stop2',
        btnLapClass: 'mbsc-ic mbsc-ic-loop2'
    };
})(jQuery);

// theme : android-holo
(function ($) {
    var themes = $.mobiscroll.themes,
        theme = {
        dateOrder: 'Mddyy',
        //mode: 'mixed',
        rows: 5,
        minWidth: 76,
        height: 36,
        showLabel: false,
        selectedLineHeight: true,
        selectedLineBorder: 2,
        useShortLabels: true,
        icon: { filled: 'star3', empty: 'star' },
        btnPlusClass: 'mbsc-ic mbsc-ic-arrow-down6',
        btnMinusClass: 'mbsc-ic mbsc-ic-arrow-up6',
        // @deprecated since 2.12.0, backward compatibility code
        // ---
        onThemeLoad: function onThemeLoad(lang, s) {
            if (s.theme) {
                s.theme = s.theme.replace('android-ics', 'android-holo').replace(' light', '-light');
            }
        },
        // ---
        onMarkupReady: function onMarkupReady(markup) {
            markup.addClass('mbsc-android-holo');
        }
    };

    themes['android-holo'] = theme;
    themes['android-holo-light'] = theme;

    // @deprecated since 2.12.0, backward compatibility code
    themes['android-ics'] = theme;
    themes['android-ics light'] = theme;
    themes['android-holo light'] = theme;
})(jQuery);

// theme : ios
(function ($) {

    $.mobiscroll.themes.ios = {
        display: 'bottom',
        dateOrder: 'MMdyy',
        rows: 5,
        height: 30,
        minWidth: 60,
        headerText: false,
        showLabel: false,
        btnWidth: false,
        selectedLineHeight: true,
        selectedLineBorder: 2,
        useShortLabels: true
    };
})(jQuery);

// theme : ios7
(function ($) {

    $.mobiscroll.themes.ios7 = {
        display: 'bottom',
        dateOrder: 'MMdyy',
        rows: 5,
        height: 34,
        minWidth: 55,
        headerText: false,
        showLabel: false,
        btnWidth: false,
        selectedLineHeight: true,
        selectedLineBorder: 1,
        useShortLabels: true,
        deleteIcon: 'backspace3',
        checkIcon: 'ion-ios7-checkmark-empty',
        btnCalPrevClass: 'mbsc-ic mbsc-ic-arrow-left5',
        btnCalNextClass: 'mbsc-ic mbsc-ic-arrow-right5',
        btnPlusClass: 'mbsc-ic mbsc-ic-arrow-down5',
        btnMinusClass: 'mbsc-ic mbsc-ic-arrow-up5'
    };
})(jQuery);

// theme : jquery mobile
(function ($) {

    var ver = $.mobile && $.mobile.version.match(/1\.4/);

    $.mobiscroll.themes.jqm = {
        jqmBorder: 'a',
        jqmBody: ver ? 'a' : 'c',
        jqmHeader: 'b',
        jqmWheel: 'd',
        jqmLine: 'b',
        jqmClickPick: 'c',
        jqmSet: 'b',
        jqmCancel: 'c',
        disabledClass: 'ui-disabled',
        activeClass: 'ui-btn-active',
        activeTabInnerClass: 'ui-btn-active',
        btnCalPrevClass: '',
        btnCalNextClass: '',
        selectedLineHeight: true,
        selectedLineBorder: 1,
        onThemeLoad: function onThemeLoad(lang, s) {
            var cal = s.jqmBody || 'c',
                txt = s.jqmEventText || 'b',
                bubble = s.jqmEventBubble || 'a';

            s.dayClass = 'ui-body-a ui-body-' + cal;
            s.innerDayClass = 'ui-state-default ui-btn ui-btn-up-' + cal;
            s.calendarClass = 'ui-body-a ui-body-' + cal;
            s.weekNrClass = 'ui-body-a ui-body-' + cal;
            s.eventTextClass = 'ui-btn-up-' + txt;
            s.eventBubbleClass = 'ui-body-' + bubble;
        },
        onEventBubbleShow: function onEventBubbleShow(evd, evc) {
            $('.dw-cal-event-list', evc).attr('data-role', 'listview');
            evc.page().trigger('create');
        },
        onMarkupInserted: function onMarkupInserted(elm, inst) {
            var s = inst.settings;

            if (ver) {
                elm.addClass('mbsc-jqm14');
                $('.mbsc-np-btn, .dwwb, .dw-cal-sc-m-cell .dw-i', elm).addClass('ui-btn');
                $('.dwbc span.dwb, .dw-dr', elm).addClass('ui-btn ui-mini ui-corner-all');
                $('.dw-cal-prev .dw-cal-btn-txt', elm).addClass('ui-btn ui-icon-arrow-l ui-btn-icon-notext ui-shadow ui-corner-all');
                $('.dw-cal-next .dw-cal-btn-txt', elm).addClass('ui-btn ui-icon-arrow-r ui-btn-icon-notext ui-shadow ui-corner-all');
            }

            $('.dw', elm).removeClass('dwbg').addClass('ui-selectmenu ui-overlay-shadow ui-corner-all ui-body-' + s.jqmBorder);
            $('.dwbc .dwb', elm).attr('data-role', 'button').attr('data-mini', 'true').attr('data-theme', s.jqmCancel);
            $('.dwb-s .dwb', elm).addClass('ui-btn-' + s.jqmSet).attr('data-theme', s.jqmSet);
            $('.dwwb', elm).attr('data-role', 'button').attr('data-theme', s.jqmClickPick);
            $('.dwv', elm).addClass('ui-header ui-bar-' + s.jqmHeader);
            $('.dwwr', elm).addClass('ui-corner-all ui-body-' + s.jqmBody);
            $('.dwwl', elm).addClass('ui-body-' + s.jqmWheel);
            $('.dwwol', elm).addClass('ui-body-' + s.jqmLine);
            $('.dwl', elm).addClass('ui-body-' + s.jqmBody);
            // Calendar base
            $('.dw-cal-tabs', elm).attr('data-role', 'navbar');
            $('.dw-cal-prev .dw-cal-btn-txt', elm).attr('data-role', 'button').attr('data-icon', 'arrow-l').attr('data-iconpos', 'notext');
            $('.dw-cal-next .dw-cal-btn-txt', elm).attr('data-role', 'button').attr('data-icon', 'arrow-r').attr('data-iconpos', 'notext');
            // Calendar events
            $('.dw-cal-events', elm).attr('data-role', 'page');
            // Rangepicker
            $('.dw-dr', elm).attr('data-role', 'button').attr('data-mini', 'true');
            // Numpad
            $('.mbsc-np-btn', elm).attr('data-role', 'button').attr('data-corners', 'false');
            elm.trigger('create');
        }
    };
})(jQuery);

// theme : sense-ui
(function ($) {

    $.mobiscroll.themes['sense-ui'] = {
        btnStartClass: 'mbsc-ic mbsc-ic-play3',
        btnStopClass: 'mbsc-ic mbsc-ic-pause2',
        btnResetClass: 'mbsc-ic mbsc-ic-stop2',
        btnLapClass: 'mbsc-ic mbsc-ic-loop2'
    };
})(jQuery);

// theme : windows phone
(function ($) {

    var themes = $.mobiscroll.themes,
        theme = {
        minWidth: 76,
        height: 76,
        accent: 'none',
        dateOrder: 'mmMMddDDyy',
        headerText: false,
        showLabel: false,
        deleteIcon: 'backspace4',
        icon: { filled: 'star3', empty: 'star' },
        btnWidth: false,
        btnStartClass: 'mbsc-ic mbsc-ic-play3',
        btnStopClass: 'mbsc-ic mbsc-ic-pause2',
        btnResetClass: 'mbsc-ic mbsc-ic-stop2',
        btnLapClass: 'mbsc-ic mbsc-ic-loop2',
        btnHideClass: 'mbsc-ic mbsc-ic-close',
        btnCalPrevClass: 'mbsc-ic mbsc-ic-arrow-left2',
        btnCalNextClass: 'mbsc-ic mbsc-ic-arrow-right2',
        btnPlusClass: 'mbsc-ic mbsc-ic-plus',
        btnMinusClass: 'mbsc-ic mbsc-ic-minus',
        onMarkupInserted: function onMarkupInserted(elm, inst) {
            var click, touch, active;

            elm.addClass('mbsc-wp');

            $('.dw', elm).addClass('mbsc-wp-' + inst.settings.accent);

            $('.dwb-s .dwb', elm).addClass('mbsc-ic mbsc-ic-checkmark');
            $('.dwb-c .dwb', elm).addClass('mbsc-ic mbsc-ic-close');
            $('.dwb-cl .dwb', elm).addClass('mbsc-ic mbsc-ic-close');
            $('.dwb-n .dwb', elm).addClass('mbsc-ic mbsc-ic-loop2');

            $('.dwwl', elm).on('touchstart mousedown DOMMouseScroll mousewheel', function (e) {
                if (e.type === 'mousedown' && touch) {
                    return;
                }
                touch = e.type === 'touchstart';
                click = true;
                active = $(this).hasClass('wpa');
                $('.dwwl', elm).removeClass('wpa');
                $(this).addClass('wpa');
            }).on('touchmove mousemove', function () {
                click = false;
            }).on('touchend mouseup', function (e) {
                if (click && active && $(e.target).closest('.dw-li').hasClass('dw-sel')) {
                    $(this).removeClass('wpa');
                }
                if (e.type === 'mouseup') {
                    touch = false;
                }
                click = false;
            });
        },
        onThemeLoad: function onThemeLoad(lang, s) {
            if (lang && lang.dateOrder && !s.dateOrder) {
                var ord = lang.dateOrder;
                ord = ord.match(/mm/i) ? ord.replace(/mmMM|mm|MM/, 'mmMM') : ord.replace(/mM|m|M/, 'mM');
                ord = ord.match(/dd/i) ? ord.replace(/ddDD|dd|DD/, 'ddDD') : ord.replace(/dD|d|D/, 'dD');
                s.dateOrder = ord;
            }
            // @deprecated since 2.12.0, backward compatibility code
            // ---
            if (s.theme) {
                s.theme = s.theme.replace(' light', '-light');
            }
            // ---
        }
    };

    themes.wp = theme;
    themes['wp-light'] = theme;

    // @deprecated since 2.12.0, backward compatibility code
    themes['wp light'] = theme;
})(jQuery);

(function ($, undefined) {
    var ms = $.mobiscroll;

    ms.datetime = {
        defaults: {
            shortYearCutoff: '+10',
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            monthText: 'Month',
            amText: 'am',
            pmText: 'pm',
            getYear: function getYear(d) {
                return d.getFullYear();
            },
            getMonth: function getMonth(d) {
                return d.getMonth();
            },
            getDay: function getDay(d) {
                return d.getDate();
            },
            getDate: function getDate(y, m, d, h, i, s) {
                return new Date(y, m, d, h || 0, i || 0, s || 0);
            },
            getMaxDayOfMonth: function getMaxDayOfMonth(y, m) {
                return 32 - new Date(y, m, 32).getDate();
            },
            getWeekNumber: function getWeekNumber(d) {
                // Copy date so don't modify original
                d = new Date(d);
                d.setHours(0, 0, 0);
                // Set to nearest Thursday: current date + 4 - current day number
                // Make Sunday's day number 7
                d.setDate(d.getDate() + 4 - (d.getDay() || 7));
                // Get first day of year
                var yearStart = new Date(d.getFullYear(), 0, 1);
                // Calculate full weeks to nearest Thursday
                return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
            }
        },
        /**
        * Format a date into a string value with a specified format.
        * @param {String} format Output format.
        * @param {Date} date Date to format.
        * @param {Object} [settings={}] Settings.
        * @return {String} Returns the formatted date string.
        */
        formatDate: function formatDate(format, date, settings) {
            if (!date) {
                return null;
            }
            var s = $.extend({}, ms.datetime.defaults, settings),
                look = function look(m) {
                // Check whether a format character is doubled
                var n = 0;
                while (i + 1 < format.length && format.charAt(i + 1) == m) {
                    n++;
                    i++;
                }
                return n;
            },
                f1 = function f1(m, val, len) {
                // Format a number, with leading zero if necessary
                var n = '' + val;
                if (look(m)) {
                    while (n.length < len) {
                        n = '0' + n;
                    }
                }
                return n;
            },
                f2 = function f2(m, val, s, l) {
                // Format a name, short or long as requested
                return look(m) ? l[val] : s[val];
            },
                i,
                year,
                output = '',
                literal = false;

            for (i = 0; i < format.length; i++) {
                if (literal) {
                    if (format.charAt(i) == "'" && !look("'")) {
                        literal = false;
                    } else {
                        output += format.charAt(i);
                    }
                } else {
                    switch (format.charAt(i)) {
                        case 'd':
                            output += f1('d', s.getDay(date), 2);
                            break;
                        case 'D':
                            output += f2('D', date.getDay(), s.dayNamesShort, s.dayNames);
                            break;
                        case 'o':
                            output += f1('o', (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000, 3);
                            break;
                        case 'm':
                            output += f1('m', s.getMonth(date) + 1, 2);
                            break;
                        case 'M':
                            output += f2('M', s.getMonth(date), s.monthNamesShort, s.monthNames);
                            break;
                        case 'y':
                            year = s.getYear(date);
                            output += look('y') ? year : (year % 100 < 10 ? '0' : '') + year % 100;
                            //output += (look('y') ? date.getFullYear() : (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
                            break;
                        case 'h':
                            var h = date.getHours();
                            output += f1('h', h > 12 ? h - 12 : h === 0 ? 12 : h, 2);
                            break;
                        case 'H':
                            output += f1('H', date.getHours(), 2);
                            break;
                        case 'i':
                            output += f1('i', date.getMinutes(), 2);
                            break;
                        case 's':
                            output += f1('s', date.getSeconds(), 2);
                            break;
                        case 'a':
                            output += date.getHours() > 11 ? s.pmText : s.amText;
                            break;
                        case 'A':
                            output += date.getHours() > 11 ? s.pmText.toUpperCase() : s.amText.toUpperCase();
                            break;
                        case "'":
                            if (look("'")) {
                                output += "'";
                            } else {
                                literal = true;
                            }
                            break;
                        default:
                            output += format.charAt(i);
                    }
                }
            }
            return output;
        },
        /**
        * Extract a date from a string value with a specified format.
        * @param {String} format Input format.
        * @param {String} value String to parse.
        * @param {Object} [settings={}] Settings.
        * @return {Date} Returns the extracted date.
        */
        parseDate: function parseDate(format, value, settings) {
            var s = $.extend({}, ms.datetime.defaults, settings),
                def = s.defaultValue || new Date();

            if (!format || !value) {
                return def;
            }

            // If already a date object
            if (value.getTime) {
                return value;
            }

            value = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object' ? value.toString() : value + '';

            var shortYearCutoff = s.shortYearCutoff,
                year = s.getYear(def),
                month = s.getMonth(def) + 1,
                day = s.getDay(def),
                doy = -1,
                hours = def.getHours(),
                minutes = def.getMinutes(),
                seconds = 0,
                //def.getSeconds(),
            ampm = -1,
                literal = false,
                // Check whether a format character is doubled
            lookAhead = function lookAhead(match) {
                var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) == match;
                if (matches) {
                    iFormat++;
                }
                return matches;
            },
                getNumber = function getNumber(match) {
                // Extract a number from the string value
                lookAhead(match);
                var size = match == '@' ? 14 : match == '!' ? 20 : match == 'y' ? 4 : match == 'o' ? 3 : 2,
                    digits = new RegExp('^\\d{1,' + size + '}'),
                    num = value.substr(iValue).match(digits);

                if (!num) {
                    return 0;
                }
                iValue += num[0].length;
                return parseInt(num[0], 10);
            },
                getName = function getName(match, s, l) {
                // Extract a name from the string value and convert to an index
                var names = lookAhead(match) ? l : s,
                    i;

                for (i = 0; i < names.length; i++) {
                    if (value.substr(iValue, names[i].length).toLowerCase() == names[i].toLowerCase()) {
                        iValue += names[i].length;
                        return i + 1;
                    }
                }
                return 0;
            },
                checkLiteral = function checkLiteral() {
                iValue++;
            },
                iValue = 0,
                iFormat;

            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                        literal = false;
                    } else {
                        checkLiteral();
                    }
                } else {
                    switch (format.charAt(iFormat)) {
                        case 'd':
                            day = getNumber('d');
                            break;
                        case 'D':
                            getName('D', s.dayNamesShort, s.dayNames);
                            break;
                        case 'o':
                            doy = getNumber('o');
                            break;
                        case 'm':
                            month = getNumber('m');
                            break;
                        case 'M':
                            month = getName('M', s.monthNamesShort, s.monthNames);
                            break;
                        case 'y':
                            year = getNumber('y');
                            break;
                        case 'H':
                            hours = getNumber('H');
                            break;
                        case 'h':
                            hours = getNumber('h');
                            break;
                        case 'i':
                            minutes = getNumber('i');
                            break;
                        case 's':
                            seconds = getNumber('s');
                            break;
                        case 'a':
                            ampm = getName('a', [s.amText, s.pmText], [s.amText, s.pmText]) - 1;
                            break;
                        case 'A':
                            ampm = getName('A', [s.amText, s.pmText], [s.amText, s.pmText]) - 1;
                            break;
                        case "'":
                            if (lookAhead("'")) {
                                checkLiteral();
                            } else {
                                literal = true;
                            }
                            break;
                        default:
                            checkLiteral();
                    }
                }
            }
            if (year < 100) {
                year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= (typeof shortYearCutoff != 'string' ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10)) ? 0 : -100);
            }
            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    var dim = 32 - new Date(year, month - 1, 32).getDate();
                    if (day <= dim) {
                        break;
                    }
                    month++;
                    day -= dim;
                } while (true);
            }
            hours = ampm == -1 ? hours : ampm && hours < 12 ? hours + 12 : !ampm && hours == 12 ? 0 : hours;

            var date = s.getDate(year, month - 1, day, hours, minutes, seconds);

            if (s.getYear(date) != year || s.getMonth(date) + 1 != month || s.getDay(date) != day) {
                return def; // Invalid date
            }

            return date;
        }
    };

    // @deprecated since 2.11.0, backward compatibility code
    // ---
    ms.formatDate = ms.datetime.formatDate;
    ms.parseDate = ms.datetime.parseDate;
    // ---
})(jQuery);

(function ($, window, document, undefined) {

    var $activeElm,
        preventShow,
        extend = $.extend,
        ms = $.mobiscroll,
        instances = ms.instances,
        userdef = ms.userdef,
        util = ms.util,
        pr = util.jsPrefix,
        has3d = util.has3d,
        getCoord = util.getCoord,
        constrain = util.constrain,
        isOldAndroid = /android [1-3]/i.test(navigator.userAgent),
        animEnd = 'webkitAnimationEnd animationend',
        empty = function empty() {},
        prevdef = function prevdef(ev) {
        ev.preventDefault();
    };

    ms.classes.Widget = function (el, settings, inherit) {
        var $ariaDiv,
            $ctx,
            $header,
            $markup,
            $overlay,
            $persp,
            $popup,
            $wnd,
            $wrapper,
            buttons,
            btn,
            doAnim,
            hasButtons,
            isModal,
            lang,
            modalWidth,
            modalHeight,
            posEvents,
            preset,
            preventPos,
            s,
            scrollLock,
            setReadOnly,
            theme,
            wasReadOnly,
            wndWidth,
            wndHeight,
            that = this,
            $elm = $(el),
            elmList = [],
            posDebounce = {};

        function onBtnStart(ev) {
            // Can't call preventDefault here, it kills page scroll
            if (btn) {
                btn.removeClass('dwb-a');
            }
            btn = $(this);
            // Active button
            if (!btn.hasClass('dwb-d') && !btn.hasClass('dwb-nhl')) {
                btn.addClass('dwb-a');
            }
            if (ev.type === 'mousedown') {
                $(document).on('mouseup', onBtnEnd);
            }
        }

        function onBtnEnd(ev) {
            if (btn) {
                btn.removeClass('dwb-a');
                btn = null;
            }
            if (ev.type === 'mouseup') {
                $(document).off('mouseup', onBtnEnd);
            }
        }

        function onShow(prevFocus) {
            if (!prevFocus) {
                $popup.focus();
            }
            that.ariaMessage(s.ariaMessage);
        }

        function onHide(prevAnim) {
            var activeEl,
                value,
                type,
                focus = s.focusOnClose;

            $markup.remove();

            if ($activeElm && !prevAnim) {
                setTimeout(function () {
                    if (focus === undefined) {
                        preventShow = true;
                        activeEl = $activeElm[0];
                        type = activeEl.type;
                        value = activeEl.value;
                        try {
                            activeEl.type = 'button';
                        } catch (ex) {}
                        $activeElm.focus();
                        activeEl.type = type;
                        activeEl.value = value;
                    } else if (focus) {
                        // If a mobiscroll field is focused, allow show
                        if (instances[$(focus).attr('id')]) {
                            ms.tapped = false;
                        }
                        $(focus).focus();
                    }
                }, 200);
            }

            that._isVisible = false;

            event('onHide', []);
        }

        function onPosition(ev) {
            clearTimeout(posDebounce[ev.type]);
            posDebounce[ev.type] = setTimeout(function () {
                var isScroll = ev.type == 'scroll';
                if (isScroll && !scrollLock) {
                    return;
                }
                that.position(!isScroll);
            }, 200);
        }

        function event(name, args) {
            var ret;
            args.push(that);
            $.each([userdef, theme, preset, settings], function (i, v) {
                if (v && v[name]) {
                    // Call preset event
                    ret = v[name].apply(el, args);
                }
            });
            return ret;
        }

        /**
        * Positions the scroller on the screen.
        */
        that.position = function (check) {
            var w,
                l,
                t,
                anchor,
                aw,
                // anchor width
            ah,
                // anchor height
            ap,
                // anchor position
            at,
                // anchor top
            al,
                // anchor left
            arr,
                // arrow
            arrw,
                // arrow width
            arrl,
                // arrow left
            dh,
                scroll,
                sl,
                // scroll left
            st,
                // scroll top
            totalw = 0,
                minw = 0,
                css = {},
                nw = Math.min($wnd[0].innerWidth || $wnd.innerWidth(), $persp.width()),
                //$persp.width(), // To get the width without scrollbar
            nh = $wnd[0].innerHeight || $wnd.innerHeight();

            if (wndWidth === nw && wndHeight === nh && check || preventPos) {
                return;
            }

            if (isModal && that._isLiquid && s.display !== 'bubble') {
                // Set width, if document is larger than viewport, needs to be set before onPosition (for calendar)
                $popup.width(nw);
            }

            if (event('onPosition', [$markup, nw, nh]) === false || !isModal) {
                return;
            }

            sl = $wnd.scrollLeft();
            st = $wnd.scrollTop();
            anchor = s.anchor === undefined ? $elm : $(s.anchor);

            // Set / unset liquid layout based on screen width, but only if not set explicitly by the user
            if (that._isLiquid && s.layout !== 'liquid') {
                if (nw < 400) {
                    $markup.addClass('dw-liq');
                } else {
                    $markup.removeClass('dw-liq');
                }
            }

            if (/modal|bubble/.test(s.display)) {
                $wrapper.width('');
                $('.mbsc-w-p', $markup).each(function () {
                    w = $(this).outerWidth(true);
                    totalw += w;
                    minw = w > minw ? w : minw;
                });
                w = totalw > nw ? minw : totalw;
                $wrapper.width(w).css('white-space', totalw > nw ? '' : 'nowrap');
            }

            modalWidth = $popup.outerWidth();
            modalHeight = $popup.outerHeight(true);
            scrollLock = modalHeight <= nh && modalWidth <= nw;

            that.scrollLock = scrollLock;

            if (s.display == 'modal') {
                l = Math.max(0, sl + (nw - modalWidth) / 2);
                t = st + (nh - modalHeight) / 2;
            } else if (s.display == 'bubble') {
                scroll = true;
                arr = $('.dw-arrw-i', $markup);
                ap = anchor.offset();
                at = Math.abs($ctx.offset().top - ap.top);
                al = Math.abs($ctx.offset().left - ap.left);

                // horizontal positioning
                aw = anchor.outerWidth();
                ah = anchor.outerHeight();
                l = constrain(al - ($popup.outerWidth(true) - aw) / 2, sl + 3, sl + nw - modalWidth - 3);

                // vertical positioning
                t = at - modalHeight; // above the input
                if (t < st || at > st + nh) {
                    // if doesn't fit above or the input is out of the screen
                    $popup.removeClass('dw-bubble-top').addClass('dw-bubble-bottom');
                    t = at + ah; // below the input
                } else {
                    $popup.removeClass('dw-bubble-bottom').addClass('dw-bubble-top');
                }

                // Calculate Arrow position
                arrw = arr.outerWidth();
                arrl = constrain(al + aw / 2 - (l + (modalWidth - arrw) / 2), 0, arrw);

                // Limit Arrow position
                $('.dw-arr', $markup).css({ left: arrl });
            } else {
                l = sl;
                if (s.display == 'top') {
                    t = st;
                } else if (s.display == 'bottom') {
                    t = st + nh - modalHeight;
                }
            }

            t = t < 0 ? 0 : t;

            css.top = t;
            css.left = l;
            $popup.css(css);

            // If top + modal height > doc height, increase doc height
            $persp.height(0);
            dh = Math.max(t + modalHeight, s.context == 'body' ? $(document).height() : $ctx[0].scrollHeight);
            $persp.css({ height: dh });

            // Scroll needed
            if (scroll && (t + modalHeight > st + nh || at > st + nh)) {
                preventPos = true;
                setTimeout(function () {
                    preventPos = false;
                }, 300);
                $wnd.scrollTop(Math.min(t + modalHeight - nh, dh - nh));
            }

            wndWidth = nw;
            wndHeight = nh;
        };

        /**
        * Show mobiscroll on focus and click event of the parameter.
        * @param {jQuery} $elm - Events will be attached to this element.
        * @param {Function} [beforeShow=undefined] - Optional function to execute before showing mobiscroll.
        */
        that.attachShow = function ($elm, beforeShow) {
            elmList.push($elm);
            if (s.display !== 'inline') {
                $elm.on('mousedown.dw', function (ev) {
                    if (setReadOnly) {
                        // Prevent input to get focus on tap (virtual keyboard pops up on some devices)
                        ev.preventDefault();
                    }
                }).on((s.showOnFocus ? 'focus.dw' : '') + (s.showOnTap ? ' click.dw' : ''), function (ev) {
                    if ((ev.type !== 'focus' || ev.type === 'focus' && !preventShow) && !ms.tapped) {
                        if (beforeShow) {
                            beforeShow();
                        }
                        // Hide virtual keyboard
                        if ($(document.activeElement).is('input,textarea')) {
                            $(document.activeElement).blur();
                        }
                        $activeElm = $elm;
                        that.show();
                    }
                    setTimeout(function () {
                        preventShow = false;
                    }, 300); // With jQuery < 1.9 focus is fired twice in IE
                });
            }
        };

        /**
        * Set button handler.
        */
        that.select = function () {
            if (!isModal || that.hide(false, 'set') !== false) {
                that._fillValue();
                event('onSelect', [that.val]);
            }
        };

        /**
        * Cancel and hide the scroller instance.
        */
        that.cancel = function () {
            if (!isModal || that.hide(false, 'cancel') !== false) {
                event('onCancel', [that.val]);
            }
        };

        /**
        * Clear button handler.
        */
        that.clear = function () {
            event('onClear', [$markup]);
            if (isModal && !that.live) {
                that.hide(false, 'clear');
            }
            that.setValue(null, true);
        };

        /**
        * Enables the scroller and the associated input.
        */
        that.enable = function () {
            s.disabled = false;
            if (that._isInput) {
                $elm.prop('disabled', false);
            }
        };

        /**
        * Disables the scroller and the associated input.
        */
        that.disable = function () {
            s.disabled = true;
            if (that._isInput) {
                $elm.prop('disabled', true);
            }
        };

        /**
        * Shows the scroller instance.
        * @param {Boolean} prevAnim - Prevent animation if true
        * @param {Boolean} prevFocus - Prevent focusing if true
        */
        that.show = function (prevAnim, prevFocus) {
            // Create wheels
            var html;

            if (s.disabled || that._isVisible) {
                return;
            }

            if (doAnim !== false) {
                if (s.display == 'top') {
                    doAnim = 'slidedown';
                }
                if (s.display == 'bottom') {
                    doAnim = 'slideup';
                }
            }

            // Parse value from input
            that._readValue();

            event('onBeforeShow', []);

            // Create wheels containers
            html = '<div lang="' + s.lang + '" class="mbsc-' + s.theme + ' dw-' + s.display + ' ' + (s.cssClass || '') + (that._isLiquid ? ' dw-liq' : '') + (isOldAndroid ? ' mbsc-old' : '') + (hasButtons ? '' : ' dw-nobtn') + '">' + '<div class="dw-persp">' + (isModal ? '<div class="dwo"></div>' : '') + // Overlay
            '<div' + (isModal ? ' role="dialog" tabindex="-1"' : '') + ' class="dw' + (s.rtl ? ' dw-rtl' : ' dw-ltr') + '">' + ( // Popup
            s.display === 'bubble' ? '<div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div>' : '') + // Bubble arrow
            '<div class="dwwr">' + // Popup content
            '<div aria-live="assertive" class="dw-aria dw-hidden"></div>' + (s.headerText ? '<div class="dwv">' + s.headerText + '</div>' : '') + // Header
            '<div class="dwcc">'; // Wheel group container

            html += that._generateContent();

            html += '</div>';

            if (hasButtons) {
                html += '<div class="dwbc">';
                $.each(buttons, function (i, b) {
                    b = typeof b === 'string' ? that.buttons[b] : b;
                    html += '<span' + (s.btnWidth ? ' style="width:' + 100 / buttons.length + '%"' : '') + ' class="dwbw ' + b.css + '"><span tabindex="0" role="button" class="dwb dwb' + i + ' dwb-e">' + b.text + '</span></span>';
                });
                html += '</div>';
            }
            html += '</div></div></div></div>';

            $markup = $(html);
            $persp = $('.dw-persp', $markup);
            $overlay = $('.dwo', $markup);
            $wrapper = $('.dwwr', $markup);
            $header = $('.dwv', $markup);
            $popup = $('.dw', $markup);
            $ariaDiv = $('.dw-aria', $markup);

            that._markup = $markup;
            that._header = $header;
            that._isVisible = true;

            posEvents = 'orientationchange resize';

            that._markupReady();

            event('onMarkupReady', [$markup]);

            // Show
            if (isModal) {

                // Enter / ESC
                $(window).on('keydown.dw', function (ev) {
                    if (ev.keyCode == 13) {
                        that.select();
                    } else if (ev.keyCode == 27) {
                        that.cancel();
                    }
                });

                // Prevent scroll if not specified otherwise
                if (s.scrollLock) {
                    $markup.on('touchstart touchmove', function (ev) {
                        if (scrollLock) {
                            ev.preventDefault();
                        }
                    });
                }

                // Disable inputs to prevent bleed through (Android bug)
                if (pr !== 'Moz') {
                    $('input,select,button', $ctx).each(function () {
                        if (!this.disabled) {
                            $(this).addClass('dwtd').prop('disabled', true);
                        }
                    });
                }

                posEvents += ' scroll';

                ms.activeInstance = that;

                $markup.appendTo($ctx);

                if (has3d && doAnim && !prevAnim) {
                    $markup.addClass('dw-in dw-trans').on(animEnd, function () {
                        $markup.removeClass('dw-in dw-trans').find('.dw').removeClass('dw-' + doAnim);
                        onShow(prevFocus);
                    }).find('.dw').addClass('dw-' + doAnim);
                }
            } else if ($elm.is('div')) {
                $elm.html($markup);
            } else {
                $markup.insertAfter($elm);
            }

            event('onMarkupInserted', [$markup]);

            // Set position
            that.position();

            $wnd.on(posEvents, onPosition);

            // Events
            $markup.on('selectstart mousedown', prevdef) // Prevents blue highlight on Android and text selection in IE
            .on('click', '.dwb-e', prevdef).on('keydown', '.dwb-e', function (ev) {
                if (ev.keyCode == 32) {
                    // Space
                    ev.preventDefault();
                    ev.stopPropagation();
                    $(this).click();
                }
            });

            setTimeout(function () {
                // Init buttons
                $.each(buttons, function (i, b) {
                    that.tap($('.dwb' + i, $markup), function (ev) {
                        b = typeof b === 'string' ? that.buttons[b] : b;
                        b.handler.call(this, ev, that);
                    }, true);
                });

                if (s.closeOnOverlay) {
                    that.tap($overlay, function () {
                        that.cancel();
                    });
                }

                if (isModal && !doAnim) {
                    onShow(prevFocus);
                }

                $markup.on('touchstart mousedown', '.dwb-e', onBtnStart).on('touchend', '.dwb-e', onBtnEnd);

                that._attachEvents($markup);
            }, 300);

            event('onShow', [$markup, that._valueText]);
        };

        /**
        * Hides the scroller instance.
        */
        that.hide = function (prevAnim, btn, force) {

            // If onClose handler returns false, prevent hide
            if (!that._isVisible || !force && !that._isValid && btn == 'set' || !force && event('onClose', [that._valueText, btn]) === false) {
                return false;
            }

            // Hide wheels and overlay
            if ($markup) {

                // Re-enable temporary disabled fields
                if (pr !== 'Moz') {
                    $('.dwtd', $ctx).each(function () {
                        $(this).prop('disabled', false).removeClass('dwtd');
                    });
                }

                if (has3d && isModal && doAnim && !prevAnim && !$markup.hasClass('dw-trans')) {
                    // If dw-trans class was not removed, means that there was no animation
                    $markup.addClass('dw-out dw-trans').find('.dw').addClass('dw-' + doAnim).on(animEnd, function () {
                        onHide(prevAnim);
                    });
                } else {
                    onHide(prevAnim);
                }

                // Stop positioning on window resize
                $wnd.off(posEvents, onPosition);
            }

            delete ms.activeInstance;
        };

        that.ariaMessage = function (txt) {
            $ariaDiv.html('');
            setTimeout(function () {
                $ariaDiv.html(txt);
            }, 100);
        };

        /**
        * Return true if the scroller is currently visible.
        */
        that.isVisible = function () {
            return that._isVisible;
        };

        // Protected functions to override

        that.setValue = empty;

        that._generateContent = empty;

        that._attachEvents = empty;

        that._readValue = empty;

        that._fillValue = empty;

        that._markupReady = empty;

        that._processSettings = empty;

        // Generic widget functions

        /**
        * Attach tap event to the given element.
        */
        that.tap = function (el, handler, prevent) {
            var startX, startY, moved;

            if (s.tap) {
                el.on('touchstart.dw', function (ev) {
                    // Can't always call preventDefault here, it kills page scroll
                    if (prevent) {
                        ev.preventDefault();
                    }
                    startX = getCoord(ev, 'X');
                    startY = getCoord(ev, 'Y');
                    moved = false;
                }).on('touchmove.dw', function (ev) {
                    // If movement is more than 20px, don't fire the click event handler
                    if (Math.abs(getCoord(ev, 'X') - startX) > 20 || Math.abs(getCoord(ev, 'Y') - startY) > 20) {
                        moved = true;
                    }
                }).on('touchend.dw', function (ev) {
                    var that = this;

                    if (!moved) {
                        // preventDefault and setTimeout are needed by iOS
                        ev.preventDefault();
                        setTimeout(function () {
                            handler.call(that, ev);
                        }, isOldAndroid ? 400 : 10);
                    }
                    // Prevent click events to happen
                    ms.tapped = true;
                    setTimeout(function () {
                        ms.tapped = false;
                    }, 500);
                });
            }

            el.on('click.dw', function (ev) {
                if (!ms.tapped) {
                    // If handler was not called on touchend, call it on click;
                    handler.call(this, ev);
                }
                ev.preventDefault();
            });
        };

        /**
        * Sets one ore more options.
        */
        that.option = function (opt, value) {
            var obj = {};
            if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) === 'object') {
                obj = opt;
            } else {
                obj[opt] = value;
            }
            that.init(obj);
        };

        /**
        * Destroys the mobiscroll instance.
        */
        that.destroy = function () {
            // Force hide without animation
            that.hide(true, false, true);

            // Remove all events from elements
            $.each(elmList, function (i, v) {
                v.off('.dw');
            });

            // Reset original readonly state
            if (that._isInput && setReadOnly) {
                el.readOnly = wasReadOnly;
            }

            event('onDestroy', []);

            // Delete scroller instance
            delete instances[el.id];
        };

        /**
        * Returns the mobiscroll instance.
        */
        that.getInst = function () {
            return that;
        };

        /**
        * Triggers a mobiscroll event.
        */
        that.trigger = event;

        /**
        * Scroller initialization.
        */
        that.init = function (ss) {
            that.settings = s = {};

            // Update original user settings
            extend(settings, ss);
            extend(s, ms.defaults, that._defaults, userdef, settings);

            // Get theme defaults
            theme = ms.themes[s.theme] || ms.themes.mobiscroll;

            // Get language defaults
            lang = ms.i18n[s.lang];

            event('onThemeLoad', [lang, settings]);

            extend(s, theme, lang, userdef, settings);

            preset = ms.presets[that._class][s.preset];

            // Add default buttons
            s.buttons = s.buttons || (s.display !== 'inline' ? ['set', 'cancel'] : []);

            // Hide header text in inline mode by default
            s.headerText = s.headerText === undefined ? s.display !== 'inline' ? '{value}' : false : s.headerText;

            if (preset) {
                preset = preset.call(el, that);
                extend(s, preset, settings); // Load preset settings
            }

            if (!ms.themes[s.theme]) {
                s.theme = 'mobiscroll';
            }

            that._isLiquid = (s.layout || (/top|bottom/.test(s.display) ? 'liquid' : '')) === 'liquid';

            that._processSettings();

            // Unbind all events (if re-init)
            $elm.off('.dw');

            doAnim = isOldAndroid ? false : s.animate;
            buttons = s.buttons;
            isModal = s.display !== 'inline';
            setReadOnly = s.showOnFocus || s.showOnTap;
            $wnd = $(s.context == 'body' ? window : s.context);
            $ctx = $(s.context);

            // @deprecated since 2.8.0, backward compatibility code
            // ---
            if (!s.setText) {
                buttons.splice($.inArray('set', buttons), 1);
            }
            if (!s.cancelText) {
                buttons.splice($.inArray('cancel', buttons), 1);
            }
            if (s.button3) {
                buttons.splice($.inArray('set', buttons) + 1, 0, { text: s.button3Text, handler: s.button3 });
            }
            // ---

            that.context = $wnd;
            that.live = $.inArray('set', buttons) == -1;
            that.buttons.set = { text: s.setText, css: 'dwb-s', handler: that.select };
            that.buttons.cancel = { text: that.live ? s.closeText : s.cancelText, css: 'dwb-c', handler: that.cancel };
            that.buttons.clear = { text: s.clearText, css: 'dwb-cl', handler: that.clear };

            that._isInput = $elm.is('input');

            hasButtons = buttons.length > 0;

            if (that._isVisible) {
                that.hide(true, false, true);
            }

            if (isModal) {
                that._readValue();
                if (that._isInput && setReadOnly) {
                    // Set element readonly, save original state
                    if (wasReadOnly === undefined) {
                        wasReadOnly = el.readOnly;
                    }
                    el.readOnly = true;
                }
                that.attachShow($elm);
            } else {
                that.show();
            }

            if (that._isInput) {
                $elm.on('change.dw', function () {
                    if (!that._preventChange) {
                        that.setValue($elm.val(), false);
                    }
                    that._preventChange = false;
                });
            }
        };

        that.val = null;
        that.buttons = {};

        that._isValid = true;

        // Constructor
        if (!inherit) {
            instances[el.id] = that;
            that.init(settings);
        }
    };

    ms.classes.Widget.prototype._defaults = {
        // Localization
        lang: 'zh',
        setText: 'Set',
        selectedText: 'Selected',
        closeText: 'Close',
        cancelText: 'Cancel',
        clearText: 'Clear',
        // Options
        disabled: false,
        closeOnOverlay: true,
        showOnFocus: true,
        showOnTap: true,
        display: 'modal',
        scrollLock: true,
        tap: true,
        btnWidth: true,
        focusOnClose: false // Temporary for iOS8
    };

    ms.themes.mobiscroll = {
        rows: 5,
        showLabel: false,
        headerText: false,
        btnWidth: false,
        selectedLineHeight: true,
        selectedLineBorder: 1,
        dateOrder: 'MMddyy',
        weekDays: 'min',
        checkIcon: 'ion-ios7-checkmark-empty',
        btnPlusClass: 'mbsc-ic mbsc-ic-arrow-down5',
        btnMinusClass: 'mbsc-ic mbsc-ic-arrow-up5',
        btnCalPrevClass: 'mbsc-ic mbsc-ic-arrow-left5',
        btnCalNextClass: 'mbsc-ic mbsc-ic-arrow-right5'
    };

    // Prevent re-show on window focus
    $(window).on('focus', function () {
        if ($activeElm) {
            preventShow = true;
        }
    });

    // Prevent standard behaviour on body click
    $(document).on('mouseover mouseup mousedown click', function (ev) {
        if (ms.tapped) {
            ev.stopPropagation();
            ev.preventDefault();
            return false;
        }
    });
})(jQuery, window, document);

(function ($, window, document, undefined) {

    var move,
        ms = $.mobiscroll,
        classes = ms.classes,
        instances = ms.instances,
        util = ms.util,
        pr = util.jsPrefix,
        has3d = util.has3d,
        hasFlex = util.hasFlex,
        getCoord = util.getCoord,
        constrain = util.constrain,
        testTouch = util.testTouch;

    /**
     * @deprecated since 2.6.0, backward compatibility code
     */
    function convert(w) {
        var ret = {
            values: [],
            keys: []
        };
        $.each(w, function (k, v) {
            ret.keys.push(k);
            ret.values.push(v);
        });
        return ret;
    }

    classes.Scroller = function (el, settings, inherit) {
        var $markup,
            btn,
            isScrollable,
            itemHeight,
            s,
            trigger,
            valueText,
            click,
            moved,
            start,
            startTime,
            stop,
            p,
            min,
            max,
            target,
            index,
            lines,
            timer,
            that = this,
            $elm = $(el),
            iv = {},
            pos = {},
            pixels = {},
            wheels = [];

        // Event handlers

        function onStart(ev) {
            /* TRIALCOND */
            // Scroll start
            if (testTouch(ev) && !move && !click && !btn && !isReadOnly(this)) {
                // Prevent touch highlight
                ev.preventDefault();
                // Better performance if there are tap events on document
                ev.stopPropagation();

                move = true;
                isScrollable = s.mode != 'clickpick';
                target = $('.dw-ul', this);
                setGlobals(target);
                moved = iv[index] !== undefined; // Don't allow tap, if still moving
                p = moved ? getCurrentPosition(target) : pos[index];
                start = getCoord(ev, 'Y');
                startTime = new Date();
                stop = start;
                scroll(target, index, p, 0.001);

                if (isScrollable) {
                    target.closest('.dwwl').addClass('dwa');
                }

                if (ev.type === 'mousedown') {
                    $(document).on('mousemove', onMove).on('mouseup', onEnd);
                }
            }
        }

        function onMove(ev) {
            if (move) {
                if (isScrollable) {
                    // Prevent scroll
                    ev.preventDefault();
                    ev.stopPropagation();
                    stop = getCoord(ev, 'Y');
                    if (Math.abs(stop - start) > 3 || moved) {
                        scroll(target, index, constrain(p + (start - stop) / itemHeight, min - 1, max + 1));
                        moved = true;
                    }
                }
            }
        }

        function onEnd(ev) {
            if (move) {
                var time = new Date() - startTime,
                    val = constrain(p + (start - stop) / itemHeight, min - 1, max + 1),
                    speed,
                    dist,
                    tindex,
                    ttop = target.offset().top;

                // Better performance if there are tap events on document
                ev.stopPropagation();

                if (has3d && time < 300) {
                    speed = (stop - start) / time;
                    dist = speed * speed / s.speedUnit;
                    if (stop - start < 0) {
                        dist = -dist;
                    }
                } else {
                    dist = stop - start;
                }

                tindex = Math.round(p - dist / itemHeight);

                if (!moved) {
                    // this is a "tap"
                    var idx = Math.floor((stop - ttop) / itemHeight),
                        li = $($('.dw-li', target)[idx]),
                        valid = li.hasClass('dw-v'),
                        hl = isScrollable;

                    if (trigger('onValueTap', [li]) !== false && valid) {
                        tindex = idx;
                    } else {
                        hl = true;
                    }

                    if (hl && valid) {
                        li.addClass('dw-hl'); // Highlight
                        setTimeout(function () {
                            li.removeClass('dw-hl');
                        }, 100);
                    }
                }

                if (isScrollable) {
                    calc(target, tindex, 0, true, Math.round(val));
                }

                if (ev.type === 'mouseup') {
                    $(document).off('mousemove', onMove).off('mouseup', onEnd);
                }

                move = false;
            }
        }

        function onBtnStart(ev) {
            btn = $(this);
            // +/- buttons
            if (btn.hasClass('dwwb')) {
                if (testTouch(ev)) {
                    step(ev, btn.closest('.dwwl'), btn.hasClass('dwwbp') ? plus : minus);
                }
            }
            if (ev.type === 'mousedown') {
                $(document).on('mouseup', onBtnEnd);
            }
        }

        function onBtnEnd(ev) {
            btn = null;
            if (click) {
                clearInterval(timer);
                click = false;
            }
            if (ev.type === 'mouseup') {
                $(document).off('mouseup', onBtnEnd);
            }
        }

        function onKeyDown(ev) {
            if (ev.keyCode == 38) {
                // up
                step(ev, $(this), minus);
            } else if (ev.keyCode == 40) {
                // down
                step(ev, $(this), plus);
            }
        }

        function onKeyUp() {
            if (click) {
                clearInterval(timer);
                click = false;
            }
        }

        function onScroll(ev) {
            if (!isReadOnly(this)) {
                ev.preventDefault();
                ev = ev.originalEvent || ev;
                var delta = ev.wheelDelta ? ev.wheelDelta / 120 : ev.detail ? -ev.detail / 3 : 0,
                    t = $('.dw-ul', this);

                setGlobals(t);
                calc(t, Math.round(pos[index] - delta), delta < 0 ? 1 : 2);
            }
        }

        // Private functions

        function step(ev, w, func) {
            ev.stopPropagation();
            ev.preventDefault();
            if (!click && !isReadOnly(w) && !w.hasClass('dwa')) {
                click = true;
                // + Button
                var t = w.find('.dw-ul');

                setGlobals(t);
                clearInterval(timer);
                timer = setInterval(function () {
                    func(t);
                }, s.delay);
                func(t);
            }
        }

        function isReadOnly(wh) {
            if ($.isArray(s.readonly)) {
                var i = $('.dwwl', $markup).index(wh);
                return s.readonly[i];
            }
            return s.readonly;
        }

        function generateWheelItems(i) {
            var html = '<div class="dw-bf">',
                ww = wheels[i],

            // @deprecated since 2.6.0, backward compatibility code
            // ---
            w = ww.values ? ww : convert(ww),

            // ---
            l = 1,
                labels = w.labels || [],
                values = w.values,
                keys = w.keys || values;

            $.each(values, function (j, v) {
                if (l % 20 === 0) {
                    html += '</div><div class="dw-bf">';
                }
                html += '<div role="option" aria-selected="false" class="dw-li dw-v" data-val="' + keys[j] + '"' + (labels[j] ? ' aria-label="' + labels[j] + '"' : '') + ' style="height:' + itemHeight + 'px;line-height:' + itemHeight + 'px;">' + '<div class="dw-i"' + (lines > 1 ? ' style="line-height:' + Math.round(itemHeight / lines) + 'px;font-size:' + Math.round(itemHeight / lines * 0.8) + 'px;"' : '') + '>' + v /* TRIAL */ + '</div></div>';
                l++;
            });

            html += '</div>';
            return html;
        }

        function setGlobals(t) {
            var multiple = t.closest('.dwwl').hasClass('dwwms');
            min = $('.dw-li', t).index($(multiple ? '.dw-li' : '.dw-v', t).eq(0));
            max = Math.max(min, $('.dw-li', t).index($(multiple ? '.dw-li' : '.dw-v', t).eq(-1)) - (multiple ? s.rows - 1 : 0));
            index = $('.dw-ul', $markup).index(t);
        }

        function formatHeader(v) {
            var t = s.headerText;
            return t ? typeof t === 'function' ? t.call(el, v) : t.replace(/\{value\}/i, v) : '';
        }

        function getCurrentPosition(t) {
            var style = window.getComputedStyle ? getComputedStyle(t[0]) : t[0].style,
                matrix,
                px;

            if (has3d) {
                $.each(['t', 'webkitT', 'MozT', 'OT', 'msT'], function (i, v) {
                    if (style[v + 'ransform'] !== undefined) {
                        matrix = style[v + 'ransform'];
                        return false;
                    }
                });
                matrix = matrix.split(')')[0].split(', ');
                px = matrix[13] || matrix[5];
            } else {
                px = style.top.replace('px', '');
            }

            return Math.round(-px / itemHeight);
        }

        function ready(t, i) {
            clearTimeout(iv[i]);
            delete iv[i];
            t.closest('.dwwl').removeClass('dwa');
        }

        function scroll(t, index, val, time, active) {
            var px = -val * itemHeight,
                style = t[0].style;

            if (px == pixels[index] && iv[index]) {
                return;
            }

            //if (time && px != pixels[index]) {
            // Trigger animation start event
            //trigger('onAnimStart', [$markup, index, time]);
            //}

            pixels[index] = px;

            style[pr + 'Transition'] = 'all ' + (time ? time.toFixed(3) : 0) + 's ease-out';

            if (has3d) {
                style[pr + 'Transform'] = 'translate3d(0,' + px + 'px,0)';
            } else {
                style.top = px + 'px';
            }

            if (iv[index]) {
                ready(t, index);
            }

            if (time && active) {
                t.closest('.dwwl').addClass('dwa');
                iv[index] = setTimeout(function () {
                    ready(t, index);
                }, time * 1000);
            }

            pos[index] = val;
        }

        function getValid(val, t, dir, multiple) {
            var cell = $('.dw-li[data-val="' + val + '"]', t),
                cells = $('.dw-li', t),
                v = cells.index(cell),
                l = cells.length;

            if (multiple) {
                setGlobals(t);
            } else if (!cell.hasClass('dw-v')) {
                // Scroll to a valid cell
                var cell1 = cell,
                    cell2 = cell,
                    dist1 = 0,
                    dist2 = 0;

                while (v - dist1 >= 0 && !cell1.hasClass('dw-v')) {
                    dist1++;
                    cell1 = cells.eq(v - dist1);
                }

                while (v + dist2 < l && !cell2.hasClass('dw-v')) {
                    dist2++;
                    cell2 = cells.eq(v + dist2);
                }

                // If we have direction (+/- or mouse wheel), the distance does not count
                if ((dist2 < dist1 && dist2 && dir !== 2 || !dist1 || v - dist1 < 0 || dir == 1) && cell2.hasClass('dw-v')) {
                    cell = cell2;
                    v = v + dist2;
                } else {
                    cell = cell1;
                    v = v - dist1;
                }
            }

            return {
                cell: cell,
                v: multiple ? constrain(v, min, max) : v,
                val: cell.hasClass('dw-v') ? cell.attr('data-val') : null
            };
        }

        function scrollToPos(time, index, manual, dir, active) {
            // Call validation event
            if (trigger('validate', [$markup, index, time, dir]) !== false) {
                // Set scrollers to position
                $('.dw-ul', $markup).each(function (i) {
                    var t = $(this),
                        multiple = t.closest('.dwwl').hasClass('dwwms'),
                        sc = i == index || index === undefined,
                        res = getValid(that.temp[i], t, dir, multiple),
                        cell = res.cell;

                    if (!cell.hasClass('dw-sel') || sc) {
                        // Set valid value
                        that.temp[i] = res.val;

                        if (!multiple) {
                            $('.dw-sel', t).removeAttr('aria-selected');
                            cell.attr('aria-selected', 'true');
                        }

                        // Add selected class to cell
                        $('.dw-sel', t).removeClass('dw-sel');
                        cell.addClass('dw-sel');

                        // Scroll to position
                        scroll(t, i, res.v, sc ? time : 0.1, sc ? active : false);
                    }
                });

                // Reformat value if validation changed something
                that._valueText = valueText = s.formatResult(that.temp);

                if (that.live) {
                    that._hasValue = manual || that._hasValue;
                    setValue(manual, manual, 0, true);
                }

                that._header.html(formatHeader(valueText));

                if (manual) {
                    trigger('onChange', [valueText]);
                }

                trigger('onValidated', []);
            }
        }

        function calc(t, val, dir, anim, orig) {
            val = constrain(val, min, max);

            var cell = $('.dw-li', t).eq(val),
                o = orig === undefined ? val : orig,
                active = orig !== undefined,
                idx = index,
                dist = Math.abs(val - o),
                time = anim ? val == o ? 0.1 : dist * s.timeUnit * Math.max(0.5, (100 - dist) / 100) : 0;

            // Set selected scroller value
            that.temp[idx] = cell.attr('data-val');

            scroll(t, idx, val, time, active);

            setTimeout(function () {
                // Validate
                scrollToPos(time, idx, true, dir, active);
            }, 10);
        }

        function plus(t) {
            var val = pos[index] + 1;
            calc(t, val > max ? min : val, 1, true);
        }

        function minus(t) {
            var val = pos[index] - 1;
            calc(t, val < min ? max : val, 2, true);
        }

        function setValue(fill, change, time, noscroll, temp) {
            if (that._isVisible && !noscroll) {
                scrollToPos(time);
            }

            that._valueText = valueText = s.formatResult(that.temp);

            if (!temp) {
                that.values = that.temp.slice(0);
                that.val = that._hasValue ? valueText : null;
            }

            if (fill) {

                trigger('onValueFill', [that._hasValue ? valueText : '', change]);

                if (that._isInput) {
                    $elm.val(that._hasValue ? valueText : '');
                    if (change) {
                        that._preventChange = true;
                        $elm.change();
                    }
                }
            }
        }

        // Call the parent constructor
        classes.Widget.call(this, el, settings, true);

        // Public functions

        /**
        * Gets the selected wheel values, formats it, and set the value of the scroller instance.
        * If input parameter is true, populates the associated input element.
        * @param {Array} values Wheel values.
        * @param {Boolean} [fill=false] Also set the value of the associated input element.
        * @param {Number} [time=0] Animation time
        * @param {Boolean} [temp=false] If true, then only set the temporary value.(only scroll there but not set the value)
        */
        that.setValue = function (values, fill, time, temp, change) {
            that._hasValue = values !== null && values !== undefined;
            that.temp = $.isArray(values) ? values.slice(0) : s.parseValue.call(el, values, that);
            setValue(fill, change === undefined ? fill : change, time, false, temp);
        };

        /**
        * Return the selected wheel values.
        */
        that.getValue = function () {
            return that._hasValue ? that.values : null;
        };

        /**
        * Return selected values, if in multiselect mode.
        */
        that.getValues = function () {
            var ret = [],
                i;

            for (i in that._selectedValues) {
                ret.push(that._selectedValues[i]);
            }
            return ret;
        };

        /**
        * Changes the values of a wheel, and scrolls to the correct position
        * @param {Array} idx Indexes of the wheels to change.
        * @param {Number} [time=0] Animation time when scrolling to the selected value on the new wheel.
        * @param {Boolean} [manual=false] Indicates that the change was triggered by the user or from code.
        */
        that.changeWheel = function (idx, time, manual) {
            if ($markup) {
                var i = 0,
                    nr = idx.length;

                $.each(s.wheels, function (j, wg) {
                    $.each(wg, function (k, w) {
                        if ($.inArray(i, idx) > -1) {
                            wheels[i] = w;
                            $('.dw-ul', $markup).eq(i).html(generateWheelItems(i));
                            nr--;
                            if (!nr) {
                                that.position();
                                scrollToPos(time, undefined, manual);
                                return false;
                            }
                        }
                        i++;
                    });
                    if (!nr) {
                        return false;
                    }
                });
            }
        };

        /**
        * Returns the closest valid cell.
        */
        that.getValidCell = getValid;

        // Protected overrides

        that._generateContent = function () {
            var lbl,
                html = '',
                l = 0;

            $.each(s.wheels, function (i, wg) {
                // Wheel groups
                html += '<div class="mbsc-w-p dwc' + (s.mode != 'scroller' ? ' dwpm' : ' dwsc') + (s.showLabel ? '' : ' dwhl') + '">' + '<div class="dwwc"' + (s.maxWidth ? '' : ' style="max-width:600px;"') + '>' + (hasFlex ? '' : '<table class="dw-tbl" cellpadding="0" cellspacing="0"><tr>');

                $.each(wg, function (j, w) {
                    // Wheels
                    wheels[l] = w;
                    lbl = w.label !== undefined ? w.label : j;
                    html += '<' + (hasFlex ? 'div' : 'td') + ' class="dwfl"' + ' style="' + (s.fixedWidth ? 'width:' + (s.fixedWidth[l] || s.fixedWidth) + 'px;' : (s.minWidth ? 'min-width:' + (s.minWidth[l] || s.minWidth) + 'px;' : 'min-width:' + s.width + 'px;') + (s.maxWidth ? 'max-width:' + (s.maxWidth[l] || s.maxWidth) + 'px;' : '')) + '">' + '<div class="dwwl dwwl' + l + (w.multiple ? ' dwwms' : '') + '">' + (s.mode != 'scroller' ? '<div class="dwb-e dwwb dwwbp ' + (s.btnPlusClass || '') + '" style="height:' + itemHeight + 'px;line-height:' + itemHeight + 'px;"><span>+</span></div>' + // + button
                    '<div class="dwb-e dwwb dwwbm ' + (s.btnMinusClass || '') + '" style="height:' + itemHeight + 'px;line-height:' + itemHeight + 'px;"><span>&ndash;</span></div>' : '') + // - button
                    '<div class="dwl">' + lbl + '</div>' + // Wheel label
                    '<div tabindex="0" aria-live="off" aria-label="' + lbl + '" role="listbox" class="dwww">' + '<div class="dww" style="height:' + s.rows * itemHeight + 'px;">' + '<div class="dw-ul" style="margin-top:' + (w.multiple ? 0 : s.rows / 2 * itemHeight - itemHeight / 2) + 'px;">';

                    // Create wheel values
                    html += generateWheelItems(l) + '</div></div><div class="dwwo"></div></div><div class="dwwol"' + (s.selectedLineHeight ? ' style="height:' + itemHeight + 'px;margin-top:-' + (itemHeight / 2 + (s.selectedLineBorder || 0)) + 'px;"' : '') + '></div></div>' + (hasFlex ? '</div>' : '</td>');

                    l++;
                });

                html += (hasFlex ? '' : '</tr></table>') + '</div></div>';
            });

            return html;
        };

        that._attachEvents = function ($markup) {
            $markup.on('DOMMouseScroll mousewheel', '.dwwl', onScroll).on('keydown', '.dwwl', onKeyDown).on('keyup', '.dwwl', onKeyUp).on('touchstart mousedown', '.dwwl', onStart).on('touchmove', '.dwwl', onMove).on('touchend', '.dwwl', onEnd).on('touchstart mousedown', '.dwb-e', onBtnStart).on('touchend', '.dwb-e', onBtnEnd);
        };

        that._markupReady = function () {
            $markup = that._markup;
            scrollToPos();
        };

        that._fillValue = function () {
            that._hasValue = true;
            setValue(true, true, 0, true);
        };

        that._readValue = function () {
            var v = $elm.val() || '';
            that._hasValue = v !== '';
            that.temp = that.values ? that.values.slice(0) : s.parseValue(v, that);
            setValue();
        };

        that._processSettings = function () {
            s = that.settings;
            trigger = that.trigger;
            itemHeight = s.height;
            lines = s.multiline;

            that._isLiquid = (s.layout || (/top|bottom/.test(s.display) && s.wheels.length == 1 ? 'liquid' : '')) === 'liquid';

            that.values = null;
            that.temp = null;

            if (lines > 1) {
                s.cssClass = (s.cssClass || '') + ' dw-ml';
            }
        };

        // Properties

        that._selectedValues = {};

        // Constructor
        if (!inherit) {
            instances[el.id] = that;
            that.init(settings);
        }
    };

    // Extend defaults
    classes.Scroller.prototype._class = 'scroller';
    classes.Scroller.prototype._defaults = $.extend({}, classes.Widget.prototype._defaults, {
        // Options
        minWidth: 80,
        height: 40,
        rows: 3,
        multiline: 1,
        delay: 300,
        readonly: false,
        showLabel: true,
        wheels: [],
        mode: 'scroller',
        preset: '',
        speedUnit: 0.0012,
        timeUnit: 0.08,
        formatResult: function formatResult(d) {
            return d.join(' ');
        },
        parseValue: function parseValue(value, inst) {
            var val = value.split(' '),
                ret = [],
                i = 0,
                keys;

            $.each(inst.settings.wheels, function (j, wg) {
                $.each(wg, function (k, w) {
                    // @deprecated since 2.6.0, backward compatibility code
                    // ---
                    w = w.values ? w : convert(w);
                    // ---
                    keys = w.keys || w.values;
                    if ($.inArray(val[i], keys) !== -1) {
                        ret.push(val[i]);
                    } else {
                        ret.push(keys[0]);
                    }
                    i++;
                });
            });
            return ret;
        }
    });
})(jQuery, window, document);

(function ($, undefined) {

    var ms = $.mobiscroll,
        datetime = ms.datetime,
        date = new Date(),
        defaults = {
        startYear: date.getFullYear() - 100,
        endYear: date.getFullYear() + 1,
        showNow: false,
        stepHour: 1,
        stepMinute: 1,
        stepSecond: 1,
        separator: ' ',
        // Localization
        dateFormat: 'mm/dd/yy',
        dateOrder: 'mmddy',
        timeWheels: 'hhiiA',
        timeFormat: 'hh:ii A',
        dayText: 'Day',
        yearText: 'Year',
        hourText: 'Hours',
        minuteText: 'Minutes',
        ampmText: '&nbsp;',
        secText: 'Seconds',
        nowText: 'Now'
    },

    /**
     * @class Mobiscroll.datetime
     * @extends Mobiscroll
     * Mobiscroll Datetime component
     */
    preset = function preset(inst) {
        var that = $(this),
            html5def = {},
            format;
        // Force format for html5 date inputs (experimental)
        if (that.is('input')) {
            switch (that.attr('type')) {
                case 'date':
                    format = 'yy-mm-dd';
                    break;
                case 'datetime':
                    format = 'yy-mm-ddTHH:ii:ssZ';
                    break;
                case 'datetime-local':
                    format = 'yy-mm-ddTHH:ii:ss';
                    break;
                case 'month':
                    format = 'yy-mm';
                    html5def.dateOrder = 'mmyy';
                    break;
                case 'time':
                    format = 'HH:ii:ss';
                    break;
            }
            // Check for min/max attributes
            var min = that.attr('min'),
                max = that.attr('max');
            if (min) {
                html5def.minDate = datetime.parseDate(format, min);
            }
            if (max) {
                html5def.maxDate = datetime.parseDate(format, max);
            }
        }

        // Set year-month-day order
        var i,
            k,
            keys,
            values,
            wg,
            start,
            end,
            hasTime,
            mins,
            maxs,
            orig = $.extend({}, inst.settings),
            s = $.extend(inst.settings, ms.datetime.defaults, defaults, html5def, orig),
            offset = 0,
            validValues = [],
            wheels = [],
            ord = [],
            o = {},
            f = { y: getYear, m: getMonth, d: getDay, h: getHour, i: getMinute, s: getSecond, a: getAmPm },
            invalid = s.invalid,
            valid = s.valid,
            p = s.preset,
            dord = s.dateOrder,
            tord = s.timeWheels,
            regen = dord.match(/D/),
            ampm = tord.match(/a/i),
            hampm = tord.match(/h/),
            hformat = p == 'datetime' ? s.dateFormat + s.separator + s.timeFormat : p == 'time' ? s.timeFormat : s.dateFormat,
            defd = new Date(),
            stepH = s.stepHour,
            stepM = s.stepMinute,
            stepS = s.stepSecond,
            mind = s.minDate || new Date(s.startYear, 0, 1),
            maxd = s.maxDate || new Date(s.endYear, 11, 31, 23, 59, 59),
            minH = mind.getHours() % stepH,
            minM = mind.getMinutes() % stepM,
            minS = mind.getSeconds() % stepS,
            maxH = getMax(stepH, minH, hampm ? 11 : 23),
            maxM = getMax(stepM, minM, 59),
            maxS = getMax(stepM, minM, 59);

        format = format || hformat;

        if (p.match(/date/i)) {

            // Determine the order of year, month, day wheels
            $.each(['y', 'm', 'd'], function (j, v) {
                i = dord.search(new RegExp(v, 'i'));
                if (i > -1) {
                    ord.push({ o: i, v: v });
                }
            });
            ord.sort(function (a, b) {
                return a.o > b.o ? 1 : -1;
            });
            $.each(ord, function (i, v) {
                o[v.v] = i;
            });

            wg = [];
            for (k = 0; k < 3; k++) {
                if (k == o.y) {
                    offset++;
                    values = [];
                    keys = [];
                    start = s.getYear(mind);
                    end = s.getYear(maxd);
                    for (i = start; i <= end; i++) {
                        keys.push(i);
                        values.push((dord.match(/yy/i) ? i : (i + '').substr(2, 2)) + (s.yearSuffix || ''));
                    }
                    addWheel(wg, keys, values, s.yearText);
                } else if (k == o.m) {
                    offset++;
                    values = [];
                    keys = [];
                    for (i = 0; i < 12; i++) {
                        var str = dord.replace(/[dy]/gi, '').replace(/mm/, (i < 9 ? '0' + (i + 1) : i + 1) + (s.monthSuffix || '')).replace(/m/, i + 1 + (s.monthSuffix || ''));
                        keys.push(i);
                        values.push(str.match(/MM/) ? str.replace(/MM/, '<span class="dw-mon">' + s.monthNames[i] + '</span>') : str.replace(/M/, '<span class="dw-mon">' + s.monthNamesShort[i] + '</span>'));
                    }
                    addWheel(wg, keys, values, s.monthText);
                } else if (k == o.d) {
                    offset++;
                    values = [];
                    keys = [];
                    for (i = 1; i < 32; i++) {
                        keys.push(i);
                        values.push((dord.match(/dd/i) && i < 10 ? '0' + i : i) + (s.daySuffix || ''));
                    }
                    addWheel(wg, keys, values, s.dayText);
                }
            }
            wheels.push(wg);
        }

        if (p.match(/time/i)) {
            hasTime = true;

            // Determine the order of hours, minutes, seconds wheels
            ord = [];
            $.each(['h', 'i', 's', 'a'], function (i, v) {
                i = tord.search(new RegExp(v, 'i'));
                if (i > -1) {
                    ord.push({ o: i, v: v });
                }
            });
            ord.sort(function (a, b) {
                return a.o > b.o ? 1 : -1;
            });
            $.each(ord, function (i, v) {
                o[v.v] = offset + i;
            });

            wg = [];
            for (k = offset; k < offset + 4; k++) {
                if (k == o.h) {
                    offset++;
                    values = [];
                    keys = [];
                    for (i = minH; i < (hampm ? 12 : 24); i += stepH) {
                        keys.push(i);
                        values.push(hampm && i === 0 ? 12 : tord.match(/hh/i) && i < 10 ? '0' + i : i);
                    }
                    addWheel(wg, keys, values, s.hourText);
                } else if (k == o.i) {
                    offset++;
                    values = [];
                    keys = [];
                    for (i = minM; i < 60; i += stepM) {
                        keys.push(i);
                        values.push(tord.match(/ii/) && i < 10 ? '0' + i : i);
                    }
                    addWheel(wg, keys, values, s.minuteText);
                } else if (k == o.s) {
                    offset++;
                    values = [];
                    keys = [];
                    for (i = minS; i < 60; i += stepS) {
                        keys.push(i);
                        values.push(tord.match(/ss/) && i < 10 ? '0' + i : i);
                    }
                    addWheel(wg, keys, values, s.secText);
                } else if (k == o.a) {
                    offset++;
                    var upper = tord.match(/A/);
                    addWheel(wg, [0, 1], upper ? [s.amText.toUpperCase(), s.pmText.toUpperCase()] : [s.amText, s.pmText], s.ampmText);
                }
            }

            wheels.push(wg);
        }

        function get(d, i, def) {
            if (o[i] !== undefined) {
                return +d[o[i]];
            }
            if (def !== undefined) {
                return def;
            }
            return f[i](defd);
        }

        function addWheel(wg, k, v, lbl) {
            wg.push({
                values: v,
                keys: k,
                label: lbl
            });
        }

        function step(v, st, min, max) {
            return Math.min(max, Math.floor(v / st) * st + min);
        }

        function getYear(d) {
            return s.getYear(d);
        }

        function getMonth(d) {
            return s.getMonth(d);
        }

        function getDay(d) {
            return s.getDay(d);
        }

        function getHour(d) {
            var hour = d.getHours();
            hour = hampm && hour >= 12 ? hour - 12 : hour;
            return step(hour, stepH, minH, maxH);
        }

        function getMinute(d) {
            return step(d.getMinutes(), stepM, minM, maxM);
        }

        function getSecond(d) {
            return step(d.getSeconds(), stepS, minS, maxS);
        }

        function getAmPm(d) {
            return ampm && d.getHours() > 11 ? 1 : 0;
        }

        function getDate(d) {
            if (d === null) {
                return d;
            }
            var hour = get(d, 'h', 0);
            return s.getDate(get(d, 'y'), get(d, 'm'), get(d, 'd'), get(d, 'a', 0) ? hour + 12 : hour, get(d, 'i', 0), get(d, 's', 0));
        }

        function getMax(step, min, max) {
            return Math.floor((max - min) / step) * step + min;
        }

        function getClosestValidDate(d, dir) {
            var next,
                prev,
                nextValid = false,
                prevValid = false,
                up = 0,
                down = 0;

            if (isValid(d)) {
                return d;
            }

            if (d < mind) {
                d = mind;
            }

            if (d > maxd) {
                d = maxd;
            }

            next = d;
            prev = d;

            if (dir !== 2) {
                nextValid = isValid(next);

                while (!nextValid && next < maxd) {
                    next = new Date(next.getTime() + 1000 * 60 * 60 * 24);
                    nextValid = isValid(next);
                    up++;
                }
            }

            if (dir !== 1) {
                prevValid = isValid(prev);

                while (!prevValid && prev > mind) {
                    prev = new Date(prev.getTime() - 1000 * 60 * 60 * 24);
                    prevValid = isValid(prev);
                    down++;
                }
            }

            if (dir === 1 && nextValid) {
                return next;
            }

            if (dir === 2 && prevValid) {
                return prev;
            }

            return down < up && prevValid ? prev : next;
        }

        function isValid(d) {
            if (d < mind) {
                return false;
            }

            if (d > maxd) {
                return false;
            }

            if (isInObj(d, valid)) {
                return true;
            }

            if (isInObj(d, invalid)) {
                return false;
            }

            return true;
        }

        function isInObj(d, obj) {
            var curr, j, v;

            if (obj) {
                for (j = 0; j < obj.length; j++) {
                    curr = obj[j];
                    v = curr + '';
                    if (!curr.start) {
                        if (curr.getTime) {
                            // Exact date
                            if (d.getFullYear() == curr.getFullYear() && d.getMonth() == curr.getMonth() && d.getDate() == curr.getDate()) {
                                return true;
                            }
                        } else if (!v.match(/w/i)) {
                            // Day of month
                            v = v.split('/');
                            if (v[1]) {
                                if (v[0] - 1 == d.getMonth() && v[1] == d.getDate()) {
                                    return true;
                                }
                            } else if (v[0] == d.getDate()) {
                                return true;
                            }
                        } else {
                            // Day of week
                            v = +v.replace('w', '');
                            if (v == d.getDay()) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        }

        function validateDates(obj, y, m, first, maxdays, idx, val) {
            var j, d, v;

            if (obj) {
                for (j = 0; j < obj.length; j++) {
                    d = obj[j];
                    v = d + '';
                    if (!d.start) {
                        if (d.getTime) {
                            // Exact date
                            if (s.getYear(d) == y && s.getMonth(d) == m) {
                                idx[s.getDay(d) - 1] = val;
                            }
                        } else if (!v.match(/w/i)) {
                            // Day of month
                            v = v.split('/');
                            if (v[1]) {
                                if (v[0] - 1 == m) {
                                    idx[v[1] - 1] = val;
                                }
                            } else {
                                idx[v[0] - 1] = val;
                            }
                        } else {
                            // Day of week
                            v = +v.replace('w', '');
                            for (k = v - first; k < maxdays; k += 7) {
                                if (k >= 0) {
                                    idx[k] = val;
                                }
                            }
                        }
                    }
                }
            }
        }

        function validateTimes(vobj, i, v, temp, y, m, d, target, valid) {
            var dd,
                ss,
                str,
                parts1,
                parts2,
                prop1,
                prop2,
                v1,
                v2,
                j,
                i1,
                i2,
                add,
                remove,
                all,
                hours1,
                hours2,
                hours3,
                spec = {},
                steps = { h: stepH, i: stepM, s: stepS, a: 1 },
                day = s.getDate(y, m, d),
                w = ['a', 'h', 'i', 's'];

            if (vobj) {
                $.each(vobj, function (i, obj) {
                    if (obj.start) {
                        obj.apply = false;
                        dd = obj.d;
                        ss = dd + '';
                        str = ss.split('/');
                        if (dd && (dd.getTime && y == s.getYear(dd) && m == s.getMonth(dd) && d == s.getDay(dd) || // Exact date
                        !ss.match(/w/i) && (str[1] && d == str[1] && m == str[0] - 1 || !str[1] && d == str[0]) || // Day of month
                        ss.match(/w/i) && day.getDay() == +ss.replace('w', '') // Day of week
                        )) {
                            obj.apply = true;
                            spec[day] = true; // Prevent applying generic rule on day, if specific exists
                        }
                    }
                });

                $.each(vobj, function (x, obj) {
                    add = 0;
                    remove = 0;
                    i1 = 0;
                    i2 = undefined;
                    prop1 = true;
                    prop2 = true;
                    all = false;

                    if (obj.start && (obj.apply || !obj.d && !spec[day])) {

                        // Define time parts
                        parts1 = obj.start.split(':');
                        parts2 = obj.end.split(':');

                        for (j = 0; j < 3; j++) {
                            if (parts1[j] === undefined) {
                                parts1[j] = 0;
                            }
                            if (parts2[j] === undefined) {
                                parts2[j] = 59;
                            }
                            parts1[j] = +parts1[j];
                            parts2[j] = +parts2[j];
                        }

                        parts1.unshift(parts1[0] > 11 ? 1 : 0);
                        parts2.unshift(parts2[0] > 11 ? 1 : 0);

                        if (hampm) {
                            if (parts1[1] >= 12) {
                                parts1[1] = parts1[1] - 12;
                            }

                            if (parts2[1] >= 12) {
                                parts2[1] = parts2[1] - 12;
                            }
                        }

                        // Look behind
                        for (j = 0; j < i; j++) {
                            if (validValues[j] !== undefined) {
                                v1 = step(parts1[j], steps[w[j]], mins[w[j]], maxs[w[j]]);
                                v2 = step(parts2[j], steps[w[j]], mins[w[j]], maxs[w[j]]);
                                hours1 = 0;
                                hours2 = 0;
                                hours3 = 0;
                                if (hampm && j == 1) {
                                    hours1 = parts1[0] ? 12 : 0;
                                    hours2 = parts2[0] ? 12 : 0;
                                    hours3 = validValues[0] ? 12 : 0;
                                }
                                if (!prop1) {
                                    v1 = 0;
                                }
                                if (!prop2) {
                                    v2 = maxs[w[j]];
                                }
                                if ((prop1 || prop2) && v1 + hours1 < validValues[j] + hours3 && validValues[j] + hours3 < v2 + hours2) {
                                    all = true;
                                }
                                if (validValues[j] != v1) {
                                    prop1 = false;
                                }
                                if (validValues[j] != v2) {
                                    prop2 = false;
                                }
                            }
                        }

                        // Look ahead
                        if (!valid) {
                            for (j = i + 1; j < 4; j++) {
                                if (parts1[j] > 0) {
                                    add = steps[v];
                                }
                                if (parts2[j] < maxs[w[j]]) {
                                    remove = steps[v];
                                }
                            }
                        }

                        if (!all) {
                            // Calculate min and max values
                            v1 = step(parts1[i], steps[v], mins[v], maxs[v]) + add;
                            v2 = step(parts2[i], steps[v], mins[v], maxs[v]) - remove;

                            if (prop1) {
                                i1 = getValidIndex(target, v1, maxs[v], 0);
                            }

                            if (prop2) {
                                i2 = getValidIndex(target, v2, maxs[v], 1);
                            }
                        }

                        // Disable values
                        if (prop1 || prop2 || all) {
                            if (valid) {
                                $('.dw-li', target).slice(i1, i2).addClass('dw-v');
                            } else {
                                $('.dw-li', target).slice(i1, i2).removeClass('dw-v');
                            }
                        }
                    }
                });
            }
        }

        function getIndex(t, v) {
            return $('.dw-li', t).index($('.dw-li[data-val="' + v + '"]', t));
        }

        function getValidIndex(t, v, max, add) {
            if (v < 0) {
                return 0;
            }
            if (v > max) {
                return $('.dw-li', t).length;
            }
            return getIndex(t, v) + add;
        }

        function getArray(d) {
            var i,
                ret = [];

            if (d === null || d === undefined) {
                return d;
            }

            for (i in o) {
                ret[o[i]] = f[i](d);
            }

            return ret;
        }

        function convertRanges(arr) {
            var i,
                v,
                start,
                ret = [];

            if (arr) {
                for (i = 0; i < arr.length; i++) {
                    v = arr[i];
                    if (v.start && v.start.getTime) {
                        start = new Date(v.start);
                        while (start <= v.end) {
                            ret.push(new Date(start.getFullYear(), start.getMonth(), start.getDate()));
                            start.setDate(start.getDate() + 1);
                        }
                    } else {
                        ret.push(v);
                    }
                }
                return ret;
            }
            return arr;
        }

        // Extended methods
        // ---

        /**
         * Sets the selected date
         *
         * @param {Date} d Date to select.
         * @param {Boolean} [fill=false] Also set the value of the associated input element. Default is true.
         * @param {Number} [time=0] Animation time to scroll to the selected date.
         * @param {Boolean} [temp=false] Set temporary value only.
         * @param {Boolean} [change=fill] Trigger change on input element.
         */
        inst.setDate = function (d, fill, time, temp, change) {
            inst.temp = getArray(d);
            inst.setValue(inst.temp, fill, time, temp, change);
        };

        /**
         * Returns the currently selected date.
         *
         * @param {Boolean} [temp=false] If true, return the currently shown date on the picker, otherwise the last selected one.
         * @return {Date}
         */
        inst.getDate = function (temp) {
            return getDate(temp ? inst.temp : inst.values);
        };

        /**
         * @deprecated since 2.7.0, backward compatibility code
         */
        inst.convert = function (obj) {
            var x = obj;

            if (!$.isArray(obj)) {
                // Convert from old format
                x = [];
                $.each(obj, function (i, o) {
                    $.each(o, function (j, o) {
                        if (i === 'daysOfWeek') {
                            if (o.d) {
                                o.d = 'w' + o.d;
                            } else {
                                o = 'w' + o;
                            }
                        }
                        x.push(o);
                    });
                });
            }

            return x;
        };

        // ---


        // Initializations
        // --- 

        inst.format = hformat;
        inst.order = o;
        inst.buttons.now = { text: s.nowText, css: 'dwb-n', handler: function handler() {
                inst.setDate(new Date(), false, 0.3, true, true);
            } };

        // @deprecated since 2.8.0, backward compatibility code
        // ---
        if (s.showNow) {
            s.buttons.splice($.inArray('set', s.buttons) + 1, 0, 'now');
        }
        invalid = invalid ? inst.convert(invalid) : false;
        // ---

        invalid = convertRanges(invalid);
        valid = convertRanges(valid);

        // Normalize min and max dates for comparing later (set default values where there are no values from wheels)
        mind = getDate(getArray(mind));
        maxd = getDate(getArray(maxd));

        mins = { y: mind.getFullYear(), m: 0, d: 1, h: minH, i: minM, s: minS, a: 0 };
        maxs = { y: maxd.getFullYear(), m: 11, d: 31, h: maxH, i: maxM, s: maxS, a: 1 };

        // ---

        return {
            wheels: wheels,
            headerText: s.headerText ? function () {
                return datetime.formatDate(hformat, getDate(inst.temp), s);
            } : false,
            formatResult: function formatResult(d) {
                return datetime.formatDate(format, getDate(d), s);
            },
            parseValue: function parseValue(val) {
                return getArray(val ? datetime.parseDate(format, val, s) : s.defaultValue || new Date());
            },
            validate: function validate(dw, i, time, dir) {
                var validated = getClosestValidDate(getDate(inst.temp), dir),
                    temp = getArray(validated),
                    //inst.temp,//.slice(0),
                y = get(temp, 'y'),
                    m = get(temp, 'm'),
                    minprop = true,
                    maxprop = true;

                $.each(['y', 'm', 'd', 'a', 'h', 'i', 's'], function (x, i) {
                    if (o[i] !== undefined) {
                        var min = mins[i],
                            max = maxs[i],
                            maxdays = 31,
                            val = get(temp, i),
                            t = $('.dw-ul', dw).eq(o[i]);

                        if (i == 'd') {
                            maxdays = s.getMaxDayOfMonth(y, m);
                            max = maxdays;
                            if (regen) {
                                $('.dw-li', t).each(function () {
                                    var that = $(this),
                                        d = that.data('val'),
                                        w = s.getDate(y, m, d).getDay(),
                                        str = dord.replace(/[my]/gi, '').replace(/dd/, (d < 10 ? '0' + d : d) + (s.daySuffix || '')).replace(/d/, d + (s.daySuffix || ''));
                                    $('.dw-i', that).html(str.match(/DD/) ? str.replace(/DD/, '<span class="dw-day">' + s.dayNames[w] + '</span>') : str.replace(/D/, '<span class="dw-day">' + s.dayNamesShort[w] + '</span>'));
                                });
                            }
                        }
                        if (minprop && mind) {
                            min = f[i](mind);
                        }
                        if (maxprop && maxd) {
                            max = f[i](maxd);
                        }
                        if (i != 'y') {
                            var i1 = getIndex(t, min),
                                i2 = getIndex(t, max);
                            $('.dw-li', t).removeClass('dw-v').slice(i1, i2 + 1).addClass('dw-v');
                            if (i == 'd') {
                                // Hide days not in month
                                $('.dw-li', t).removeClass('dw-h').slice(maxdays).addClass('dw-h');
                            }
                        }
                        if (val < min) {
                            val = min;
                        }
                        if (val > max) {
                            val = max;
                        }
                        if (minprop) {
                            minprop = val == min;
                        }
                        if (maxprop) {
                            maxprop = val == max;
                        }
                        // Disable some days
                        if (i == 'd') {
                            var first = s.getDate(y, m, 1).getDay(),
                                idx = {};

                            // Set invalid indexes
                            validateDates(invalid, y, m, first, maxdays, idx, 1);
                            // Delete indexes which are valid 
                            validateDates(valid, y, m, first, maxdays, idx, 0);

                            $.each(idx, function (i, v) {
                                if (v) {
                                    $('.dw-li', t).eq(i).removeClass('dw-v');
                                }
                            });
                        }
                    }
                });

                // Invalid times
                if (hasTime) {
                    $.each(['a', 'h', 'i', 's'], function (i, v) {
                        var val = get(temp, v),
                            d = get(temp, 'd'),
                            t = $('.dw-ul', dw).eq(o[v]);

                        if (o[v] !== undefined) {
                            validateTimes(invalid, i, v, temp, y, m, d, t, 0);
                            validateTimes(valid, i, v, temp, y, m, d, t, 1);

                            // Get valid value
                            validValues[i] = +inst.getValidCell(val, t, dir).val;
                        }
                    });
                }

                inst.temp = temp;
            }
        };
    };

    $.each(['date', 'time', 'datetime'], function (i, v) {
        ms.presets.scroller[v] = preset;
        ms.presetShort(v);
    });
})(jQuery);

(function ($, undefined) {

    var defaults = {
        inputClass: '',
        invalid: [],
        rtl: false,
        showInput: true,
        group: false,
        groupLabel: 'Groups',
        checkIcon: 'checkmark'
    };

    $.mobiscroll.presetShort('select');

    $.mobiscroll.presets.scroller.select = function (inst) {
        var change,
            grIdx,
            gr,
            group,
            input,
            optIdx,
            option,
            prev,
            prevent,
            timer,
            w,
            orig = $.extend({}, inst.settings),
            s = $.extend(inst.settings, defaults, orig),
            layout = s.layout || (/top|bottom/.test(s.display) ? 'liquid' : ''),
            isLiquid = layout == 'liquid',
            elm = $(this),
            multiple = elm.prop('multiple'),
            id = this.id + '_dummy',
            lbl = $('label[for="' + this.id + '"]').attr('for', id),
            label = s.label !== undefined ? s.label : lbl.length ? lbl.text() : elm.attr('name'),
            selectedClass = 'dw-msel mbsc-ic mbsc-ic-' + s.checkIcon,
            groupHdr = $('optgroup', elm).length && !s.group,
            invalid = [],
            origValues = [],
            main = {},
            roPre = s.readonly;

        function genValues(cont, keys, values) {
            $('option', cont).each(function () {
                values.push(this.text);
                keys.push(this.value);
                if (this.disabled) {
                    invalid.push(this.value);
                }
            });
        }

        function genWheels() {
            var cont,
                wheel,
                wg = 0,
                values = [],
                keys = [],
                w = [[]];

            if (s.group) {
                $('optgroup', elm).each(function (i) {
                    values.push(this.label);
                    keys.push(i);
                });

                wheel = {
                    values: values,
                    keys: keys,
                    label: s.groupLabel
                };

                if (isLiquid) {
                    w[0][wg] = wheel;
                } else {
                    w[wg] = [wheel];
                }

                cont = group;
                wg++;
            } else {
                cont = elm;
            }

            values = [];
            keys = [];

            if (groupHdr) {
                $('optgroup', elm).each(function (i) {
                    values.push(this.label);
                    keys.push('__group' + i);
                    invalid.push('__group' + i);
                    genValues(this, keys, values);
                });
            } else {
                genValues(cont, keys, values);
            }

            wheel = {
                multiple: multiple,
                values: values,
                keys: keys,
                label: label
            };

            if (isLiquid) {
                w[0][wg] = wheel;
            } else {
                w[wg] = [wheel];
            }

            return w;
        }

        function getOption(v) {
            var def = $('option', elm).attr('value');

            option = multiple ? v ? v[0] : def : v === undefined || v === null ? def : v;

            if (s.group) {
                group = elm.find('option[value="' + option + '"]').parent();
                gr = group.index();
                //prev = gr;
            }
        }

        function setVal(v, fill, change) {
            var value = [];

            if (multiple) {
                var sel = [],
                    i = 0;

                for (i in inst._selectedValues) {
                    sel.push(main[i]);
                    value.push(i);
                }

                input.val(sel.join(', '));
            } else {
                input.val(v);
                value = fill ? inst.temp[optIdx] : null;
            }

            if (fill) {
                elm.val(value);
                if (change) {
                    prevent = true;
                    elm.change();
                }
            }
        }

        function onTap(li) {
            var val = li.attr('data-val'),
                selected = li.hasClass('dw-msel');

            if (multiple && li.closest('.dwwl').hasClass('dwwms')) {
                if (li.hasClass('dw-v')) {
                    if (selected) {
                        li.removeClass(selectedClass).removeAttr('aria-selected');
                        delete inst._selectedValues[val];
                    } else {
                        li.addClass(selectedClass).attr('aria-selected', 'true');
                        inst._selectedValues[val] = val;
                    }

                    if (inst.live) {
                        setVal(val, true, true);
                    }
                }
                return false;
            }
        }

        // If groups is true and there are no groups fall back to no grouping
        if (s.group && !$('optgroup', elm).length) {
            s.group = false;
        }

        if (!s.invalid.length) {
            s.invalid = invalid;
        }

        if (s.group) {
            grIdx = 0;
            optIdx = 1;
        } else {
            grIdx = -1;
            optIdx = 0;
        }

        $('option', elm).each(function () {
            main[this.value] = this.text;
        });

        getOption(elm.val());

        $('#' + id).remove();

        input = $('<input type="text" id="' + id + '" class="' + s.inputClass + '" placeholder="' + (s.placeholder || '') + '" readonly />');

        if (s.showInput) {
            input.insertBefore(elm);
        }

        inst.attachShow(input);

        var v = elm.val() || [],
            i = 0;

        for (i; i < v.length; i++) {
            inst._selectedValues[v[i]] = v[i];
        }

        setVal(main[option]);

        elm.off('.dwsel').on('change.dwsel', function () {
            if (!prevent) {
                inst.setValue(multiple ? elm.val() || [] : [elm.val()], true);
            }
            prevent = false;
        }).addClass('dw-hsel').attr('tabindex', -1).closest('.ui-field-contain').trigger('create');

        // Extended methods
        // ---

        if (!inst._setValue) {
            inst._setValue = inst.setValue;
        }

        inst.setValue = function (d, fill, time, temp, change) {
            var i,
                value,
                v = $.isArray(d) ? d[0] : d;

            option = v !== undefined && v !== null ? v : $('option', elm).attr('value');

            if (multiple) {
                inst._selectedValues = {};
                if (d) {
                    // Can be null
                    for (i = 0; i < d.length; i++) {
                        inst._selectedValues[d[i]] = d[i];
                    }
                }
            }

            if (v === null) {
                value = null;
            } else if (s.group) {
                group = elm.find('option[value="' + option + '"]').parent();
                gr = group.index();
                value = [gr, option];
            } else {
                value = [option];
            }

            inst._setValue(value, fill, time, temp, change);

            // Set input/select values
            if (fill) {
                var changed = multiple ? true : option !== elm.val();
                setVal(main[option], changed, change === undefined ? fill : change);
            }
        };

        inst.getValue = function (temp, group) {
            var val = temp ? inst.temp : inst._hasValue ? inst.values : null;
            return val ? s.group && group ? val : val[optIdx] : null;
        };

        // ---

        return {
            width: 50,
            wheels: w,
            layout: layout,
            headerText: false,
            anchor: input,
            formatResult: function formatResult(d) {
                return main[d[optIdx]];
            },
            parseValue: function parseValue(val) {
                var v = elm.val() || [],
                    i = 0;

                if (multiple) {
                    inst._selectedValues = {};
                    for (i; i < v.length; i++) {
                        inst._selectedValues[v[i]] = v[i];
                    }
                }

                getOption(val === undefined ? elm.val() : val);

                return s.group ? [gr, option] : [option];
            },
            onBeforeShow: function onBeforeShow() {
                if (multiple && s.counter) {
                    s.headerText = function () {
                        var length = 0;
                        $.each(inst._selectedValues, function () {
                            length++;
                        });
                        return length + ' ' + s.selectedText;
                    };
                }

                //if (option === undefined) {
                getOption(elm.val());
                //}

                if (s.group) {
                    prev = gr;
                    inst.temp = [gr, option];
                }

                s.wheels = genWheels();
            },
            onMarkupReady: function onMarkupReady(dw) {
                dw.addClass('dw-select');

                $('.dwwl' + grIdx, dw).on('mousedown touchstart', function () {
                    clearTimeout(timer);
                });

                if (groupHdr) {
                    $('.dw', dw).addClass('dw-select-gr');
                    $('.dw-li[data-val^="__group"]', dw).addClass('dw-w-gr');
                }

                if (multiple) {
                    dw.addClass('dwms');

                    $('.dwwl', dw).on('keydown', function (e) {
                        if (e.keyCode == 32) {
                            // Space
                            e.preventDefault();
                            e.stopPropagation();
                            onTap($('.dw-sel', this));
                        }
                    }).eq(optIdx).addClass('dwwms').attr('aria-multiselectable', 'true');

                    origValues = $.extend({}, inst._selectedValues);
                }
            },
            validate: function validate(dw, i, time) {
                var j,
                    v,
                    t = $('.dw-ul', dw).eq(optIdx);

                if (i === undefined && multiple) {
                    v = inst._selectedValues;
                    j = 0;

                    $('.dwwl' + optIdx + ' .dw-li', dw).removeClass(selectedClass).removeAttr('aria-selected');

                    for (j in v) {
                        $('.dwwl' + optIdx + ' .dw-li[data-val="' + v[j] + '"]', dw).addClass(selectedClass).attr('aria-selected', 'true');
                    }
                }

                if (s.group && (i === undefined || i === grIdx)) {
                    gr = +inst.temp[grIdx];
                    if (gr !== prev) {
                        group = elm.find('optgroup').eq(gr);
                        option = group.find('option').not('[disabled]').eq(0).val();
                        option = option || elm.val();
                        s.wheels = genWheels();
                        if (!change) {
                            inst.temp = [gr, option];
                            s.readonly = [false, true];
                            clearTimeout(timer);
                            timer = setTimeout(function () {
                                change = true;
                                prev = gr;
                                inst.changeWheel([optIdx], undefined, true);
                                s.readonly = roPre;
                            }, time * 1000);
                            return false;
                        }
                    } else {
                        s.readonly = roPre;
                    }
                } else {
                    option = inst.temp[optIdx];
                }

                $.each(s.invalid, function (i, v) {
                    $('.dw-li[data-val="' + v + '"]', t).removeClass('dw-v');
                });

                change = false;
            },
            onClear: function onClear(dw) {
                inst._selectedValues = {};
                input.val('');
                $('.dwwl' + optIdx + ' .dw-li', dw).removeClass(selectedClass).removeAttr('aria-selected');
            },
            onValueTap: onTap,
            onSelect: function onSelect(v) {
                setVal(v, true, true);
            },
            onCancel: function onCancel() {
                if (!inst.live && multiple) {
                    inst._selectedValues = $.extend({}, origValues);
                }
            },
            onChange: function onChange(v) {
                if (inst.live && !multiple) {
                    input.val(v);
                    prevent = true;
                    elm.val(inst.temp[optIdx]).change();
                }
            },
            onDestroy: function onDestroy() {
                input.remove();
                elm.removeClass('dw-hsel').removeAttr('tabindex');
            }
        };
    };
})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfNzgxNzc0ZTkuanMiXSwibmFtZXMiOlsiJCIsInVuZGVmaW5lZCIsInRlc3RQcm9wcyIsInByb3BzIiwiaSIsIm1vZCIsInRlc3RQcmVmaXgiLCJwcmVmaXhlcyIsInAiLCJ0b0xvd2VyQ2FzZSIsImluaXQiLCJ0aGF0Iiwib3B0aW9ucyIsImFyZ3MiLCJyZXQiLCJlYWNoIiwiaWQiLCJpbnN0YW5jZXMiLCJkZXN0cm95IiwibW9iaXNjcm9sbCIsImNsYXNzZXMiLCJjb21wb25lbnQiLCJyIiwiaW5zdCIsImFwcGx5IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJEYXRlIiwidG91Y2hlcyIsImV4dGVuZCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwiaGFzM2QiLCJoYXNGbGV4IiwicHJlZml4IiwicHIiLCJyZXBsYWNlIiwiZm4iLCJtZXRob2QiLCJjb21wb25lbnRzIiwiYXJndW1lbnRzIiwidmVyc2lvbiIsInV0aWwiLCJqc1ByZWZpeCIsInRlc3RUb3VjaCIsImUiLCJ0eXBlIiwidGFyZ2V0IiwiaXNOdW1lcmljIiwiYSIsInBhcnNlRmxvYXQiLCJnZXRDb29yZCIsImMiLCJldiIsIm9yaWdpbmFsRXZlbnQiLCJjaGFuZ2VkVG91Y2hlcyIsImNvbnN0cmFpbiIsInZhbCIsIm1pbiIsIm1heCIsIk1hdGgiLCJ0YXBwZWQiLCJwcmVzZXRzIiwic2Nyb2xsZXIiLCJudW1wYWQiLCJ0aGVtZXMiLCJsaXN0dmlldyIsImkxOG4iLCJkZWZhdWx0cyIsInRoZW1lIiwiY29udGV4dCIsInVzZXJkZWYiLCJzZXREZWZhdWx0cyIsIm8iLCJwcmVzZXRTaG9ydCIsIm5hbWUiLCJzIiwicHJlc2V0IiwialF1ZXJ5IiwiemgiLCJzZXRUZXh0IiwiY2FuY2VsVGV4dCIsImNsZWFyVGV4dCIsInNlbGVjdGVkVGV4dCIsImRhdGVGb3JtYXQiLCJkYXRlT3JkZXIiLCJkYXlOYW1lcyIsImRheU5hbWVzU2hvcnQiLCJkYXlOYW1lc01pbiIsImRheVRleHQiLCJob3VyVGV4dCIsIm1pbnV0ZVRleHQiLCJtb250aE5hbWVzIiwibW9udGhOYW1lc1Nob3J0IiwibW9udGhUZXh0Iiwic2VjVGV4dCIsInRpbWVGb3JtYXQiLCJ0aW1lV2hlZWxzIiwieWVhclRleHQiLCJub3dUZXh0IiwicG1UZXh0IiwiYW1UZXh0IiwiZGF0ZVRleHQiLCJ0aW1lVGV4dCIsImNhbGVuZGFyVGV4dCIsImNsb3NlVGV4dCIsImZyb21UZXh0IiwidG9UZXh0Iiwid2hvbGVUZXh0IiwiZnJhY3Rpb25UZXh0IiwidW5pdFRleHQiLCJsYWJlbHMiLCJsYWJlbHNTaG9ydCIsInN0YXJ0VGV4dCIsInN0b3BUZXh0IiwicmVzZXRUZXh0IiwibGFwVGV4dCIsImhpZGVUZXh0IiwiYW5kcm9pZCIsIm1vZGUiLCJoZWlnaHQiLCJzaG93TGFiZWwiLCJidG5TdGFydENsYXNzIiwiYnRuU3RvcENsYXNzIiwiYnRuUmVzZXRDbGFzcyIsImJ0bkxhcENsYXNzIiwicm93cyIsIm1pbldpZHRoIiwic2VsZWN0ZWRMaW5lSGVpZ2h0Iiwic2VsZWN0ZWRMaW5lQm9yZGVyIiwidXNlU2hvcnRMYWJlbHMiLCJpY29uIiwiZmlsbGVkIiwiZW1wdHkiLCJidG5QbHVzQ2xhc3MiLCJidG5NaW51c0NsYXNzIiwib25UaGVtZUxvYWQiLCJsYW5nIiwib25NYXJrdXBSZWFkeSIsIm1hcmt1cCIsImFkZENsYXNzIiwiaW9zIiwiZGlzcGxheSIsImhlYWRlclRleHQiLCJidG5XaWR0aCIsImlvczciLCJkZWxldGVJY29uIiwiY2hlY2tJY29uIiwiYnRuQ2FsUHJldkNsYXNzIiwiYnRuQ2FsTmV4dENsYXNzIiwidmVyIiwibW9iaWxlIiwibWF0Y2giLCJqcW0iLCJqcW1Cb3JkZXIiLCJqcW1Cb2R5IiwianFtSGVhZGVyIiwianFtV2hlZWwiLCJqcW1MaW5lIiwianFtQ2xpY2tQaWNrIiwianFtU2V0IiwianFtQ2FuY2VsIiwiZGlzYWJsZWRDbGFzcyIsImFjdGl2ZUNsYXNzIiwiYWN0aXZlVGFiSW5uZXJDbGFzcyIsImNhbCIsInR4dCIsImpxbUV2ZW50VGV4dCIsImJ1YmJsZSIsImpxbUV2ZW50QnViYmxlIiwiZGF5Q2xhc3MiLCJpbm5lckRheUNsYXNzIiwiY2FsZW5kYXJDbGFzcyIsIndlZWtOckNsYXNzIiwiZXZlbnRUZXh0Q2xhc3MiLCJldmVudEJ1YmJsZUNsYXNzIiwib25FdmVudEJ1YmJsZVNob3ciLCJldmQiLCJldmMiLCJhdHRyIiwicGFnZSIsInRyaWdnZXIiLCJvbk1hcmt1cEluc2VydGVkIiwiZWxtIiwic2V0dGluZ3MiLCJyZW1vdmVDbGFzcyIsImFjY2VudCIsImJ0bkhpZGVDbGFzcyIsImNsaWNrIiwidG91Y2giLCJhY3RpdmUiLCJvbiIsImhhc0NsYXNzIiwiY2xvc2VzdCIsIm9yZCIsIndwIiwibXMiLCJkYXRldGltZSIsInNob3J0WWVhckN1dG9mZiIsImdldFllYXIiLCJkIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERheSIsImdldERhdGUiLCJ5IiwibSIsImgiLCJnZXRNYXhEYXlPZk1vbnRoIiwiZ2V0V2Vla051bWJlciIsInNldEhvdXJzIiwic2V0RGF0ZSIsInllYXJTdGFydCIsImNlaWwiLCJmb3JtYXREYXRlIiwiZm9ybWF0IiwiZGF0ZSIsImxvb2siLCJuIiwibGVuZ3RoIiwiY2hhckF0IiwiZjEiLCJsZW4iLCJmMiIsImwiLCJ5ZWFyIiwib3V0cHV0IiwibGl0ZXJhbCIsImdldFRpbWUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJnZXRTZWNvbmRzIiwidG9VcHBlckNhc2UiLCJwYXJzZURhdGUiLCJ2YWx1ZSIsImRlZiIsImRlZmF1bHRWYWx1ZSIsInRvU3RyaW5nIiwibW9udGgiLCJkYXkiLCJkb3kiLCJob3VycyIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwiYW1wbSIsImxvb2tBaGVhZCIsIm1hdGNoZXMiLCJpRm9ybWF0IiwiZ2V0TnVtYmVyIiwic2l6ZSIsImRpZ2l0cyIsIlJlZ0V4cCIsIm51bSIsInN1YnN0ciIsImlWYWx1ZSIsInBhcnNlSW50IiwiZ2V0TmFtZSIsIm5hbWVzIiwiY2hlY2tMaXRlcmFsIiwiZGltIiwid2luZG93IiwiJGFjdGl2ZUVsbSIsInByZXZlbnRTaG93IiwiaXNPbGRBbmRyb2lkIiwidGVzdCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImFuaW1FbmQiLCJwcmV2ZGVmIiwicHJldmVudERlZmF1bHQiLCJXaWRnZXQiLCJlbCIsImluaGVyaXQiLCIkYXJpYURpdiIsIiRjdHgiLCIkaGVhZGVyIiwiJG1hcmt1cCIsIiRvdmVybGF5IiwiJHBlcnNwIiwiJHBvcHVwIiwiJHduZCIsIiR3cmFwcGVyIiwiYnV0dG9ucyIsImJ0biIsImRvQW5pbSIsImhhc0J1dHRvbnMiLCJpc01vZGFsIiwibW9kYWxXaWR0aCIsIm1vZGFsSGVpZ2h0IiwicG9zRXZlbnRzIiwicHJldmVudFBvcyIsInNjcm9sbExvY2siLCJzZXRSZWFkT25seSIsIndhc1JlYWRPbmx5Iiwid25kV2lkdGgiLCJ3bmRIZWlnaHQiLCIkZWxtIiwiZWxtTGlzdCIsInBvc0RlYm91bmNlIiwib25CdG5TdGFydCIsIm9uQnRuRW5kIiwib2ZmIiwib25TaG93IiwicHJldkZvY3VzIiwiZm9jdXMiLCJhcmlhTWVzc2FnZSIsIm9uSGlkZSIsInByZXZBbmltIiwiYWN0aXZlRWwiLCJmb2N1c09uQ2xvc2UiLCJyZW1vdmUiLCJzZXRUaW1lb3V0IiwiZXgiLCJfaXNWaXNpYmxlIiwiZXZlbnQiLCJvblBvc2l0aW9uIiwiY2xlYXJUaW1lb3V0IiwiaXNTY3JvbGwiLCJwb3NpdGlvbiIsInB1c2giLCJ2IiwiY2hlY2siLCJ3IiwidCIsImFuY2hvciIsImF3IiwiYWgiLCJhcCIsImF0IiwiYWwiLCJhcnIiLCJhcnJ3IiwiYXJybCIsImRoIiwic2Nyb2xsIiwic2wiLCJzdCIsInRvdGFsdyIsIm1pbnciLCJjc3MiLCJudyIsImlubmVyV2lkdGgiLCJ3aWR0aCIsIm5oIiwiaW5uZXJIZWlnaHQiLCJfaXNMaXF1aWQiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsVG9wIiwibGF5b3V0Iiwib3V0ZXJXaWR0aCIsIm91dGVySGVpZ2h0Iiwib2Zmc2V0IiwiYWJzIiwidG9wIiwibGVmdCIsInNjcm9sbEhlaWdodCIsImF0dGFjaFNob3ciLCJiZWZvcmVTaG93Iiwic2hvd09uRm9jdXMiLCJzaG93T25UYXAiLCJhY3RpdmVFbGVtZW50IiwiaXMiLCJibHVyIiwic2hvdyIsInNlbGVjdCIsImhpZGUiLCJfZmlsbFZhbHVlIiwiY2FuY2VsIiwiY2xlYXIiLCJsaXZlIiwic2V0VmFsdWUiLCJlbmFibGUiLCJkaXNhYmxlZCIsIl9pc0lucHV0IiwicHJvcCIsImRpc2FibGUiLCJodG1sIiwiX3JlYWRWYWx1ZSIsImNzc0NsYXNzIiwicnRsIiwiX2dlbmVyYXRlQ29udGVudCIsImIiLCJ0ZXh0IiwiX21hcmt1cCIsIl9oZWFkZXIiLCJfbWFya3VwUmVhZHkiLCJrZXlDb2RlIiwiYWN0aXZlSW5zdGFuY2UiLCJhcHBlbmRUbyIsImZpbmQiLCJpbnNlcnRBZnRlciIsInN0b3BQcm9wYWdhdGlvbiIsInRhcCIsImhhbmRsZXIiLCJjbG9zZU9uT3ZlcmxheSIsIl9hdHRhY2hFdmVudHMiLCJfdmFsdWVUZXh0IiwiZm9yY2UiLCJfaXNWYWxpZCIsImlzVmlzaWJsZSIsIl9wcm9jZXNzU2V0dGluZ3MiLCJwcmV2ZW50Iiwic3RhcnRYIiwic3RhcnRZIiwibW92ZWQiLCJvcHRpb24iLCJvcHQiLCJvYmoiLCJyZWFkT25seSIsImdldEluc3QiLCJzcyIsIl9kZWZhdWx0cyIsIl9jbGFzcyIsImFuaW1hdGUiLCJzcGxpY2UiLCJpbkFycmF5IiwiYnV0dG9uMyIsImJ1dHRvbjNUZXh0Iiwic2V0IiwiX3ByZXZlbnRDaGFuZ2UiLCJ3ZWVrRGF5cyIsIm1vdmUiLCJjb252ZXJ0IiwidmFsdWVzIiwia2V5cyIsImsiLCJTY3JvbGxlciIsImlzU2Nyb2xsYWJsZSIsIml0ZW1IZWlnaHQiLCJ2YWx1ZVRleHQiLCJzdGFydCIsInN0YXJ0VGltZSIsInN0b3AiLCJpbmRleCIsImxpbmVzIiwidGltZXIiLCJpdiIsInBvcyIsInBpeGVscyIsIndoZWVscyIsIm9uU3RhcnQiLCJpc1JlYWRPbmx5Iiwic2V0R2xvYmFscyIsImdldEN1cnJlbnRQb3NpdGlvbiIsIm9uTW92ZSIsIm9uRW5kIiwidGltZSIsInNwZWVkIiwiZGlzdCIsInRpbmRleCIsInR0b3AiLCJzcGVlZFVuaXQiLCJyb3VuZCIsImlkeCIsImZsb29yIiwibGkiLCJ2YWxpZCIsImhsIiwiY2FsYyIsInN0ZXAiLCJwbHVzIiwibWludXMiLCJjbGVhckludGVydmFsIiwib25LZXlEb3duIiwib25LZXlVcCIsIm9uU2Nyb2xsIiwiZGVsdGEiLCJ3aGVlbERlbHRhIiwiZGV0YWlsIiwiZnVuYyIsInNldEludGVydmFsIiwiZGVsYXkiLCJ3aCIsImlzQXJyYXkiLCJyZWFkb25seSIsImdlbmVyYXRlV2hlZWxJdGVtcyIsInd3IiwiaiIsIm11bHRpcGxlIiwiZXEiLCJmb3JtYXRIZWFkZXIiLCJnZXRDb21wdXRlZFN0eWxlIiwibWF0cml4IiwicHgiLCJzcGxpdCIsInJlYWR5IiwidG9GaXhlZCIsImdldFZhbGlkIiwiZGlyIiwiY2VsbCIsImNlbGxzIiwiY2VsbDEiLCJjZWxsMiIsImRpc3QxIiwiZGlzdDIiLCJzY3JvbGxUb1BvcyIsIm1hbnVhbCIsInNjIiwicmVzIiwidGVtcCIsInJlbW92ZUF0dHIiLCJmb3JtYXRSZXN1bHQiLCJfaGFzVmFsdWUiLCJhbmltIiwib3JpZyIsInRpbWVVbml0IiwiZmlsbCIsImNoYW5nZSIsIm5vc2Nyb2xsIiwicGFyc2VWYWx1ZSIsImdldFZhbHVlIiwiZ2V0VmFsdWVzIiwiX3NlbGVjdGVkVmFsdWVzIiwiY2hhbmdlV2hlZWwiLCJuciIsIndnIiwiZ2V0VmFsaWRDZWxsIiwibGJsIiwibWF4V2lkdGgiLCJsYWJlbCIsImZpeGVkV2lkdGgiLCJtdWx0aWxpbmUiLCJqb2luIiwic3RhcnRZZWFyIiwiZW5kWWVhciIsInNob3dOb3ciLCJzdGVwSG91ciIsInN0ZXBNaW51dGUiLCJzdGVwU2Vjb25kIiwic2VwYXJhdG9yIiwiYW1wbVRleHQiLCJodG1sNWRlZiIsIm1pbkRhdGUiLCJtYXhEYXRlIiwiZW5kIiwiaGFzVGltZSIsIm1pbnMiLCJtYXhzIiwidmFsaWRWYWx1ZXMiLCJmIiwiZ2V0SG91ciIsImdldE1pbnV0ZSIsImdldFNlY29uZCIsImdldEFtUG0iLCJpbnZhbGlkIiwiZG9yZCIsInRvcmQiLCJyZWdlbiIsImhhbXBtIiwiaGZvcm1hdCIsImRlZmQiLCJzdGVwSCIsInN0ZXBNIiwic3RlcFMiLCJtaW5kIiwibWF4ZCIsIm1pbkgiLCJtaW5NIiwibWluUyIsIm1heEgiLCJnZXRNYXgiLCJtYXhNIiwibWF4UyIsInNlYXJjaCIsInNvcnQiLCJ5ZWFyU3VmZml4IiwiYWRkV2hlZWwiLCJzdHIiLCJtb250aFN1ZmZpeCIsImRheVN1ZmZpeCIsInVwcGVyIiwiZ2V0IiwiaG91ciIsImdldENsb3Nlc3RWYWxpZERhdGUiLCJuZXh0IiwicHJldiIsIm5leHRWYWxpZCIsInByZXZWYWxpZCIsInVwIiwiZG93biIsImlzVmFsaWQiLCJpc0luT2JqIiwiY3VyciIsInZhbGlkYXRlRGF0ZXMiLCJmaXJzdCIsIm1heGRheXMiLCJ2YWxpZGF0ZVRpbWVzIiwidm9iaiIsImRkIiwicGFydHMxIiwicGFydHMyIiwicHJvcDEiLCJwcm9wMiIsInYxIiwidjIiLCJpMSIsImkyIiwiYWRkIiwiYWxsIiwiaG91cnMxIiwiaG91cnMyIiwiaG91cnMzIiwic3BlYyIsInN0ZXBzIiwieCIsInVuc2hpZnQiLCJnZXRWYWxpZEluZGV4IiwiZ2V0SW5kZXgiLCJnZXRBcnJheSIsImNvbnZlcnRSYW5nZXMiLCJvcmRlciIsIm5vdyIsInZhbGlkYXRlIiwiZHciLCJ2YWxpZGF0ZWQiLCJtaW5wcm9wIiwibWF4cHJvcCIsImRhdGEiLCJpbnB1dENsYXNzIiwic2hvd0lucHV0IiwiZ3JvdXAiLCJncm91cExhYmVsIiwiZ3JJZHgiLCJnciIsImlucHV0Iiwib3B0SWR4IiwiaXNMaXF1aWQiLCJzZWxlY3RlZENsYXNzIiwiZ3JvdXBIZHIiLCJvcmlnVmFsdWVzIiwibWFpbiIsInJvUHJlIiwiZ2VuVmFsdWVzIiwiY29udCIsImdlbldoZWVscyIsIndoZWVsIiwiZ2V0T3B0aW9uIiwicGFyZW50Iiwic2V0VmFsIiwic2VsIiwib25UYXAiLCJzZWxlY3RlZCIsInBsYWNlaG9sZGVyIiwiaW5zZXJ0QmVmb3JlIiwiX3NldFZhbHVlIiwiY2hhbmdlZCIsIm9uQmVmb3JlU2hvdyIsImNvdW50ZXIiLCJub3QiLCJvbkNsZWFyIiwib25WYWx1ZVRhcCIsIm9uU2VsZWN0Iiwib25DYW5jZWwiLCJvbkNoYW5nZSIsIm9uRGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7OztBQVFBLENBQUMsVUFBVUEsQ0FBVixFQUFhQyxTQUFiLEVBQXdCOztBQUVyQixhQUFTQyxTQUFULENBQW1CQyxLQUFuQixFQUEwQjtBQUN0QixZQUFJQyxDQUFKO0FBQ0EsYUFBS0EsQ0FBTCxJQUFVRCxLQUFWLEVBQWlCO0FBQ2IsZ0JBQUlFLElBQUlGLE1BQU1DLENBQU4sQ0FBSixNQUFrQkgsU0FBdEIsRUFBaUM7QUFDN0IsdUJBQU8sSUFBUDtBQUNIO0FBQ0o7QUFDRCxlQUFPLEtBQVA7QUFDSDs7QUFFRCxhQUFTSyxVQUFULEdBQXNCO0FBQ2xCLFlBQUlDLFdBQVcsQ0FBQyxRQUFELEVBQVcsS0FBWCxFQUFrQixHQUFsQixFQUF1QixJQUF2QixDQUFmO0FBQUEsWUFDSUMsQ0FESjs7QUFHQSxhQUFLQSxDQUFMLElBQVVELFFBQVYsRUFBb0I7QUFDaEIsZ0JBQUlMLFVBQVUsQ0FBQ0ssU0FBU0MsQ0FBVCxJQUFjLFdBQWYsQ0FBVixDQUFKLEVBQTRDO0FBQ3hDLHVCQUFPLE1BQU1ELFNBQVNDLENBQVQsRUFBWUMsV0FBWixFQUFOLEdBQWtDLEdBQXpDO0FBQ0g7QUFDSjtBQUNELGVBQU8sRUFBUDtBQUNIOztBQUVELGFBQVNDLElBQVQsQ0FBY0MsSUFBZCxFQUFvQkMsT0FBcEIsRUFBNkJDLElBQTdCLEVBQW1DO0FBQy9CLFlBQUlDLE1BQU1ILElBQVY7O0FBRUE7QUFDQSxZ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LGtCQUFFLFVBQVVvbkIsTUFBVixHQUFtQixTQUFyQixFQUFnQ1osRUFBaEMsRUFBb0M1YSxXQUFwQyxDQUFnRDBiLGFBQWhELEVBQStEL0gsVUFBL0QsQ0FBMEUsZUFBMUU7QUFDSCxhQTVIRTtBQTZISHNKLHdCQUFZVixLQTdIVDtBQThISFcsc0JBQVUsa0JBQVUzVSxDQUFWLEVBQWE7QUFDbkI4VCx1QkFBTzlULENBQVAsRUFBVSxJQUFWLEVBQWdCLElBQWhCO0FBQ0gsYUFoSUU7QUFpSUg0VSxzQkFBVSxvQkFBWTtBQUNsQixvQkFBSSxDQUFDeG5CLEtBQUs2VixJQUFOLElBQWM2RyxRQUFsQixFQUE0QjtBQUN4QjFjLHlCQUFLNGUsZUFBTCxHQUF1Qm5nQixFQUFFK0IsTUFBRixDQUFTLEVBQVQsRUFBYXlsQixVQUFiLENBQXZCO0FBQ0g7QUFDSixhQXJJRTtBQXNJSHdCLHNCQUFVLGtCQUFVN1UsQ0FBVixFQUFhO0FBQ25CLG9CQUFJNVMsS0FBSzZWLElBQUwsSUFBYSxDQUFDNkcsUUFBbEIsRUFBNEI7QUFDeEJrSiwwQkFBTXZqQixHQUFOLENBQVV1USxDQUFWO0FBQ0FpRiw4QkFBVSxJQUFWO0FBQ0ExTix3QkFBSTlILEdBQUosQ0FBUXJDLEtBQUsrZCxJQUFMLENBQVU4SCxNQUFWLENBQVIsRUFBMkJ0SCxNQUEzQjtBQUNIO0FBQ0osYUE1SUU7QUE2SUhtSix1QkFBVyxxQkFBWTtBQUNuQjlCLHNCQUFNMVQsTUFBTjtBQUNBL0gsb0JBQUlFLFdBQUosQ0FBZ0IsU0FBaEIsRUFBMkIyVCxVQUEzQixDQUFzQyxVQUF0QztBQUNIO0FBaEpFLFNBQVA7QUFrSkgsS0FyWkQ7QUF1WkgsQ0FyYUQsRUFxYUd0YSxNQXJhSCIsImZpbGUiOiJmYWtlXzc4MTc3NGU5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXHJcbiAqIE1vYmlzY3JvbGwgdjIuMTMuMlxyXG4gKiBodHRwOi8vbW9iaXNjcm9sbC5jb21cclxuICpcclxuICogQ29weXJpZ2h0IDIwMTAtMjAxNCwgQWNpZCBNZWRpYVxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcbiAqXHJcbiAqL1xyXG4oZnVuY3Rpb24gKCQsIHVuZGVmaW5lZCkge1xyXG5cclxuICAgIGZ1bmN0aW9uIHRlc3RQcm9wcyhwcm9wcykge1xyXG4gICAgICAgIHZhciBpO1xyXG4gICAgICAgIGZvciAoaSBpbiBwcm9wcykge1xyXG4gICAgICAgICAgICBpZiAobW9kW3Byb3BzW2ldXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGVzdFByZWZpeCgpIHtcclxuICAgICAgICB2YXIgcHJlZml4ZXMgPSBbJ1dlYmtpdCcsICdNb3onLCAnTycsICdtcyddLFxyXG4gICAgICAgICAgICBwO1xyXG5cclxuICAgICAgICBmb3IgKHAgaW4gcHJlZml4ZXMpIHtcclxuICAgICAgICAgICAgaWYgKHRlc3RQcm9wcyhbcHJlZml4ZXNbcF0gKyAnVHJhbnNmb3JtJ10pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJy0nICsgcHJlZml4ZXNbcF0udG9Mb3dlckNhc2UoKSArICctJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdCh0aGF0LCBvcHRpb25zLCBhcmdzKSB7XHJcbiAgICAgICAgdmFyIHJldCA9IHRoYXQ7XHJcblxyXG4gICAgICAgIC8vIEluaXRcclxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pZCA9ICdtb2Jpc2Nyb2xsJyArICgrK2lkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZXNbdGhpcy5pZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZXNbdGhpcy5pZF0uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbmV3ICQubW9iaXNjcm9sbC5jbGFzc2VzW29wdGlvbnMuY29tcG9uZW50IHx8ICdTY3JvbGxlciddKHRoaXMsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1ldGhvZCBjYWxsXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aGF0LmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdCA9IGluc3RhbmNlc1t0aGlzLmlkXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaW5zdCAmJiBpbnN0W29wdGlvbnNdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgciA9IGluc3Rbb3B0aW9uc10uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncywgMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0ID0gcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpZCA9ICtuZXcgRGF0ZSgpLFxyXG4gICAgICAgIHRvdWNoZXMgPSB7fSxcclxuICAgICAgICBpbnN0YW5jZXMgPSB7fSxcclxuICAgICAgICBleHRlbmQgPSAkLmV4dGVuZCxcclxuICAgICAgICBtb2QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtb2Rlcm5penInKS5zdHlsZSxcclxuICAgICAgICBoYXMzZCA9IHRlc3RQcm9wcyhbJ3BlcnNwZWN0aXZlUHJvcGVydHknLCAnV2Via2l0UGVyc3BlY3RpdmUnLCAnTW96UGVyc3BlY3RpdmUnLCAnT1BlcnNwZWN0aXZlJywgJ21zUGVyc3BlY3RpdmUnXSksXHJcbiAgICAgICAgaGFzRmxleCA9IHRlc3RQcm9wcyhbJ2ZsZXgnLCAnbXNGbGV4JywgJ1dlYmtpdEJveERpcmVjdGlvbiddKSxcclxuICAgICAgICBwcmVmaXggPSB0ZXN0UHJlZml4KCksXHJcbiAgICAgICAgcHIgPSBwcmVmaXgucmVwbGFjZSgvXlxcLS8sICcnKS5yZXBsYWNlKC9cXC0kLywgJycpLnJlcGxhY2UoJ21veicsICdNb3onKTtcclxuXHJcbiAgICAkLmZuLm1vYmlzY3JvbGwgPSBmdW5jdGlvbiAobWV0aG9kKSB7XHJcbiAgICAgICAgZXh0ZW5kKHRoaXMsICQubW9iaXNjcm9sbC5jb21wb25lbnRzKTtcclxuICAgICAgICByZXR1cm4gaW5pdCh0aGlzLCBtZXRob2QsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG5cclxuICAgICQubW9iaXNjcm9sbCA9ICQubW9iaXNjcm9sbCB8fCB7XHJcbiAgICAgICAgdmVyc2lvbjogJzIuMTMuMicsXHJcbiAgICAgICAgdXRpbDoge1xyXG4gICAgICAgICAgICBwcmVmaXg6IHByZWZpeCxcclxuICAgICAgICAgICAganNQcmVmaXg6IHByLFxyXG4gICAgICAgICAgICBoYXMzZDogaGFzM2QsXHJcbiAgICAgICAgICAgIGhhc0ZsZXg6IGhhc0ZsZXgsXHJcbiAgICAgICAgICAgIHRlc3RUb3VjaDogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLnR5cGUgPT0gJ3RvdWNoc3RhcnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hlc1tlLnRhcmdldF0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0b3VjaGVzW2UudGFyZ2V0XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0b3VjaGVzW2UudGFyZ2V0XTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaXNOdW1lcmljOiBmdW5jdGlvbiAoYSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGEgLSBwYXJzZUZsb2F0KGEpID49IDA7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdldENvb3JkOiBmdW5jdGlvbiAoZSwgYykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGV2ID0gZS5vcmlnaW5hbEV2ZW50IHx8IGU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXYuY2hhbmdlZFRvdWNoZXMgPyBldi5jaGFuZ2VkVG91Y2hlc1swXVsncGFnZScgKyBjXSA6IGVbJ3BhZ2UnICsgY107XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbnN0cmFpbjogZnVuY3Rpb24gKHZhbCwgbWluLCBtYXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChtaW4sIE1hdGgubWluKHZhbCwgbWF4KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHRhcHBlZDogZmFsc2UsXHJcbiAgICAgICAgcHJlc2V0czoge1xyXG4gICAgICAgICAgICBzY3JvbGxlcjoge30sXHJcbiAgICAgICAgICAgIG51bXBhZDoge31cclxuICAgICAgICB9LFxyXG4gICAgICAgIHRoZW1lczoge1xyXG4gICAgICAgICAgICBsaXN0dmlldzoge31cclxuICAgICAgICB9LFxyXG4gICAgICAgIGkxOG46IHt9LFxyXG4gICAgICAgIGluc3RhbmNlczogaW5zdGFuY2VzLFxyXG4gICAgICAgIGNsYXNzZXM6IHt9LFxyXG4gICAgICAgIGNvbXBvbmVudHM6IHt9LFxyXG4gICAgICAgIGRlZmF1bHRzOiB7XHJcbiAgICAgICAgICAgIHRoZW1lOiAnbW9iaXNjcm9sbCcsXHJcbiAgICAgICAgICAgIGNvbnRleHQ6ICdib2R5J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXNlcmRlZjoge30sXHJcbiAgICAgICAgc2V0RGVmYXVsdHM6IGZ1bmN0aW9uIChvKSB7XHJcbiAgICAgICAgICAgIGV4dGVuZCh0aGlzLnVzZXJkZWYsIG8pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJlc2V0U2hvcnQ6IGZ1bmN0aW9uIChuYW1lLCBjLCBwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50c1tuYW1lXSA9IGZ1bmN0aW9uIChzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5pdCh0aGlzLCBleHRlbmQocywgeyBjb21wb25lbnQ6IGMsIHByZXNldDogcCA9PT0gZmFsc2UgPyB1bmRlZmluZWQgOiBuYW1lIH0pLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgJC5zY3JvbGxlciA9ICQuc2Nyb2xsZXIgfHwgJC5tb2Jpc2Nyb2xsO1xyXG4gICAgJC5mbi5zY3JvbGxlciA9ICQuZm4uc2Nyb2xsZXIgfHwgJC5mbi5tb2Jpc2Nyb2xsO1xyXG5cclxufSkoalF1ZXJ5KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuKGZ1bmN0aW9uICgkKSB7XHJcbiAgICAkLm1vYmlzY3JvbGwuaTE4bi56aCA9ICQuZXh0ZW5kKCQubW9iaXNjcm9sbC5pMThuLnpoLCB7XHJcbiAgICAgICAgLy8gQ29yZVxyXG4gICAgICAgIHNldFRleHQ6ICfnoa7lrponLFxyXG4gICAgICAgIGNhbmNlbFRleHQ6ICflj5bmtognLFxyXG4gICAgICAgIGNsZWFyVGV4dDogJ+aYjuehricsXHJcbiAgICAgICAgc2VsZWN0ZWRUZXh0OiAn6YCJJyxcclxuICAgICAgICAvLyBEYXRldGltZSBjb21wb25lbnRcclxuICAgICAgICBkYXRlRm9ybWF0OiAneXkvbW0vZGQnLFxyXG4gICAgICAgIGRhdGVPcmRlcjogJ3l5bW1kZCcsXHJcbiAgICAgICAgZGF5TmFtZXM6IFsn5ZGo5pelJywgJ+WRqOS4gCcsICflkajkuownLCAn5ZGo5LiJJywgJ+WRqOWbmycsICflkajkupQnLCAn5ZGo5YWtJ10sXHJcbiAgICAgICAgZGF5TmFtZXNTaG9ydDogWyfml6UnLCAn5LiAJywgJ+S6jCcsICfkuIknLCAn5ZubJywgJ+S6lCcsICflha0nXSxcclxuICAgICAgICBkYXlOYW1lc01pbjogWyfml6UnLCAn5LiAJywgJ+S6jCcsICfkuIknLCAn5ZubJywgJ+S6lCcsICflha0nXSxcclxuICAgICAgICBkYXlUZXh0OiAn5pelJyxcclxuICAgICAgICBob3VyVGV4dDogJ+aXticsXHJcbiAgICAgICAgbWludXRlVGV4dDogJ+WIhicsXHJcbiAgICAgICAgbW9udGhOYW1lczogWycx5pyIJywgJzLmnIgnLCAnM+aciCcsICc05pyIJywgJzXmnIgnLCAnNuaciCcsICc35pyIJywgJzjmnIgnLCAnOeaciCcsICcxMOaciCcsICcxMeaciCcsICcxMuaciCddLFxyXG4gICAgICAgIG1vbnRoTmFtZXNTaG9ydDogWyfkuIAnLCAn5LqMJywgJ+S4iScsICflm5snLCAn5LqUJywgJ+WFrScsICfkuIMnLCAn5YWrJywgJ+S5nScsICfljYEnLCAn5Y2B5LiAJywgJ+WNgeS6jCddLFxyXG4gICAgICAgIG1vbnRoVGV4dDogJ+aciCcsXHJcbiAgICAgICAgc2VjVGV4dDogJ+enkicsXHJcbiAgICAgICAgdGltZUZvcm1hdDogJ0hIOmlpJyxcclxuICAgICAgICB0aW1lV2hlZWxzOiAnSEhpaScsXHJcbiAgICAgICAgeWVhclRleHQ6ICflubQnLFxyXG4gICAgICAgIG5vd1RleHQ6ICflvZPliY0nLFxyXG4gICAgICAgIHBtVGV4dDogJ+S4i+WNiCcsXHJcbiAgICAgICAgYW1UZXh0OiAn5LiK5Y2IJyxcclxuICAgICAgICAvLyBDYWxlbmRhciBjb21wb25lbnRcclxuICAgICAgICBkYXRlVGV4dDogJ+aXpScsXHJcbiAgICAgICAgdGltZVRleHQ6ICfml7bpl7QnLFxyXG4gICAgICAgIGNhbGVuZGFyVGV4dDogJ+aXpeWOhicsXHJcbiAgICAgICAgY2xvc2VUZXh0OiAn5YWz6ZetJyxcclxuICAgICAgICAvLyBEYXRlcmFuZ2UgY29tcG9uZW50XHJcbiAgICAgICAgZnJvbVRleHQ6ICflvIDlp4vml7bpl7QnLFxyXG4gICAgICAgIHRvVGV4dDogJ+e7k+adn+aXtumXtCcsXHJcbiAgICAgICAgLy8gTWVhc3VyZW1lbnQgY29tcG9uZW50c1xyXG4gICAgICAgIHdob2xlVGV4dDogJ+WQiOiuoScsXHJcbiAgICAgICAgZnJhY3Rpb25UZXh0OiAn5YiG5pWwJyxcclxuICAgICAgICB1bml0VGV4dDogJ+WNleS9jScsXHJcbiAgICAgICAgLy8gVGltZSAvIFRpbWVzcGFuIGNvbXBvbmVudFxyXG4gICAgICAgIGxhYmVsczogWyflubQnLCAn5pyIJywgJ+aXpScsICflsI/ml7YnLCAn5YiG6ZKfJywgJ+enkicsICcnXSxcclxuICAgICAgICBsYWJlbHNTaG9ydDogWyflubQnLCAn5pyIJywgJ+aXpScsICfngrknLCAn5YiGJywgJ+enkicsICcnXSxcclxuICAgICAgICAvLyBUaW1lciBjb21wb25lbnRcclxuICAgICAgICBzdGFydFRleHQ6ICflvIDlp4snLFxyXG4gICAgICAgIHN0b3BUZXh0OiAn5YGc5q2iJyxcclxuICAgICAgICByZXNldFRleHQ6ICfph43nva4nLFxyXG4gICAgICAgIGxhcFRleHQ6ICflnIgnLFxyXG4gICAgICAgIGhpZGVUZXh0OiAn6ZqQ6JePJ1xyXG4gICAgfSk7XHJcbn0pKGpRdWVyeSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLy8gdGhlbWUgOiBhbmRyb2lkXHJcbihmdW5jdGlvbiAoJCkge1xyXG5cclxuICAgICQubW9iaXNjcm9sbC50aGVtZXMuYW5kcm9pZCA9IHtcclxuICAgICAgICBkYXRlT3JkZXI6ICdNZGR5eScsXHJcbiAgICAgICAgbW9kZTogJ2NsaWNrcGljaycsXHJcbiAgICAgICAgaGVpZ2h0OiA1MCxcclxuICAgICAgICBzaG93TGFiZWw6IGZhbHNlLFxyXG4gICAgICAgIGJ0blN0YXJ0Q2xhc3M6ICdtYnNjLWljIG1ic2MtaWMtcGxheTMnLFxyXG4gICAgICAgIGJ0blN0b3BDbGFzczogJ21ic2MtaWMgbWJzYy1pYy1wYXVzZTInLFxyXG4gICAgICAgIGJ0blJlc2V0Q2xhc3M6ICdtYnNjLWljIG1ic2MtaWMtc3RvcDInLFxyXG4gICAgICAgIGJ0bkxhcENsYXNzOiAnbWJzYy1pYyBtYnNjLWljLWxvb3AyJ1xyXG4gICAgfTtcclxuXHJcbn0pKGpRdWVyeSk7XHJcblxyXG5cclxuXHJcblxyXG4vLyB0aGVtZSA6IGFuZHJvaWQtaG9sb1xyXG4oZnVuY3Rpb24gKCQpIHtcclxuICAgIHZhciB0aGVtZXMgPSAkLm1vYmlzY3JvbGwudGhlbWVzLFxyXG4gICAgICAgIHRoZW1lID0ge1xyXG4gICAgICAgICAgICBkYXRlT3JkZXI6ICdNZGR5eScsXHJcbiAgICAgICAgICAgIC8vbW9kZTogJ21peGVkJyxcclxuICAgICAgICAgICAgcm93czogNSxcclxuICAgICAgICAgICAgbWluV2lkdGg6IDc2LFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDM2LFxyXG4gICAgICAgICAgICBzaG93TGFiZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICBzZWxlY3RlZExpbmVIZWlnaHQ6IHRydWUsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkTGluZUJvcmRlcjogMixcclxuICAgICAgICAgICAgdXNlU2hvcnRMYWJlbHM6IHRydWUsXHJcbiAgICAgICAgICAgIGljb246IHsgZmlsbGVkOiAnc3RhcjMnLCBlbXB0eTogJ3N0YXInIH0sXHJcbiAgICAgICAgICAgIGJ0blBsdXNDbGFzczogJ21ic2MtaWMgbWJzYy1pYy1hcnJvdy1kb3duNicsXHJcbiAgICAgICAgICAgIGJ0bk1pbnVzQ2xhc3M6ICdtYnNjLWljIG1ic2MtaWMtYXJyb3ctdXA2JyxcclxuICAgICAgICAgICAgLy8gQGRlcHJlY2F0ZWQgc2luY2UgMi4xMi4wLCBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGNvZGVcclxuICAgICAgICAgICAgLy8gLS0tXHJcbiAgICAgICAgICAgIG9uVGhlbWVMb2FkOiBmdW5jdGlvbiAobGFuZywgcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHMudGhlbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzLnRoZW1lID0gcy50aGVtZS5yZXBsYWNlKCdhbmRyb2lkLWljcycsICdhbmRyb2lkLWhvbG8nKS5yZXBsYWNlKCcgbGlnaHQnLCAnLWxpZ2h0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIC0tLVxyXG4gICAgICAgICAgICBvbk1hcmt1cFJlYWR5OiBmdW5jdGlvbiAobWFya3VwKSB7XHJcbiAgICAgICAgICAgICAgICBtYXJrdXAuYWRkQ2xhc3MoJ21ic2MtYW5kcm9pZC1ob2xvJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgIHRoZW1lc1snYW5kcm9pZC1ob2xvJ10gPSB0aGVtZTtcclxuICAgIHRoZW1lc1snYW5kcm9pZC1ob2xvLWxpZ2h0J10gPSB0aGVtZTtcclxuXHJcbiAgICAvLyBAZGVwcmVjYXRlZCBzaW5jZSAyLjEyLjAsIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgY29kZVxyXG4gICAgdGhlbWVzWydhbmRyb2lkLWljcyddID0gdGhlbWU7XHJcbiAgICB0aGVtZXNbJ2FuZHJvaWQtaWNzIGxpZ2h0J10gPSB0aGVtZTtcclxuICAgIHRoZW1lc1snYW5kcm9pZC1ob2xvIGxpZ2h0J10gPSB0aGVtZTtcclxuXHJcbn0pKGpRdWVyeSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vIHRoZW1lIDogaW9zXHJcbihmdW5jdGlvbiAoJCkge1xyXG5cclxuICAgICQubW9iaXNjcm9sbC50aGVtZXMuaW9zID0ge1xyXG4gICAgICAgIGRpc3BsYXk6ICdib3R0b20nLFxyXG4gICAgICAgIGRhdGVPcmRlcjogJ01NZHl5JyxcclxuICAgICAgICByb3dzOiA1LFxyXG4gICAgICAgIGhlaWdodDogMzAsXHJcbiAgICAgICAgbWluV2lkdGg6IDYwLFxyXG4gICAgICAgIGhlYWRlclRleHQ6IGZhbHNlLFxyXG4gICAgICAgIHNob3dMYWJlbDogZmFsc2UsXHJcbiAgICAgICAgYnRuV2lkdGg6IGZhbHNlLFxyXG4gICAgICAgIHNlbGVjdGVkTGluZUhlaWdodDogdHJ1ZSxcclxuICAgICAgICBzZWxlY3RlZExpbmVCb3JkZXI6IDIsXHJcbiAgICAgICAgdXNlU2hvcnRMYWJlbHM6IHRydWVcclxuICAgIH07XHJcblxyXG59KShqUXVlcnkpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyB0aGVtZSA6IGlvczdcclxuKGZ1bmN0aW9uICgkKSB7XHJcblxyXG4gICAgJC5tb2Jpc2Nyb2xsLnRoZW1lcy5pb3M3ID0ge1xyXG4gICAgICAgIGRpc3BsYXk6ICdib3R0b20nLFxyXG4gICAgICAgIGRhdGVPcmRlcjogJ01NZHl5JyxcclxuICAgICAgICByb3dzOiA1LFxyXG4gICAgICAgIGhlaWdodDogMzQsXHJcbiAgICAgICAgbWluV2lkdGg6IDU1LFxyXG4gICAgICAgIGhlYWRlclRleHQ6IGZhbHNlLFxyXG4gICAgICAgIHNob3dMYWJlbDogZmFsc2UsXHJcbiAgICAgICAgYnRuV2lkdGg6IGZhbHNlLFxyXG4gICAgICAgIHNlbGVjdGVkTGluZUhlaWdodDogdHJ1ZSxcclxuICAgICAgICBzZWxlY3RlZExpbmVCb3JkZXI6IDEsXHJcbiAgICAgICAgdXNlU2hvcnRMYWJlbHM6IHRydWUsXHJcbiAgICAgICAgZGVsZXRlSWNvbjogJ2JhY2tzcGFjZTMnLFxyXG4gICAgICAgIGNoZWNrSWNvbjogJ2lvbi1pb3M3LWNoZWNrbWFyay1lbXB0eScsXHJcbiAgICAgICAgYnRuQ2FsUHJldkNsYXNzOiAnbWJzYy1pYyBtYnNjLWljLWFycm93LWxlZnQ1JyxcclxuICAgICAgICBidG5DYWxOZXh0Q2xhc3M6ICdtYnNjLWljIG1ic2MtaWMtYXJyb3ctcmlnaHQ1JyxcclxuICAgICAgICBidG5QbHVzQ2xhc3M6ICdtYnNjLWljIG1ic2MtaWMtYXJyb3ctZG93bjUnLFxyXG4gICAgICAgIGJ0bk1pbnVzQ2xhc3M6ICdtYnNjLWljIG1ic2MtaWMtYXJyb3ctdXA1J1xyXG4gICAgfTtcclxuXHJcbn0pKGpRdWVyeSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuLy8gdGhlbWUgOiBqcXVlcnkgbW9iaWxlXHJcbihmdW5jdGlvbiAoJCkge1xyXG5cclxuICAgIHZhciB2ZXIgPSAkLm1vYmlsZSAmJiAkLm1vYmlsZS52ZXJzaW9uLm1hdGNoKC8xXFwuNC8pO1xyXG5cclxuICAgICQubW9iaXNjcm9sbC50aGVtZXMuanFtID0ge1xyXG4gICAgICAgIGpxbUJvcmRlcjogJ2EnLFxyXG4gICAgICAgIGpxbUJvZHk6IHZlciA/ICdhJyA6ICdjJyxcclxuICAgICAgICBqcW1IZWFkZXI6ICdiJyxcclxuICAgICAgICBqcW1XaGVlbDogJ2QnLFxyXG4gICAgICAgIGpxbUxpbmU6ICdiJyxcclxuICAgICAgICBqcW1DbGlja1BpY2s6ICdjJyxcclxuICAgICAgICBqcW1TZXQ6ICdiJyxcclxuICAgICAgICBqcW1DYW5jZWw6ICdjJyxcclxuICAgICAgICBkaXNhYmxlZENsYXNzOiAndWktZGlzYWJsZWQnLFxyXG4gICAgICAgIGFjdGl2ZUNsYXNzOiAndWktYnRuLWFjdGl2ZScsXHJcbiAgICAgICAgYWN0aXZlVGFiSW5uZXJDbGFzczogJ3VpLWJ0bi1hY3RpdmUnLFxyXG4gICAgICAgIGJ0bkNhbFByZXZDbGFzczogJycsXHJcbiAgICAgICAgYnRuQ2FsTmV4dENsYXNzOiAnJyxcclxuICAgICAgICBzZWxlY3RlZExpbmVIZWlnaHQ6IHRydWUsXHJcbiAgICAgICAgc2VsZWN0ZWRMaW5lQm9yZGVyOiAxLFxyXG4gICAgICAgIG9uVGhlbWVMb2FkOiBmdW5jdGlvbiAobGFuZywgcykge1xyXG4gICAgICAgICAgICB2YXIgY2FsID0gcy5qcW1Cb2R5IHx8ICdjJyxcclxuICAgICAgICAgICAgICAgIHR4dCA9IHMuanFtRXZlbnRUZXh0IHx8ICdiJyxcclxuICAgICAgICAgICAgICAgIGJ1YmJsZSA9IHMuanFtRXZlbnRCdWJibGUgfHwgJ2EnO1xyXG5cclxuICAgICAgICAgICAgcy5kYXlDbGFzcyA9ICd1aS1ib2R5LWEgdWktYm9keS0nICsgY2FsO1xyXG4gICAgICAgICAgICBzLmlubmVyRGF5Q2xhc3MgPSAndWktc3RhdGUtZGVmYXVsdCB1aS1idG4gdWktYnRuLXVwLScgKyBjYWw7XHJcbiAgICAgICAgICAgIHMuY2FsZW5kYXJDbGFzcyA9ICd1aS1ib2R5LWEgdWktYm9keS0nICsgY2FsO1xyXG4gICAgICAgICAgICBzLndlZWtOckNsYXNzID0gJ3VpLWJvZHktYSB1aS1ib2R5LScgKyBjYWw7XHJcbiAgICAgICAgICAgIHMuZXZlbnRUZXh0Q2xhc3MgPSAndWktYnRuLXVwLScgKyB0eHQ7XHJcbiAgICAgICAgICAgIHMuZXZlbnRCdWJibGVDbGFzcyA9ICd1aS1ib2R5LScgKyBidWJibGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkV2ZW50QnViYmxlU2hvdzogZnVuY3Rpb24gKGV2ZCwgZXZjKSB7XHJcbiAgICAgICAgICAgICQoJy5kdy1jYWwtZXZlbnQtbGlzdCcsIGV2YykuYXR0cignZGF0YS1yb2xlJywgJ2xpc3R2aWV3Jyk7XHJcbiAgICAgICAgICAgIGV2Yy5wYWdlKCkudHJpZ2dlcignY3JlYXRlJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbk1hcmt1cEluc2VydGVkOiBmdW5jdGlvbiAoZWxtLCBpbnN0KSB7XHJcbiAgICAgICAgICAgIHZhciBzID0gaW5zdC5zZXR0aW5ncztcclxuXHJcbiAgICAgICAgICAgIGlmICh2ZXIpIHtcclxuICAgICAgICAgICAgICAgIGVsbS5hZGRDbGFzcygnbWJzYy1qcW0xNCcpO1xyXG4gICAgICAgICAgICAgICAgJCgnLm1ic2MtbnAtYnRuLCAuZHd3YiwgLmR3LWNhbC1zYy1tLWNlbGwgLmR3LWknLCBlbG0pLmFkZENsYXNzKCd1aS1idG4nKTtcclxuICAgICAgICAgICAgICAgICQoJy5kd2JjIHNwYW4uZHdiLCAuZHctZHInLCBlbG0pLmFkZENsYXNzKCd1aS1idG4gdWktbWluaSB1aS1jb3JuZXItYWxsJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuZHctY2FsLXByZXYgLmR3LWNhbC1idG4tdHh0JywgZWxtKS5hZGRDbGFzcygndWktYnRuIHVpLWljb24tYXJyb3ctbCB1aS1idG4taWNvbi1ub3RleHQgdWktc2hhZG93IHVpLWNvcm5lci1hbGwnKTtcclxuICAgICAgICAgICAgICAgICQoJy5kdy1jYWwtbmV4dCAuZHctY2FsLWJ0bi10eHQnLCBlbG0pLmFkZENsYXNzKCd1aS1idG4gdWktaWNvbi1hcnJvdy1yIHVpLWJ0bi1pY29uLW5vdGV4dCB1aS1zaGFkb3cgdWktY29ybmVyLWFsbCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKCcuZHcnLCBlbG0pLnJlbW92ZUNsYXNzKCdkd2JnJykuYWRkQ2xhc3MoJ3VpLXNlbGVjdG1lbnUgdWktb3ZlcmxheS1zaGFkb3cgdWktY29ybmVyLWFsbCB1aS1ib2R5LScgKyBzLmpxbUJvcmRlcik7XHJcbiAgICAgICAgICAgICQoJy5kd2JjIC5kd2InLCBlbG0pLmF0dHIoJ2RhdGEtcm9sZScsICdidXR0b24nKS5hdHRyKCdkYXRhLW1pbmknLCAndHJ1ZScpLmF0dHIoJ2RhdGEtdGhlbWUnLCBzLmpxbUNhbmNlbCk7XHJcbiAgICAgICAgICAgICQoJy5kd2ItcyAuZHdiJywgZWxtKS5hZGRDbGFzcygndWktYnRuLScgKyBzLmpxbVNldCkuYXR0cignZGF0YS10aGVtZScsIHMuanFtU2V0KTtcclxuICAgICAgICAgICAgJCgnLmR3d2InLCBlbG0pLmF0dHIoJ2RhdGEtcm9sZScsICdidXR0b24nKS5hdHRyKCdkYXRhLXRoZW1lJywgcy5qcW1DbGlja1BpY2spO1xyXG4gICAgICAgICAgICAkKCcuZHd2JywgZWxtKS5hZGRDbGFzcygndWktaGVhZGVyIHVpLWJhci0nICsgcy5qcW1IZWFkZXIpO1xyXG4gICAgICAgICAgICAkKCcuZHd3cicsIGVsbSkuYWRkQ2xhc3MoJ3VpLWNvcm5lci1hbGwgdWktYm9keS0nICsgcy5qcW1Cb2R5KTtcclxuICAgICAgICAgICAgJCgnLmR3d2wnLCBlbG0pLmFkZENsYXNzKCd1aS1ib2R5LScgKyBzLmpxbVdoZWVsKTtcclxuICAgICAgICAgICAgJCgnLmR3d29sJywgZWxtKS5hZGRDbGFzcygndWktYm9keS0nICsgcy5qcW1MaW5lKTtcclxuICAgICAgICAgICAgJCgnLmR3bCcsIGVsbSkuYWRkQ2xhc3MoJ3VpLWJvZHktJyArIHMuanFtQm9keSk7XHJcbiAgICAgICAgICAgIC8vIENhbGVuZGFyIGJhc2VcclxuICAgICAgICAgICAgJCgnLmR3LWNhbC10YWJzJywgZWxtKS5hdHRyKCdkYXRhLXJvbGUnLCAnbmF2YmFyJyk7XHJcbiAgICAgICAgICAgICQoJy5kdy1jYWwtcHJldiAuZHctY2FsLWJ0bi10eHQnLCBlbG0pLmF0dHIoJ2RhdGEtcm9sZScsICdidXR0b24nKS5hdHRyKCdkYXRhLWljb24nLCAnYXJyb3ctbCcpLmF0dHIoJ2RhdGEtaWNvbnBvcycsICdub3RleHQnKTtcclxuICAgICAgICAgICAgJCgnLmR3LWNhbC1uZXh0IC5kdy1jYWwtYnRuLXR4dCcsIGVsbSkuYXR0cignZGF0YS1yb2xlJywgJ2J1dHRvbicpLmF0dHIoJ2RhdGEtaWNvbicsICdhcnJvdy1yJykuYXR0cignZGF0YS1pY29ucG9zJywgJ25vdGV4dCcpO1xyXG4gICAgICAgICAgICAvLyBDYWxlbmRhciBldmVudHNcclxuICAgICAgICAgICAgJCgnLmR3LWNhbC1ldmVudHMnLCBlbG0pLmF0dHIoJ2RhdGEtcm9sZScsICdwYWdlJyk7XHJcbiAgICAgICAgICAgIC8vIFJhbmdlcGlja2VyXHJcbiAgICAgICAgICAgICQoJy5kdy1kcicsIGVsbSkuYXR0cignZGF0YS1yb2xlJywgJ2J1dHRvbicpLmF0dHIoJ2RhdGEtbWluaScsICd0cnVlJyk7XHJcbiAgICAgICAgICAgIC8vIE51bXBhZFxyXG4gICAgICAgICAgICAkKCcubWJzYy1ucC1idG4nLCBlbG0pLmF0dHIoJ2RhdGEtcm9sZScsICdidXR0b24nKS5hdHRyKCdkYXRhLWNvcm5lcnMnLCAnZmFsc2UnKTtcclxuICAgICAgICAgICAgZWxtLnRyaWdnZXIoJ2NyZWF0ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG59KShqUXVlcnkpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuLy8gdGhlbWUgOiBzZW5zZS11aVxyXG4oZnVuY3Rpb24gKCQpIHtcclxuXHJcbiAgICAkLm1vYmlzY3JvbGwudGhlbWVzWydzZW5zZS11aSddID0ge1xyXG4gICAgICAgIGJ0blN0YXJ0Q2xhc3M6ICdtYnNjLWljIG1ic2MtaWMtcGxheTMnLFxyXG4gICAgICAgIGJ0blN0b3BDbGFzczogJ21ic2MtaWMgbWJzYy1pYy1wYXVzZTInLFxyXG4gICAgICAgIGJ0blJlc2V0Q2xhc3M6ICdtYnNjLWljIG1ic2MtaWMtc3RvcDInLFxyXG4gICAgICAgIGJ0bkxhcENsYXNzOiAnbWJzYy1pYyBtYnNjLWljLWxvb3AyJ1xyXG4gICAgfTtcclxuXHJcbn0pKGpRdWVyeSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4vLyB0aGVtZSA6IHdpbmRvd3MgcGhvbmVcclxuKGZ1bmN0aW9uICgkKSB7XHJcblxyXG4gICAgdmFyIHRoZW1lcyA9ICQubW9iaXNjcm9sbC50aGVtZXMsXHJcbiAgICAgICAgdGhlbWUgPSB7XHJcbiAgICAgICAgICAgIG1pbldpZHRoOiA3NixcclxuICAgICAgICAgICAgaGVpZ2h0OiA3NixcclxuICAgICAgICAgICAgYWNjZW50OiAnbm9uZScsXHJcbiAgICAgICAgICAgIGRhdGVPcmRlcjogJ21tTU1kZEREeXknLFxyXG4gICAgICAgICAgICBoZWFkZXJUZXh0OiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd0xhYmVsOiBmYWxzZSxcclxuICAgICAgICAgICAgZGVsZXRlSWNvbjogJ2JhY2tzcGFjZTQnLFxyXG4gICAgICAgICAgICBpY29uOiB7IGZpbGxlZDogJ3N0YXIzJywgZW1wdHk6ICdzdGFyJyB9LFxyXG4gICAgICAgICAgICBidG5XaWR0aDogZmFsc2UsXHJcbiAgICAgICAgICAgIGJ0blN0YXJ0Q2xhc3M6ICdtYnNjLWljIG1ic2MtaWMtcGxheTMnLFxyXG4gICAgICAgICAgICBidG5TdG9wQ2xhc3M6ICdtYnNjLWljIG1ic2MtaWMtcGF1c2UyJyxcclxuICAgICAgICAgICAgYnRuUmVzZXRDbGFzczogJ21ic2MtaWMgbWJzYy1pYy1zdG9wMicsXHJcbiAgICAgICAgICAgIGJ0bkxhcENsYXNzOiAnbWJzYy1pYyBtYnNjLWljLWxvb3AyJyxcclxuICAgICAgICAgICAgYnRuSGlkZUNsYXNzOiAnbWJzYy1pYyBtYnNjLWljLWNsb3NlJyxcclxuICAgICAgICAgICAgYnRuQ2FsUHJldkNsYXNzOiAnbWJzYy1pYyBtYnNjLWljLWFycm93LWxlZnQyJyxcclxuICAgICAgICAgICAgYnRuQ2FsTmV4dENsYXNzOiAnbWJzYy1pYyBtYnNjLWljLWFycm93LXJpZ2h0MicsXHJcbiAgICAgICAgICAgIGJ0blBsdXNDbGFzczogJ21ic2MtaWMgbWJzYy1pYy1wbHVzJyxcclxuICAgICAgICAgICAgYnRuTWludXNDbGFzczogJ21ic2MtaWMgbWJzYy1pYy1taW51cycsXHJcbiAgICAgICAgICAgIG9uTWFya3VwSW5zZXJ0ZWQ6IGZ1bmN0aW9uIChlbG0sIGluc3QpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbGljayxcclxuICAgICAgICAgICAgICAgICAgICB0b3VjaCxcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmU7XHJcblxyXG4gICAgICAgICAgICAgICAgZWxtLmFkZENsYXNzKCdtYnNjLXdwJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmR3JywgZWxtKS5hZGRDbGFzcygnbWJzYy13cC0nICsgaW5zdC5zZXR0aW5ncy5hY2NlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5kd2ItcyAuZHdiJywgZWxtKS5hZGRDbGFzcygnbWJzYy1pYyBtYnNjLWljLWNoZWNrbWFyaycpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmR3Yi1jIC5kd2InLCBlbG0pLmFkZENsYXNzKCdtYnNjLWljIG1ic2MtaWMtY2xvc2UnKTtcclxuICAgICAgICAgICAgICAgICQoJy5kd2ItY2wgLmR3YicsIGVsbSkuYWRkQ2xhc3MoJ21ic2MtaWMgbWJzYy1pYy1jbG9zZScpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmR3Yi1uIC5kd2InLCBlbG0pLmFkZENsYXNzKCdtYnNjLWljIG1ic2MtaWMtbG9vcDInKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAkKCcuZHd3bCcsIGVsbSkub24oJ3RvdWNoc3RhcnQgbW91c2Vkb3duIERPTU1vdXNlU2Nyb2xsIG1vdXNld2hlZWwnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnR5cGUgPT09ICdtb3VzZWRvd24nICYmIHRvdWNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdG91Y2ggPSBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JztcclxuICAgICAgICAgICAgICAgICAgICBjbGljayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlID0gJCh0aGlzKS5oYXNDbGFzcygnd3BhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmR3d2wnLCBlbG0pLnJlbW92ZUNsYXNzKCd3cGEnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCd3cGEnKTtcclxuICAgICAgICAgICAgICAgIH0pLm9uKCd0b3VjaG1vdmUgbW91c2Vtb3ZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KS5vbigndG91Y2hlbmQgbW91c2V1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWNrICYmIGFjdGl2ZSAmJiAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuZHctbGknKS5oYXNDbGFzcygnZHctc2VsJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnd3BhJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnR5cGUgPT09ICdtb3VzZXVwJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uVGhlbWVMb2FkOiBmdW5jdGlvbiAobGFuZywgcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxhbmcgJiYgbGFuZy5kYXRlT3JkZXIgJiYgIXMuZGF0ZU9yZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9yZCA9IGxhbmcuZGF0ZU9yZGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIG9yZCA9IG9yZC5tYXRjaCgvbW0vaSkgPyBvcmQucmVwbGFjZSgvbW1NTXxtbXxNTS8sICAnbW1NTScpIDogb3JkLnJlcGxhY2UoL21NfG18TS8sICAnbU0nKTtcclxuICAgICAgICAgICAgICAgICAgICBvcmQgPSBvcmQubWF0Y2goL2RkL2kpID8gb3JkLnJlcGxhY2UoL2RkRER8ZGR8REQvLCAgJ2RkREQnKSA6IG9yZC5yZXBsYWNlKC9kRHxkfEQvLCAgJ2REJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcy5kYXRlT3JkZXIgPSBvcmQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBAZGVwcmVjYXRlZCBzaW5jZSAyLjEyLjAsIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgY29kZVxyXG4gICAgICAgICAgICAgICAgLy8gLS0tXHJcbiAgICAgICAgICAgICAgICBpZiAocy50aGVtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHMudGhlbWUgPSBzLnRoZW1lLnJlcGxhY2UoJyBsaWdodCcsICctbGlnaHQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIC0tLVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB0aGVtZXMud3AgPSB0aGVtZTtcclxuICAgIHRoZW1lc1snd3AtbGlnaHQnXSA9IHRoZW1lO1xyXG5cclxuICAgIC8vIEBkZXByZWNhdGVkIHNpbmNlIDIuMTIuMCwgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBjb2RlXHJcbiAgICB0aGVtZXNbJ3dwIGxpZ2h0J10gPSB0aGVtZTtcclxuXHJcbn0pKGpRdWVyeSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4oZnVuY3Rpb24gKCQsIHVuZGVmaW5lZCkge1xyXG4gICAgdmFyIG1zID0gJC5tb2Jpc2Nyb2xsO1xyXG5cclxuICAgIG1zLmRhdGV0aW1lID0ge1xyXG4gICAgICAgIGRlZmF1bHRzOiB7XHJcbiAgICAgICAgICAgIHNob3J0WWVhckN1dG9mZjogJysxMCcsXHJcbiAgICAgICAgICAgIG1vbnRoTmFtZXM6IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddLFxyXG4gICAgICAgICAgICBtb250aE5hbWVzU2hvcnQ6IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXSxcclxuICAgICAgICAgICAgZGF5TmFtZXM6IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXSxcclxuICAgICAgICAgICAgZGF5TmFtZXNTaG9ydDogWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXSxcclxuICAgICAgICAgICAgZGF5TmFtZXNNaW46IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddLFxyXG4gICAgICAgICAgICBtb250aFRleHQ6ICdNb250aCcsXHJcbiAgICAgICAgICAgIGFtVGV4dDogJ2FtJyxcclxuICAgICAgICAgICAgcG1UZXh0OiAncG0nLFxyXG4gICAgICAgICAgICBnZXRZZWFyOiBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC5nZXRGdWxsWWVhcigpOyB9LFxyXG4gICAgICAgICAgICBnZXRNb250aDogZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQuZ2V0TW9udGgoKTsgfSxcclxuICAgICAgICAgICAgZ2V0RGF5OiBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC5nZXREYXRlKCk7IH0sXHJcbiAgICAgICAgICAgIGdldERhdGU6IGZ1bmN0aW9uICh5LCBtLCBkLCBoLCBpLCBzKSB7IHJldHVybiBuZXcgRGF0ZSh5LCBtLCBkLCBoIHx8IDAsIGkgfHwgMCwgcyB8fCAwKTsgfSxcclxuICAgICAgICAgICAgZ2V0TWF4RGF5T2ZNb250aDogZnVuY3Rpb24gKHksIG0pIHsgcmV0dXJuIDMyIC0gbmV3IERhdGUoeSwgbSwgMzIpLmdldERhdGUoKTsgfSxcclxuICAgICAgICAgICAgZ2V0V2Vla051bWJlcjogZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgICAgIC8vIENvcHkgZGF0ZSBzbyBkb24ndCBtb2RpZnkgb3JpZ2luYWxcclxuICAgICAgICAgICAgICAgIGQgPSBuZXcgRGF0ZShkKTtcclxuICAgICAgICAgICAgICAgIGQuc2V0SG91cnMoMCwgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgdG8gbmVhcmVzdCBUaHVyc2RheTogY3VycmVudCBkYXRlICsgNCAtIGN1cnJlbnQgZGF5IG51bWJlclxyXG4gICAgICAgICAgICAgICAgLy8gTWFrZSBTdW5kYXkncyBkYXkgbnVtYmVyIDdcclxuICAgICAgICAgICAgICAgIGQuc2V0RGF0ZShkLmdldERhdGUoKSArIDQgLSAoZC5nZXREYXkoKSB8fCA3KSk7XHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgZmlyc3QgZGF5IG9mIHllYXJcclxuICAgICAgICAgICAgICAgIHZhciB5ZWFyU3RhcnQgPSBuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksIDAsIDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIGZ1bGwgd2Vla3MgdG8gbmVhcmVzdCBUaHVyc2RheVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbCgoKChkIC0geWVhclN0YXJ0KSAvIDg2NDAwMDAwKSArIDEpIC8gNyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogRm9ybWF0IGEgZGF0ZSBpbnRvIGEgc3RyaW5nIHZhbHVlIHdpdGggYSBzcGVjaWZpZWQgZm9ybWF0LlxyXG4gICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGZvcm1hdCBPdXRwdXQgZm9ybWF0LlxyXG4gICAgICAgICogQHBhcmFtIHtEYXRlfSBkYXRlIERhdGUgdG8gZm9ybWF0LlxyXG4gICAgICAgICogQHBhcmFtIHtPYmplY3R9IFtzZXR0aW5ncz17fV0gU2V0dGluZ3MuXHJcbiAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IFJldHVybnMgdGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZy5cclxuICAgICAgICAqL1xyXG4gICAgICAgIGZvcm1hdERhdGU6IGZ1bmN0aW9uIChmb3JtYXQsIGRhdGUsIHNldHRpbmdzKSB7XHJcbiAgICAgICAgICAgIGlmICghZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHMgPSAkLmV4dGVuZCh7fSwgbXMuZGF0ZXRpbWUuZGVmYXVsdHMsIHNldHRpbmdzKSxcclxuICAgICAgICAgICAgICAgIGxvb2sgPSBmdW5jdGlvbiAobSkgeyAvLyBDaGVjayB3aGV0aGVyIGEgZm9ybWF0IGNoYXJhY3RlciBpcyBkb3VibGVkXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG4gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChpICsgMSA8IGZvcm1hdC5sZW5ndGggJiYgZm9ybWF0LmNoYXJBdChpICsgMSkgPT0gbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG47XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZjEgPSBmdW5jdGlvbiAobSwgdmFsLCBsZW4pIHsgLy8gRm9ybWF0IGEgbnVtYmVyLCB3aXRoIGxlYWRpbmcgemVybyBpZiBuZWNlc3NhcnlcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbiA9ICcnICsgdmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb29rKG0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChuLmxlbmd0aCA8IGxlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbiA9ICcwJyArIG47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG47XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZjIgPSBmdW5jdGlvbiAobSwgdmFsLCBzLCBsKSB7IC8vIEZvcm1hdCBhIG5hbWUsIHNob3J0IG9yIGxvbmcgYXMgcmVxdWVzdGVkXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChsb29rKG0pID8gbFt2YWxdIDogc1t2YWxdKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBpLFxyXG4gICAgICAgICAgICAgICAgeWVhcixcclxuICAgICAgICAgICAgICAgIG91dHB1dCA9ICcnLFxyXG4gICAgICAgICAgICAgICAgbGl0ZXJhbCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGZvcm1hdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpdGVyYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybWF0LmNoYXJBdChpKSA9PSBcIidcIiAmJiAhbG9vayhcIidcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGl0ZXJhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBmb3JtYXQuY2hhckF0KGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChmb3JtYXQuY2hhckF0KGkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2QnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGYxKCdkJywgcy5nZXREYXkoZGF0ZSksIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0QnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGYyKCdEJywgZGF0ZS5nZXREYXkoKSwgcy5kYXlOYW1lc1Nob3J0LCBzLmRheU5hbWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdvJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBmMSgnbycsIChkYXRlLmdldFRpbWUoKSAtIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgMCwgMCkuZ2V0VGltZSgpKSAvIDg2NDAwMDAwLCAzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBmMSgnbScsIHMuZ2V0TW9udGgoZGF0ZSkgKyAxLCAyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdNJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBmMignTScsIHMuZ2V0TW9udGgoZGF0ZSksIHMubW9udGhOYW1lc1Nob3J0LCBzLm1vbnRoTmFtZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3knOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhciA9IHMuZ2V0WWVhcihkYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSAobG9vaygneScpID8geWVhciA6ICh5ZWFyICUgMTAwIDwgMTAgPyAnMCcgOiAnJykgKyB5ZWFyICUgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vb3V0cHV0ICs9IChsb29rKCd5JykgPyBkYXRlLmdldEZ1bGxZZWFyKCkgOiAoZGF0ZS5nZXRZZWFyKCkgJSAxMDAgPCAxMCA/ICcwJyA6ICcnKSArIGRhdGUuZ2V0WWVhcigpICUgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdoJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoID0gZGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGYxKCdoJywgKGggPiAxMiA/IChoIC0gMTIpIDogKGggPT09IDAgPyAxMiA6IGgpKSwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnSCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZjEoJ0gnLCBkYXRlLmdldEhvdXJzKCksIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2knOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGYxKCdpJywgZGF0ZS5nZXRNaW51dGVzKCksIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGYxKCdzJywgZGF0ZS5nZXRTZWNvbmRzKCksIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2EnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGRhdGUuZ2V0SG91cnMoKSA+IDExID8gcy5wbVRleHQgOiBzLmFtVGV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdBJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBkYXRlLmdldEhvdXJzKCkgPiAxMSA/IHMucG1UZXh0LnRvVXBwZXJDYXNlKCkgOiBzLmFtVGV4dC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCInXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9vayhcIidcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gXCInXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpdGVyYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gZm9ybWF0LmNoYXJBdChpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogRXh0cmFjdCBhIGRhdGUgZnJvbSBhIHN0cmluZyB2YWx1ZSB3aXRoIGEgc3BlY2lmaWVkIGZvcm1hdC5cclxuICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmb3JtYXQgSW5wdXQgZm9ybWF0LlxyXG4gICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIFN0cmluZyB0byBwYXJzZS5cclxuICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbc2V0dGluZ3M9e31dIFNldHRpbmdzLlxyXG4gICAgICAgICogQHJldHVybiB7RGF0ZX0gUmV0dXJucyB0aGUgZXh0cmFjdGVkIGRhdGUuXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwYXJzZURhdGU6IGZ1bmN0aW9uIChmb3JtYXQsIHZhbHVlLCBzZXR0aW5ncykge1xyXG4gICAgICAgICAgICB2YXIgcyA9ICQuZXh0ZW5kKHt9LCBtcy5kYXRldGltZS5kZWZhdWx0cywgc2V0dGluZ3MpLFxyXG4gICAgICAgICAgICAgICAgZGVmID0gcy5kZWZhdWx0VmFsdWUgfHwgbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZm9ybWF0IHx8ICF2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSWYgYWxyZWFkeSBhIGRhdGUgb2JqZWN0XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5nZXRUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhbHVlID0gKHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JyA/IHZhbHVlLnRvU3RyaW5nKCkgOiB2YWx1ZSArICcnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzaG9ydFllYXJDdXRvZmYgPSBzLnNob3J0WWVhckN1dG9mZixcclxuICAgICAgICAgICAgICAgIHllYXIgPSBzLmdldFllYXIoZGVmKSxcclxuICAgICAgICAgICAgICAgIG1vbnRoID0gcy5nZXRNb250aChkZWYpICsgMSxcclxuICAgICAgICAgICAgICAgIGRheSA9IHMuZ2V0RGF5KGRlZiksXHJcbiAgICAgICAgICAgICAgICBkb3kgPSAtMSxcclxuICAgICAgICAgICAgICAgIGhvdXJzID0gZGVmLmdldEhvdXJzKCksXHJcbiAgICAgICAgICAgICAgICBtaW51dGVzID0gZGVmLmdldE1pbnV0ZXMoKSxcclxuICAgICAgICAgICAgICAgIHNlY29uZHMgPSAwLCAvL2RlZi5nZXRTZWNvbmRzKCksXHJcbiAgICAgICAgICAgICAgICBhbXBtID0gLTEsXHJcbiAgICAgICAgICAgICAgICBsaXRlcmFsID0gZmFsc2UsIC8vIENoZWNrIHdoZXRoZXIgYSBmb3JtYXQgY2hhcmFjdGVyIGlzIGRvdWJsZWRcclxuICAgICAgICAgICAgICAgIGxvb2tBaGVhZCA9IGZ1bmN0aW9uIChtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaGVzID0gKGlGb3JtYXQgKyAxIDwgZm9ybWF0Lmxlbmd0aCAmJiBmb3JtYXQuY2hhckF0KGlGb3JtYXQgKyAxKSA9PSBtYXRjaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaUZvcm1hdCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlcztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBnZXROdW1iZXIgPSBmdW5jdGlvbiAobWF0Y2gpIHsgLy8gRXh0cmFjdCBhIG51bWJlciBmcm9tIHRoZSBzdHJpbmcgdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICBsb29rQWhlYWQobWF0Y2gpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzaXplID0gKG1hdGNoID09ICdAJyA/IDE0IDogKG1hdGNoID09ICchJyA/IDIwIDogKG1hdGNoID09ICd5JyA/IDQgOiAobWF0Y2ggPT0gJ28nID8gMyA6IDIpKSkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaWdpdHMgPSBuZXcgUmVnRXhwKCdeXFxcXGR7MSwnICsgc2l6ZSArICd9JyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bSA9IHZhbHVlLnN1YnN0cihpVmFsdWUpLm1hdGNoKGRpZ2l0cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpVmFsdWUgKz0gbnVtWzBdLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQobnVtWzBdLCAxMCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZ2V0TmFtZSA9IGZ1bmN0aW9uIChtYXRjaCwgcywgbCkgeyAvLyBFeHRyYWN0IGEgbmFtZSBmcm9tIHRoZSBzdHJpbmcgdmFsdWUgYW5kIGNvbnZlcnQgdG8gYW4gaW5kZXhcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZXMgPSAobG9va0FoZWFkKG1hdGNoKSA/IGwgOiBzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5zdWJzdHIoaVZhbHVlLCBuYW1lc1tpXS5sZW5ndGgpLnRvTG93ZXJDYXNlKCkgPT0gbmFtZXNbaV0udG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaVZhbHVlICs9IG5hbWVzW2ldLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjaGVja0xpdGVyYWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaVZhbHVlKys7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaVZhbHVlID0gMCxcclxuICAgICAgICAgICAgICAgIGlGb3JtYXQ7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGlGb3JtYXQgPSAwOyBpRm9ybWF0IDwgZm9ybWF0Lmxlbmd0aDsgaUZvcm1hdCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGl0ZXJhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtYXQuY2hhckF0KGlGb3JtYXQpID09IFwiJ1wiICYmICFsb29rQWhlYWQoXCInXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpdGVyYWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0xpdGVyYWwoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZm9ybWF0LmNoYXJBdChpRm9ybWF0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRheSA9IGdldE51bWJlcignZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ0QnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0TmFtZSgnRCcsIHMuZGF5TmFtZXNTaG9ydCwgcy5kYXlOYW1lcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3kgPSBnZXROdW1iZXIoJ28nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoID0gZ2V0TnVtYmVyKCdtJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnTSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb250aCA9IGdldE5hbWUoJ00nLCBzLm1vbnRoTmFtZXNTaG9ydCwgcy5tb250aE5hbWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd5JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXIgPSBnZXROdW1iZXIoJ3knKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdIJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdXJzID0gZ2V0TnVtYmVyKCdIJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnaCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3VycyA9IGdldE51bWJlcignaCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2knOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWludXRlcyA9IGdldE51bWJlcignaScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kcyA9IGdldE51bWJlcigncycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2EnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1wbSA9IGdldE5hbWUoJ2EnLCBbcy5hbVRleHQsIHMucG1UZXh0XSwgW3MuYW1UZXh0LCBzLnBtVGV4dF0pIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdBJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtcG0gPSBnZXROYW1lKCdBJywgW3MuYW1UZXh0LCBzLnBtVGV4dF0sIFtzLmFtVGV4dCwgcy5wbVRleHRdKSAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIidcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb29rQWhlYWQoXCInXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tMaXRlcmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpdGVyYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja0xpdGVyYWwoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHllYXIgPCAxMDApIHtcclxuICAgICAgICAgICAgICAgIHllYXIgKz0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpIC0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpICUgMTAwICtcclxuICAgICAgICAgICAgICAgICAgICAoeWVhciA8PSAodHlwZW9mIHNob3J0WWVhckN1dG9mZiAhPSAnc3RyaW5nJyA/IHNob3J0WWVhckN1dG9mZiA6IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAlIDEwMCArIHBhcnNlSW50KHNob3J0WWVhckN1dG9mZiwgMTApKSA/IDAgOiAtMTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZG95ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIG1vbnRoID0gMTtcclxuICAgICAgICAgICAgICAgIGRheSA9IGRveTtcclxuICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGltID0gMzIgLSBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIDMyKS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRheSA8PSBkaW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoKys7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5IC09IGRpbTtcclxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhvdXJzID0gKGFtcG0gPT0gLTEpID8gaG91cnMgOiAoKGFtcG0gJiYgaG91cnMgPCAxMikgPyAoaG91cnMgKyAxMikgOiAoIWFtcG0gJiYgaG91cnMgPT0gMTIgPyAwIDogaG91cnMpKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRlID0gcy5nZXREYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5LCBob3VycywgbWludXRlcywgc2Vjb25kcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocy5nZXRZZWFyKGRhdGUpICE9IHllYXIgfHwgcy5nZXRNb250aChkYXRlKSArIDEgIT0gbW9udGggfHwgcy5nZXREYXkoZGF0ZSkgIT0gZGF5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmOyAvLyBJbnZhbGlkIGRhdGVcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBAZGVwcmVjYXRlZCBzaW5jZSAyLjExLjAsIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgY29kZVxyXG4gICAgLy8gLS0tXHJcbiAgICBtcy5mb3JtYXREYXRlID0gbXMuZGF0ZXRpbWUuZm9ybWF0RGF0ZTtcclxuICAgIG1zLnBhcnNlRGF0ZSA9IG1zLmRhdGV0aW1lLnBhcnNlRGF0ZTtcclxuICAgIC8vIC0tLVxyXG4gICAgXHJcbn0pKGpRdWVyeSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcclxuXHJcbiAgICB2YXIgJGFjdGl2ZUVsbSxcclxuICAgICAgICBwcmV2ZW50U2hvdyxcclxuICAgICAgICBleHRlbmQgPSAkLmV4dGVuZCxcclxuICAgICAgICBtcyA9ICQubW9iaXNjcm9sbCxcclxuICAgICAgICBpbnN0YW5jZXMgPSBtcy5pbnN0YW5jZXMsXHJcbiAgICAgICAgdXNlcmRlZiA9IG1zLnVzZXJkZWYsXHJcbiAgICAgICAgdXRpbCA9IG1zLnV0aWwsXHJcbiAgICAgICAgcHIgPSB1dGlsLmpzUHJlZml4LFxyXG4gICAgICAgIGhhczNkID0gdXRpbC5oYXMzZCxcclxuICAgICAgICBnZXRDb29yZCA9IHV0aWwuZ2V0Q29vcmQsXHJcbiAgICAgICAgY29uc3RyYWluID0gdXRpbC5jb25zdHJhaW4sXHJcbiAgICAgICAgaXNPbGRBbmRyb2lkID0gL2FuZHJvaWQgWzEtM10vaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLFxyXG4gICAgICAgIGFuaW1FbmQgPSAnd2Via2l0QW5pbWF0aW9uRW5kIGFuaW1hdGlvbmVuZCcsXHJcbiAgICAgICAgZW1wdHkgPSBmdW5jdGlvbiAoKSB7IH0sXHJcbiAgICAgICAgcHJldmRlZiA9IGZ1bmN0aW9uIChldikgeyBldi5wcmV2ZW50RGVmYXVsdCgpOyB9O1xyXG5cclxuICAgIG1zLmNsYXNzZXMuV2lkZ2V0ID0gZnVuY3Rpb24gKGVsLCBzZXR0aW5ncywgaW5oZXJpdCkge1xyXG4gICAgICAgIHZhciAkYXJpYURpdixcclxuICAgICAgICAgICAgJGN0eCxcclxuICAgICAgICAgICAgJGhlYWRlcixcclxuICAgICAgICAgICAgJG1hcmt1cCxcclxuICAgICAgICAgICAgJG92ZXJsYXksXHJcbiAgICAgICAgICAgICRwZXJzcCxcclxuICAgICAgICAgICAgJHBvcHVwLFxyXG4gICAgICAgICAgICAkd25kLFxyXG4gICAgICAgICAgICAkd3JhcHBlcixcclxuICAgICAgICAgICAgYnV0dG9ucyxcclxuICAgICAgICAgICAgYnRuLFxyXG4gICAgICAgICAgICBkb0FuaW0sXHJcbiAgICAgICAgICAgIGhhc0J1dHRvbnMsXHJcbiAgICAgICAgICAgIGlzTW9kYWwsXHJcbiAgICAgICAgICAgIGxhbmcsXHJcbiAgICAgICAgICAgIG1vZGFsV2lkdGgsXHJcbiAgICAgICAgICAgIG1vZGFsSGVpZ2h0LFxyXG4gICAgICAgICAgICBwb3NFdmVudHMsXHJcbiAgICAgICAgICAgIHByZXNldCxcclxuICAgICAgICAgICAgcHJldmVudFBvcyxcclxuICAgICAgICAgICAgcyxcclxuICAgICAgICAgICAgc2Nyb2xsTG9jayxcclxuICAgICAgICAgICAgc2V0UmVhZE9ubHksXHJcbiAgICAgICAgICAgIHRoZW1lLFxyXG4gICAgICAgICAgICB3YXNSZWFkT25seSxcclxuICAgICAgICAgICAgd25kV2lkdGgsXHJcbiAgICAgICAgICAgIHduZEhlaWdodCxcclxuXHJcbiAgICAgICAgICAgIHRoYXQgPSB0aGlzLFxyXG4gICAgICAgICAgICAkZWxtID0gJChlbCksXHJcbiAgICAgICAgICAgIGVsbUxpc3QgPSBbXSxcclxuICAgICAgICAgICAgcG9zRGVib3VuY2UgPSB7fTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25CdG5TdGFydChldikge1xyXG4gICAgICAgICAgICAvLyBDYW4ndCBjYWxsIHByZXZlbnREZWZhdWx0IGhlcmUsIGl0IGtpbGxzIHBhZ2Ugc2Nyb2xsXHJcbiAgICAgICAgICAgIGlmIChidG4pIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5yZW1vdmVDbGFzcygnZHdiLWEnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidG4gPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAvLyBBY3RpdmUgYnV0dG9uXHJcbiAgICAgICAgICAgIGlmICghYnRuLmhhc0NsYXNzKCdkd2ItZCcpICYmICFidG4uaGFzQ2xhc3MoJ2R3Yi1uaGwnKSkge1xyXG4gICAgICAgICAgICAgICAgYnRuLmFkZENsYXNzKCdkd2ItYScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldi50eXBlID09PSAnbW91c2Vkb3duJykge1xyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ21vdXNldXAnLCBvbkJ0bkVuZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uQnRuRW5kKGV2KSB7XHJcbiAgICAgICAgICAgIGlmIChidG4pIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5yZW1vdmVDbGFzcygnZHdiLWEnKTtcclxuICAgICAgICAgICAgICAgIGJ0biA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2LnR5cGUgPT09ICdtb3VzZXVwJykge1xyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub2ZmKCdtb3VzZXVwJywgb25CdG5FbmQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvblNob3cocHJldkZvY3VzKSB7XHJcbiAgICAgICAgICAgIGlmICghcHJldkZvY3VzKSB7XHJcbiAgICAgICAgICAgICAgICAkcG9wdXAuZm9jdXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGF0LmFyaWFNZXNzYWdlKHMuYXJpYU1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25IaWRlKHByZXZBbmltKSB7XHJcbiAgICAgICAgICAgIHZhciBhY3RpdmVFbCxcclxuICAgICAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgdHlwZSxcclxuICAgICAgICAgICAgICAgIGZvY3VzID0gcy5mb2N1c09uQ2xvc2U7XHJcblxyXG4gICAgICAgICAgICAkbWFya3VwLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRhY3RpdmVFbG0gJiYgIXByZXZBbmltKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2ZW50U2hvdyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUVsID0gJGFjdGl2ZUVsbVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZSA9IGFjdGl2ZUVsLnR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gYWN0aXZlRWwudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVFbC50eXBlID0gJ2J1dHRvbic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGV4KSB7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgJGFjdGl2ZUVsbS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVFbC50eXBlID0gdHlwZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlRWwudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvY3VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIGEgbW9iaXNjcm9sbCBmaWVsZCBpcyBmb2N1c2VkLCBhbGxvdyBzaG93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZXNbJChmb2N1cykuYXR0cignaWQnKV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zLnRhcHBlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZm9jdXMpLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhhdC5faXNWaXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBldmVudCgnb25IaWRlJywgW10pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25Qb3NpdGlvbihldikge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQocG9zRGVib3VuY2VbZXYudHlwZV0pO1xyXG4gICAgICAgICAgICBwb3NEZWJvdW5jZVtldi50eXBlXSA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzU2Nyb2xsID0gZXYudHlwZSA9PSAnc2Nyb2xsJztcclxuICAgICAgICAgICAgICAgIGlmIChpc1Njcm9sbCAmJiAhc2Nyb2xsTG9jaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoYXQucG9zaXRpb24oIWlzU2Nyb2xsKTtcclxuICAgICAgICAgICAgfSwgMjAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGV2ZW50KG5hbWUsIGFyZ3MpIHtcclxuICAgICAgICAgICAgdmFyIHJldDtcclxuICAgICAgICAgICAgYXJncy5wdXNoKHRoYXQpO1xyXG4gICAgICAgICAgICAkLmVhY2goW3VzZXJkZWYsIHRoZW1lLCBwcmVzZXQsIHNldHRpbmdzXSwgZnVuY3Rpb24gKGksIHYpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2ICYmIHZbbmFtZV0pIHsgLy8gQ2FsbCBwcmVzZXQgZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICByZXQgPSB2W25hbWVdLmFwcGx5KGVsLCBhcmdzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFBvc2l0aW9ucyB0aGUgc2Nyb2xsZXIgb24gdGhlIHNjcmVlbi5cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoYXQucG9zaXRpb24gPSBmdW5jdGlvbiAoY2hlY2spIHtcclxuICAgICAgICAgICAgdmFyIHcsXHJcbiAgICAgICAgICAgICAgICBsLFxyXG4gICAgICAgICAgICAgICAgdCxcclxuICAgICAgICAgICAgICAgIGFuY2hvcixcclxuICAgICAgICAgICAgICAgIGF3LCAvLyBhbmNob3Igd2lkdGhcclxuICAgICAgICAgICAgICAgIGFoLCAvLyBhbmNob3IgaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICBhcCwgLy8gYW5jaG9yIHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBhdCwgLy8gYW5jaG9yIHRvcFxyXG4gICAgICAgICAgICAgICAgYWwsIC8vIGFuY2hvciBsZWZ0XHJcbiAgICAgICAgICAgICAgICBhcnIsIC8vIGFycm93XHJcbiAgICAgICAgICAgICAgICBhcnJ3LCAvLyBhcnJvdyB3aWR0aFxyXG4gICAgICAgICAgICAgICAgYXJybCwgLy8gYXJyb3cgbGVmdFxyXG4gICAgICAgICAgICAgICAgZGgsXHJcbiAgICAgICAgICAgICAgICBzY3JvbGwsXHJcbiAgICAgICAgICAgICAgICBzbCwgLy8gc2Nyb2xsIGxlZnRcclxuICAgICAgICAgICAgICAgIHN0LCAvLyBzY3JvbGwgdG9wXHJcbiAgICAgICAgICAgICAgICB0b3RhbHcgPSAwLFxyXG4gICAgICAgICAgICAgICAgbWludyA9IDAsXHJcbiAgICAgICAgICAgICAgICBjc3MgPSB7fSxcclxuICAgICAgICAgICAgICAgIG53ID0gTWF0aC5taW4oJHduZFswXS5pbm5lcldpZHRoIHx8ICR3bmQuaW5uZXJXaWR0aCgpLCAkcGVyc3Aud2lkdGgoKSksIC8vJHBlcnNwLndpZHRoKCksIC8vIFRvIGdldCB0aGUgd2lkdGggd2l0aG91dCBzY3JvbGxiYXJcclxuICAgICAgICAgICAgICAgIG5oID0gJHduZFswXS5pbm5lckhlaWdodCB8fCAkd25kLmlubmVySGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoKHduZFdpZHRoID09PSBudyAmJiB3bmRIZWlnaHQgPT09IG5oICYmIGNoZWNrKSB8fCBwcmV2ZW50UG9zKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpc01vZGFsICYmIHRoYXQuX2lzTGlxdWlkICYmIHMuZGlzcGxheSE9PSAnYnViYmxlJykge1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IHdpZHRoLCBpZiBkb2N1bWVudCBpcyBsYXJnZXIgdGhhbiB2aWV3cG9ydCwgbmVlZHMgdG8gYmUgc2V0IGJlZm9yZSBvblBvc2l0aW9uIChmb3IgY2FsZW5kYXIpXHJcbiAgICAgICAgICAgICAgICAkcG9wdXAud2lkdGgobncpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXZlbnQoJ29uUG9zaXRpb24nLCBbJG1hcmt1cCwgbncsIG5oXSkgPT09IGZhbHNlIHx8ICFpc01vZGFsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNsID0gJHduZC5zY3JvbGxMZWZ0KCk7XHJcbiAgICAgICAgICAgIHN0ID0gJHduZC5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgYW5jaG9yID0gcy5hbmNob3IgPT09IHVuZGVmaW5lZCA/ICRlbG0gOiAkKHMuYW5jaG9yKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCAvIHVuc2V0IGxpcXVpZCBsYXlvdXQgYmFzZWQgb24gc2NyZWVuIHdpZHRoLCBidXQgb25seSBpZiBub3Qgc2V0IGV4cGxpY2l0bHkgYnkgdGhlIHVzZXJcclxuICAgICAgICAgICAgaWYgKHRoYXQuX2lzTGlxdWlkICYmIHMubGF5b3V0ICE9PSAnbGlxdWlkJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG53IDwgNDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJG1hcmt1cC5hZGRDbGFzcygnZHctbGlxJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRtYXJrdXAucmVtb3ZlQ2xhc3MoJ2R3LWxpcScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoL21vZGFsfGJ1YmJsZS8udGVzdChzLmRpc3BsYXkpKSB7XHJcbiAgICAgICAgICAgICAgICAkd3JhcHBlci53aWR0aCgnJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcubWJzYy13LXAnLCAkbWFya3VwKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB3ID0gJCh0aGlzKS5vdXRlcldpZHRoKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsdyArPSB3O1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbncgPSAodyA+IG1pbncpID8gdyA6IG1pbnc7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHcgPSB0b3RhbHcgPiBudyA/IG1pbncgOiB0b3RhbHc7XHJcbiAgICAgICAgICAgICAgICAkd3JhcHBlci53aWR0aCh3KS5jc3MoJ3doaXRlLXNwYWNlJywgdG90YWx3ID4gbncgPyAnJyA6ICdub3dyYXAnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbW9kYWxXaWR0aCA9ICRwb3B1cC5vdXRlcldpZHRoKCk7XHJcbiAgICAgICAgICAgIG1vZGFsSGVpZ2h0ID0gJHBvcHVwLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICAgICAgICBzY3JvbGxMb2NrID0gbW9kYWxIZWlnaHQgPD0gbmggJiYgbW9kYWxXaWR0aCA8PSBudztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuc2Nyb2xsTG9jayA9IHNjcm9sbExvY2s7XHJcblxyXG4gICAgICAgICAgICBpZiAocy5kaXNwbGF5ID09ICdtb2RhbCcpIHtcclxuICAgICAgICAgICAgICAgIGwgPSBNYXRoLm1heCgwLCBzbCArIChudyAtIG1vZGFsV2lkdGgpIC8gMik7XHJcbiAgICAgICAgICAgICAgICB0ID0gc3QgKyAobmggLSBtb2RhbEhlaWdodCkgLyAyO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHMuZGlzcGxheSA9PSAnYnViYmxlJykge1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGFyciA9ICQoJy5kdy1hcnJ3LWknLCAkbWFya3VwKTtcclxuICAgICAgICAgICAgICAgIGFwID0gYW5jaG9yLm9mZnNldCgpO1xyXG4gICAgICAgICAgICAgICAgYXQgPSBNYXRoLmFicygkY3R4Lm9mZnNldCgpLnRvcCAtIGFwLnRvcCk7XHJcbiAgICAgICAgICAgICAgICBhbCA9IE1hdGguYWJzKCRjdHgub2Zmc2V0KCkubGVmdCAtIGFwLmxlZnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGhvcml6b250YWwgcG9zaXRpb25pbmdcclxuICAgICAgICAgICAgICAgIGF3ID0gYW5jaG9yLm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgIGFoID0gYW5jaG9yLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICBsID0gY29uc3RyYWluKGFsIC0gKCRwb3B1cC5vdXRlcldpZHRoKHRydWUpIC0gYXcpIC8gMiwgc2wgKyAzLCBzbCArIG53IC0gbW9kYWxXaWR0aCAtIDMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHZlcnRpY2FsIHBvc2l0aW9uaW5nXHJcbiAgICAgICAgICAgICAgICB0ID0gYXQgLSBtb2RhbEhlaWdodDsgLy8gYWJvdmUgdGhlIGlucHV0XHJcbiAgICAgICAgICAgICAgICBpZiAoKHQgPCBzdCkgfHwgKGF0ID4gc3QgKyBuaCkpIHsgLy8gaWYgZG9lc24ndCBmaXQgYWJvdmUgb3IgdGhlIGlucHV0IGlzIG91dCBvZiB0aGUgc2NyZWVuXHJcbiAgICAgICAgICAgICAgICAgICAgJHBvcHVwLnJlbW92ZUNsYXNzKCdkdy1idWJibGUtdG9wJykuYWRkQ2xhc3MoJ2R3LWJ1YmJsZS1ib3R0b20nKTtcclxuICAgICAgICAgICAgICAgICAgICB0ID0gYXQgKyBhaDsgLy8gYmVsb3cgdGhlIGlucHV0XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICRwb3B1cC5yZW1vdmVDbGFzcygnZHctYnViYmxlLWJvdHRvbScpLmFkZENsYXNzKCdkdy1idWJibGUtdG9wJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIEFycm93IHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBhcnJ3ID0gYXJyLm91dGVyV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgIGFycmwgPSBjb25zdHJhaW4oYWwgKyBhdyAvIDIgLSAobCArIChtb2RhbFdpZHRoIC0gYXJydykgLyAyKSwgMCwgYXJydyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTGltaXQgQXJyb3cgcG9zaXRpb25cclxuICAgICAgICAgICAgICAgICQoJy5kdy1hcnInLCAkbWFya3VwKS5jc3MoeyBsZWZ0OiBhcnJsIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbCA9IHNsO1xyXG4gICAgICAgICAgICAgICAgaWYgKHMuZGlzcGxheSA9PSAndG9wJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHQgPSBzdDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocy5kaXNwbGF5ID09ICdib3R0b20nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdCA9IHN0ICsgbmggLSBtb2RhbEhlaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdCA9IHQgPCAwID8gMCA6IHQ7XHJcblxyXG4gICAgICAgICAgICBjc3MudG9wID0gdDtcclxuICAgICAgICAgICAgY3NzLmxlZnQgPSBsO1xyXG4gICAgICAgICAgICAkcG9wdXAuY3NzKGNzcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0b3AgKyBtb2RhbCBoZWlnaHQgPiBkb2MgaGVpZ2h0LCBpbmNyZWFzZSBkb2MgaGVpZ2h0XHJcbiAgICAgICAgICAgICRwZXJzcC5oZWlnaHQoMCk7XHJcbiAgICAgICAgICAgIGRoID0gTWF0aC5tYXgodCArIG1vZGFsSGVpZ2h0LCBzLmNvbnRleHQgPT0gJ2JvZHknID8gJChkb2N1bWVudCkuaGVpZ2h0KCkgOiAkY3R4WzBdLnNjcm9sbEhlaWdodCk7XHJcbiAgICAgICAgICAgICRwZXJzcC5jc3MoeyBoZWlnaHQ6IGRoIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gU2Nyb2xsIG5lZWRlZFxyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsICYmICgodCArIG1vZGFsSGVpZ2h0ID4gc3QgKyBuaCkgfHwgKGF0ID4gc3QgKyBuaCkpKSB7XHJcbiAgICAgICAgICAgICAgICBwcmV2ZW50UG9zID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBwcmV2ZW50UG9zID0gZmFsc2U7IH0sIDMwMCk7XHJcbiAgICAgICAgICAgICAgICAkd25kLnNjcm9sbFRvcChNYXRoLm1pbih0ICsgbW9kYWxIZWlnaHQgLSBuaCwgZGggLSBuaCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB3bmRXaWR0aCA9IG53O1xyXG4gICAgICAgICAgICB3bmRIZWlnaHQgPSBuaDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFNob3cgbW9iaXNjcm9sbCBvbiBmb2N1cyBhbmQgY2xpY2sgZXZlbnQgb2YgdGhlIHBhcmFtZXRlci5cclxuICAgICAgICAqIEBwYXJhbSB7alF1ZXJ5fSAkZWxtIC0gRXZlbnRzIHdpbGwgYmUgYXR0YWNoZWQgdG8gdGhpcyBlbGVtZW50LlxyXG4gICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2JlZm9yZVNob3c9dW5kZWZpbmVkXSAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgYmVmb3JlIHNob3dpbmcgbW9iaXNjcm9sbC5cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoYXQuYXR0YWNoU2hvdyA9IGZ1bmN0aW9uICgkZWxtLCBiZWZvcmVTaG93KSB7XHJcbiAgICAgICAgICAgIGVsbUxpc3QucHVzaCgkZWxtKTtcclxuICAgICAgICAgICAgaWYgKHMuZGlzcGxheSAhPT0gJ2lubGluZScpIHtcclxuICAgICAgICAgICAgICAgICRlbG1cclxuICAgICAgICAgICAgICAgICAgICAub24oJ21vdXNlZG93bi5kdycsIGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2V0UmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgaW5wdXQgdG8gZ2V0IGZvY3VzIG9uIHRhcCAodmlydHVhbCBrZXlib2FyZCBwb3BzIHVwIG9uIHNvbWUgZGV2aWNlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbigocy5zaG93T25Gb2N1cyA/ICdmb2N1cy5kdycgOiAnJykgKyAocy5zaG93T25UYXAgPyAnIGNsaWNrLmR3JyA6ICcnKSwgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZXYudHlwZSAhPT0gJ2ZvY3VzJyB8fCAoZXYudHlwZSA9PT0gJ2ZvY3VzJyAmJiAhcHJldmVudFNob3cpKSAmJiAhbXMudGFwcGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmVmb3JlU2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZm9yZVNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhpZGUgdmlydHVhbCBrZXlib2FyZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkuaXMoJ2lucHV0LHRleHRhcmVhJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpLmJsdXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRhY3RpdmVFbG0gPSAkZWxtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2ZW50U2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAzMDApOyAvLyBXaXRoIGpRdWVyeSA8IDEuOSBmb2N1cyBpcyBmaXJlZCB0d2ljZSBpbiBJRVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBTZXQgYnV0dG9uIGhhbmRsZXIuXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGF0LnNlbGVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFpc01vZGFsIHx8IHRoYXQuaGlkZShmYWxzZSwgJ3NldCcpICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5fZmlsbFZhbHVlKCk7XHJcbiAgICAgICAgICAgICAgICBldmVudCgnb25TZWxlY3QnLCBbdGhhdC52YWxdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogQ2FuY2VsIGFuZCBoaWRlIHRoZSBzY3JvbGxlciBpbnN0YW5jZS5cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoYXQuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIWlzTW9kYWwgfHwgdGhhdC5oaWRlKGZhbHNlLCAnY2FuY2VsJykgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudCgnb25DYW5jZWwnLCBbdGhhdC52YWxdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogQ2xlYXIgYnV0dG9uIGhhbmRsZXIuXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGF0LmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBldmVudCgnb25DbGVhcicsIFskbWFya3VwXSk7XHJcbiAgICAgICAgICAgIGlmIChpc01vZGFsICYmICF0aGF0LmxpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuaGlkZShmYWxzZSwgJ2NsZWFyJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5zZXRWYWx1ZShudWxsLCB0cnVlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIEVuYWJsZXMgdGhlIHNjcm9sbGVyIGFuZCB0aGUgYXNzb2NpYXRlZCBpbnB1dC5cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoYXQuZW5hYmxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGF0Ll9pc0lucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAkZWxtLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBEaXNhYmxlcyB0aGUgc2Nyb2xsZXIgYW5kIHRoZSBhc3NvY2lhdGVkIGlucHV0LlxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhhdC5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoYXQuX2lzSW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICRlbG0ucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogU2hvd3MgdGhlIHNjcm9sbGVyIGluc3RhbmNlLlxyXG4gICAgICAgICogQHBhcmFtIHtCb29sZWFufSBwcmV2QW5pbSAtIFByZXZlbnQgYW5pbWF0aW9uIGlmIHRydWVcclxuICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gcHJldkZvY3VzIC0gUHJldmVudCBmb2N1c2luZyBpZiB0cnVlXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGF0LnNob3cgPSBmdW5jdGlvbiAocHJldkFuaW0sIHByZXZGb2N1cykge1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgd2hlZWxzXHJcbiAgICAgICAgICAgIHZhciBodG1sO1xyXG5cclxuICAgICAgICAgICAgaWYgKHMuZGlzYWJsZWQgfHwgdGhhdC5faXNWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkb0FuaW0gIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocy5kaXNwbGF5ID09ICd0b3AnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9BbmltID0gJ3NsaWRlZG93bic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocy5kaXNwbGF5ID09ICdib3R0b20nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9BbmltID0gJ3NsaWRldXAnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBQYXJzZSB2YWx1ZSBmcm9tIGlucHV0XHJcbiAgICAgICAgICAgIHRoYXQuX3JlYWRWYWx1ZSgpO1xyXG5cclxuICAgICAgICAgICAgZXZlbnQoJ29uQmVmb3JlU2hvdycsIFtdKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSB3aGVlbHMgY29udGFpbmVyc1xyXG4gICAgICAgICAgICBodG1sID0gJzxkaXYgbGFuZz1cIicgKyBzLmxhbmcgKyAnXCIgY2xhc3M9XCJtYnNjLScgKyBzLnRoZW1lICsgJyBkdy0nICsgcy5kaXNwbGF5ICsgJyAnICtcclxuICAgICAgICAgICAgICAgIChzLmNzc0NsYXNzIHx8ICcnKSArXHJcbiAgICAgICAgICAgICAgICAodGhhdC5faXNMaXF1aWQgPyAnIGR3LWxpcScgOiAnJykgK1xyXG4gICAgICAgICAgICAgICAgKGlzT2xkQW5kcm9pZCA/ICcgbWJzYy1vbGQnIDogJycpICtcclxuICAgICAgICAgICAgICAgIChoYXNCdXR0b25zID8gJycgOiAnIGR3LW5vYnRuJykgKyAnXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJkdy1wZXJzcFwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoaXNNb2RhbCA/ICc8ZGl2IGNsYXNzPVwiZHdvXCI+PC9kaXY+JyA6ICcnKSArIC8vIE92ZXJsYXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYnICsgKGlzTW9kYWwgPyAnIHJvbGU9XCJkaWFsb2dcIiB0YWJpbmRleD1cIi0xXCInIDogJycpICsgJyBjbGFzcz1cImR3JyArIChzLnJ0bCA/ICcgZHctcnRsJyA6ICcgZHctbHRyJykgKyAnXCI+JyArIC8vIFBvcHVwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAocy5kaXNwbGF5ID09PSAnYnViYmxlJyA/ICc8ZGl2IGNsYXNzPVwiZHctYXJyd1wiPjxkaXYgY2xhc3M9XCJkdy1hcnJ3LWlcIj48ZGl2IGNsYXNzPVwiZHctYXJyXCI+PC9kaXY+PC9kaXY+PC9kaXY+JyA6ICcnKSArIC8vIEJ1YmJsZSBhcnJvd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJkd3dyXCI+JyArIC8vIFBvcHVwIGNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBhcmlhLWxpdmU9XCJhc3NlcnRpdmVcIiBjbGFzcz1cImR3LWFyaWEgZHctaGlkZGVuXCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHMuaGVhZGVyVGV4dCA/ICc8ZGl2IGNsYXNzPVwiZHd2XCI+JyArIHMuaGVhZGVyVGV4dCArICc8L2Rpdj4nIDogJycpICsgLy8gSGVhZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJkd2NjXCI+JzsgLy8gV2hlZWwgZ3JvdXAgY29udGFpbmVyXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBodG1sICs9IHRoYXQuX2dlbmVyYXRlQ29udGVudCgpO1xyXG5cclxuICAgICAgICAgICAgaHRtbCArPSAnPC9kaXY+JztcclxuXHJcbiAgICAgICAgICAgIGlmIChoYXNCdXR0b25zKSB7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwiZHdiY1wiPic7XHJcbiAgICAgICAgICAgICAgICAkLmVhY2goYnV0dG9ucywgZnVuY3Rpb24gKGksIGIpIHtcclxuICAgICAgICAgICAgICAgICAgICBiID0gKHR5cGVvZiBiID09PSAnc3RyaW5nJykgPyB0aGF0LmJ1dHRvbnNbYl0gOiBiO1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxzcGFuJyArIChzLmJ0bldpZHRoID8gJyBzdHlsZT1cIndpZHRoOicgKyAoMTAwIC8gYnV0dG9ucy5sZW5ndGgpICsgJyVcIicgOiAnJykgKyAnIGNsYXNzPVwiZHdidyAnICsgYi5jc3MgKyAnXCI+PHNwYW4gdGFiaW5kZXg9XCIwXCIgcm9sZT1cImJ1dHRvblwiIGNsYXNzPVwiZHdiIGR3YicgKyBpICsgJyBkd2ItZVwiPicgKyBiLnRleHQgKyAnPC9zcGFuPjwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8L2Rpdj4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2Pic7XHJcblxyXG4gICAgICAgICAgICAkbWFya3VwID0gJChodG1sKTtcclxuICAgICAgICAgICAgJHBlcnNwID0gJCgnLmR3LXBlcnNwJywgJG1hcmt1cCk7XHJcbiAgICAgICAgICAgICRvdmVybGF5ID0gJCgnLmR3bycsICRtYXJrdXApO1xyXG4gICAgICAgICAgICAkd3JhcHBlciA9ICQoJy5kd3dyJywgJG1hcmt1cCk7XHJcbiAgICAgICAgICAgICRoZWFkZXIgPSAkKCcuZHd2JywgJG1hcmt1cCk7XHJcbiAgICAgICAgICAgICRwb3B1cCA9ICQoJy5kdycsICRtYXJrdXApO1xyXG4gICAgICAgICAgICAkYXJpYURpdiA9ICQoJy5kdy1hcmlhJywgJG1hcmt1cCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Ll9tYXJrdXAgPSAkbWFya3VwO1xyXG4gICAgICAgICAgICB0aGF0Ll9oZWFkZXIgPSAkaGVhZGVyO1xyXG4gICAgICAgICAgICB0aGF0Ll9pc1Zpc2libGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgcG9zRXZlbnRzID0gJ29yaWVudGF0aW9uY2hhbmdlIHJlc2l6ZSc7XHJcblxyXG4gICAgICAgICAgICB0aGF0Ll9tYXJrdXBSZWFkeSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZXZlbnQoJ29uTWFya3VwUmVhZHknLCBbJG1hcmt1cF0pO1xyXG5cclxuICAgICAgICAgICAgLy8gU2hvd1xyXG4gICAgICAgICAgICBpZiAoaXNNb2RhbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEVudGVyIC8gRVNDXHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykub24oJ2tleWRvd24uZHcnLCBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXYua2V5Q29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXYua2V5Q29kZSA9PSAyNykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbmNlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgc2Nyb2xsIGlmIG5vdCBzcGVjaWZpZWQgb3RoZXJ3aXNlXHJcbiAgICAgICAgICAgICAgICBpZiAocy5zY3JvbGxMb2NrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJG1hcmt1cC5vbigndG91Y2hzdGFydCB0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbExvY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEaXNhYmxlIGlucHV0cyB0byBwcmV2ZW50IGJsZWVkIHRocm91Z2ggKEFuZHJvaWQgYnVnKVxyXG4gICAgICAgICAgICAgICAgaWYgKHByICE9PSAnTW96Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2lucHV0LHNlbGVjdCxidXR0b24nLCAkY3R4KS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdkd3RkJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHBvc0V2ZW50cyArPSAnIHNjcm9sbCc7XHJcblxyXG4gICAgICAgICAgICAgICAgbXMuYWN0aXZlSW5zdGFuY2UgPSB0aGF0O1xyXG5cclxuICAgICAgICAgICAgICAgICRtYXJrdXAuYXBwZW5kVG8oJGN0eCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGhhczNkICYmIGRvQW5pbSAmJiAhcHJldkFuaW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAkbWFya3VwLmFkZENsYXNzKCdkdy1pbiBkdy10cmFucycpLm9uKGFuaW1FbmQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJG1hcmt1cC5yZW1vdmVDbGFzcygnZHctaW4gZHctdHJhbnMnKS5maW5kKCcuZHcnKS5yZW1vdmVDbGFzcygnZHctJyArIGRvQW5pbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU2hvdyhwcmV2Rm9jdXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmZpbmQoJy5kdycpLmFkZENsYXNzKCdkdy0nICsgZG9BbmltKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICgkZWxtLmlzKCdkaXYnKSkge1xyXG4gICAgICAgICAgICAgICAgJGVsbS5odG1sKCRtYXJrdXApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJG1hcmt1cC5pbnNlcnRBZnRlcigkZWxtKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXZlbnQoJ29uTWFya3VwSW5zZXJ0ZWQnLCBbJG1hcmt1cF0pO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IHBvc2l0aW9uXHJcbiAgICAgICAgICAgIHRoYXQucG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICR3bmQub24ocG9zRXZlbnRzLCBvblBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEV2ZW50c1xyXG4gICAgICAgICAgICAkbWFya3VwXHJcbiAgICAgICAgICAgICAgICAub24oJ3NlbGVjdHN0YXJ0IG1vdXNlZG93bicsIHByZXZkZWYpIC8vIFByZXZlbnRzIGJsdWUgaGlnaGxpZ2h0IG9uIEFuZHJvaWQgYW5kIHRleHQgc2VsZWN0aW9uIGluIElFXHJcbiAgICAgICAgICAgICAgICAub24oJ2NsaWNrJywgJy5kd2ItZScsIHByZXZkZWYpXHJcbiAgICAgICAgICAgICAgICAub24oJ2tleWRvd24nLCAnLmR3Yi1lJywgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2LmtleUNvZGUgPT0gMzIpIHsgLy8gU3BhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuY2xpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gSW5pdCBidXR0b25zXHJcbiAgICAgICAgICAgICAgICAkLmVhY2goYnV0dG9ucywgZnVuY3Rpb24gKGksIGIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRhcCgkKCcuZHdiJyArIGksICRtYXJrdXApLCBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYiA9ICh0eXBlb2YgYiA9PT0gJ3N0cmluZycpID8gdGhhdC5idXR0b25zW2JdIDogYjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYi5oYW5kbGVyLmNhbGwodGhpcywgZXYsIHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHMuY2xvc2VPbk92ZXJsYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRhcCgkb3ZlcmxheSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbmNlbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc01vZGFsICYmICFkb0FuaW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBvblNob3cocHJldkZvY3VzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkbWFya3VwXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKCd0b3VjaHN0YXJ0IG1vdXNlZG93bicsICcuZHdiLWUnLCBvbkJ0blN0YXJ0KVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbigndG91Y2hlbmQnLCAnLmR3Yi1lJywgb25CdG5FbmQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuX2F0dGFjaEV2ZW50cygkbWFya3VwKTtcclxuXHJcbiAgICAgICAgICAgIH0sIDMwMCk7XHJcblxyXG4gICAgICAgICAgICBldmVudCgnb25TaG93JywgWyRtYXJrdXAsIHRoYXQuX3ZhbHVlVGV4dF0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogSGlkZXMgdGhlIHNjcm9sbGVyIGluc3RhbmNlLlxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhhdC5oaWRlID0gZnVuY3Rpb24gKHByZXZBbmltLCBidG4sIGZvcmNlKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBvbkNsb3NlIGhhbmRsZXIgcmV0dXJucyBmYWxzZSwgcHJldmVudCBoaWRlXHJcbiAgICAgICAgICAgIGlmICghdGhhdC5faXNWaXNpYmxlIHx8ICghZm9yY2UgJiYgIXRoYXQuX2lzVmFsaWQgJiYgYnRuID09ICdzZXQnKSB8fCAoIWZvcmNlICYmIGV2ZW50KCdvbkNsb3NlJywgW3RoYXQuX3ZhbHVlVGV4dCwgYnRuXSkgPT09IGZhbHNlKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBIaWRlIHdoZWVscyBhbmQgb3ZlcmxheVxyXG4gICAgICAgICAgICBpZiAoJG1hcmt1cCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlLWVuYWJsZSB0ZW1wb3JhcnkgZGlzYWJsZWQgZmllbGRzXHJcbiAgICAgICAgICAgICAgICBpZiAocHIgIT09ICdNb3onKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmR3dGQnLCAkY3R4KS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKS5yZW1vdmVDbGFzcygnZHd0ZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChoYXMzZCAmJiBpc01vZGFsICYmIGRvQW5pbSAmJiAhcHJldkFuaW0gJiYgISRtYXJrdXAuaGFzQ2xhc3MoJ2R3LXRyYW5zJykpIHsgLy8gSWYgZHctdHJhbnMgY2xhc3Mgd2FzIG5vdCByZW1vdmVkLCBtZWFucyB0aGF0IHRoZXJlIHdhcyBubyBhbmltYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAkbWFya3VwLmFkZENsYXNzKCdkdy1vdXQgZHctdHJhbnMnKS5maW5kKCcuZHcnKS5hZGRDbGFzcygnZHctJyArIGRvQW5pbSkub24oYW5pbUVuZCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkhpZGUocHJldkFuaW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvbkhpZGUocHJldkFuaW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN0b3AgcG9zaXRpb25pbmcgb24gd2luZG93IHJlc2l6ZVxyXG4gICAgICAgICAgICAgICAgJHduZC5vZmYocG9zRXZlbnRzLCBvblBvc2l0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGVsZXRlIG1zLmFjdGl2ZUluc3RhbmNlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoYXQuYXJpYU1lc3NhZ2UgPSBmdW5jdGlvbiAodHh0KSB7XHJcbiAgICAgICAgICAgICRhcmlhRGl2Lmh0bWwoJycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICRhcmlhRGl2Lmh0bWwodHh0KTtcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFJldHVybiB0cnVlIGlmIHRoZSBzY3JvbGxlciBpcyBjdXJyZW50bHkgdmlzaWJsZS5cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoYXQuaXNWaXNpYmxlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5faXNWaXNpYmxlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFByb3RlY3RlZCBmdW5jdGlvbnMgdG8gb3ZlcnJpZGVcclxuXHJcbiAgICAgICAgdGhhdC5zZXRWYWx1ZSA9IGVtcHR5O1xyXG5cclxuICAgICAgICB0aGF0Ll9nZW5lcmF0ZUNvbnRlbnQgPSBlbXB0eTtcclxuXHJcbiAgICAgICAgdGhhdC5fYXR0YWNoRXZlbnRzID0gZW1wdHk7XHJcblxyXG4gICAgICAgIHRoYXQuX3JlYWRWYWx1ZSA9IGVtcHR5O1xyXG5cclxuICAgICAgICB0aGF0Ll9maWxsVmFsdWUgPSBlbXB0eTtcclxuXHJcbiAgICAgICAgdGhhdC5fbWFya3VwUmVhZHkgPSBlbXB0eTtcclxuXHJcbiAgICAgICAgdGhhdC5fcHJvY2Vzc1NldHRpbmdzID0gZW1wdHk7XHJcblxyXG4gICAgICAgIC8vIEdlbmVyaWMgd2lkZ2V0IGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIEF0dGFjaCB0YXAgZXZlbnQgdG8gdGhlIGdpdmVuIGVsZW1lbnQuXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGF0LnRhcCA9IGZ1bmN0aW9uIChlbCwgaGFuZGxlciwgcHJldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRYLFxyXG4gICAgICAgICAgICAgICAgc3RhcnRZLFxyXG4gICAgICAgICAgICAgICAgbW92ZWQ7XHJcblxyXG4gICAgICAgICAgICBpZiAocy50YXApIHtcclxuICAgICAgICAgICAgICAgIGVsLm9uKCd0b3VjaHN0YXJ0LmR3JywgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FuJ3QgYWx3YXlzIGNhbGwgcHJldmVudERlZmF1bHQgaGVyZSwgaXQga2lsbHMgcGFnZSBzY3JvbGxcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzdGFydFggPSBnZXRDb29yZChldiwgJ1gnKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydFkgPSBnZXRDb29yZChldiwgJ1knKTtcclxuICAgICAgICAgICAgICAgICAgICBtb3ZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSkub24oJ3RvdWNobW92ZS5kdycsIGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIG1vdmVtZW50IGlzIG1vcmUgdGhhbiAyMHB4LCBkb24ndCBmaXJlIHRoZSBjbGljayBldmVudCBoYW5kbGVyXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGdldENvb3JkKGV2LCAnWCcpIC0gc3RhcnRYKSA+IDIwIHx8IE1hdGguYWJzKGdldENvb3JkKGV2LCAnWScpIC0gc3RhcnRZKSA+IDIwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5vbigndG91Y2hlbmQuZHcnLCBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtb3ZlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmV2ZW50RGVmYXVsdCBhbmQgc2V0VGltZW91dCBhcmUgbmVlZGVkIGJ5IGlPU1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXIuY2FsbCh0aGF0LCBldik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGlzT2xkQW5kcm9pZCA/IDQwMCA6IDEwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJldmVudCBjbGljayBldmVudHMgdG8gaGFwcGVuXHJcbiAgICAgICAgICAgICAgICAgICAgbXMudGFwcGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXMudGFwcGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbC5vbignY2xpY2suZHcnLCBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICAgICAgICAgIGlmICghbXMudGFwcGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgaGFuZGxlciB3YXMgbm90IGNhbGxlZCBvbiB0b3VjaGVuZCwgY2FsbCBpdCBvbiBjbGljaztcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgZXYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogU2V0cyBvbmUgb3JlIG1vcmUgb3B0aW9ucy5cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoYXQub3B0aW9uID0gZnVuY3Rpb24gKG9wdCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHt9O1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIG9iaiA9IG9wdDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9ialtvcHRdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5pbml0KG9iaik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBEZXN0cm95cyB0aGUgbW9iaXNjcm9sbCBpbnN0YW5jZS5cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoYXQuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gRm9yY2UgaGlkZSB3aXRob3V0IGFuaW1hdGlvblxyXG4gICAgICAgICAgICB0aGF0LmhpZGUodHJ1ZSwgZmFsc2UsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBldmVudHMgZnJvbSBlbGVtZW50c1xyXG4gICAgICAgICAgICAkLmVhY2goZWxtTGlzdCwgZnVuY3Rpb24gKGksIHYpIHtcclxuICAgICAgICAgICAgICAgIHYub2ZmKCcuZHcnKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZXNldCBvcmlnaW5hbCByZWFkb25seSBzdGF0ZVxyXG4gICAgICAgICAgICBpZiAodGhhdC5faXNJbnB1dCAmJiBzZXRSZWFkT25seSkge1xyXG4gICAgICAgICAgICAgICAgZWwucmVhZE9ubHkgPSB3YXNSZWFkT25seTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXZlbnQoJ29uRGVzdHJveScsIFtdKTtcclxuXHJcbiAgICAgICAgICAgIC8vIERlbGV0ZSBzY3JvbGxlciBpbnN0YW5jZVxyXG4gICAgICAgICAgICBkZWxldGUgaW5zdGFuY2VzW2VsLmlkXTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFJldHVybnMgdGhlIG1vYmlzY3JvbGwgaW5zdGFuY2UuXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGF0LmdldEluc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogVHJpZ2dlcnMgYSBtb2Jpc2Nyb2xsIGV2ZW50LlxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhhdC50cmlnZ2VyID0gZXZlbnQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogU2Nyb2xsZXIgaW5pdGlhbGl6YXRpb24uXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGF0LmluaXQgPSBmdW5jdGlvbiAoc3MpIHtcclxuICAgICAgICAgICAgdGhhdC5zZXR0aW5ncyA9IHMgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBvcmlnaW5hbCB1c2VyIHNldHRpbmdzXHJcbiAgICAgICAgICAgIGV4dGVuZChzZXR0aW5ncywgc3MpO1xyXG4gICAgICAgICAgICBleHRlbmQocywgbXMuZGVmYXVsdHMsIHRoYXQuX2RlZmF1bHRzLCB1c2VyZGVmLCBzZXR0aW5ncyk7XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgdGhlbWUgZGVmYXVsdHNcclxuICAgICAgICAgICAgdGhlbWUgPSBtcy50aGVtZXNbcy50aGVtZV0gfHwgbXMudGhlbWVzLm1vYmlzY3JvbGw7XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgbGFuZ3VhZ2UgZGVmYXVsdHNcclxuICAgICAgICAgICAgbGFuZyA9IG1zLmkxOG5bcy5sYW5nXTtcclxuXHJcbiAgICAgICAgICAgIGV2ZW50KCdvblRoZW1lTG9hZCcsIFtsYW5nLCBzZXR0aW5nc10pO1xyXG5cclxuICAgICAgICAgICAgZXh0ZW5kKHMsIHRoZW1lLCBsYW5nLCB1c2VyZGVmLCBzZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwcmVzZXQgPSBtcy5wcmVzZXRzW3RoYXQuX2NsYXNzXVtzLnByZXNldF07XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgZGVmYXVsdCBidXR0b25zXHJcbiAgICAgICAgICAgIHMuYnV0dG9ucyA9IHMuYnV0dG9ucyB8fCAocy5kaXNwbGF5ICE9PSAnaW5saW5lJyA/IFsnc2V0JywgJ2NhbmNlbCddIDogW10pO1xyXG5cclxuICAgICAgICAgICAgLy8gSGlkZSBoZWFkZXIgdGV4dCBpbiBpbmxpbmUgbW9kZSBieSBkZWZhdWx0XHJcbiAgICAgICAgICAgIHMuaGVhZGVyVGV4dCA9IHMuaGVhZGVyVGV4dCA9PT0gdW5kZWZpbmVkID8gKHMuZGlzcGxheSAhPT0gJ2lubGluZScgPyAne3ZhbHVlfScgOiBmYWxzZSkgOiBzLmhlYWRlclRleHQ7XHJcblxyXG4gICAgICAgICAgICBpZiAocHJlc2V0KSB7XHJcbiAgICAgICAgICAgICAgICBwcmVzZXQgPSBwcmVzZXQuY2FsbChlbCwgdGhhdCk7XHJcbiAgICAgICAgICAgICAgICBleHRlbmQocywgcHJlc2V0LCBzZXR0aW5ncyk7IC8vIExvYWQgcHJlc2V0IHNldHRpbmdzXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghbXMudGhlbWVzW3MudGhlbWVdKSB7XHJcbiAgICAgICAgICAgICAgICBzLnRoZW1lID0gJ21vYmlzY3JvbGwnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGF0Ll9pc0xpcXVpZCA9IChzLmxheW91dCB8fCAoL3RvcHxib3R0b20vLnRlc3Qocy5kaXNwbGF5KSA/ICdsaXF1aWQnIDogJycpKSA9PT0gJ2xpcXVpZCc7XHJcblxyXG4gICAgICAgICAgICB0aGF0Ll9wcm9jZXNzU2V0dGluZ3MoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVuYmluZCBhbGwgZXZlbnRzIChpZiByZS1pbml0KVxyXG4gICAgICAgICAgICAkZWxtLm9mZignLmR3Jyk7XHJcblxyXG4gICAgICAgICAgICBkb0FuaW0gPSBpc09sZEFuZHJvaWQgPyBmYWxzZSA6IHMuYW5pbWF0ZTtcclxuICAgICAgICAgICAgYnV0dG9ucyA9IHMuYnV0dG9ucztcclxuICAgICAgICAgICAgaXNNb2RhbCA9IHMuZGlzcGxheSAhPT0gJ2lubGluZSc7XHJcbiAgICAgICAgICAgIHNldFJlYWRPbmx5ID0gcy5zaG93T25Gb2N1cyB8fCBzLnNob3dPblRhcDtcclxuICAgICAgICAgICAgJHduZCA9ICQocy5jb250ZXh0ID09ICdib2R5JyA/IHdpbmRvdyA6IHMuY29udGV4dCk7XHJcbiAgICAgICAgICAgICRjdHggPSAkKHMuY29udGV4dCk7XHJcblxyXG4gICAgICAgICAgICAvLyBAZGVwcmVjYXRlZCBzaW5jZSAyLjguMCwgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBjb2RlXHJcbiAgICAgICAgICAgIC8vIC0tLVxyXG4gICAgICAgICAgICBpZiAoIXMuc2V0VGV4dCkge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9ucy5zcGxpY2UoJC5pbkFycmF5KCdzZXQnLCBidXR0b25zKSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFzLmNhbmNlbFRleHQpIHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbnMuc3BsaWNlKCQuaW5BcnJheSgnY2FuY2VsJywgYnV0dG9ucyksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzLmJ1dHRvbjMpIHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbnMuc3BsaWNlKCQuaW5BcnJheSgnc2V0JywgYnV0dG9ucykgKyAxLCAwLCB7IHRleHQ6IHMuYnV0dG9uM1RleHQsIGhhbmRsZXI6IHMuYnV0dG9uMyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAtLS1cclxuXHJcbiAgICAgICAgICAgIHRoYXQuY29udGV4dCA9ICR3bmQ7XHJcbiAgICAgICAgICAgIHRoYXQubGl2ZSA9ICQuaW5BcnJheSgnc2V0JywgYnV0dG9ucykgPT0gLTE7XHJcbiAgICAgICAgICAgIHRoYXQuYnV0dG9ucy5zZXQgPSB7IHRleHQ6IHMuc2V0VGV4dCwgY3NzOiAnZHdiLXMnLCBoYW5kbGVyOiB0aGF0LnNlbGVjdCB9O1xyXG4gICAgICAgICAgICB0aGF0LmJ1dHRvbnMuY2FuY2VsID0geyB0ZXh0OiAodGhhdC5saXZlKSA/IHMuY2xvc2VUZXh0IDogcy5jYW5jZWxUZXh0LCBjc3M6ICdkd2ItYycsIGhhbmRsZXI6IHRoYXQuY2FuY2VsIH07XHJcbiAgICAgICAgICAgIHRoYXQuYnV0dG9ucy5jbGVhciA9IHsgdGV4dDogcy5jbGVhclRleHQsIGNzczogJ2R3Yi1jbCcsIGhhbmRsZXI6IHRoYXQuY2xlYXIgfTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuX2lzSW5wdXQgPSAkZWxtLmlzKCdpbnB1dCcpO1xyXG5cclxuICAgICAgICAgICAgaGFzQnV0dG9ucyA9IGJ1dHRvbnMubGVuZ3RoID4gMDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0Ll9pc1Zpc2libGUpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuaGlkZSh0cnVlLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpc01vZGFsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Ll9yZWFkVmFsdWUoKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0Ll9pc0lucHV0ICYmIHNldFJlYWRPbmx5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGVsZW1lbnQgcmVhZG9ubHksIHNhdmUgb3JpZ2luYWwgc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICBpZiAod2FzUmVhZE9ubHkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3YXNSZWFkT25seSA9IGVsLnJlYWRPbmx5O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbC5yZWFkT25seSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0LmF0dGFjaFNob3coJGVsbSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuX2lzSW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICRlbG0ub24oJ2NoYW5nZS5kdycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoYXQuX3ByZXZlbnRDaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRWYWx1ZSgkZWxtLnZhbCgpLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuX3ByZXZlbnRDaGFuZ2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhhdC52YWwgPSBudWxsO1xyXG4gICAgICAgIHRoYXQuYnV0dG9ucyA9IHt9O1xyXG5cclxuICAgICAgICB0aGF0Ll9pc1ZhbGlkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gQ29uc3RydWN0b3JcclxuICAgICAgICBpZiAoIWluaGVyaXQpIHtcclxuICAgICAgICAgICAgaW5zdGFuY2VzW2VsLmlkXSA9IHRoYXQ7XHJcbiAgICAgICAgICAgIHRoYXQuaW5pdChzZXR0aW5ncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBtcy5jbGFzc2VzLldpZGdldC5wcm90b3R5cGUuX2RlZmF1bHRzID0ge1xyXG4gICAgICAgIC8vIExvY2FsaXphdGlvblxyXG4gICAgICAgIGxhbmc6ICd6aCcsXHJcbiAgICAgICAgc2V0VGV4dDogJ1NldCcsXHJcbiAgICAgICAgc2VsZWN0ZWRUZXh0OiAnU2VsZWN0ZWQnLFxyXG4gICAgICAgIGNsb3NlVGV4dDogJ0Nsb3NlJyxcclxuICAgICAgICBjYW5jZWxUZXh0OiAnQ2FuY2VsJyxcclxuICAgICAgICBjbGVhclRleHQ6ICdDbGVhcicsXHJcbiAgICAgICAgLy8gT3B0aW9uc1xyXG4gICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICBjbG9zZU9uT3ZlcmxheTogdHJ1ZSxcclxuICAgICAgICBzaG93T25Gb2N1czogdHJ1ZSxcclxuICAgICAgICBzaG93T25UYXA6IHRydWUsXHJcbiAgICAgICAgZGlzcGxheTogJ21vZGFsJyxcclxuICAgICAgICBzY3JvbGxMb2NrOiB0cnVlLFxyXG4gICAgICAgIHRhcDogdHJ1ZSxcclxuICAgICAgICBidG5XaWR0aDogdHJ1ZSxcclxuICAgICAgICBmb2N1c09uQ2xvc2U6IGZhbHNlIC8vIFRlbXBvcmFyeSBmb3IgaU9TOFxyXG4gICAgfTtcclxuXHJcbiAgICBtcy50aGVtZXMubW9iaXNjcm9sbCA9IHtcclxuICAgICAgICByb3dzOiA1LFxyXG4gICAgICAgIHNob3dMYWJlbDogZmFsc2UsXHJcbiAgICAgICAgaGVhZGVyVGV4dDogZmFsc2UsXHJcbiAgICAgICAgYnRuV2lkdGg6IGZhbHNlLFxyXG4gICAgICAgIHNlbGVjdGVkTGluZUhlaWdodDogdHJ1ZSxcclxuICAgICAgICBzZWxlY3RlZExpbmVCb3JkZXI6IDEsXHJcbiAgICAgICAgZGF0ZU9yZGVyOiAnTU1kZHl5JyxcclxuICAgICAgICB3ZWVrRGF5czogJ21pbicsXHJcbiAgICAgICAgY2hlY2tJY29uOiAnaW9uLWlvczctY2hlY2ttYXJrLWVtcHR5JyxcclxuICAgICAgICBidG5QbHVzQ2xhc3M6ICdtYnNjLWljIG1ic2MtaWMtYXJyb3ctZG93bjUnLFxyXG4gICAgICAgIGJ0bk1pbnVzQ2xhc3M6ICdtYnNjLWljIG1ic2MtaWMtYXJyb3ctdXA1JyxcclxuICAgICAgICBidG5DYWxQcmV2Q2xhc3M6ICdtYnNjLWljIG1ic2MtaWMtYXJyb3ctbGVmdDUnLFxyXG4gICAgICAgIGJ0bkNhbE5leHRDbGFzczogJ21ic2MtaWMgbWJzYy1pYy1hcnJvdy1yaWdodDUnXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFByZXZlbnQgcmUtc2hvdyBvbiB3aW5kb3cgZm9jdXNcclxuICAgICQod2luZG93KS5vbignZm9jdXMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCRhY3RpdmVFbG0pIHtcclxuICAgICAgICAgICAgcHJldmVudFNob3cgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFByZXZlbnQgc3RhbmRhcmQgYmVoYXZpb3VyIG9uIGJvZHkgY2xpY2tcclxuICAgICQoZG9jdW1lbnQpLm9uKCdtb3VzZW92ZXIgbW91c2V1cCBtb3VzZWRvd24gY2xpY2snLCBmdW5jdGlvbiAoZXYpIHsgXHJcbiAgICAgICAgaWYgKG1zLnRhcHBlZCkge1xyXG4gICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSkoalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuKGZ1bmN0aW9uICgkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcclxuXHJcbiAgICB2YXIgbW92ZSxcclxuICAgICAgICBtcyA9ICQubW9iaXNjcm9sbCxcclxuICAgICAgICBjbGFzc2VzID0gbXMuY2xhc3NlcyxcclxuICAgICAgICBpbnN0YW5jZXMgPSBtcy5pbnN0YW5jZXMsXHJcbiAgICAgICAgdXRpbCA9IG1zLnV0aWwsXHJcbiAgICAgICAgcHIgPSB1dGlsLmpzUHJlZml4LFxyXG4gICAgICAgIGhhczNkID0gdXRpbC5oYXMzZCxcclxuICAgICAgICBoYXNGbGV4ID0gdXRpbC5oYXNGbGV4LFxyXG4gICAgICAgIGdldENvb3JkID0gdXRpbC5nZXRDb29yZCxcclxuICAgICAgICBjb25zdHJhaW4gPSB1dGlsLmNvbnN0cmFpbixcclxuICAgICAgICB0ZXN0VG91Y2ggPSB1dGlsLnRlc3RUb3VjaDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIDIuNi4wLCBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGNvZGVcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY29udmVydCh3KSB7XHJcbiAgICAgICAgdmFyIHJldCA9IHtcclxuICAgICAgICAgICAgdmFsdWVzOiBbXSxcclxuICAgICAgICAgICAga2V5czogW11cclxuICAgICAgICB9O1xyXG4gICAgICAgICQuZWFjaCh3LCBmdW5jdGlvbiAoaywgdikge1xyXG4gICAgICAgICAgICByZXQua2V5cy5wdXNoKGspO1xyXG4gICAgICAgICAgICByZXQudmFsdWVzLnB1c2godik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzc2VzLlNjcm9sbGVyID0gZnVuY3Rpb24gKGVsLCBzZXR0aW5ncywgaW5oZXJpdCkge1xyXG4gICAgICAgIHZhciAkbWFya3VwLFxyXG4gICAgICAgICAgICBidG4sXHJcbiAgICAgICAgICAgIGlzU2Nyb2xsYWJsZSxcclxuICAgICAgICAgICAgaXRlbUhlaWdodCxcclxuICAgICAgICAgICAgcyxcclxuICAgICAgICAgICAgdHJpZ2dlcixcclxuICAgICAgICAgICAgdmFsdWVUZXh0LFxyXG5cclxuICAgICAgICAgICAgY2xpY2ssXHJcbiAgICAgICAgICAgIG1vdmVkLFxyXG4gICAgICAgICAgICBzdGFydCxcclxuICAgICAgICAgICAgc3RhcnRUaW1lLFxyXG4gICAgICAgICAgICBzdG9wLFxyXG4gICAgICAgICAgICBwLFxyXG4gICAgICAgICAgICBtaW4sXHJcbiAgICAgICAgICAgIG1heCxcclxuICAgICAgICAgICAgdGFyZ2V0LFxyXG4gICAgICAgICAgICBpbmRleCxcclxuICAgICAgICAgICAgbGluZXMsXHJcbiAgICAgICAgICAgIHRpbWVyLFxyXG4gICAgICAgICAgICB0aGF0ID0gdGhpcyxcclxuICAgICAgICAgICAgJGVsbSA9ICQoZWwpLFxyXG4gICAgICAgICAgICBpdiA9IHt9LFxyXG4gICAgICAgICAgICBwb3MgPSB7fSxcclxuICAgICAgICAgICAgcGl4ZWxzID0ge30sXHJcbiAgICAgICAgICAgIHdoZWVscyA9IFtdO1xyXG5cclxuICAgICAgICAvLyBFdmVudCBoYW5kbGVyc1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvblN0YXJ0KGV2KSB7XHJcbiAgICAgICAgICAgIC8qIFRSSUFMQ09ORCAqL1xyXG4gICAgICAgICAgICAvLyBTY3JvbGwgc3RhcnRcclxuICAgICAgICAgICAgaWYgKHRlc3RUb3VjaChldikgJiYgIW1vdmUgJiYgIWNsaWNrICYmICFidG4gJiYgIWlzUmVhZE9ubHkodGhpcykpIHtcclxuICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgdG91Y2ggaGlnaGxpZ2h0XHJcbiAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gQmV0dGVyIHBlcmZvcm1hbmNlIGlmIHRoZXJlIGFyZSB0YXAgZXZlbnRzIG9uIGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICBtb3ZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlzU2Nyb2xsYWJsZSA9IHMubW9kZSAhPSAnY2xpY2twaWNrJztcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9ICQoJy5kdy11bCcsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgc2V0R2xvYmFscyh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgbW92ZWQgPSBpdltpbmRleF0gIT09IHVuZGVmaW5lZDsgLy8gRG9uJ3QgYWxsb3cgdGFwLCBpZiBzdGlsbCBtb3ZpbmdcclxuICAgICAgICAgICAgICAgIHAgPSBtb3ZlZCA/IGdldEN1cnJlbnRQb3NpdGlvbih0YXJnZXQpIDogcG9zW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gZ2V0Q29vcmQoZXYsICdZJyk7XHJcbiAgICAgICAgICAgICAgICBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgc3RvcCA9IHN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsKHRhcmdldCwgaW5kZXgsIHAsIDAuMDAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTY3JvbGxhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmNsb3Nlc3QoJy5kd3dsJykuYWRkQ2xhc3MoJ2R3YScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChldi50eXBlID09PSAnbW91c2Vkb3duJykge1xyXG4gICAgICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdtb3VzZW1vdmUnLCBvbk1vdmUpLm9uKCdtb3VzZXVwJywgb25FbmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbk1vdmUoZXYpIHtcclxuICAgICAgICAgICAgaWYgKG1vdmUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc1Njcm9sbGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IHNjcm9sbFxyXG4gICAgICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcCA9IGdldENvb3JkKGV2LCAnWScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhzdG9wIC0gc3RhcnQpID4gMyB8fCBtb3ZlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwodGFyZ2V0LCBpbmRleCwgY29uc3RyYWluKHAgKyAoc3RhcnQgLSBzdG9wKSAvIGl0ZW1IZWlnaHQsIG1pbiAtIDEsIG1heCArIDEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25FbmQoZXYpIHtcclxuICAgICAgICAgICAgaWYgKG1vdmUpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aW1lID0gbmV3IERhdGUoKSAtIHN0YXJ0VGltZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWwgPSBjb25zdHJhaW4ocCArIChzdGFydCAtIHN0b3ApIC8gaXRlbUhlaWdodCwgbWluIC0gMSwgbWF4ICsgMSksXHJcbiAgICAgICAgICAgICAgICAgICAgc3BlZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzdCxcclxuICAgICAgICAgICAgICAgICAgICB0aW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgdHRvcCA9IHRhcmdldC5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQmV0dGVyIHBlcmZvcm1hbmNlIGlmIHRoZXJlIGFyZSB0YXAgZXZlbnRzIG9uIGRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaGFzM2QgJiYgdGltZSA8IDMwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwZWVkID0gKHN0b3AgLSBzdGFydCkgLyB0aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3QgPSAoc3BlZWQgKiBzcGVlZCkgLyBzLnNwZWVkVW5pdDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RvcCAtIHN0YXJ0IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0ID0gLWRpc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXN0ID0gc3RvcCAtIHN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRpbmRleCA9IE1hdGgucm91bmQocCAtIGRpc3QgLyBpdGVtSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW1vdmVkKSB7IC8vIHRoaXMgaXMgYSBcInRhcFwiXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkeCA9IE1hdGguZmxvb3IoKHN0b3AgLSB0dG9wKSAvIGl0ZW1IZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaSA9ICQoJCgnLmR3LWxpJywgdGFyZ2V0KVtpZHhdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBsaS5oYXNDbGFzcygnZHctdicpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBobCA9IGlzU2Nyb2xsYWJsZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyaWdnZXIoJ29uVmFsdWVUYXAnLCBbbGldKSAhPT0gZmFsc2UgJiYgdmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGluZGV4ID0gaWR4O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChobCAmJiB2YWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaS5hZGRDbGFzcygnZHctaGwnKTsgLy8gSGlnaGxpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGkucmVtb3ZlQ2xhc3MoJ2R3LWhsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1Njcm9sbGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxjKHRhcmdldCwgdGluZGV4LCAwLCB0cnVlLCBNYXRoLnJvdW5kKHZhbCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChldi50eXBlID09PSAnbW91c2V1cCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ21vdXNlbW92ZScsIG9uTW92ZSkub2ZmKCdtb3VzZXVwJywgb25FbmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG1vdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25CdG5TdGFydChldikge1xyXG4gICAgICAgICAgICBidG4gPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAvLyArLy0gYnV0dG9uc1xyXG4gICAgICAgICAgICBpZiAoYnRuLmhhc0NsYXNzKCdkd3diJykpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0ZXN0VG91Y2goZXYpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcChldiwgYnRuLmNsb3Nlc3QoJy5kd3dsJyksIGJ0bi5oYXNDbGFzcygnZHd3YnAnKSA/IHBsdXMgOiBtaW51cyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2LnR5cGUgPT09ICdtb3VzZWRvd24nKSB7XHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbignbW91c2V1cCcsIG9uQnRuRW5kKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25CdG5FbmQoZXYpIHtcclxuICAgICAgICAgICAgYnRuID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKGNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICAgICAgICAgIGNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGV2LnR5cGUgPT09ICdtb3VzZXVwJykge1xyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub2ZmKCdtb3VzZXVwJywgb25CdG5FbmQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbktleURvd24oZXYpIHtcclxuICAgICAgICAgICAgaWYgKGV2LmtleUNvZGUgPT0gMzgpIHsgLy8gdXBcclxuICAgICAgICAgICAgICAgIHN0ZXAoZXYsICQodGhpcyksIG1pbnVzKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChldi5rZXlDb2RlID09IDQwKSB7IC8vIGRvd25cclxuICAgICAgICAgICAgICAgIHN0ZXAoZXYsICQodGhpcyksIHBsdXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbktleVVwKCkge1xyXG4gICAgICAgICAgICBpZiAoY2xpY2spIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgICAgICAgICAgY2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25TY3JvbGwoZXYpIHtcclxuICAgICAgICAgICAgaWYgKCFpc1JlYWRPbmx5KHRoaXMpKSB7XHJcbiAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZXYgPSBldi5vcmlnaW5hbEV2ZW50IHx8IGV2O1xyXG4gICAgICAgICAgICAgICAgdmFyIGRlbHRhID0gZXYud2hlZWxEZWx0YSA/IChldi53aGVlbERlbHRhIC8gMTIwKSA6IChldi5kZXRhaWwgPyAoLWV2LmRldGFpbCAvIDMpIDogMCksXHJcbiAgICAgICAgICAgICAgICAgICAgdCA9ICQoJy5kdy11bCcsIHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldEdsb2JhbHModCk7XHJcbiAgICAgICAgICAgICAgICBjYWxjKHQsIE1hdGgucm91bmQocG9zW2luZGV4XSAtIGRlbHRhKSwgZGVsdGEgPCAwID8gMSA6IDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQcml2YXRlIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKGV2LCB3LCBmdW5jKSB7XHJcbiAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZiAoIWNsaWNrICYmICFpc1JlYWRPbmx5KHcpICYmICF3Lmhhc0NsYXNzKCdkd2EnKSkge1xyXG4gICAgICAgICAgICAgICAgY2xpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gKyBCdXR0b25cclxuICAgICAgICAgICAgICAgIHZhciB0ID0gdy5maW5kKCcuZHctdWwnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRHbG9iYWxzKHQpO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHsgZnVuYyh0KTsgfSwgcy5kZWxheSk7XHJcbiAgICAgICAgICAgICAgICBmdW5jKHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpc1JlYWRPbmx5KHdoKSB7XHJcbiAgICAgICAgICAgIGlmICgkLmlzQXJyYXkocy5yZWFkb25seSkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpID0gJCgnLmR3d2wnLCAkbWFya3VwKS5pbmRleCh3aCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcy5yZWFkb25seVtpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcy5yZWFkb25seTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlV2hlZWxJdGVtcyhpKSB7XHJcbiAgICAgICAgICAgIHZhciBodG1sID0gJzxkaXYgY2xhc3M9XCJkdy1iZlwiPicsXHJcbiAgICAgICAgICAgICAgICB3dyA9IHdoZWVsc1tpXSxcclxuICAgICAgICAgICAgICAgIC8vIEBkZXByZWNhdGVkIHNpbmNlIDIuNi4wLCBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGNvZGVcclxuICAgICAgICAgICAgICAgIC8vIC0tLVxyXG4gICAgICAgICAgICAgICAgdyA9IHd3LnZhbHVlcyA/IHd3IDogY29udmVydCh3dyksXHJcbiAgICAgICAgICAgICAgICAvLyAtLS1cclxuICAgICAgICAgICAgICAgIGwgPSAxLFxyXG4gICAgICAgICAgICAgICAgbGFiZWxzID0gdy5sYWJlbHMgfHwgW10sXHJcbiAgICAgICAgICAgICAgICB2YWx1ZXMgPSB3LnZhbHVlcyxcclxuICAgICAgICAgICAgICAgIGtleXMgPSB3LmtleXMgfHwgdmFsdWVzO1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKHZhbHVlcywgZnVuY3Rpb24gKGosIHYpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsICUgMjAgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8L2Rpdj48ZGl2IGNsYXNzPVwiZHctYmZcIj4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPGRpdiByb2xlPVwib3B0aW9uXCIgYXJpYS1zZWxlY3RlZD1cImZhbHNlXCIgY2xhc3M9XCJkdy1saSBkdy12XCIgZGF0YS12YWw9XCInICsga2V5c1tqXSArICdcIicgKyAobGFiZWxzW2pdID8gJyBhcmlhLWxhYmVsPVwiJyArIGxhYmVsc1tqXSArICdcIicgOiAnJykgKyAnIHN0eWxlPVwiaGVpZ2h0OicgKyBpdGVtSGVpZ2h0ICsgJ3B4O2xpbmUtaGVpZ2h0OicgKyBpdGVtSGVpZ2h0ICsgJ3B4O1wiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZHctaVwiJyArIChsaW5lcyA+IDEgPyAnIHN0eWxlPVwibGluZS1oZWlnaHQ6JyArIE1hdGgucm91bmQoaXRlbUhlaWdodCAvIGxpbmVzKSArICdweDtmb250LXNpemU6JyArIE1hdGgucm91bmQoaXRlbUhlaWdodCAvIGxpbmVzICogMC44KSArICdweDtcIicgOiAnJykgKyAnPicgKyB2IC8qIFRSSUFMICovICsgJzwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICBsKys7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaHRtbCArPSAnPC9kaXY+JztcclxuICAgICAgICAgICAgcmV0dXJuIGh0bWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRHbG9iYWxzKHQpIHtcclxuICAgICAgICAgICAgdmFyIG11bHRpcGxlID0gdC5jbG9zZXN0KCcuZHd3bCcpLmhhc0NsYXNzKCdkd3dtcycpO1xyXG4gICAgICAgICAgICBtaW4gPSAkKCcuZHctbGknLCB0KS5pbmRleCgkKG11bHRpcGxlID8gJy5kdy1saScgOiAnLmR3LXYnLCB0KS5lcSgwKSk7XHJcbiAgICAgICAgICAgIG1heCA9IE1hdGgubWF4KG1pbiwgJCgnLmR3LWxpJywgdCkuaW5kZXgoJChtdWx0aXBsZSA/ICcuZHctbGknIDogJy5kdy12JywgdCkuZXEoLTEpKSAtIChtdWx0aXBsZSA/IHMucm93cyAtIDEgOiAwKSk7XHJcbiAgICAgICAgICAgIGluZGV4ID0gJCgnLmR3LXVsJywgJG1hcmt1cCkuaW5kZXgodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBmb3JtYXRIZWFkZXIodikge1xyXG4gICAgICAgICAgICB2YXIgdCA9IHMuaGVhZGVyVGV4dDtcclxuICAgICAgICAgICAgcmV0dXJuIHQgPyAodHlwZW9mIHQgPT09ICdmdW5jdGlvbicgPyB0LmNhbGwoZWwsIHYpIDogdC5yZXBsYWNlKC9cXHt2YWx1ZVxcfS9pLCB2KSkgOiAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldEN1cnJlbnRQb3NpdGlvbih0KSB7XHJcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlID8gZ2V0Q29tcHV0ZWRTdHlsZSh0WzBdKSA6IHRbMF0uc3R5bGUsXHJcbiAgICAgICAgICAgICAgICBtYXRyaXgsXHJcbiAgICAgICAgICAgICAgICBweDtcclxuXHJcbiAgICAgICAgICAgIGlmIChoYXMzZCkge1xyXG4gICAgICAgICAgICAgICAgJC5lYWNoKFsndCcsICd3ZWJraXRUJywgJ01velQnLCAnT1QnLCAnbXNUJ10sIGZ1bmN0aW9uIChpLCB2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlW3YgKyAncmFuc2Zvcm0nXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdHJpeCA9IHN0eWxlW3YgKyAncmFuc2Zvcm0nXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbWF0cml4ID0gbWF0cml4LnNwbGl0KCcpJylbMF0uc3BsaXQoJywgJyk7XHJcbiAgICAgICAgICAgICAgICBweCA9IG1hdHJpeFsxM10gfHwgbWF0cml4WzVdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcHggPSBzdHlsZS50b3AucmVwbGFjZSgncHgnLCAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKC1weCAvIGl0ZW1IZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVhZHkodCwgaSkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoaXZbaV0pO1xyXG4gICAgICAgICAgICBkZWxldGUgaXZbaV07XHJcbiAgICAgICAgICAgIHQuY2xvc2VzdCgnLmR3d2wnKS5yZW1vdmVDbGFzcygnZHdhJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzY3JvbGwodCwgaW5kZXgsIHZhbCwgdGltZSwgYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHZhciBweCA9IC12YWwgKiBpdGVtSGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSB0WzBdLnN0eWxlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHB4ID09IHBpeGVsc1tpbmRleF0gJiYgaXZbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vaWYgKHRpbWUgJiYgcHggIT0gcGl4ZWxzW2luZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVHJpZ2dlciBhbmltYXRpb24gc3RhcnQgZXZlbnRcclxuICAgICAgICAgICAgICAgIC8vdHJpZ2dlcignb25BbmltU3RhcnQnLCBbJG1hcmt1cCwgaW5kZXgsIHRpbWVdKTtcclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICBwaXhlbHNbaW5kZXhdID0gcHg7XHJcblxyXG4gICAgICAgICAgICBzdHlsZVtwciArICdUcmFuc2l0aW9uJ10gPSAnYWxsICcgKyAodGltZSA/IHRpbWUudG9GaXhlZCgzKSA6IDApICsgJ3MgZWFzZS1vdXQnO1xyXG5cclxuICAgICAgICAgICAgaWYgKGhhczNkKSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtwciArICdUcmFuc2Zvcm0nXSA9ICd0cmFuc2xhdGUzZCgwLCcgKyBweCArICdweCwwKSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZS50b3AgPSBweCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpdltpbmRleF0pIHtcclxuICAgICAgICAgICAgICAgIHJlYWR5KHQsIGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRpbWUgJiYgYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0LmNsb3Nlc3QoJy5kd3dsJykuYWRkQ2xhc3MoJ2R3YScpO1xyXG4gICAgICAgICAgICAgICAgaXZbaW5kZXhdID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZHkodCwgaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfSwgdGltZSAqIDEwMDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwb3NbaW5kZXhdID0gdmFsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0VmFsaWQodmFsLCB0LCBkaXIsIG11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgIHZhciBjZWxsID0gJCgnLmR3LWxpW2RhdGEtdmFsPVwiJyArIHZhbCArICdcIl0nLCB0KSxcclxuICAgICAgICAgICAgICAgIGNlbGxzID0gJCgnLmR3LWxpJywgdCksXHJcbiAgICAgICAgICAgICAgICB2ID0gY2VsbHMuaW5kZXgoY2VsbCksXHJcbiAgICAgICAgICAgICAgICBsID0gY2VsbHMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgaWYgKG11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRHbG9iYWxzKHQpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFjZWxsLmhhc0NsYXNzKCdkdy12JykpIHsgLy8gU2Nyb2xsIHRvIGEgdmFsaWQgY2VsbFxyXG4gICAgICAgICAgICAgICAgdmFyIGNlbGwxID0gY2VsbCxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsMiA9IGNlbGwsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzdDEgPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3QyID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAodiAtIGRpc3QxID49IDAgJiYgIWNlbGwxLmhhc0NsYXNzKCdkdy12JykpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXN0MSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNlbGwxID0gY2VsbHMuZXEodiAtIGRpc3QxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAodiArIGRpc3QyIDwgbCAmJiAhY2VsbDIuaGFzQ2xhc3MoJ2R3LXYnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3QyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbDIgPSBjZWxscy5lcSh2ICsgZGlzdDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGhhdmUgZGlyZWN0aW9uICgrLy0gb3IgbW91c2Ugd2hlZWwpLCB0aGUgZGlzdGFuY2UgZG9lcyBub3QgY291bnRcclxuICAgICAgICAgICAgICAgIGlmICgoKGRpc3QyIDwgZGlzdDEgJiYgZGlzdDIgJiYgZGlyICE9PSAyKSB8fCAhZGlzdDEgfHwgKHYgLSBkaXN0MSA8IDApIHx8IGRpciA9PSAxKSAmJiBjZWxsMi5oYXNDbGFzcygnZHctdicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbCA9IGNlbGwyO1xyXG4gICAgICAgICAgICAgICAgICAgIHYgPSB2ICsgZGlzdDI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNlbGwgPSBjZWxsMTtcclxuICAgICAgICAgICAgICAgICAgICB2ID0gdiAtIGRpc3QxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgY2VsbDogY2VsbCxcclxuICAgICAgICAgICAgICAgIHY6IG11bHRpcGxlID8gY29uc3RyYWluKHYsIG1pbiwgbWF4KSA6IHYsXHJcbiAgICAgICAgICAgICAgICB2YWw6IGNlbGwuaGFzQ2xhc3MoJ2R3LXYnKSA/IGNlbGwuYXR0cignZGF0YS12YWwnKSA6IG51bGxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNjcm9sbFRvUG9zKHRpbWUsIGluZGV4LCBtYW51YWwsIGRpciwgYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIC8vIENhbGwgdmFsaWRhdGlvbiBldmVudFxyXG4gICAgICAgICAgICBpZiAodHJpZ2dlcigndmFsaWRhdGUnLCBbJG1hcmt1cCwgaW5kZXgsIHRpbWUsIGRpcl0pICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IHNjcm9sbGVycyB0byBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgJCgnLmR3LXVsJywgJG1hcmt1cCkuZWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGUgPSB0LmNsb3Nlc3QoJy5kd3dsJykuaGFzQ2xhc3MoJ2R3d21zJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjID0gaSA9PSBpbmRleCB8fCBpbmRleCA9PT0gdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBnZXRWYWxpZCh0aGF0LnRlbXBbaV0sIHQsIGRpciwgbXVsdGlwbGUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsID0gcmVzLmNlbGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKGNlbGwuaGFzQ2xhc3MoJ2R3LXNlbCcpKSB8fCBzYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTZXQgdmFsaWQgdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50ZW1wW2ldID0gcmVzLnZhbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kdy1zZWwnLCB0KS5yZW1vdmVBdHRyKCdhcmlhLXNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgc2VsZWN0ZWQgY2xhc3MgdG8gY2VsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZHctc2VsJywgdCkucmVtb3ZlQ2xhc3MoJ2R3LXNlbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmFkZENsYXNzKCdkdy1zZWwnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNjcm9sbCB0byBwb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwodCwgaSwgcmVzLnYsIHNjID8gdGltZSA6IDAuMSwgc2MgPyBhY3RpdmUgOiBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVmb3JtYXQgdmFsdWUgaWYgdmFsaWRhdGlvbiBjaGFuZ2VkIHNvbWV0aGluZ1xyXG4gICAgICAgICAgICAgICAgdGhhdC5fdmFsdWVUZXh0ID0gdmFsdWVUZXh0ID0gcy5mb3JtYXRSZXN1bHQodGhhdC50ZW1wKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5saXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5faGFzVmFsdWUgPSBtYW51YWwgfHwgdGhhdC5faGFzVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VmFsdWUobWFudWFsLCBtYW51YWwsIDAsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuX2hlYWRlci5odG1sKGZvcm1hdEhlYWRlcih2YWx1ZVRleHQpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWFudWFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcignb25DaGFuZ2UnLCBbdmFsdWVUZXh0XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcignb25WYWxpZGF0ZWQnLCBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjYWxjKHQsIHZhbCwgZGlyLCBhbmltLCBvcmlnKSB7XHJcbiAgICAgICAgICAgIHZhbCA9IGNvbnN0cmFpbih2YWwsIG1pbiwgbWF4KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjZWxsID0gJCgnLmR3LWxpJywgdCkuZXEodmFsKSxcclxuICAgICAgICAgICAgICAgIG8gPSBvcmlnID09PSB1bmRlZmluZWQgPyB2YWwgOiBvcmlnLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlID0gb3JpZyAhPT0gdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgaWR4ID0gaW5kZXgsXHJcbiAgICAgICAgICAgICAgICBkaXN0ID0gTWF0aC5hYnModmFsIC0gbyksXHJcbiAgICAgICAgICAgICAgICB0aW1lID0gYW5pbSA/ICh2YWwgPT0gbyA/IDAuMSA6IGRpc3QgKiBzLnRpbWVVbml0ICogTWF0aC5tYXgoMC41LCAoMTAwIC0gZGlzdCkgLyAxMDApKSA6IDA7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgc2VsZWN0ZWQgc2Nyb2xsZXIgdmFsdWVcclxuICAgICAgICAgICAgdGhhdC50ZW1wW2lkeF0gPSBjZWxsLmF0dHIoJ2RhdGEtdmFsJyk7XHJcblxyXG4gICAgICAgICAgICBzY3JvbGwodCwgaWR4LCB2YWwsIHRpbWUsIGFjdGl2ZSk7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIFZhbGlkYXRlXHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb1Bvcyh0aW1lLCBpZHgsIHRydWUsIGRpciwgYWN0aXZlKTtcclxuICAgICAgICAgICAgfSwgMTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcGx1cyh0KSB7XHJcbiAgICAgICAgICAgIHZhciB2YWwgPSBwb3NbaW5kZXhdICsgMTtcclxuICAgICAgICAgICAgY2FsYyh0LCB2YWwgPiBtYXggPyBtaW4gOiB2YWwsIDEsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbWludXModCkge1xyXG4gICAgICAgICAgICB2YXIgdmFsID0gcG9zW2luZGV4XSAtIDE7XHJcbiAgICAgICAgICAgIGNhbGModCwgdmFsIDwgbWluID8gbWF4IDogdmFsLCAyLCB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldFZhbHVlKGZpbGwsIGNoYW5nZSwgdGltZSwgbm9zY3JvbGwsIHRlbXApIHtcclxuICAgICAgICAgICAgaWYgKHRoYXQuX2lzVmlzaWJsZSAmJiAhbm9zY3JvbGwpIHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvUG9zKHRpbWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGF0Ll92YWx1ZVRleHQgPSB2YWx1ZVRleHQgPSBzLmZvcm1hdFJlc3VsdCh0aGF0LnRlbXApO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnZhbHVlcyA9IHRoYXQudGVtcC5zbGljZSgwKTtcclxuICAgICAgICAgICAgICAgIHRoYXQudmFsID0gdGhhdC5faGFzVmFsdWUgPyB2YWx1ZVRleHQgOiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZmlsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHRyaWdnZXIoJ29uVmFsdWVGaWxsJywgW3RoYXQuX2hhc1ZhbHVlID8gdmFsdWVUZXh0IDogJycsIGNoYW5nZV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGF0Ll9pc0lucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGVsbS52YWwodGhhdC5faGFzVmFsdWUgPyB2YWx1ZVRleHQgOiAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Ll9wcmV2ZW50Q2hhbmdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGVsbS5jaGFuZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENhbGwgdGhlIHBhcmVudCBjb25zdHJ1Y3RvclxyXG4gICAgICAgIGNsYXNzZXMuV2lkZ2V0LmNhbGwodGhpcywgZWwsIHNldHRpbmdzLCB0cnVlKTtcclxuXHJcbiAgICAgICAgLy8gUHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIEdldHMgdGhlIHNlbGVjdGVkIHdoZWVsIHZhbHVlcywgZm9ybWF0cyBpdCwgYW5kIHNldCB0aGUgdmFsdWUgb2YgdGhlIHNjcm9sbGVyIGluc3RhbmNlLlxyXG4gICAgICAgICogSWYgaW5wdXQgcGFyYW1ldGVyIGlzIHRydWUsIHBvcHVsYXRlcyB0aGUgYXNzb2NpYXRlZCBpbnB1dCBlbGVtZW50LlxyXG4gICAgICAgICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFdoZWVsIHZhbHVlcy5cclxuICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2ZpbGw9ZmFsc2VdIEFsc28gc2V0IHRoZSB2YWx1ZSBvZiB0aGUgYXNzb2NpYXRlZCBpbnB1dCBlbGVtZW50LlxyXG4gICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IFt0aW1lPTBdIEFuaW1hdGlvbiB0aW1lXHJcbiAgICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFt0ZW1wPWZhbHNlXSBJZiB0cnVlLCB0aGVuIG9ubHkgc2V0IHRoZSB0ZW1wb3JhcnkgdmFsdWUuKG9ubHkgc2Nyb2xsIHRoZXJlIGJ1dCBub3Qgc2V0IHRoZSB2YWx1ZSlcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoYXQuc2V0VmFsdWUgPSBmdW5jdGlvbiAodmFsdWVzLCBmaWxsLCB0aW1lLCB0ZW1wLCBjaGFuZ2UpIHtcclxuICAgICAgICAgICAgdGhhdC5faGFzVmFsdWUgPSB2YWx1ZXMgIT09IG51bGwgJiYgdmFsdWVzICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHRoYXQudGVtcCA9ICQuaXNBcnJheSh2YWx1ZXMpID8gdmFsdWVzLnNsaWNlKDApIDogcy5wYXJzZVZhbHVlLmNhbGwoZWwsIHZhbHVlcywgdGhhdCk7XHJcbiAgICAgICAgICAgIHNldFZhbHVlKGZpbGwsIGNoYW5nZSA9PT0gdW5kZWZpbmVkID8gZmlsbCA6IGNoYW5nZSwgdGltZSwgZmFsc2UsIHRlbXApO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogUmV0dXJuIHRoZSBzZWxlY3RlZCB3aGVlbCB2YWx1ZXMuXHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGF0LmdldFZhbHVlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5faGFzVmFsdWUgPyB0aGF0LnZhbHVlcyA6IG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBSZXR1cm4gc2VsZWN0ZWQgdmFsdWVzLCBpZiBpbiBtdWx0aXNlbGVjdCBtb2RlLlxyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhhdC5nZXRWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByZXQgPSBbXSxcclxuICAgICAgICAgICAgICAgIGk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGkgaW4gdGhhdC5fc2VsZWN0ZWRWYWx1ZXMpIHtcclxuICAgICAgICAgICAgICAgIHJldC5wdXNoKHRoYXQuX3NlbGVjdGVkVmFsdWVzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogQ2hhbmdlcyB0aGUgdmFsdWVzIG9mIGEgd2hlZWwsIGFuZCBzY3JvbGxzIHRvIHRoZSBjb3JyZWN0IHBvc2l0aW9uXHJcbiAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBpZHggSW5kZXhlcyBvZiB0aGUgd2hlZWxzIHRvIGNoYW5nZS5cclxuICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbdGltZT0wXSBBbmltYXRpb24gdGltZSB3aGVuIHNjcm9sbGluZyB0byB0aGUgc2VsZWN0ZWQgdmFsdWUgb24gdGhlIG5ldyB3aGVlbC5cclxuICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW21hbnVhbD1mYWxzZV0gSW5kaWNhdGVzIHRoYXQgdGhlIGNoYW5nZSB3YXMgdHJpZ2dlcmVkIGJ5IHRoZSB1c2VyIG9yIGZyb20gY29kZS5cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoYXQuY2hhbmdlV2hlZWwgPSBmdW5jdGlvbiAoaWR4LCB0aW1lLCBtYW51YWwpIHtcclxuICAgICAgICAgICAgaWYgKCRtYXJrdXApIHtcclxuICAgICAgICAgICAgICAgIHZhciBpID0gMCxcclxuICAgICAgICAgICAgICAgICAgICBuciA9IGlkeC5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICAgICAgJC5lYWNoKHMud2hlZWxzLCBmdW5jdGlvbiAoaiwgd2cpIHtcclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2god2csIGZ1bmN0aW9uIChrLCB3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkLmluQXJyYXkoaSwgaWR4KSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbHNbaV0gPSB3O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmR3LXVsJywgJG1hcmt1cCkuZXEoaSkuaHRtbChnZW5lcmF0ZVdoZWVsSXRlbXMoaSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnItLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9Qb3ModGltZSwgdW5kZWZpbmVkLCBtYW51YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFucikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFJldHVybnMgdGhlIGNsb3Nlc3QgdmFsaWQgY2VsbC5cclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoYXQuZ2V0VmFsaWRDZWxsID0gZ2V0VmFsaWQ7XHJcblxyXG4gICAgICAgIC8vIFByb3RlY3RlZCBvdmVycmlkZXNcclxuXHJcbiAgICAgICAgdGhhdC5fZ2VuZXJhdGVDb250ZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbGJsLFxyXG4gICAgICAgICAgICAgICAgaHRtbCA9ICcnLFxyXG4gICAgICAgICAgICAgICAgbCA9IDA7XHJcblxyXG4gICAgICAgICAgICAkLmVhY2gocy53aGVlbHMsIGZ1bmN0aW9uIChpLCB3ZykgeyAvLyBXaGVlbCBncm91cHNcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJtYnNjLXctcCBkd2MnICsgKHMubW9kZSAhPSAnc2Nyb2xsZXInID8gJyBkd3BtJyA6ICcgZHdzYycpICsgKHMuc2hvd0xhYmVsID8gJycgOiAnIGR3aGwnKSArICdcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZHd3Y1wiJyArIChzLm1heFdpZHRoID8gJycgOiAnIHN0eWxlPVwibWF4LXdpZHRoOjYwMHB4O1wiJykgKyAnPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChoYXNGbGV4ID8gJycgOiAnPHRhYmxlIGNsYXNzPVwiZHctdGJsXCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCI+PHRyPicpO1xyXG5cclxuICAgICAgICAgICAgICAgICQuZWFjaCh3ZywgZnVuY3Rpb24gKGosIHcpIHsgLy8gV2hlZWxzXHJcbiAgICAgICAgICAgICAgICAgICAgd2hlZWxzW2xdID0gdztcclxuICAgICAgICAgICAgICAgICAgICBsYmwgPSB3LmxhYmVsICE9PSB1bmRlZmluZWQgPyB3LmxhYmVsIDogajtcclxuICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8JyArIChoYXNGbGV4ID8gJ2RpdicgOiAndGQnKSArICcgY2xhc3M9XCJkd2ZsXCInICsgJyBzdHlsZT1cIicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocy5maXhlZFdpZHRoID8gKCd3aWR0aDonICsgKHMuZml4ZWRXaWR0aFtsXSB8fCBzLmZpeGVkV2lkdGgpICsgJ3B4OycpIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHMubWluV2lkdGggPyAoJ21pbi13aWR0aDonICsgKHMubWluV2lkdGhbbF0gfHwgcy5taW5XaWR0aCkgKyAncHg7JykgOiAnbWluLXdpZHRoOicgKyBzLndpZHRoICsgJ3B4OycpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHMubWF4V2lkdGggPyAoJ21heC13aWR0aDonICsgKHMubWF4V2lkdGhbbF0gfHwgcy5tYXhXaWR0aCkgKyAncHg7JykgOiAnJykpICsgJ1wiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZHd3bCBkd3dsJyArIGwgKyAody5tdWx0aXBsZSA/ICcgZHd3bXMnIDogJycpICsgJ1wiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzLm1vZGUgIT0gJ3Njcm9sbGVyJyA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZHdiLWUgZHd3YiBkd3dicCAnICsgKHMuYnRuUGx1c0NsYXNzIHx8ICcnKSArICdcIiBzdHlsZT1cImhlaWdodDonICsgaXRlbUhlaWdodCArICdweDtsaW5lLWhlaWdodDonICsgaXRlbUhlaWdodCArICdweDtcIj48c3Bhbj4rPC9zcGFuPjwvZGl2PicgKyAvLyArIGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImR3Yi1lIGR3d2IgZHd3Ym0gJyArIChzLmJ0bk1pbnVzQ2xhc3MgfHwgJycpICsgJ1wiIHN0eWxlPVwiaGVpZ2h0OicgKyBpdGVtSGVpZ2h0ICsgJ3B4O2xpbmUtaGVpZ2h0OicgKyBpdGVtSGVpZ2h0ICsgJ3B4O1wiPjxzcGFuPiZuZGFzaDs8L3NwYW4+PC9kaXY+JyA6ICcnKSArIC8vIC0gYnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJkd2xcIj4nICsgbGJsICsgJzwvZGl2PicgKyAvLyBXaGVlbCBsYWJlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IHRhYmluZGV4PVwiMFwiIGFyaWEtbGl2ZT1cIm9mZlwiIGFyaWEtbGFiZWw9XCInICsgbGJsICsgJ1wiIHJvbGU9XCJsaXN0Ym94XCIgY2xhc3M9XCJkd3d3XCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZHd3XCIgc3R5bGU9XCJoZWlnaHQ6JyArIChzLnJvd3MgKiBpdGVtSGVpZ2h0KSArICdweDtcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZHctdWxcIiBzdHlsZT1cIm1hcmdpbi10b3A6JyArICh3Lm11bHRpcGxlID8gMCA6IHMucm93cyAvIDIgKiBpdGVtSGVpZ2h0IC0gaXRlbUhlaWdodCAvIDIpICsgJ3B4O1wiPic7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB3aGVlbCB2YWx1ZXNcclxuICAgICAgICAgICAgICAgICAgICBodG1sICs9IGdlbmVyYXRlV2hlZWxJdGVtcyhsKSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwiZHd3b1wiPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJkd3dvbFwiJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChzLnNlbGVjdGVkTGluZUhlaWdodCA/ICcgc3R5bGU9XCJoZWlnaHQ6JyArIGl0ZW1IZWlnaHQgKyAncHg7bWFyZ2luLXRvcDotJyArIChpdGVtSGVpZ2h0IC8gMiArIChzLnNlbGVjdGVkTGluZUJvcmRlciB8fCAwKSkgKyAncHg7XCInIDogJycpICsgJz48L2Rpdj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGhhc0ZsZXggPyAnPC9kaXY+JyA6ICc8L3RkPicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsKys7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBodG1sICs9IChoYXNGbGV4ID8gJycgOiAnPC90cj48L3RhYmxlPicpICsgJzwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGh0bWw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhhdC5fYXR0YWNoRXZlbnRzID0gZnVuY3Rpb24gKCRtYXJrdXApIHtcclxuICAgICAgICAgICAgJG1hcmt1cFxyXG4gICAgICAgICAgICAgICAgLm9uKCdET01Nb3VzZVNjcm9sbCBtb3VzZXdoZWVsJywgJy5kd3dsJywgb25TY3JvbGwpXHJcbiAgICAgICAgICAgICAgICAub24oJ2tleWRvd24nLCAnLmR3d2wnLCBvbktleURvd24pXHJcbiAgICAgICAgICAgICAgICAub24oJ2tleXVwJywgJy5kd3dsJywgb25LZXlVcClcclxuICAgICAgICAgICAgICAgIC5vbigndG91Y2hzdGFydCBtb3VzZWRvd24nLCAnLmR3d2wnLCBvblN0YXJ0KVxyXG4gICAgICAgICAgICAgICAgLm9uKCd0b3VjaG1vdmUnLCAnLmR3d2wnLCBvbk1vdmUpXHJcbiAgICAgICAgICAgICAgICAub24oJ3RvdWNoZW5kJywgJy5kd3dsJywgb25FbmQpXHJcbiAgICAgICAgICAgICAgICAub24oJ3RvdWNoc3RhcnQgbW91c2Vkb3duJywgJy5kd2ItZScsIG9uQnRuU3RhcnQpXHJcbiAgICAgICAgICAgICAgICAub24oJ3RvdWNoZW5kJywgJy5kd2ItZScsIG9uQnRuRW5kKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGF0Ll9tYXJrdXBSZWFkeSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJG1hcmt1cCA9IHRoYXQuX21hcmt1cDtcclxuICAgICAgICAgICAgc2Nyb2xsVG9Qb3MoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGF0Ll9maWxsVmFsdWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoYXQuX2hhc1ZhbHVlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2V0VmFsdWUodHJ1ZSwgdHJ1ZSwgMCwgdHJ1ZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhhdC5fcmVhZFZhbHVlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdiA9ICRlbG0udmFsKCkgfHwgJyc7XHJcbiAgICAgICAgICAgIHRoYXQuX2hhc1ZhbHVlID0gdiAhPT0gJyc7XHJcbiAgICAgICAgICAgIHRoYXQudGVtcCA9IHRoYXQudmFsdWVzID8gdGhhdC52YWx1ZXMuc2xpY2UoMCkgOiBzLnBhcnNlVmFsdWUodiwgdGhhdCk7XHJcbiAgICAgICAgICAgIHNldFZhbHVlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhhdC5fcHJvY2Vzc1NldHRpbmdzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzID0gdGhhdC5zZXR0aW5ncztcclxuICAgICAgICAgICAgdHJpZ2dlciA9IHRoYXQudHJpZ2dlcjtcclxuICAgICAgICAgICAgaXRlbUhlaWdodCA9IHMuaGVpZ2h0O1xyXG4gICAgICAgICAgICBsaW5lcyA9IHMubXVsdGlsaW5lO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5faXNMaXF1aWQgPSAocy5sYXlvdXQgfHwgKC90b3B8Ym90dG9tLy50ZXN0KHMuZGlzcGxheSkgJiYgcy53aGVlbHMubGVuZ3RoID09IDEgPyAnbGlxdWlkJyA6ICcnKSkgPT09ICdsaXF1aWQnO1xyXG5cclxuICAgICAgICAgICAgdGhhdC52YWx1ZXMgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGF0LnRlbXAgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxpbmVzID4gMSkge1xyXG4gICAgICAgICAgICAgICAgcy5jc3NDbGFzcyA9IChzLmNzc0NsYXNzIHx8ICcnKSArICcgZHctbWwnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gUHJvcGVydGllc1xyXG5cclxuICAgICAgICB0aGF0Ll9zZWxlY3RlZFZhbHVlcyA9IHt9O1xyXG5cclxuICAgICAgICAvLyBDb25zdHJ1Y3RvclxyXG4gICAgICAgIGlmICghaW5oZXJpdCkge1xyXG4gICAgICAgICAgICBpbnN0YW5jZXNbZWwuaWRdID0gdGhhdDtcclxuICAgICAgICAgICAgdGhhdC5pbml0KHNldHRpbmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEV4dGVuZCBkZWZhdWx0c1xyXG4gICAgY2xhc3Nlcy5TY3JvbGxlci5wcm90b3R5cGUuX2NsYXNzID0gJ3Njcm9sbGVyJztcclxuICAgIGNsYXNzZXMuU2Nyb2xsZXIucHJvdG90eXBlLl9kZWZhdWx0cyA9ICQuZXh0ZW5kKHt9LCBjbGFzc2VzLldpZGdldC5wcm90b3R5cGUuX2RlZmF1bHRzLCB7XHJcbiAgICAgICAgLy8gT3B0aW9uc1xyXG4gICAgICAgIG1pbldpZHRoOiA4MCxcclxuICAgICAgICBoZWlnaHQ6IDQwLFxyXG4gICAgICAgIHJvd3M6IDMsXHJcbiAgICAgICAgbXVsdGlsaW5lOiAxLFxyXG4gICAgICAgIGRlbGF5OiAzMDAsXHJcbiAgICAgICAgcmVhZG9ubHk6IGZhbHNlLFxyXG4gICAgICAgIHNob3dMYWJlbDogdHJ1ZSxcclxuICAgICAgICB3aGVlbHM6IFtdLFxyXG4gICAgICAgIG1vZGU6ICdzY3JvbGxlcicsXHJcbiAgICAgICAgcHJlc2V0OiAnJyxcclxuICAgICAgICBzcGVlZFVuaXQ6IDAuMDAxMixcclxuICAgICAgICB0aW1lVW5pdDogMC4wOCxcclxuICAgICAgICBmb3JtYXRSZXN1bHQ6IGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkLmpvaW4oJyAnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcnNlVmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSwgaW5zdCkge1xyXG4gICAgICAgICAgICB2YXIgdmFsID0gdmFsdWUuc3BsaXQoJyAnKSxcclxuICAgICAgICAgICAgICAgIHJldCA9IFtdLFxyXG4gICAgICAgICAgICAgICAgaSA9IDAsXHJcbiAgICAgICAgICAgICAgICBrZXlzO1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKGluc3Quc2V0dGluZ3Mud2hlZWxzLCBmdW5jdGlvbiAoaiwgd2cpIHtcclxuICAgICAgICAgICAgICAgICQuZWFjaCh3ZywgZnVuY3Rpb24gKGssIHcpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBAZGVwcmVjYXRlZCBzaW5jZSAyLjYuMCwgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBjb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLS0tXHJcbiAgICAgICAgICAgICAgICAgICAgdyA9IHcudmFsdWVzID8gdyA6IGNvbnZlcnQodyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLS0tXHJcbiAgICAgICAgICAgICAgICAgICAga2V5cyA9IHcua2V5cyB8fCB3LnZhbHVlcztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJC5pbkFycmF5KHZhbFtpXSwga2V5cykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldC5wdXNoKHZhbFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0LnB1c2goa2V5c1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn0pKGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbihmdW5jdGlvbiAoJCwgdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgdmFyIG1zID0gJC5tb2Jpc2Nyb2xsLFxyXG4gICAgICAgIGRhdGV0aW1lID0gbXMuZGF0ZXRpbWUsXHJcbiAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKCksXHJcbiAgICAgICAgZGVmYXVsdHMgPSB7XHJcbiAgICAgICAgICAgIHN0YXJ0WWVhcjogZGF0ZS5nZXRGdWxsWWVhcigpIC0gMTAwLFxyXG4gICAgICAgICAgICBlbmRZZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCkgKyAxLCBcclxuICAgICAgICAgICAgc2hvd05vdzogZmFsc2UsXHJcbiAgICAgICAgICAgIHN0ZXBIb3VyOiAxLFxyXG4gICAgICAgICAgICBzdGVwTWludXRlOiAxLFxyXG4gICAgICAgICAgICBzdGVwU2Vjb25kOiAxLFxyXG4gICAgICAgICAgICBzZXBhcmF0b3I6ICcgJyxcclxuICAgICAgICAgICAgLy8gTG9jYWxpemF0aW9uXHJcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6ICdtbS9kZC95eScsXHJcbiAgICAgICAgICAgIGRhdGVPcmRlcjogJ21tZGR5JyxcclxuICAgICAgICAgICAgdGltZVdoZWVsczogJ2hoaWlBJyxcclxuICAgICAgICAgICAgdGltZUZvcm1hdDogJ2hoOmlpIEEnLFxyXG4gICAgICAgICAgICBkYXlUZXh0OiAnRGF5JyxcclxuICAgICAgICAgICAgeWVhclRleHQ6ICdZZWFyJyxcclxuICAgICAgICAgICAgaG91clRleHQ6ICdIb3VycycsXHJcbiAgICAgICAgICAgIG1pbnV0ZVRleHQ6ICdNaW51dGVzJyxcclxuICAgICAgICAgICAgYW1wbVRleHQ6ICcmbmJzcDsnLFxyXG4gICAgICAgICAgICBzZWNUZXh0OiAnU2Vjb25kcycsXHJcbiAgICAgICAgICAgIG5vd1RleHQ6ICdOb3cnXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAY2xhc3MgTW9iaXNjcm9sbC5kYXRldGltZVxyXG4gICAgICAgICAqIEBleHRlbmRzIE1vYmlzY3JvbGxcclxuICAgICAgICAgKiBNb2Jpc2Nyb2xsIERhdGV0aW1lIGNvbXBvbmVudFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByZXNldCA9IGZ1bmN0aW9uIChpbnN0KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgIGh0bWw1ZGVmID0ge30sXHJcbiAgICAgICAgICAgICAgICBmb3JtYXQ7XHJcbiAgICAgICAgICAgIC8vIEZvcmNlIGZvcm1hdCBmb3IgaHRtbDUgZGF0ZSBpbnB1dHMgKGV4cGVyaW1lbnRhbClcclxuICAgICAgICAgICAgaWYgKHRoYXQuaXMoJ2lucHV0JykpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhhdC5hdHRyKCd0eXBlJykpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9ICd5eS1tbS1kZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdkYXRldGltZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gJ3l5LW1tLWRkVEhIOmlpOnNzWic7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdkYXRldGltZS1sb2NhbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gJ3l5LW1tLWRkVEhIOmlpOnNzJztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSAneXktbW0nO1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bWw1ZGVmLmRhdGVPcmRlciA9ICdtbXl5JztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3RpbWUnOlxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9ICdISDppaTpzcyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBmb3IgbWluL21heCBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgICAgICB2YXIgbWluID0gdGhhdC5hdHRyKCdtaW4nKSxcclxuICAgICAgICAgICAgICAgICAgICBtYXggPSB0aGF0LmF0dHIoJ21heCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1pbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bWw1ZGVmLm1pbkRhdGUgPSBkYXRldGltZS5wYXJzZURhdGUoZm9ybWF0LCBtaW4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG1heCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bWw1ZGVmLm1heERhdGUgPSBkYXRldGltZS5wYXJzZURhdGUoZm9ybWF0LCBtYXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgeWVhci1tb250aC1kYXkgb3JkZXJcclxuICAgICAgICAgICAgdmFyIGksXHJcbiAgICAgICAgICAgICAgICBrLFxyXG4gICAgICAgICAgICAgICAga2V5cyxcclxuICAgICAgICAgICAgICAgIHZhbHVlcyxcclxuICAgICAgICAgICAgICAgIHdnLFxyXG4gICAgICAgICAgICAgICAgc3RhcnQsXHJcbiAgICAgICAgICAgICAgICBlbmQsXHJcbiAgICAgICAgICAgICAgICBoYXNUaW1lLFxyXG4gICAgICAgICAgICAgICAgbWlucyxcclxuICAgICAgICAgICAgICAgIG1heHMsXHJcbiAgICAgICAgICAgICAgICBvcmlnID0gJC5leHRlbmQoe30sIGluc3Quc2V0dGluZ3MpLFxyXG4gICAgICAgICAgICAgICAgcyA9ICQuZXh0ZW5kKGluc3Quc2V0dGluZ3MsIG1zLmRhdGV0aW1lLmRlZmF1bHRzLCBkZWZhdWx0cywgaHRtbDVkZWYsIG9yaWcpLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gMCxcclxuICAgICAgICAgICAgICAgIHZhbGlkVmFsdWVzID0gW10sXHJcbiAgICAgICAgICAgICAgICB3aGVlbHMgPSBbXSxcclxuICAgICAgICAgICAgICAgIG9yZCA9IFtdLFxyXG4gICAgICAgICAgICAgICAgbyA9IHt9LFxyXG4gICAgICAgICAgICAgICAgZiA9IHsgeTogZ2V0WWVhciwgbTogZ2V0TW9udGgsIGQ6IGdldERheSwgaDogZ2V0SG91ciwgaTogZ2V0TWludXRlLCBzOiBnZXRTZWNvbmQsIGE6IGdldEFtUG0gfSxcclxuICAgICAgICAgICAgICAgIGludmFsaWQgPSBzLmludmFsaWQsXHJcbiAgICAgICAgICAgICAgICB2YWxpZCA9IHMudmFsaWQsXHJcbiAgICAgICAgICAgICAgICBwID0gcy5wcmVzZXQsXHJcbiAgICAgICAgICAgICAgICBkb3JkID0gcy5kYXRlT3JkZXIsXHJcbiAgICAgICAgICAgICAgICB0b3JkID0gcy50aW1lV2hlZWxzLFxyXG4gICAgICAgICAgICAgICAgcmVnZW4gPSBkb3JkLm1hdGNoKC9ELyksXHJcbiAgICAgICAgICAgICAgICBhbXBtID0gdG9yZC5tYXRjaCgvYS9pKSxcclxuICAgICAgICAgICAgICAgIGhhbXBtID0gdG9yZC5tYXRjaCgvaC8pLFxyXG4gICAgICAgICAgICAgICAgaGZvcm1hdCA9IHAgPT0gJ2RhdGV0aW1lJyA/IHMuZGF0ZUZvcm1hdCArIHMuc2VwYXJhdG9yICsgcy50aW1lRm9ybWF0IDogcCA9PSAndGltZScgPyBzLnRpbWVGb3JtYXQgOiBzLmRhdGVGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICBkZWZkID0gbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICAgIHN0ZXBIID0gcy5zdGVwSG91cixcclxuICAgICAgICAgICAgICAgIHN0ZXBNID0gcy5zdGVwTWludXRlLFxyXG4gICAgICAgICAgICAgICAgc3RlcFMgPSBzLnN0ZXBTZWNvbmQsXHJcbiAgICAgICAgICAgICAgICBtaW5kID0gcy5taW5EYXRlIHx8IG5ldyBEYXRlKHMuc3RhcnRZZWFyLCAwLCAxKSxcclxuICAgICAgICAgICAgICAgIG1heGQgPSBzLm1heERhdGUgfHwgbmV3IERhdGUocy5lbmRZZWFyLCAxMSwgMzEsIDIzLCA1OSwgNTkpLFxyXG4gICAgICAgICAgICAgICAgbWluSCA9IG1pbmQuZ2V0SG91cnMoKSAlIHN0ZXBILFxyXG4gICAgICAgICAgICAgICAgbWluTSA9IG1pbmQuZ2V0TWludXRlcygpICUgc3RlcE0sXHJcbiAgICAgICAgICAgICAgICBtaW5TID0gbWluZC5nZXRTZWNvbmRzKCkgJSBzdGVwUyxcclxuICAgICAgICAgICAgICAgIG1heEggPSBnZXRNYXgoc3RlcEgsIG1pbkgsIChoYW1wbSA/IDExIDogMjMpKSxcclxuICAgICAgICAgICAgICAgIG1heE0gPSBnZXRNYXgoc3RlcE0sIG1pbk0sIDU5KSxcclxuICAgICAgICAgICAgICAgIG1heFMgPSBnZXRNYXgoc3RlcE0sIG1pbk0sIDU5KTtcclxuXHJcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCBoZm9ybWF0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHAubWF0Y2goL2RhdGUvaSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIG9yZGVyIG9mIHllYXIsIG1vbnRoLCBkYXkgd2hlZWxzXHJcbiAgICAgICAgICAgICAgICAkLmVhY2goWyd5JywgJ20nLCAnZCddLCBmdW5jdGlvbiAoaiwgdikge1xyXG4gICAgICAgICAgICAgICAgICAgIGkgPSBkb3JkLnNlYXJjaChuZXcgUmVnRXhwKHYsICdpJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkLnB1c2goeyBvOiBpLCB2OiB2IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgb3JkLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEubyA+IGIubyA/IDEgOiAtMTsgfSk7XHJcbiAgICAgICAgICAgICAgICAkLmVhY2gob3JkLCBmdW5jdGlvbiAoaSwgdikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9bdi52XSA9IGk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB3ZyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChrID0gMDsgayA8IDM7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrID09IG8ueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBzLmdldFllYXIobWluZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IHMuZ2V0WWVhcihtYXhkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gc3RhcnQ7IGkgPD0gZW5kOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKChkb3JkLm1hdGNoKC95eS9pKSA/IGkgOiAoaSArICcnKS5zdWJzdHIoMiwgMikpICsgKHMueWVhclN1ZmZpeCB8fCAnJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFdoZWVsKHdnLCBrZXlzLCB2YWx1ZXMsIHMueWVhclRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoayA9PSBvLm0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RyID0gZG9yZC5yZXBsYWNlKC9bZHldL2dpLCAnJykucmVwbGFjZSgvbW0vLCAoaSA8IDkgPyAnMCcgKyAoaSArIDEpIDogaSArIDEpICsgKHMubW9udGhTdWZmaXggfHwgJycpKS5yZXBsYWNlKC9tLywgaSArIDEgKyAocy5tb250aFN1ZmZpeCB8fCAnJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goc3RyLm1hdGNoKC9NTS8pID8gc3RyLnJlcGxhY2UoL01NLywgJzxzcGFuIGNsYXNzPVwiZHctbW9uXCI+JyArIHMubW9udGhOYW1lc1tpXSArICc8L3NwYW4+JykgOiBzdHIucmVwbGFjZSgvTS8sICc8c3BhbiBjbGFzcz1cImR3LW1vblwiPicgKyBzLm1vbnRoTmFtZXNTaG9ydFtpXSArICc8L3NwYW4+JykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFdoZWVsKHdnLCBrZXlzLCB2YWx1ZXMsIHMubW9udGhUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGsgPT0gby5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAxOyBpIDwgMzI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goKGRvcmQubWF0Y2goL2RkL2kpICYmIGkgPCAxMCA/ICcwJyArIGkgOiBpKSArIChzLmRheVN1ZmZpeCB8fCAnJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFdoZWVsKHdnLCBrZXlzLCB2YWx1ZXMsIHMuZGF5VGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgd2hlZWxzLnB1c2god2cpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocC5tYXRjaCgvdGltZS9pKSkge1xyXG4gICAgICAgICAgICAgICAgaGFzVGltZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBvcmRlciBvZiBob3VycywgbWludXRlcywgc2Vjb25kcyB3aGVlbHNcclxuICAgICAgICAgICAgICAgIG9yZCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgJC5lYWNoKFsnaCcsICdpJywgJ3MnLCAnYSddLCBmdW5jdGlvbiAoaSwgdikge1xyXG4gICAgICAgICAgICAgICAgICAgIGkgPSB0b3JkLnNlYXJjaChuZXcgUmVnRXhwKHYsICdpJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JkLnB1c2goeyBvOiBpLCB2OiB2IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgb3JkLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYS5vID4gYi5vID8gMSA6IC0xO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAkLmVhY2gob3JkLCBmdW5jdGlvbiAoaSwgdikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9bdi52XSA9IG9mZnNldCArIGk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB3ZyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChrID0gb2Zmc2V0OyBrIDwgb2Zmc2V0ICsgNDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGsgPT0gby5oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSBtaW5IOyBpIDwgKGhhbXBtID8gMTIgOiAyNCk7IGkgKz0gc3RlcEgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKGhhbXBtICYmIGkgPT09IDAgPyAxMiA6IHRvcmQubWF0Y2goL2hoL2kpICYmIGkgPCAxMCA/ICcwJyArIGkgOiBpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRXaGVlbCh3Zywga2V5cywgdmFsdWVzLCBzLmhvdXJUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGsgPT0gby5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSBtaW5NOyBpIDwgNjA7IGkgKz0gc3RlcE0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleXMucHVzaChpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHRvcmQubWF0Y2goL2lpLykgJiYgaSA8IDEwID8gJzAnICsgaSA6IGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZFdoZWVsKHdnLCBrZXlzLCB2YWx1ZXMsIHMubWludXRlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChrID09IG8ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gbWluUzsgaSA8IDYwOyBpICs9IHN0ZXBTKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaCh0b3JkLm1hdGNoKC9zcy8pICYmIGkgPCAxMCA/ICcwJyArIGkgOiBpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRXaGVlbCh3Zywga2V5cywgdmFsdWVzLCBzLnNlY1RleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoayA9PSBvLmEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cHBlciA9IHRvcmQubWF0Y2goL0EvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkV2hlZWwod2csIFswLCAxXSwgdXBwZXIgPyBbcy5hbVRleHQudG9VcHBlckNhc2UoKSwgcy5wbVRleHQudG9VcHBlckNhc2UoKV0gOiBbcy5hbVRleHQsIHMucG1UZXh0XSwgcy5hbXBtVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHdoZWVscy5wdXNoKHdnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0KGQsIGksIGRlZikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9baV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiArZFtvW2ldXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChkZWYgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWY7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZltpXShkZWZkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkV2hlZWwod2csIGssIHYsIGxibCkge1xyXG4gICAgICAgICAgICAgICAgd2cucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB2LFxyXG4gICAgICAgICAgICAgICAgICAgIGtleXM6IGssXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGxibFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHN0ZXAodiwgc3QsIG1pbiwgbWF4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5taW4obWF4LCBNYXRoLmZsb29yKHYgLyBzdCkgKiBzdCArIG1pbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFllYXIoZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHMuZ2V0WWVhcihkKTtcclxuICAgICAgICAgICAgfVxyXG5cdFx0XHRcclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0TW9udGgoZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHMuZ2V0TW9udGgoZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldERheShkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcy5nZXREYXkoZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEhvdXIoZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhvdXIgPSBkLmdldEhvdXJzKCk7XHJcbiAgICAgICAgICAgICAgICBob3VyID0gaGFtcG0gJiYgaG91ciA+PSAxMiA/IGhvdXIgLSAxMiA6IGhvdXI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RlcChob3VyLCBzdGVwSCwgbWluSCwgbWF4SCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldE1pbnV0ZShkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RlcChkLmdldE1pbnV0ZXMoKSwgc3RlcE0sIG1pbk0sIG1heE0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRTZWNvbmQoZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0ZXAoZC5nZXRTZWNvbmRzKCksIHN0ZXBTLCBtaW5TLCBtYXhTKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0QW1QbShkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYW1wbSAmJiBkLmdldEhvdXJzKCkgPiAxMSA/IDEgOiAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXREYXRlKGQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgaG91ciA9IGdldChkLCAnaCcsIDApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHMuZ2V0RGF0ZShnZXQoZCwgJ3knKSwgZ2V0KGQsICdtJyksIGdldChkLCAnZCcpLCBnZXQoZCwgJ2EnLCAwKSA/IGhvdXIgKyAxMiA6IGhvdXIsIGdldChkLCAnaScsIDApLCBnZXQoZCwgJ3MnLCAwKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldE1heChzdGVwLCBtaW4sIG1heCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKG1heCAtIG1pbikgLyBzdGVwKSAqIHN0ZXAgKyBtaW47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldENsb3Nlc3RWYWxpZERhdGUoZCwgZGlyKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCxcclxuICAgICAgICAgICAgICAgICAgICBwcmV2LFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRWYWxpZCA9IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZWYWxpZCA9IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHVwID0gMCxcclxuICAgICAgICAgICAgICAgICAgICBkb3duID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZChkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkIDwgbWluZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGQgPSBtaW5kO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkID4gbWF4ZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGQgPSBtYXhkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG5leHQgPSBkO1xyXG4gICAgICAgICAgICAgICAgcHJldiA9IGQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRpciAhPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRWYWxpZCA9IGlzVmFsaWQobmV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICghbmV4dFZhbGlkICYmIG5leHQgPCBtYXhkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQgPSBuZXcgRGF0ZShuZXh0LmdldFRpbWUoKSArIDEwMDAgKiA2MCAqIDYwICogMjQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0VmFsaWQgPSBpc1ZhbGlkKG5leHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlyICE9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldlZhbGlkID0gaXNWYWxpZChwcmV2KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCFwcmV2VmFsaWQgJiYgcHJldiA+IG1pbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldiA9IG5ldyBEYXRlKHByZXYuZ2V0VGltZSgpIC0gMTAwMCAqIDYwICogNjAgKiAyNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZWYWxpZCA9IGlzVmFsaWQocHJldik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvd24rKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRpciA9PT0gMSAmJiBuZXh0VmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlyID09PSAyICYmIHByZXZWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBkb3duIDwgdXAgJiYgcHJldlZhbGlkID8gcHJldiA6IG5leHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGlzVmFsaWQoZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGQgPCBtaW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkID4gbWF4ZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNJbk9iaihkLCB2YWxpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNJbk9iaihkLCBpbnZhbGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gaXNJbk9iaihkLCBvYmopIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyLFxyXG4gICAgICAgICAgICAgICAgICAgIGosXHJcbiAgICAgICAgICAgICAgICAgICAgdjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAob2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IG9iai5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyID0gb2JqW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gY3VyciArICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWN1cnIuc3RhcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyLmdldFRpbWUpIHsgLy8gRXhhY3QgZGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLmdldEZ1bGxZZWFyKCkgPT0gY3Vyci5nZXRGdWxsWWVhcigpICYmIGQuZ2V0TW9udGgoKSA9PSBjdXJyLmdldE1vbnRoKCkgJiYgZC5nZXREYXRlKCkgPT0gY3Vyci5nZXREYXRlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdi5tYXRjaCgvdy9pKSkgeyAvLyBEYXkgb2YgbW9udGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ID0gdi5zcGxpdCgnLycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2WzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgodlswXSAtIDEpID09IGQuZ2V0TW9udGgoKSAmJiB2WzFdID09IGQuZ2V0RGF0ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodlswXSA9PSBkLmdldERhdGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBEYXkgb2Ygd2Vla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYgPSArdi5yZXBsYWNlKCd3JywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2ID09IGQuZ2V0RGF5KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB2YWxpZGF0ZURhdGVzKG9iaiwgeSwgbSwgZmlyc3QsIG1heGRheXMsIGlkeCwgdmFsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaiwgZCwgdjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAob2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IG9iai5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkID0gb2JqW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gZCArICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWQuc3RhcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkLmdldFRpbWUpIHsgLy8gRXhhY3QgZGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLmdldFllYXIoZCkgPT0geSAmJiBzLmdldE1vbnRoKGQpID09IG0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWR4W3MuZ2V0RGF5KGQpIC0gMV0gPSB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdi5tYXRjaCgvdy9pKSkgeyAvLyBEYXkgb2YgbW9udGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ID0gdi5zcGxpdCgnLycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2WzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2WzBdIC0gMSA9PSBtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZHhbdlsxXSAtIDFdID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWR4W3ZbMF0gLSAxXSA9IHZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBEYXkgb2Ygd2Vla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYgPSArdi5yZXBsYWNlKCd3JywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoayA9IHYgLSBmaXJzdDsgayA8IG1heGRheXM7IGsgKz0gNykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoayA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZHhba10gPSB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHZhbGlkYXRlVGltZXModm9iaiwgaSwgdiwgdGVtcCwgeSwgbSwgZCwgdGFyZ2V0LCB2YWxpZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRkLCBzcywgc3RyLCBwYXJ0czEsIHBhcnRzMiwgcHJvcDEsIHByb3AyLCB2MSwgdjIsIGosIGkxLCBpMiwgYWRkLCByZW1vdmUsIGFsbCwgaG91cnMxLCBob3VyczIsIGhvdXJzMyxcclxuICAgICAgICAgICAgICAgICAgICBzcGVjID0ge30sXHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcHMgPSB7IGg6IHN0ZXBILCBpOiBzdGVwTSwgczogc3RlcFMsIGE6IDEgfSxcclxuICAgICAgICAgICAgICAgICAgICBkYXkgPSBzLmdldERhdGUoeSwgbSwgZCksXHJcbiAgICAgICAgICAgICAgICAgICAgdyA9IFsnYScsICdoJywgJ2knLCAncyddO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh2b2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHZvYmosIGZ1bmN0aW9uIChpLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5zdGFydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmFwcGx5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZCA9IG9iai5kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3MgPSBkZCArICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyID0gc3Muc3BsaXQoJy8nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZCAmJiAoKGRkLmdldFRpbWUgJiYgeSA9PSBzLmdldFllYXIoZGQpICYmIG0gPT0gcy5nZXRNb250aChkZCkgJiYgZCA9PSBzLmdldERheShkZCkpIHx8IC8vIEV4YWN0IGRhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIXNzLm1hdGNoKC93L2kpICYmICgoc3RyWzFdICYmIGQgPT0gc3RyWzFdICYmIG0gPT0gc3RyWzBdIC0gMSkgfHwgKCFzdHJbMV0gJiYgZCA9PSBzdHJbMF0pKSkgfHwgLy8gRGF5IG9mIG1vbnRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHNzLm1hdGNoKC93L2kpICYmIGRheS5nZXREYXkoKSA9PSArc3MucmVwbGFjZSgndycsICcnKSkgLy8gRGF5IG9mIHdlZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmFwcGx5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVjW2RheV0gPSB0cnVlOyAvLyBQcmV2ZW50IGFwcGx5aW5nIGdlbmVyaWMgcnVsZSBvbiBkYXksIGlmIHNwZWNpZmljIGV4aXN0c1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaCh2b2JqLCBmdW5jdGlvbiAoeCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaTIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3AxID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGwgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmouc3RhcnQgJiYgKG9iai5hcHBseSB8fCAoIW9iai5kICYmICFzcGVjW2RheV0pKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERlZmluZSB0aW1lIHBhcnRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0czEgPSBvYmouc3RhcnQuc3BsaXQoJzonKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzMiA9IG9iai5lbmQuc3BsaXQoJzonKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgMzsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnRzMVtqXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzMVtqXSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0czJbal0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0czJbal0gPSA1OTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydHMxW2pdID0gK3BhcnRzMVtqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0czJbal0gPSArcGFydHMyW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzMS51bnNoaWZ0KHBhcnRzMVswXSA+IDExID8gMSA6IDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydHMyLnVuc2hpZnQocGFydHMyWzBdID4gMTEgPyAxIDogMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbXBtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnRzMVsxXSA+PSAxMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0czFbMV0gPSBwYXJ0czFbMV0gLSAxMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0czJbMV0gPj0gMTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydHMyWzFdID0gcGFydHMyWzFdIC0gMTI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExvb2sgYmVoaW5kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgaTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkVmFsdWVzW2pdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdjEgPSBzdGVwKHBhcnRzMVtqXSwgc3RlcHNbd1tqXV0sIG1pbnNbd1tqXV0sIG1heHNbd1tqXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2MiA9IHN0ZXAocGFydHMyW2pdLCBzdGVwc1t3W2pdXSwgbWluc1t3W2pdXSwgbWF4c1t3W2pdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdXJzMSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdXJzMiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdXJzMyA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYW1wbSAmJiBqID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdXJzMSA9IHBhcnRzMVswXSA/IDEyIDogMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdXJzMiA9IHBhcnRzMlswXSA/IDEyIDogMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdXJzMyA9IHZhbGlkVmFsdWVzWzBdID8gMTIgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcHJvcDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXByb3AyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2MiA9IG1heHNbd1tqXV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChwcm9wMSB8fCBwcm9wMikgJiYgKHYxICsgaG91cnMxIDwgdmFsaWRWYWx1ZXNbal0gKyBob3VyczMgJiYgdmFsaWRWYWx1ZXNbal0gKyBob3VyczMgPCB2MiArIGhvdXJzMikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkVmFsdWVzW2pdICE9IHYxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wMSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZFZhbHVlc1tqXSAhPSB2Mikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcDIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBMb29rIGFoZWFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gaSArIDE7IGogPCA0OyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnRzMVtqXSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZCA9IHN0ZXBzW3ZdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0czJbal0gPCBtYXhzW3dbal1dKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmUgPSBzdGVwc1t2XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDYWxjdWxhdGUgbWluIGFuZCBtYXggdmFsdWVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdjEgPSBzdGVwKHBhcnRzMVtpXSwgc3RlcHNbdl0sIG1pbnNbdl0sIG1heHNbdl0pICsgYWRkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYyID0gc3RlcChwYXJ0czJbaV0sIHN0ZXBzW3ZdLCBtaW5zW3ZdLCBtYXhzW3ZdKSAtIHJlbW92ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3AxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkxID0gZ2V0VmFsaWRJbmRleCh0YXJnZXQsIHYxLCBtYXhzW3ZdLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpMiA9IGdldFZhbGlkSW5kZXgodGFyZ2V0LCB2MiwgbWF4c1t2XSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERpc2FibGUgdmFsdWVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvcDEgfHwgcHJvcDIgfHwgYWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kdy1saScsIHRhcmdldCkuc2xpY2UoaTEsIGkyKS5hZGRDbGFzcygnZHctdicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kdy1saScsIHRhcmdldCkuc2xpY2UoaTEsIGkyKS5yZW1vdmVDbGFzcygnZHctdicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0SW5kZXgodCwgdikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoJy5kdy1saScsIHQpLmluZGV4KCQoJy5kdy1saVtkYXRhLXZhbD1cIicgKyB2ICsgJ1wiXScsIHQpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0VmFsaWRJbmRleCh0LCB2LCBtYXgsIGFkZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHYgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodiA+IG1heCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkKCcuZHctbGknLCB0KS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0SW5kZXgodCwgdikgKyBhZGQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEFycmF5KGQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJldCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkID09PSBudWxsIHx8IGQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAoaSBpbiBvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0W29baV1dID0gZltpXShkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjb252ZXJ0UmFuZ2VzKGFycikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGksIHYsIHN0YXJ0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJldCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHYgPSBhcnJbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2LnN0YXJ0ICYmIHYuc3RhcnQuZ2V0VGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBuZXcgRGF0ZSh2LnN0YXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChzdGFydCA8PSB2LmVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldC5wdXNoKG5ldyBEYXRlKHN0YXJ0LmdldEZ1bGxZZWFyKCksIHN0YXJ0LmdldE1vbnRoKCksIHN0YXJ0LmdldERhdGUoKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0LnNldERhdGUoc3RhcnQuZ2V0RGF0ZSgpICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQucHVzaCh2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFycjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRXh0ZW5kZWQgbWV0aG9kc1xyXG4gICAgICAgICAgICAvLyAtLS1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBTZXRzIHRoZSBzZWxlY3RlZCBkYXRlXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RGF0ZX0gZCBEYXRlIHRvIHNlbGVjdC5cclxuICAgICAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBbZmlsbD1mYWxzZV0gQWxzbyBzZXQgdGhlIHZhbHVlIG9mIHRoZSBhc3NvY2lhdGVkIGlucHV0IGVsZW1lbnQuIERlZmF1bHQgaXMgdHJ1ZS5cclxuICAgICAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IFt0aW1lPTBdIEFuaW1hdGlvbiB0aW1lIHRvIHNjcm9sbCB0byB0aGUgc2VsZWN0ZWQgZGF0ZS5cclxuICAgICAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBbdGVtcD1mYWxzZV0gU2V0IHRlbXBvcmFyeSB2YWx1ZSBvbmx5LlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtjaGFuZ2U9ZmlsbF0gVHJpZ2dlciBjaGFuZ2Ugb24gaW5wdXQgZWxlbWVudC5cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGluc3Quc2V0RGF0ZSA9IGZ1bmN0aW9uIChkLCBmaWxsLCB0aW1lLCB0ZW1wLCBjaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgIGluc3QudGVtcCA9IGdldEFycmF5KGQpO1xyXG4gICAgICAgICAgICAgICAgaW5zdC5zZXRWYWx1ZShpbnN0LnRlbXAsIGZpbGwsIHRpbWUsIHRlbXAsIGNoYW5nZSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogUmV0dXJucyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3RlbXA9ZmFsc2VdIElmIHRydWUsIHJldHVybiB0aGUgY3VycmVudGx5IHNob3duIGRhdGUgb24gdGhlIHBpY2tlciwgb3RoZXJ3aXNlIHRoZSBsYXN0IHNlbGVjdGVkIG9uZS5cclxuICAgICAgICAgICAgICogQHJldHVybiB7RGF0ZX1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGluc3QuZ2V0RGF0ZSA9IGZ1bmN0aW9uICh0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0RGF0ZSh0ZW1wID8gaW5zdC50ZW1wIDogaW5zdC52YWx1ZXMpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIDIuNy4wLCBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGNvZGVcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGluc3QuY29udmVydCA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgICAgIHZhciB4ID0gb2JqO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghJC5pc0FycmF5KG9iaikpIHsgLy8gQ29udmVydCBmcm9tIG9sZCBmb3JtYXRcclxuICAgICAgICAgICAgICAgICAgICB4ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKG9iaiwgZnVuY3Rpb24gKGksIG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKG8sIGZ1bmN0aW9uIChqLCBvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gJ2RheXNPZldlZWsnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8uZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvLmQgPSAndycgKyBvLmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbyA9ICd3JyArIG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeC5wdXNoKG8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geDtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIC0tLVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemF0aW9uc1xyXG4gICAgICAgICAgICAvLyAtLS0gXHJcblxyXG4gICAgICAgICAgICBpbnN0LmZvcm1hdCA9IGhmb3JtYXQ7XHJcbiAgICAgICAgICAgIGluc3Qub3JkZXIgPSBvO1xyXG4gICAgICAgICAgICBpbnN0LmJ1dHRvbnMubm93ID0geyB0ZXh0OiBzLm5vd1RleHQsIGNzczogJ2R3Yi1uJywgaGFuZGxlcjogZnVuY3Rpb24gKCkgeyBpbnN0LnNldERhdGUobmV3IERhdGUoKSwgZmFsc2UsIDAuMywgdHJ1ZSwgdHJ1ZSk7IH0gfTtcclxuXHJcbiAgICAgICAgICAgIC8vIEBkZXByZWNhdGVkIHNpbmNlIDIuOC4wLCBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGNvZGVcclxuICAgICAgICAgICAgLy8gLS0tXHJcbiAgICAgICAgICAgIGlmIChzLnNob3dOb3cpIHtcclxuICAgICAgICAgICAgICAgIHMuYnV0dG9ucy5zcGxpY2UoJC5pbkFycmF5KCdzZXQnLCBzLmJ1dHRvbnMpICsgMSwgMCwgJ25vdycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGludmFsaWQgPSBpbnZhbGlkID8gaW5zdC5jb252ZXJ0KGludmFsaWQpIDogZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIC0tLVxyXG5cclxuICAgICAgICAgICAgaW52YWxpZCA9IGNvbnZlcnRSYW5nZXMoaW52YWxpZCk7XHJcbiAgICAgICAgICAgIHZhbGlkID0gY29udmVydFJhbmdlcyh2YWxpZCk7XHJcblxyXG4gICAgICAgICAgICAvLyBOb3JtYWxpemUgbWluIGFuZCBtYXggZGF0ZXMgZm9yIGNvbXBhcmluZyBsYXRlciAoc2V0IGRlZmF1bHQgdmFsdWVzIHdoZXJlIHRoZXJlIGFyZSBubyB2YWx1ZXMgZnJvbSB3aGVlbHMpXHJcbiAgICAgICAgICAgIG1pbmQgPSBnZXREYXRlKGdldEFycmF5KG1pbmQpKTtcclxuICAgICAgICAgICAgbWF4ZCA9IGdldERhdGUoZ2V0QXJyYXkobWF4ZCkpO1xyXG5cclxuICAgICAgICAgICAgbWlucyA9IHsgeTogbWluZC5nZXRGdWxsWWVhcigpLCBtOiAwLCBkOiAxLCBoOiBtaW5ILCBpOiBtaW5NLCBzOiBtaW5TLCBhOiAwIH07XHJcbiAgICAgICAgICAgIG1heHMgPSB7IHk6IG1heGQuZ2V0RnVsbFllYXIoKSwgbTogMTEsIGQ6IDMxLCBoOiBtYXhILCBpOiBtYXhNLCBzOiBtYXhTLCBhOiAxIH07XHJcblxyXG4gICAgICAgICAgICAvLyAtLS1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB3aGVlbHM6IHdoZWVscyxcclxuICAgICAgICAgICAgICAgIGhlYWRlclRleHQ6IHMuaGVhZGVyVGV4dCA/IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZXRpbWUuZm9ybWF0RGF0ZShoZm9ybWF0LCBnZXREYXRlKGluc3QudGVtcCksIHMpO1xyXG4gICAgICAgICAgICAgICAgfSA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0UmVzdWx0OiBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRldGltZS5mb3JtYXREYXRlKGZvcm1hdCwgZ2V0RGF0ZShkKSwgcyk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcGFyc2VWYWx1ZTogZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRBcnJheSh2YWwgPyBkYXRldGltZS5wYXJzZURhdGUoZm9ybWF0LCB2YWwsIHMpIDogKHMuZGVmYXVsdFZhbHVlIHx8IG5ldyBEYXRlKCkpKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKGR3LCBpLCB0aW1lLCBkaXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsaWRhdGVkID0gZ2V0Q2xvc2VzdFZhbGlkRGF0ZShnZXREYXRlKGluc3QudGVtcCksIGRpciksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXAgPSBnZXRBcnJheSh2YWxpZGF0ZWQpLC8vaW5zdC50ZW1wLC8vLnNsaWNlKDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gZ2V0KHRlbXAsICd5JyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG0gPSBnZXQodGVtcCwgJ20nKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWlucHJvcCA9IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heHByb3AgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goWyd5JywgJ20nLCAnZCcsICdhJywgJ2gnLCAnaScsICdzJ10sIGZ1bmN0aW9uICh4LCBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvW2ldICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtaW4gPSBtaW5zW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heCA9IG1heHNbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4ZGF5cyA9IDMxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IGdldCh0ZW1wLCBpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ID0gJCgnLmR3LXVsJywgZHcpLmVxKG9baV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09ICdkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heGRheXMgPSBzLmdldE1heERheU9mTW9udGgoeSwgbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4ID0gbWF4ZGF5cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVnZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmR3LWxpJywgdCkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdCA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZCA9IHRoYXQuZGF0YSgndmFsJyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdyA9IHMuZ2V0RGF0ZSh5LCBtLCBkKS5nZXREYXkoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBkb3JkLnJlcGxhY2UoL1tteV0vZ2ksICcnKS5yZXBsYWNlKC9kZC8sIChkIDwgMTAgPyAnMCcgKyBkIDogZCkgKyAocy5kYXlTdWZmaXggfHwgJycpKS5yZXBsYWNlKC9kLywgZCArIChzLmRheVN1ZmZpeCB8fCAnJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmR3LWknLCB0aGF0KS5odG1sKHN0ci5tYXRjaCgvREQvKSA/IHN0ci5yZXBsYWNlKC9ERC8sICc8c3BhbiBjbGFzcz1cImR3LWRheVwiPicgKyBzLmRheU5hbWVzW3ddICsgJzwvc3Bhbj4nKSA6IHN0ci5yZXBsYWNlKC9ELywgJzxzcGFuIGNsYXNzPVwiZHctZGF5XCI+JyArIHMuZGF5TmFtZXNTaG9ydFt3XSArICc8L3NwYW4+JykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWlucHJvcCAmJiBtaW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluID0gZltpXShtaW5kKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXhwcm9wICYmIG1heGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXggPSBmW2ldKG1heGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT0gJ3knKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkxID0gZ2V0SW5kZXgodCwgbWluKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaTIgPSBnZXRJbmRleCh0LCBtYXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kdy1saScsIHQpLnJlbW92ZUNsYXNzKCdkdy12Jykuc2xpY2UoaTEsIGkyICsgMSkuYWRkQ2xhc3MoJ2R3LXYnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSAnZCcpIHsgLy8gSGlkZSBkYXlzIG5vdCBpbiBtb250aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZHctbGknLCB0KS5yZW1vdmVDbGFzcygnZHctaCcpLnNsaWNlKG1heGRheXMpLmFkZENsYXNzKCdkdy1oJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA8IG1pbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IG1pbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPiBtYXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSBtYXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWlucHJvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbnByb3AgPSB2YWwgPT0gbWluO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1heHByb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhwcm9wID0gdmFsID09IG1heDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERpc2FibGUgc29tZSBkYXlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSAnZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlyc3QgPSBzLmdldERhdGUoeSwgbSwgMSkuZ2V0RGF5KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkeCA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTZXQgaW52YWxpZCBpbmRleGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVEYXRlcyhpbnZhbGlkLCB5LCBtLCBmaXJzdCwgbWF4ZGF5cywgaWR4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEZWxldGUgaW5kZXhlcyB3aGljaCBhcmUgdmFsaWQgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVEYXRlcyh2YWxpZCwgeSwgbSwgZmlyc3QsIG1heGRheXMsIGlkeCwgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChpZHgsIGZ1bmN0aW9uIChpLCB2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcuZHctbGknLCB0KS5lcShpKS5yZW1vdmVDbGFzcygnZHctdicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSW52YWxpZCB0aW1lc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYXNUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChbJ2EnLCAnaCcsICdpJywgJ3MnXSwgZnVuY3Rpb24gKGksIHYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSBnZXQodGVtcCwgdiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZCA9IGdldCh0ZW1wLCAnZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQgPSAkKCcuZHctdWwnLCBkdykuZXEob1t2XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9bdl0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlVGltZXMoaW52YWxpZCwgaSwgdiwgdGVtcCwgeSwgbSwgZCwgdCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVUaW1lcyh2YWxpZCwgaSwgdiwgdGVtcCwgeSwgbSwgZCwgdCwgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdldCB2YWxpZCB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkVmFsdWVzW2ldID0gK2luc3QuZ2V0VmFsaWRDZWxsKHZhbCwgdCwgZGlyKS52YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdC50ZW1wID0gdGVtcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICQuZWFjaChbJ2RhdGUnLCAndGltZScsICdkYXRldGltZSddLCBmdW5jdGlvbiAoaSwgdikge1xyXG4gICAgICAgIG1zLnByZXNldHMuc2Nyb2xsZXJbdl0gPSBwcmVzZXQ7XHJcbiAgICAgICAgbXMucHJlc2V0U2hvcnQodik7XHJcbiAgICB9KTtcclxuXHJcbn0pKGpRdWVyeSk7XHJcblxyXG5cclxuKGZ1bmN0aW9uICgkLCB1bmRlZmluZWQpIHtcclxuXHJcbiAgICB2YXIgZGVmYXVsdHMgPSB7XHJcbiAgICAgICAgaW5wdXRDbGFzczogJycsXHJcbiAgICAgICAgaW52YWxpZDogW10sXHJcbiAgICAgICAgcnRsOiBmYWxzZSxcclxuICAgICAgICBzaG93SW5wdXQ6IHRydWUsXHJcbiAgICAgICAgZ3JvdXA6IGZhbHNlLFxyXG4gICAgICAgIGdyb3VwTGFiZWw6ICdHcm91cHMnLFxyXG4gICAgICAgIGNoZWNrSWNvbjogJ2NoZWNrbWFyaydcclxuICAgIH07XHJcblxyXG4gICAgJC5tb2Jpc2Nyb2xsLnByZXNldFNob3J0KCdzZWxlY3QnKTtcclxuXHJcbiAgICAkLm1vYmlzY3JvbGwucHJlc2V0cy5zY3JvbGxlci5zZWxlY3QgPSBmdW5jdGlvbiAoaW5zdCkge1xyXG4gICAgICAgIHZhciBjaGFuZ2UsXHJcbiAgICAgICAgICAgIGdySWR4LFxyXG4gICAgICAgICAgICBncixcclxuICAgICAgICAgICAgZ3JvdXAsXHJcbiAgICAgICAgICAgIGlucHV0LFxyXG4gICAgICAgICAgICBvcHRJZHgsXHJcbiAgICAgICAgICAgIG9wdGlvbixcclxuICAgICAgICAgICAgcHJldixcclxuICAgICAgICAgICAgcHJldmVudCxcclxuICAgICAgICAgICAgdGltZXIsXHJcbiAgICAgICAgICAgIHcsXHJcbiAgICAgICAgICAgIG9yaWcgPSAkLmV4dGVuZCh7fSwgaW5zdC5zZXR0aW5ncyksXHJcbiAgICAgICAgICAgIHMgPSAkLmV4dGVuZChpbnN0LnNldHRpbmdzLCBkZWZhdWx0cywgb3JpZyksXHJcbiAgICAgICAgICAgIGxheW91dCA9IHMubGF5b3V0IHx8ICgvdG9wfGJvdHRvbS8udGVzdChzLmRpc3BsYXkpID8gJ2xpcXVpZCcgOiAnJyksXHJcbiAgICAgICAgICAgIGlzTGlxdWlkID0gbGF5b3V0ID09ICdsaXF1aWQnLFxyXG4gICAgICAgICAgICBlbG0gPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICBtdWx0aXBsZSA9IGVsbS5wcm9wKCdtdWx0aXBsZScpLFxyXG4gICAgICAgICAgICBpZCA9IHRoaXMuaWQgKyAnX2R1bW15JyxcclxuICAgICAgICAgICAgbGJsID0gJCgnbGFiZWxbZm9yPVwiJyArIHRoaXMuaWQgKyAnXCJdJykuYXR0cignZm9yJywgaWQpLFxyXG4gICAgICAgICAgICBsYWJlbCA9IHMubGFiZWwgIT09IHVuZGVmaW5lZCA/IHMubGFiZWwgOiAobGJsLmxlbmd0aCA/IGxibC50ZXh0KCkgOiBlbG0uYXR0cignbmFtZScpKSxcclxuICAgICAgICAgICAgc2VsZWN0ZWRDbGFzcyA9ICdkdy1tc2VsIG1ic2MtaWMgbWJzYy1pYy0nICsgcy5jaGVja0ljb24sXHJcbiAgICAgICAgICAgIGdyb3VwSGRyID0gJCgnb3B0Z3JvdXAnLCBlbG0pLmxlbmd0aCAmJiAhcy5ncm91cCxcclxuICAgICAgICAgICAgaW52YWxpZCA9IFtdLFxyXG4gICAgICAgICAgICBvcmlnVmFsdWVzID0gW10sXHJcbiAgICAgICAgICAgIG1haW4gPSB7fSxcclxuICAgICAgICAgICAgcm9QcmUgPSBzLnJlYWRvbmx5O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZW5WYWx1ZXMoY29udCwga2V5cywgdmFsdWVzKSB7XHJcbiAgICAgICAgICAgICQoJ29wdGlvbicsIGNvbnQpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2godGhpcy50ZXh0KTtcclxuICAgICAgICAgICAgICAgIGtleXMucHVzaCh0aGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW52YWxpZC5wdXNoKHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdlbldoZWVscygpIHtcclxuICAgICAgICAgICAgdmFyIGNvbnQsXHJcbiAgICAgICAgICAgICAgICB3aGVlbCxcclxuICAgICAgICAgICAgICAgIHdnID0gMCxcclxuICAgICAgICAgICAgICAgIHZhbHVlcyA9IFtdLFxyXG4gICAgICAgICAgICAgICAga2V5cyA9IFtdLFxyXG4gICAgICAgICAgICAgICAgdyA9IFtbXV07XHJcblxyXG4gICAgICAgICAgICBpZiAocy5ncm91cCkge1xyXG4gICAgICAgICAgICAgICAgJCgnb3B0Z3JvdXAnLCBlbG0pLmVhY2goZnVuY3Rpb24gKGkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaCh0aGlzLmxhYmVsKTtcclxuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aGVlbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHZhbHVlcyxcclxuICAgICAgICAgICAgICAgICAgICBrZXlzOiBrZXlzLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBzLmdyb3VwTGFiZWxcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzTGlxdWlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd1swXVt3Z10gPSB3aGVlbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd1t3Z10gPSBbd2hlZWxdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnQgPSBncm91cDtcclxuICAgICAgICAgICAgICAgIHdnKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb250ID0gZWxtO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YWx1ZXMgPSBbXTtcclxuICAgICAgICAgICAga2V5cyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgaWYgKGdyb3VwSGRyKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdvcHRncm91cCcsIGVsbSkuZWFjaChmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHRoaXMubGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGtleXMucHVzaCgnX19ncm91cCcgKyBpKTtcclxuICAgICAgICAgICAgICAgICAgICBpbnZhbGlkLnB1c2goJ19fZ3JvdXAnICsgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2VuVmFsdWVzKHRoaXMsIGtleXMsIHZhbHVlcyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdlblZhbHVlcyhjb250LCBrZXlzLCB2YWx1ZXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB3aGVlbCA9IHtcclxuICAgICAgICAgICAgICAgIG11bHRpcGxlOiBtdWx0aXBsZSxcclxuICAgICAgICAgICAgICAgIHZhbHVlczogdmFsdWVzLFxyXG4gICAgICAgICAgICAgICAga2V5czoga2V5cyxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBsYWJlbFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzTGlxdWlkKSB7XHJcbiAgICAgICAgICAgICAgICB3WzBdW3dnXSA9IHdoZWVsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd1t3Z10gPSBbd2hlZWxdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldE9wdGlvbih2KSB7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkKCdvcHRpb24nLCBlbG0pLmF0dHIoJ3ZhbHVlJyk7XHJcblxyXG4gICAgICAgICAgICBvcHRpb24gPSBtdWx0aXBsZSA/ICh2ID8gdlswXSA6IGRlZikgOiAodiA9PT0gdW5kZWZpbmVkIHx8IHYgPT09IG51bGwgPyBkZWYgOiB2KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChzLmdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICBncm91cCA9IGVsbS5maW5kKCdvcHRpb25bdmFsdWU9XCInICsgb3B0aW9uICsgJ1wiXScpLnBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgZ3IgPSBncm91cC5pbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgLy9wcmV2ID0gZ3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldFZhbCh2LCBmaWxsLCBjaGFuZ2UpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gW107XHJcblxyXG4gICAgICAgICAgICBpZiAobXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZWwgPSBbXSxcclxuICAgICAgICAgICAgICAgICAgICBpID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgaW4gaW5zdC5fc2VsZWN0ZWRWYWx1ZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWwucHVzaChtYWluW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlucHV0LnZhbChzZWwuam9pbignLCAnKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC52YWwodik7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGZpbGwgPyBpbnN0LnRlbXBbb3B0SWR4XSA6IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChmaWxsKSB7XHJcbiAgICAgICAgICAgICAgICBlbG0udmFsKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBlbG0uY2hhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uVGFwKGxpKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWwgPSBsaS5hdHRyKCdkYXRhLXZhbCcpLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBsaS5oYXNDbGFzcygnZHctbXNlbCcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG11bHRpcGxlICYmIGxpLmNsb3Nlc3QoJy5kd3dsJykuaGFzQ2xhc3MoJ2R3d21zJykpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaS5oYXNDbGFzcygnZHctdicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpLnJlbW92ZUNsYXNzKHNlbGVjdGVkQ2xhc3MpLnJlbW92ZUF0dHIoJ2FyaWEtc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGluc3QuX3NlbGVjdGVkVmFsdWVzW3ZhbF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGkuYWRkQ2xhc3Moc2VsZWN0ZWRDbGFzcykuYXR0cignYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3QuX3NlbGVjdGVkVmFsdWVzW3ZhbF0gPSB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdC5saXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhbCh2YWwsIHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgZ3JvdXBzIGlzIHRydWUgYW5kIHRoZXJlIGFyZSBubyBncm91cHMgZmFsbCBiYWNrIHRvIG5vIGdyb3VwaW5nXHJcbiAgICAgICAgaWYgKHMuZ3JvdXAgJiYgISQoJ29wdGdyb3VwJywgZWxtKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcy5ncm91cCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFzLmludmFsaWQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHMuaW52YWxpZCA9IGludmFsaWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocy5ncm91cCkge1xyXG4gICAgICAgICAgICBncklkeCA9IDA7XHJcbiAgICAgICAgICAgIG9wdElkeCA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ3JJZHggPSAtMTtcclxuICAgICAgICAgICAgb3B0SWR4ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJ29wdGlvbicsIGVsbSkuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG1haW5bdGhpcy52YWx1ZV0gPSB0aGlzLnRleHQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZ2V0T3B0aW9uKGVsbS52YWwoKSk7XHJcblxyXG4gICAgICAgICQoJyMnICsgaWQpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICBpbnB1dCA9ICQoJzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiJyArIGlkICsgJ1wiIGNsYXNzPVwiJyArIHMuaW5wdXRDbGFzcyArICdcIiBwbGFjZWhvbGRlcj1cIicgKyAocy5wbGFjZWhvbGRlciB8fCAnJykgKyAnXCIgcmVhZG9ubHkgLz4nKTtcclxuXHJcbiAgICAgICAgaWYgKHMuc2hvd0lucHV0KSB7XHJcbiAgICAgICAgICAgIGlucHV0Lmluc2VydEJlZm9yZShlbG0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5zdC5hdHRhY2hTaG93KGlucHV0KTtcclxuXHJcbiAgICAgICAgdmFyIHYgPSBlbG0udmFsKCkgfHwgW10sXHJcbiAgICAgICAgICAgIGkgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKGk7IGkgPCB2Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGluc3QuX3NlbGVjdGVkVmFsdWVzW3ZbaV1dID0gdltpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFZhbChtYWluW29wdGlvbl0pO1xyXG5cclxuICAgICAgICBlbG0ub2ZmKCcuZHdzZWwnKS5vbignY2hhbmdlLmR3c2VsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIXByZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGluc3Quc2V0VmFsdWUobXVsdGlwbGUgPyBlbG0udmFsKCkgfHwgW10gOiBbZWxtLnZhbCgpXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJldmVudCA9IGZhbHNlO1xyXG4gICAgICAgIH0pLmFkZENsYXNzKCdkdy1oc2VsJykuYXR0cigndGFiaW5kZXgnLCAtMSkuY2xvc2VzdCgnLnVpLWZpZWxkLWNvbnRhaW4nKS50cmlnZ2VyKCdjcmVhdGUnKTtcclxuXHJcbiAgICAgICAgLy8gRXh0ZW5kZWQgbWV0aG9kc1xyXG4gICAgICAgIC8vIC0tLVxyXG5cclxuICAgICAgICBpZiAoIWluc3QuX3NldFZhbHVlKSB7XHJcbiAgICAgICAgICAgIGluc3QuX3NldFZhbHVlID0gaW5zdC5zZXRWYWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluc3Quc2V0VmFsdWUgPSBmdW5jdGlvbiAoZCwgZmlsbCwgdGltZSwgdGVtcCwgY2hhbmdlKSB7XHJcbiAgICAgICAgICAgIHZhciBpLFxyXG4gICAgICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgICAgICB2ID0gJC5pc0FycmF5KGQpID8gZFswXSA6IGQ7XHJcblxyXG4gICAgICAgICAgICBvcHRpb24gPSB2ICE9PSB1bmRlZmluZWQgJiYgdiAhPT0gbnVsbCA/IHYgOiAkKCdvcHRpb24nLCBlbG0pLmF0dHIoJ3ZhbHVlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAobXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICAgIGluc3QuX3NlbGVjdGVkVmFsdWVzID0ge307XHJcbiAgICAgICAgICAgICAgICBpZiAoZCkgeyAvLyBDYW4gYmUgbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3QuX3NlbGVjdGVkVmFsdWVzW2RbaV1dID0gZFtpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh2ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocy5ncm91cCkge1xyXG4gICAgICAgICAgICAgICAgZ3JvdXAgPSBlbG0uZmluZCgnb3B0aW9uW3ZhbHVlPVwiJyArIG9wdGlvbiArICdcIl0nKS5wYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgIGdyID0gZ3JvdXAuaW5kZXgoKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gW2dyLCBvcHRpb25dO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBbb3B0aW9uXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaW5zdC5fc2V0VmFsdWUodmFsdWUsIGZpbGwsIHRpbWUsIHRlbXAsIGNoYW5nZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgaW5wdXQvc2VsZWN0IHZhbHVlc1xyXG4gICAgICAgICAgICBpZiAoZmlsbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoYW5nZWQgPSBtdWx0aXBsZSA/IHRydWUgOiBvcHRpb24gIT09IGVsbS52YWwoKTtcclxuICAgICAgICAgICAgICAgIHNldFZhbChtYWluW29wdGlvbl0sIGNoYW5nZWQsIGNoYW5nZSA9PT0gdW5kZWZpbmVkID8gZmlsbCA6IGNoYW5nZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpbnN0LmdldFZhbHVlID0gZnVuY3Rpb24gKHRlbXAsIGdyb3VwKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWwgPSB0ZW1wID8gaW5zdC50ZW1wIDogKGluc3QuX2hhc1ZhbHVlID8gaW5zdC52YWx1ZXMgOiBudWxsKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbCA/IChzLmdyb3VwICYmIGdyb3VwID8gdmFsIDogdmFsW29wdElkeF0pIDogbnVsbDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyAtLS1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IDUwLFxyXG4gICAgICAgICAgICB3aGVlbHM6IHcsXHJcbiAgICAgICAgICAgIGxheW91dDogbGF5b3V0LFxyXG4gICAgICAgICAgICBoZWFkZXJUZXh0OiBmYWxzZSxcclxuICAgICAgICAgICAgYW5jaG9yOiBpbnB1dCxcclxuICAgICAgICAgICAgZm9ybWF0UmVzdWx0OiBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1haW5bZFtvcHRJZHhdXTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGFyc2VWYWx1ZTogZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHYgPSBlbG0udmFsKCkgfHwgW10sXHJcbiAgICAgICAgICAgICAgICAgICAgaSA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdC5fc2VsZWN0ZWRWYWx1ZXMgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGk7IGkgPCB2Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3QuX3NlbGVjdGVkVmFsdWVzW3ZbaV1dID0gdltpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZ2V0T3B0aW9uKHZhbCA9PT0gdW5kZWZpbmVkID8gZWxtLnZhbCgpIDogdmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcy5ncm91cCA/IFtnciwgb3B0aW9uXSA6IFtvcHRpb25dO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkJlZm9yZVNob3c6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChtdWx0aXBsZSAmJiBzLmNvdW50ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzLmhlYWRlclRleHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goaW5zdC5fc2VsZWN0ZWRWYWx1ZXMsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxlbmd0aCArICcgJyArIHMuc2VsZWN0ZWRUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9pZiAob3B0aW9uID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGdldE9wdGlvbihlbG0udmFsKCkpO1xyXG4gICAgICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHMuZ3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2ID0gZ3I7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdC50ZW1wID0gW2dyLCBvcHRpb25dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHMud2hlZWxzID0gZ2VuV2hlZWxzKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uTWFya3VwUmVhZHk6IGZ1bmN0aW9uIChkdykge1xyXG4gICAgICAgICAgICAgICAgZHcuYWRkQ2xhc3MoJ2R3LXNlbGVjdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5kd3dsJyArIGdySWR4LCBkdykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXBIZHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuZHcnLCBkdykuYWRkQ2xhc3MoJ2R3LXNlbGVjdC1ncicpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5kdy1saVtkYXRhLXZhbF49XCJfX2dyb3VwXCJdJywgZHcpLmFkZENsYXNzKCdkdy13LWdyJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHcuYWRkQ2xhc3MoJ2R3bXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmR3d2wnLCBkdykub24oJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDMyKSB7IC8vIFNwYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25UYXAoJCgnLmR3LXNlbCcsIHRoaXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLmVxKG9wdElkeCkuYWRkQ2xhc3MoJ2R3d21zJykuYXR0cignYXJpYS1tdWx0aXNlbGVjdGFibGUnLCAndHJ1ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvcmlnVmFsdWVzID0gJC5leHRlbmQoe30sIGluc3QuX3NlbGVjdGVkVmFsdWVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uIChkdywgaSwgdGltZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGosXHJcbiAgICAgICAgICAgICAgICAgICAgdixcclxuICAgICAgICAgICAgICAgICAgICB0ID0gJCgnLmR3LXVsJywgZHcpLmVxKG9wdElkeCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IHVuZGVmaW5lZCAmJiBtdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHYgPSBpbnN0Ll9zZWxlY3RlZFZhbHVlcztcclxuICAgICAgICAgICAgICAgICAgICBqID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmR3d2wnICsgb3B0SWR4ICsgJyAuZHctbGknLCBkdykucmVtb3ZlQ2xhc3Moc2VsZWN0ZWRDbGFzcykucmVtb3ZlQXR0cignYXJpYS1zZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGogaW4gdikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZHd3bCcgKyBvcHRJZHggKyAnIC5kdy1saVtkYXRhLXZhbD1cIicgKyB2W2pdICsgJ1wiXScsIGR3KS5hZGRDbGFzcyhzZWxlY3RlZENsYXNzKS5hdHRyKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHMuZ3JvdXAgJiYgKGkgPT09IHVuZGVmaW5lZCB8fCBpID09PSBncklkeCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBnciA9ICtpbnN0LnRlbXBbZ3JJZHhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnciAhPT0gcHJldikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cCA9IGVsbS5maW5kKCdvcHRncm91cCcpLmVxKGdyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gZ3JvdXAuZmluZCgnb3B0aW9uJykubm90KCdbZGlzYWJsZWRdJykuZXEoMCkudmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbiA9IG9wdGlvbiB8fCBlbG0udmFsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHMud2hlZWxzID0gZ2VuV2hlZWxzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0LnRlbXAgPSBbZ3IsIG9wdGlvbl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnJlYWRvbmx5ID0gW2ZhbHNlLCB0cnVlXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldiA9IGdyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3QuY2hhbmdlV2hlZWwoW29wdElkeF0sIHVuZGVmaW5lZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5yZWFkb25seSA9IHJvUHJlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGltZSAqIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcy5yZWFkb25seSA9IHJvUHJlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gaW5zdC50ZW1wW29wdElkeF07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJC5lYWNoKHMuaW52YWxpZCwgZnVuY3Rpb24gKGksIHYpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuZHctbGlbZGF0YS12YWw9XCInICsgdiArICdcIl0nLCB0KS5yZW1vdmVDbGFzcygnZHctdicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uQ2xlYXI6IGZ1bmN0aW9uIChkdykge1xyXG4gICAgICAgICAgICAgICAgaW5zdC5fc2VsZWN0ZWRWYWx1ZXMgPSB7fTtcclxuICAgICAgICAgICAgICAgIGlucHV0LnZhbCgnJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuZHd3bCcgKyBvcHRJZHggKyAnIC5kdy1saScsIGR3KS5yZW1vdmVDbGFzcyhzZWxlY3RlZENsYXNzKS5yZW1vdmVBdHRyKCdhcmlhLXNlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uVmFsdWVUYXA6IG9uVGFwLFxyXG4gICAgICAgICAgICBvblNlbGVjdDogZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgICAgIHNldFZhbCh2LCB0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25DYW5jZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaW5zdC5saXZlICYmIG11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdC5fc2VsZWN0ZWRWYWx1ZXMgPSAkLmV4dGVuZCh7fSwgb3JpZ1ZhbHVlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAodikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGluc3QubGl2ZSAmJiAhbXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWwodik7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldmVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxtLnZhbChpbnN0LnRlbXBbb3B0SWR4XSkuY2hhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uRGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBlbG0ucmVtb3ZlQ2xhc3MoJ2R3LWhzZWwnKS5yZW1vdmVBdHRyKCd0YWJpbmRleCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG59KShqUXVlcnkpO1xyXG4iXX0=
},{}]},{},[1])