const functions = require('firebase-functions');

exports.setCurrentLesson=functions.database.ref('Corsi/').onWrite(event=>{
    console.log('working nicely')
})
