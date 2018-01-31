var count = 0;
var req = 0;

function countOperators(){
    
    var connectedRef = firebase.database().ref("operators/").on("child_added", function(operator_snapshot){
        if(operator_snapshot.child('status').val()=='online'){
            count++;
            updateLabel(count)
        }
    });
    

}

function updateLabel(count){
    //alert(''+count)
    $('#myBadge').text(''+count)
}

function updateLabelreq(req){
    //alert(''+count)
    $('#myBadgeReq').text(''+req)
}


function countRequests(){
    
    
     var connectedRef=database.ref('helprequests/').on('value', function (snapshot) {
         
         snapshot.forEach(function (childSnapshot) {
          var status = childSnapshot.child('state').val().toString();
            if(status=='pending'){
                req++;
                updateLabelreq(req)
            }
         }
     );
    

});
}
                                                       
                                                       