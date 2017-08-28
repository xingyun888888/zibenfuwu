(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/**
 * Created by gaochao on 8/28/17.
 */
$(".myPhoto").click(function (e) {
   $("#photo").click();
});

$("#photo").on("change", function (e) {
   var file = e.target.files[0];
   if (!file) return;
   var reader = new FileReader();
   reader.onload = function (res) {
      $(".myPhoto>img").attr("src", res.target.result);
   };
   reader.readAsDataURL(file);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfNDhlOTQyM2QuanMiXSwibmFtZXMiOlsiJCIsImNsaWNrIiwiZSIsIm9uIiwiZmlsZSIsInRhcmdldCIsImZpbGVzIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsInJlcyIsImF0dHIiLCJyZXN1bHQiLCJyZWFkQXNEYXRhVVJMIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7QUFHQUEsRUFBRSxVQUFGLEVBQWNDLEtBQWQsQ0FBb0IsVUFBU0MsQ0FBVCxFQUFXO0FBQzVCRixLQUFFLFFBQUYsRUFBWUMsS0FBWjtBQUNGLENBRkQ7O0FBSUFELEVBQUUsUUFBRixFQUFZRyxFQUFaLENBQWUsUUFBZixFQUF3QixVQUFTRCxDQUFULEVBQVc7QUFDL0IsT0FBSUUsT0FBT0YsRUFBRUcsTUFBRixDQUFTQyxLQUFULENBQWUsQ0FBZixDQUFYO0FBQ0EsT0FBRyxDQUFDRixJQUFKLEVBQVM7QUFDVCxPQUFJRyxTQUFTLElBQUlDLFVBQUosRUFBYjtBQUNBRCxVQUFPRSxNQUFQLEdBQWMsVUFBU0MsR0FBVCxFQUFhO0FBQ3hCVixRQUFFLGNBQUYsRUFBa0JXLElBQWxCLENBQXVCLEtBQXZCLEVBQTZCRCxJQUFJTCxNQUFKLENBQVdPLE1BQXhDO0FBQ0YsSUFGRDtBQUdBTCxVQUFPTSxhQUFQLENBQXFCVCxJQUFyQjtBQUNILENBUkQiLCJmaWxlIjoiZmFrZV80OGU5NDIzZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBnYW9jaGFvIG9uIDgvMjgvMTcuXG4gKi9cbiQoXCIubXlQaG90b1wiKS5jbGljayhmdW5jdGlvbihlKXtcbiAgICQoXCIjcGhvdG9cIikuY2xpY2soKVxufSlcblxuJChcIiNwaG90b1wiKS5vbihcImNoYW5nZVwiLGZ1bmN0aW9uKGUpe1xuICAgIGxldCBmaWxlID0gZS50YXJnZXQuZmlsZXNbMF07XG4gICAgaWYoIWZpbGUpcmV0dXJuO1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5vbmxvYWQ9ZnVuY3Rpb24ocmVzKXtcbiAgICAgICAkKFwiLm15UGhvdG8+aW1nXCIpLmF0dHIoXCJzcmNcIixyZXMudGFyZ2V0LnJlc3VsdClcbiAgICB9XG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSlcbn0pIl19
},{}]},{},[1])