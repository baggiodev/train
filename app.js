
var config = {
    apiKey: "AIzaSyDCWpsaDzlYBoCp9J4P8vl3hUibn9H_WL0",
    authDomain: "click-counter-2102e.firebaseapp.com",
    databaseURL: "https://click-counter-2102e.firebaseio.com",
    projectId: "click-counter-2102e",
    storageBucket: "click-counter-2102e.appspot.com",
    messagingSenderId: "499533564693"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val();
  var destination = $("#destin-input").val();
  var trainStart = moment($("#start-input").val(), "HH:mm").format("HH:mm");
  var trainFreq = $("#freq-input").val();

  var newTrain = {
    name: trainName,
    destination: destination,
    start: trainStart,
    frequency: trainFreq,
  };

  database.ref().push(newTrain);

  alert("Train successfully added");

  $("#train-name-input").val("");
  $("#destin-input").val("");
  $("#start-input").val("");
  $("#freq-input").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {


  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().frequency;
  var trainMoment = moment(childSnapshot.val().start, "HH:mm");
  var trainArrival;
  var trainAway;

  var now = moment();
  while (trainMoment.isBefore(now)){
    trainMoment.add(trainFreq,"m");
  }
  trainAway = trainMoment.diff(now,"m")
  trainArrival = trainMoment.format("h:mm a").toString();

  $("#train-table").append("<tr><td>" + trainName + "</td><td>" + destination +"</td><td>"+ trainStart +"</td><td>" + trainFreq + "</td><td>" + trainArrival + "</td><td>" + trainAway + "</td><tr>");

});
