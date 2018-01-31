
//var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
//ref.onAuth(function(authData) {
//    if (authData) {
//        console.log("User " + authData.uid + " is logged in with " + authData.provider);
//    } else {
//        console.log("User is logged out");
//    }
//});


//var connectedRef = firebase.database().ref(".info/connected");
//connectedRef.on("value", function(snap) {
//    if (snap.val() === true) {
//        firebase.auth().onAuthStateChanged(function(user){
//
//            if(user && user.email.includes('operatore')){
//
//                firebase.database().ref('operators/'+user.uid+'/status/').set('online').then(function(success){
//            //        alert('value set')
//                })
//            }
//
//
//        })
//    } else {
//        firebase.auth().onAuthStateChanged(function(user){
//
//            if(user.email.includes('operatore')){
//             //   alert('offline ' +user.email+" "+user.uid)
//
//                firebase.database().ref('operators/'+user.uid+'/status/').onDisconnect().set('offline')
//            }
//
//
//        })    
//    }
//});