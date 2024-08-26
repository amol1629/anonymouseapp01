// Initialize a temporary variable 'tempVar' to 0. It is used later to determine specific states during the input event.
var tempVar = 0;

// Add a 'mousedown' event listener on elements with class 'complex' inside an element with ID 'ReviewContent'
$(document).on("mousedown", "#ReviewContent .complex", function () {
  // Add an 'input' event listener to the selected 'complex' element
  $(this).on("input", function (e) {
    // Initialize a variable to determine whether the content length is correct or not
    var correctLength = 0;

    // Count words in the current text of the element and store the result in 'obj_wordcount'
    var obj_wordcount = wordCount($(this).text());

    // Extract the word count from 'obj_wordcount'
    var noOfWordsComplex = obj_wordcount.words;

    // Use regex to match all sentences in the text content and store them in 'resultComplexSentences'
    var resultComplexSentences = this.innerText.match(/[^\.!\?]+[\.!\?]+/g);
    var resultComplexWords;

    // Get the current complex sentence count from the element with ID 'RC_complex'
    complex_length = parseInt($("#RC_complex").text());

    // Check if there are any alphabetical characters in the text content
    if (this.innerText.match(/[a-z]/i) != null) {
      var fullStopCount = this.innerText.match(/[^\.!\?]+[\.!\?]+/g).length;

      // Check if word count is below or equal to 30 or there is at least one full stop
      if (noOfWordsComplex <= 30 || fullStopCount >= 1) {
        // Iterate through all matched sentences
        for (i = 0; i < resultComplexSentences.length; i++) {
          resultComplexWords = resultComplexSentences[i].split(" ").length;

          // Check if the sentence has more than 30 words
          if (resultComplexWords > 30) {
            correctLength = 1;
          }
        }

        // Apply specific styles and calculations if content length is correct and background color is not transparent
        if (
          correctLength == 0 &&
          $(this).css("background-color") != "rgba(0, 0, 0, 0)"
        ) {
          // ... (style and calculation changes)
          // Apply different styles and calculations if content length is incorrect and background color is transparent
        } else if (
          correctLength == 1 &&
          $(this).css("background-color") === "rgba(0, 0, 0, 0)"
        ) {
          // ... (style and calculation changes)
        }
        tempVar = 1;

        // Handle the case where word count exceeds 30 and there is only one sentence
      } else if (
        noOfWordsComplex > 30 &&
        fullStopCount == 1 &&
        (tempVar == 1 || $(this).css("background-color") === "rgba(0, 0, 0, 0)")
      ) {
        // ... (style and calculation changes)
        tempVar = 0;
      }
    }

    // Handle the case where no alphabetical characters are found and the background color is not transparent
    else if ($(this).css("background-color") != "rgba(0, 0, 0, 0)") {
      // ... (style and calculation changes)
    }

    // Reset tempVar to 0 for next iteration
    tempVar = 0;

    // Call the 'deletePronoun()' function to presumably remove pronouns (actual function not provided)
    deletePronoun();

    // Stop the event from propagating up the DOM tree, prevent default behavior, and stop other listeners from being called
    e.stopImmediatePropagation();
    e.preventDefault();
    e.stopPropagation();
  });
});
