



var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function(snap) {
    if (snap.val() === true) {
        firebase.auth().onAuthStateChanged(function(user){
            if(user && user.email.includes('operatore')){
                firebase.database().ref('operators/'+user.uid+'/status/').set('online')
            }


        })
    } else {
        firebase.auth().onAuthStateChanged(function(user){

            if(user.email.includes('operatore')){
                firebase.database().ref('operators/'+user.uid+'/status/').onDisconnect().set('offline')
            }


        })    
    }
});