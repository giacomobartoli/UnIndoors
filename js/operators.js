



firebase.database().ref("operators/").on("value", function(operators){
    var count = 0;

    operators.forEach(operator_snapshot=>{
        if(operator_snapshot.child('status').val()=='online'){
            count++;
            updateLabel(count)
        }


    })
    if(count==0){
        updateLabel(0)
    }

});


firebase.database().ref('helprequests/').on('value', function (snapshot) {
    var req = 0;

    snapshot.forEach(function (childSnapshot) {
        var status = childSnapshot.child('state').val().toString();
        if(status=='pending'){
            req++;
            updateLabelreq(req)
        }
        
    });
    if(req==0){
        updateLabelreq(0)
    }


});



function updateLabel(count){
    //alert(''+count)
    $('#myBadge').text(''+count)
}

function updateLabelreq(req){
    //alert(''+count)
    $('#myBadgeReq').text(''+req)
}







