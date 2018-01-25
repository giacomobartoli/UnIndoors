'use strict';

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
var table=document.getElementById('myTable');

function myFunction() {
       
     database.ref('helprequests').once('value', function (snapshot) {
        //qui ho tutto
        var status = snapshot.val();
        var tbody = document.querySelector("#myTable tbody");
        snapshot.forEach(function (childSnapshot) {
            
            var id = childSnapshot.child('id').val().toString();
            var msg = childSnapshot.child('message').val().toString();
            var from = childSnapshot.child('name').val().toString();
            var status = childSnapshot.child('state').val().toString();
            var place = childSnapshot.child('place').val().toString();
            
            //Using this alert to check if values are retrieved correctly
            //alert(from);
            
            
            tbody.innerHTML += '<tr><th scope="row">'+id+'</th><td>'+from+'</td><td>'+status+'</td><td>'+msg+'</td><td>'+place+'</td><td><button type="button" class="btn btn-outline-success">Accept</button><button type="button" class="btn btn-outline-danger">Refuse</button></td></tr>';
            
           
        })
        
    })
    
}



