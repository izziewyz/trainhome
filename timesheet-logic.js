/* global $,firebase,moment */

// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBk8a2BuWIYJH8e22z5recBEqQTsZSHInE",
    authDomain: "bestappever-315f2.firebaseapp.com",
    databaseURL: "https://bestappever-315f2.firebaseio.com",
    storageBucket: "bestappever-315f2.appspot.com",
    messagingSenderId: "30493403311"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();
    console.log("works");
  // Grabs user input
  var trainname = $("#train-name-input").val().trim();
  var traindestination  = $("#destination-input").val().trim();
  var trainfirst = moment($("#FirstTrain-input").val().trim(), "DD/MM/YY").format("X");
  var trainfrequency = $("#Frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    trainname: trainname,
    traindestination: traindestination,
    trainfrequency: trainfrequency,
    trainfirst: trainfirst
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainname);
  console.log(newTrain.traindestination);
  console.log(newTrain.trainfrequency);
  console.log(newTrain.trainfirst);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#FirstTrain-input").val("");
  $("#Frequency-input").val("");

  // Prevents moving to new page
  return false;
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainname = childSnapshot.val().trainname;
  var traindestination = childSnapshot.val().traindestination;
  var trainfrequency = childSnapshot.val().trainfrequency;
  var trainfirst = childSnapshot.val().trainfirst;

  // Employee Info
  console.log(trainname);
  console.log(traindestination);
  console.log(trainfrequency);
  console.log(trainfirst);

  // Prettify the employee start
  // var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  // // Calculate the months worked using hardcore math
  // // To calculate the months worked
  // var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  // console.log(empMonths);

  // // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);

  // Add each employee's data into the table
  $("#employee-table > tbody").append("<tr><td>" + trainname + "</td><td>" + traindestination + "</td><td>" +
  trainfrequency + "</td><td>" + trainfirst + "</td><td>"  + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
