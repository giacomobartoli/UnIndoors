// Initialize Firebase
var config = {
    apiKey: "AIzaSyAiVwf9orhjqFyH6i4HBSmmaZuLwrJyZnQ",
    authDomain: "uniboindoors.firebaseapp.com",
    databaseURL: "https://uniboindoors.firebaseio.com",
    projectId: "uniboindoors",
    storageBucket: "uniboindoors.appspot.com",
    messagingSenderId: "484831871025"
};

firebase.initializeApp(config);

var database = firebase.database();


function getTodayClasses(){

    return database.ref('CesenaCampus/Corsi/').once('value').then(function(snapshot){
        console.log(snapshot.val(),"database url ",database.ref().toString());
    })


}