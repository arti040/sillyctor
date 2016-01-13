## Sillyctor.js

# Introduction
This is a simple selector engine, for educational purpose ONLY.

The package contains 3 files:
- test.html contains the HTML sillyctor.js will be tested on
- test.js contains a function which will provide results for sillyctor.js in the developer console
- sillyctor.js script

# Running the test
Open test.html in a web browser (IE8+, Chrome, Firefox or Safari) and check the developer console for the test results. The template sillyctor.js should show 1 of 7 tests passed (as one of the answers should be an empty array)

The following calls to sillyctor.js will be made. Function should return an array of DOM elements that match the CSS selector:
- $("div") - Should return 2 DIVs
- $("img.some_class") - Should return 1 IMG
- $("#some_id") - Should return 1 DIV
- $(".some_class") - Should return 1 DIV and 1 IMG
- $("input#some_id") - Should return an empty array
- $("div#some_id.some_class") - Should return 1 DIV
- $("div.some_class#some_id") - Should return 1 DIV
