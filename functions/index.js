const functions = require('firebase-functions');

exports.setCurrentLesson=functions.database.ref('helprequests/').onWrite(event=>{
    console.log('working nicely')
})
