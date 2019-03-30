var config = {
    apiKey: "AIzaSyCEGGTEPAWjwQ0PvNJRuTYQRK6UN8rQWHo",
    authDomain: "traintime-de7f3.firebaseapp.com",
    databaseURL: "https://traintime-de7f3.firebaseio.com",
    projectId: "traintime-de7f3",
    storageBucket: "traintime-de7f3.appspot.com",
    messagingSenderId: "494179362764"
  };
  firebase.initializeApp(config);
  
  var trainData = firebase.database();

  var trains = [
      ["Trenton Express", "Trenton", 25, "05:35PM"],
      ["Oregon Trail", "Salem, Oregon", 3600, "01:39PM"],
      ["Midnight Carriage", "Philadelphia", 15, "05:35PM"],
      ["Sing Sing Caravan", "Atlanta", 45, "05:53PM"],
      ["Boston Bus", "Boston", 65, "05:50PM"],
      ["California Caravan", "San Francisco", 6000, "01:25AM"],
      ["Analben's Train", "Florida", 25, "05:28PM"]
  ]


var newTrain = {
  name: name,
  destination: destination,
  firstTrain: firstTrain,
  frequency: frequency
};

  var i;
  for (i = 0; i < trains.length; i++) { 
    newTrain.name=Trains[i,0];
    newTrain.destination=Trains[i,1];
    newTrain.firstTrain=Trains[i,3];
    newTrain.frequency=Trains[i,2];

    trainData.ref().push(newTrain);
  }

