firebase.database().ref('operators/').on('value',snapshot=>{
    var count = 0

    snapshot.forEach(operatorSnapshot=>{
         //   alert('number online '+operatorSnapshot.child('status').val())

        var operatorStatus=operatorSnapshot.child('status').val()
        if(operatorStatus=='online'){
            count++

            $('#myBadge').text(''+count)
        }

    })
    //alert('number online '+count)
    if(count==0){
        $('#myBadge').text(''+0)
    }
})


