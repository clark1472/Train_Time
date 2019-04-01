var config = {
    apiKey: "AIzaSyCEGGTEPAWjwQ0PvNJRuTYQRK6UN8rQWHo",
    authDomain: "traintime-de7f3.firebaseapp.com",
    databaseURL: "https://traintime-de7f3.firebaseio.com",
    projectId: "traintime-de7f3",
    storageBucket: "traintime-de7f3.appspot.com",
    messagingSenderId: "494179362764"
  };
  firebase.initializeApp(config);

  //var getTrainData = firebase.database().ref();
  var ref = firebase.database().ref();
  var trainData = ref.child("trains");

/*hard coded for firebase data
trainData.push({
  "name": "Trenton Express",
  "destination": "Trenton",
  "frequency": "25",
  "firstTrain": "05:35"
});

trainData.push({
  "name": "Oregon Trail",
  "destination": "Salem, Oregon",
  "frequency": "3600",
  "firstTrain": "01:39"
});

trainData.push({
  "name": "Midnight Carriage",
  "destination": "Philadelphia",
  "frequency": "15",
  "firstTrain": "05:35"
});

trainData.push({
  "name": "Sing Sing Caravan",
  "destination": "Atlanta",
  "frequency": "45",
  "firstTrain": "05:53"
});

trainData.push({
  "name": "Boston Bus",
  "destination": "Boston",
  "frequency": "65",
  "firstTrain": "05:50"
});

trainData.push({
  "name": "California Caravan",
  "destination": "San Francisco",
  "frequency": "6000",
  "firstTrain": "01:25"
});

trainData.push({
  "name": "Analben's Train",
  "destination": "Florida",
  "frequency": "25",
  "firstTrain": "05:28"
}); 
*/
//var ref = firebase.database().ref("trains");
var ref = firebase.database().ref();
var trainData = ref.child("trains");

$("#submit").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text-boxes
  trainName = $("#trainNameData").val().trim();
  destination = $("#destinationData").val().trim();
  firstTrain = $("#f-trainTimeData").val().trim();
  frequency = $("#frequencyData").val();
  //console.log(parseInt(frequecy));

  NewTrainData = {
    "name": trainName,
    "destination": destination,
    "firstTrain": firstTrain,
    "frequency": frequency
  // Code for "Setting values in the database"
  }
  //validate data to database
  //console.log(NewTrainData);

  //sending data to database
  trainData.push(NewTrainData);

  //empty train schedule and blank input fields
  $("table tbody").empty(); 
  $("#trainNameData").val("");
  $("#destinationData").val("");
  $("#f-trainTimeData").val("");
  $("#frequencyData").val("");
});

//event for changes to database. updates train schedule.
ref.on("value", function(snapshot) {
  //data in database put in console for review. I want to see the data. before display worked.
  console.log(snapshot.val());
  
  //getting info from trains collections
  var getTrainData = firebase.database().ref("trains");
  getTrainData.once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {

        //taking data from database and breaking into fields for train schedule
        var childData = childSnapshot.val();
        var tabName = childData.name;
        var tabDestination= childData.destination;
        var tabFrequency= childData.frequency;
        var tabFirstTrain= childData.firstTrain;

        //just checking the data parsed into table.
        console.log(tabName + ' - ' + tabDestination + ' - ' + tabFrequency + ' - ' + tabFirstTrain);

        //moment.js calculations - assume start date 1 week ago and trains never stopped.
        var startDate = "2019-03-25 " + tabFirstTrain;
        var startDateTime = moment(startDate);
        var minutesFromStart = startDateTime.diff(moment(), "minutes");
        //console.log(minutesFromStart + " - "+ tabFrequency);
        var minutesfromTrain = (-1 * minutesFromStart) % tabFrequency;
        var minutesNextTrain = tabFrequency - minutesfromTrain
        
        var nextTrain = moment().add(minutesNextTrain, 'minutes').format('hh:mm A');

        //created string for train schedule to the html
        var trainTable =  "<tr><td>" + tabName + "</td><td>" + tabDestination +
        "</td><td>" + tabFrequency +  "</td><td>" + nextTrain +  "</td><td>" + minutesNextTrain + "</td></tr>"
         //adds train schedule to the html using string above
        $("table tbody").append(trainTable); 

     });
  });

});


/* pseudo code
three sections (HTML)
  1. jumbotron
  2. current train schedule (table)
  3. add new train to schedule
get 7 listed trains into database
  1. write data to firebase using javascript
  2. read data to firebase
  3. need to separate each train data info from large database
  4. add trains to html 
add new train to database
  4 fields - static data must have
  submit button
  clear old train data when update new information.
make current time active- clock
  military time 24 hours
calculate next arrival based on 3 factors
  1. what time is it?
  2. first train time arrival
  3. calculate how much time left before train arrives at station
*/

