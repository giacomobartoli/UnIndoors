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
                  
    
     database.ref('helprequests/').on('value', function (snapshot) {
         
         var tbody=$('#table_body')
         tbody.empty();
        //qui ho tutto
            var count=0
            var status = snapshot.val();
       // var tbody = document.querySelector("#myTable tbody");
            
            snapshot.forEach(function (childSnapshot) {
            var id = childSnapshot.child('id').val().toString();
            var msg = childSnapshot.child('message').val().toString();
            var from = childSnapshot.child('name').val().toString();
            var status = childSnapshot.child('state').val().toString();
            var place = childSnapshot.child('place').val().toString();
            var childSnapshotIndex=childSnapshot.key
            //Using this alert to check if values are retrieved correctly
            //alert(from);
            
            tbody.append('<tr><th scope="row">'+id+'</th><td>'+from+'</td><td>'+status+'</td><td>'+msg+'</td><td>'+place+'</td><td><button type="button" class="btn btn-outline-success" id="'+count+'">Accept</button><button type="button" class="btn btn-outline-danger" id="'+count+'R'+'">Refuse</button></td></tr>')
            
            $('#'+count).click(function(){
                setRequests(id,childSnapshotIndex,$(this).attr('id'))
               
            })
            $('#'+count+'R').click(function(){
                setRequestDenied(id,childSnapshotIndex,$(this).attr('id'))
            })
            count++
        
    })
    
})

}
                
                                        

function setRequests(id,childSnapshotIndex,butcount){
    //alert(childSnapshotIndex)
    var idButton = butcount
    database.ref('helprequests/'+childSnapshotIndex+'/state/').set('accepted').then(function(){
       $('#'+idButton).attr("disabled","");
       $('#'+idButton+'R').attr("disabled","");
    });
    
    //document.getElementById(idButton).setAttribute("disabled","disabled");
}

function setRequestDenied(id,childSnapshotIndex,count){
    //alert(childSnapshotIndex)
    var idButton = count
    var idButton2 = idButton.slice(0,1)
    database.ref('helprequests/'+childSnapshotIndex+'/state/').set('refused');
    $('#'+idButton).attr("disabled","");
    $('#'+idButton2).attr("disabled","");
}



