var count = 0;

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