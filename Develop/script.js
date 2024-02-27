// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  $(".saveBtn").on("click", function() {
    // Get the id of the containing time-block
    var timeBlockId = $(this).closest(".time-block").attr("id");
    // Save user input in local storage using time block id as key
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);
  });

  // Function to apply past, present, or future class to each time block
  function updateTimeBlocks() {
    // Get current hour using Day.js
    var currentHour = dayjs().hour();

    // Iterate over each time block
    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // Remove all classes from time block
      $(this).removeClass("past present future");

      // Add appropriate class based on current hour
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  // Call updateTimeBlocks initially to set initial class
  updateTimeBlocks();

  // Get user input from local storage and set textarea values
  $(".time-block").each(function() {
    var blockId = $(this).attr("id");
    var savedInput = localStorage.getItem(blockId);
    $(this).find(".description").val(savedInput);
  });

  // Display the current date in the header
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));
});
