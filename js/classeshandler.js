'use strict'

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
//var carouselInnerActiveElementRow=document.getElementById('row_active');
var carouselInnerElementToday=document.getElementById('today_classes_inner');
var carouselOuterElementToday=document.getElementById('carousel_today_classes');
var carouselInnerElementWeek=document.getElementById('week_classes_inner');
var carouselOuterElementWeek=document.getElementById('carousel_week_classes')
var carouselNotActiveItemNumber=0;
var rowIDNumber=0;
var todayClassesCarouselSlide=document.getElementById('carouselExampleControls');
var classChosen;
var lessons=[]
var detailedClass
var key=10000






function setUpTodayClasses(size) {
    var date = new Date();
    var today = date.getDay();

    database.ref('CesenaCampus/Corsi/').on('value',function (snapshot) {


        snapshot.forEach(function (childSnapshot) {
            var lessonName=childSnapshot.child('name').val().toString();


            childSnapshot.child('schedule').ref.once('value').then(function (scheduleSnapshot) {
                var dayoflessons=[]
                scheduleSnapshot.forEach(function (daySnapshot) {
                    //  console.log('array size ',dayoflessons.length)

                    var dayNumber = daySnapshot.child('value').val();
                    //    console.log(daySnapshot.child('timeStart').val().toString())
                    var todayClass = {
                        name: lessonName,
                        timeStart: daySnapshot.child('timeStart').val().toString(),
                        timeEnd: daySnapshot.child('timeEnd').val().toString(),
                        place: daySnapshot.child('place').val().toString(),
                        imageUrl:renderLessonImage(lessonName),
                        teacher:childSnapshot.child('teacher').val().toString(),
                        numberOfDay:dayNumber,
                        day:daySnapshot.key,
                        type:childSnapshot.child('type').val().toString()

                    }
                    dayoflessons.push(todayClass)
                    lessons.push(todayClass)




                    if (dayNumber == today) {

                        if(size>768 && size<1000){
                            fillCarouselRow(todayClass,'#today_classes_inner','#carousel_today_classes',2);
                        }
                        if(size<768){
                            fillCarouselRow(todayClass,'#today_classes_inner','#carousel_today_classes',1);
                        }
                        if(size>=1000){
                            fillCarouselRow(todayClass,'#today_classes_inner','#carousel_today_classes',3);
                        }



                    }
                    if(dayoflessons.length==scheduleSnapshot.numChildren()){

                        var closest=getClosestLesson(dayoflessons,today)
                        for(var i=0;i<closest.length;i++){
                            if(size>=768 && size<1000){
                                fillCarouselRow(closest[i],'#next_classes_inner','#carousel_next_classes',2);
                            }
                            if(size<768){
                                fillCarouselRow(closest[i],'#next_classes_inner','#carousel_next_classes',1);
                            }
                            if(size>=1000){
                                fillCarouselRow(closest[i],'#next_classes_inner','#carousel_next_classes',3);
                            }
                        }
                    }






                    if(size>768 && size<1000){
                        fillCarouselRow(todayClass,'#week_classes_inner','#carousel_week_classes',2);
                    }
                    if(size<768){
                        fillCarouselRow(todayClass,'#week_classes_inner','#carousel_week_classes',1);
                    }
                    if(size>=1000){
                        fillCarouselRow(todayClass,'#week_classes_inner','#carousel_week_classes',3);
                    }

                });


            });

        });

    });


}

function getClosestLesson(lessons,today){

    var arrayForDisplayNextLessons=[]
    // console.log(lessons)
    var temp=lessons[0].numberOfDay-today
    arrayForDisplayNextLessons.push(lessons[0])

    for(var i=1;i<lessons.length;i++){
        var day=lessons[i]
        var diff=day.numberOfDay-today
        if(temp==0){
            arrayForDisplayNextLessons.pop()
        }
        if(diff>=0 && temp>=0 && diff < temp && day.numberOfDay!=today){

            temp=diff;
            arrayForDisplayNextLessons.pop()
            arrayForDisplayNextLessons.push(lessons[i])

        }


        if(diff<=0 && temp<=0 && diff<temp && day.numberOfDay!=today){

            temp=diff;
            arrayForDisplayNextLessons.pop()
            arrayForDisplayNextLessons.push(lessons[i])

        }

    }
    return arrayForDisplayNextLessons;

}


function shuffleArray(array){
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

}







function renderLessonImage(lessonName){
    switch(lessonName){
        case 'Data Mining':
            return 'css/assets/data_mining.svg';
        case 'Machine Learning':
            return 'css/assets/machine_learning.svg';
        case 'Sviluppo di Sistemi Software':
            return 'css/assets/development.svg';
        case 'Applicazioni Web':
            return 'css/assets/web_development.svg';
        case 'Big Data':
            return 'css/assets/big_data.svg';
        case  'Business Intelligence':
            return 'css/assets/business_intelligence.svg';
        case 'Nets Security':
            return 'css/assets/security.svg';
        case 'Pervasive Computing':
            return 'css/assets/internetofthings.svg';
        case 'Distributed Systems':
            return 'css/assets/distributed_systems.svg';
        case 'Informative Systems':
            return 'css/assets/sistemi_informativi.svg';
        case 'Robotic Systems':
            return 'css/assets/robots.svg'
        case 'Smart City':
            return 'css/assets/digital-cities.svg';
        case 'Supporto alle Decisioni':
            return 'css/assets/supporto_alle_decisioni.svg';
        default: return null;



    }
}

function renderDay(dayNumber){

    switch(dayNumber){
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
    }
}

function fillCarouselRow(todayClass,carouselInnerElementID,carouselOuterElementID,numberOfImagesPerSlide){

    var name=todayClass.name;
    var imageUrl=todayClass.imageUrl;
    var timeStart=todayClass.timeStart;
    var timeEnd=todayClass.timeEnd;
    var place=todayClass.place;
    var day=todayClass.day;
    var row;
    var innerElement=$(carouselInnerElementID)

    var elementOfRow='<div class="col"><div class="card" id="'+todayClass.type+'"><img class="card-img-top" src="'+imageUrl+'" alt="Card image cap"><div class="card-body"><h4 class="card-title text-center">'+name+'</h4></div></div>';

    if(innerElement.children().length==0){
        var carouselItem=$('<div class="carousel-item" id="'+carouselOuterElementID+'" ></div>').appendTo(innerElement)     
        row=$('<div class="row"></div>').appendTo(carouselItem)        
        carouselItem.addClass('active')

    }
    row=innerElement.find('.row').last()

    if(row.children().length==numberOfImagesPerSlide){
        carouselItem=$('<div class="carousel-item" id="'+carouselOuterElementID+'" ></div>').appendTo(innerElement)     
        row=$('<div class="row"></div>').appendTo(carouselItem)

    }
    row.append(elementOfRow)


    var id="#"+todayClass.type;
    $(id).bind('click',function(){
        setClassDetailedInfo(todayClass)
    })


}




function getCarouselItems(carouselInnerElementID){
    var rowElements=[]

    $(carouselInnerElementID).find('.carousel-item').each(function(){
        $(this).find('.row').each(function(){
            $(this).find('.col').each(function(){
                rowElements.push($(this))
            })

        })
    })

    return rowElements;

}


function resizeAlgorithm(numberOfItemsPerSlide,rowElements,carouselInnerElementID,carouselOuterElementID){

    console.log('working')
    $(carouselInnerElementID).empty()

    for(var i=0;i<rowElements.length;i++){

        if(i%numberOfItemsPerSlide==0){
            var carouselItem=$('<div class="carousel-item"></div>').appendTo(carouselInnerElementID)
            var itemContent=$('<div class="row"></div>').appendTo(carouselItem)


            }
        if(i==0){

            carouselItem.addClass('active')

        }




        itemContent.append(rowElements[i])

    }


}



function setClassDetailedInfo(name){
    localStorage.setItem('todayclass',JSON.stringify(name))
    location.replace("ClassDetailed.html");

}

function getPlaceDetails(todayclass){
    var width=$(window).width()
    database.ref('CesenaCampus/'+todayclass.place+'/').on('value',function (snapshot){
        var name=snapshot.child('name').val().toString()

        if(width<=350 && name=='Laboratorio Informatico 2'){
            name='Lab. Inf. 2'

        }
        if(width<=350 && name=='Laboratorio Informatico 3'){
            name='Lab. Inf. 3'

        }
        $('#classroom_name').text(name)
        $('#position').text(snapshot.child('floor').val().toString())
        var isFriendly=(snapshot.child('isFriendly').val().toString()=='true')
        if(isFriendly)       {
            $('#is_friendly').text('Facilities present')
            $('#handy').unbind('click')
        } 
        else{
            $('#is_friendly').text('Ask for help')
            $('#handy').on('click', function(){
                var helpcontainer=$('#help_request')
                if(helpcontainer.children().length==0){
                    var element='  <form style="margin top:30px;"><div class="form-row" ><div class="col-6"><input type="text" class="form-control form-control-lg" placeholder="Nome Cognome"id="first_name"></div><div class="col"><input type="text" class="form-control form-control-lg" placeholder="14:23" id="time"></div></div><div class="form-row" style="margin-top: 20px;"><div class="col"><textarea class="form-control form-control-lg" id="message" rows="3" placeholder="Write your message" id="message"></textarea></div></div> <div><button type="button" class="btn btn-primary btn-block d-block mx-auto btn-lg" onclick="onClickSubmit()" style="max-width: 200px; margin-top: 20Px;">Submit</button></div></form>'

                    helpcontainer.append(element)

                }
            })
            $('#handy').attr('data-toggle','collapse')
            $('#handy').attr('data-target','#help_request')
            $('#handy').attr('aria-expanded','false')
            $('#handy').attr('aria-controls','#help_request')
        }
        $('#teacher_name').text(todayclass.teacher)
        var date = new Date();
        var today = date.getDay();

        if(todayclass.day==today){
            $('#time_and_day').text('Today, '+todayclass.timeStart+":00-"+todayclass.timeEnd+":00")

        }
        else{
            if(width<=350){
                var truncatedDay=todayclass.day.toString().slice(0,3)
                $('#time_and_day').text(truncatedDay+", "+todayclass.timeStart+":00-"+todayclass.timeEnd+":00")
            }
            else{
                $('#time_and_day').text(todayclass.day.toString()+", "+todayclass.timeStart+":00-"+todayclass.timeEnd+":00")

            }
        }


    })
}

function onClickSubmit(){
    console.log(firebase.auth().currentUser.uid)
    var name=$('#first_name').val()
    var time=$('#time').val()
    var message=$('#message').val()
    var helpRequest = {};
    var id=firebase.auth().currentUser.uid.toString()
    var firebaseTimeStamp=new Date().getMilliseconds()
    var width=$(window).width()
    if(width<=350 && name=='Laboratorio Informatico 2'){
        name='Lab. Inf. 2'

    }
    if(width<=350 && name=='Laboratorio Informatico 3'){
        name='Lab. Inf. 3'

    }


    database.ref('users/'+id+'/helprequests/').once('value').then(function(snapshot){
        if(!snapshot.hasChildren()){
            var date=new Date()
            var minutes=date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()
            var hours=date.getHours()
            var month=date.getMonth()==0?'01':date.getMonth()
            var help={
                10000:{
                    'name':name,
                    'time':time,
                    'message':message,
                    'state': 'pending',
                    'operator_message':'No message yet',
                    'place':$('#classroom_name').text(),
                    'request_time': hours+":"+minutes,
                    'day':date.getDay(),
                    'dayofmonth':date.getDate(),
                    'year':date.getYear(),
                    'month':month,
                    'timestamp':firebaseTimeStamp

                }
            }
            var help2={
                'id':id,
                'name':name,
                'time':time,
                'message':message,
                'state': 'pending',
                'operator_message':'No message yet',
                'place':$('#classroom_name').text(),
                'request_time': hours+":"+minutes,
                'day':date.getDay(),
                'dayofmonth':date.getDate(),
                'year':date.getYear(),
                'month':month,
                'timestamp':firebaseTimeStamp
            }
            console.log(help)
            database.ref('users/'+id+'/helprequests/').set(help).then(function(){
                $('#help_request').collapse('toggle')
            }) 
            database.ref('helprequests/').push(help2)
        }
        else{
            database.ref('users/'+id+'/helprequests/').orderByKey().limitToFirst(1).once('child_added').then(function(snapshot){

                var lastIndex=snapshot.key
                console.log('last index '+lastIndex)
                var newIndex=Number(lastIndex)-1
                var date=new Date()
                var minutes=date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()
                var hours=date.getHours()
                var month=date.getMonth()==0?'01':date.getMonth()
                var help=
                    {    
                        'name':name,
                        'time':time,
                        'message':message,
                        'state': 'pending',
                        'operator_message':'No message yet',
                        'place':$('#classroom_name').text(),
                        'request_time':hours+":"+minutes,
                        'day':date.getDay(),
                        'dayofmonth':date.getDate(),
                        'year':date.getYear(),
                        'month':month,
                        'timestamp':firebaseTimeStamp

                    }
                var help2={
                    'id':id,
                    'name':name,
                    'time':time,
                    'message':message,
                    'state': 'pending',
                    'operator_message':'No message yet',
                    'place':$('#classroom_name').text(),
                    'request_time': hours+":"+minutes,
                    'day':date.getDay(),
                    'dayofmonth':date.getDate(),
                    'year':date.getYear(),
                    'month':month,
                    'timestamp':firebaseTimeStamp
                }

                console.log(help)
                database.ref('users/'+id+'/helprequests/').child(newIndex).set(help).then(function(){
                    $('#help_request').collapse('toggle')
                })
                database.ref('helprequests/').push(help2)
            })

        }



    })
}
function listenToHelpRequestChanges(){
    var userId;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

            database.ref('users/'+user.uid+'/helprequests/').once('value').then(function(snapshot){
                if(snapshot.val()=='empty'){
                    var jumbotronNoMessage='<div class="jumbotron" id="nomessage" style="background-color:#57626E"><h1 class="display-4 text-center text-capitalize" style="color:white;">no help request yet!</h1><img src="css/assets/error-404.svg" class="rounded mx-auto d-block" style="margin-top:30px;width:150px; height:"150px"></div>'
                    $('#help_request_container').append(jumbotronNoMessage)

                }
            })
            database.ref('users/'+user.uid+'/helprequests/').orderByKey().on('child_added',function(childsnapshot){
                var index=childsnapshot.key
                var domElement='<div class="jumbotron" style="background-color:#57626E" id="jumb_'+index+'"><div class="container"> <div class="row justify-content-center"><div class="col-8 "><h1 class="display-4 text-left detail" style="color:white;">'+renderDay(childsnapshot.child('day').val())+', '+childsnapshot.child('dayofmonth').val()+'/'+childsnapshot.child('month').val()+'/'+childsnapshot.child('year').val()+' at '+childsnapshot.child('request_time').val()+'</h1></div><div class="col-3"><img src="css/assets/garbage.svg" class="icon-small float-right" id="garbage_'+index+'"></div></div><div class=" row justify-content-center" style="margin-top: 35px; " ><div class="col-2 align-self-center  icon_wrapper" style="  margin-top:30px"><img  class="icon" src="css/assets/map.svg" ></div><div class="col align-self-center " style="margin-top: 30px;" margin-left ><p class="detail display-4 text-left text-capitalize " id="whereabouts_'+index+'" style="color: white;"></p></div><div class="col-2 align-self-center icon_wrapper"  style=" margin-top:30px"><img  class="icon" src="css/assets/clock.svg" ></div><div class="col align-self-center "  style="margin-top: 30px;"><p class="detail  display-4 text-left text-capitalize" id="time_'+index+'" style="color: white;"></p></div></div><div class=" row justify-content-center" ><div class="col-2 align-self-center icon_wrapper" style="margin-top:30px"><img  class="icon" src="css/assets/pending.svg" id="request_icon_'+index+'"></div><div class="col align-self-center " style="margin-top: 30px;" ><p class="detail display-4 text-left text-capitalize " id="request_status_'+index+'" style="color: white;"></p></div><div class="col-2 align-self-center icon_wrapper"  style="margin-top:30px"><img  class="icon" src="css/assets/message.svg" ></div><div class="col align-self-center "  style="margin-top: 30px;"><p class="detail  display-4 text-left" id="operator_message_'+index+'" style="color: white;"></p></div></div></div>'
                $('#nomessage').remove()
                $('#help_request_container').append(domElement)
                resizeHelprequests($(window).width())
                $('#garbage_'+index).hover(function(){
                    $(this).attr('src','css/assets/garbage_hover.svg')
                },function(){
                    $(this).attr('src','css/assets/garbage.svg')

                })
                $('#garbage_'+index).click(function(){
                    database.ref('users/'+user.uid+'/helprequests/').once('value').then(function(snapshot){
                        //remove from general helprequests
                        var numChildren=snapshot.numChildren()
                        var timestamp=snapshot.child(index).child('timestamp').val()
                        database.ref('helprequests/').once('value').then(function(snapshot){
                            snapshot.forEach(function(childsnapshot){
                                if(timestamp==childsnapshot.child('timestamp').val() && snapshot.numChildren()==1){
                                    var key=childsnapshot.key
                                    database.ref('helprequests/').set('empty')
                                }
                                else if(timestamp==childsnapshot.child('timestamp').val()){
                                    var key=childsnapshot.key
                                    database.ref('helprequests/'+key+'/').remove()
                                }
                            })
                        })
                        //remove from personal help requests

                        if(snapshot.numChildren()==1){

                            database.ref('users/'+user.uid+'/helprequests/').set('empty').then(function(){
                                $('#jumb_'+index).remove()
                                console.log( $('#help_request_container').children().length)
                                if($('#help_request_container').children().length==1){
                                    var jumbotronNoMessage='<div class="jumbotron" id="nomessage" style="background-color:#57626E"><h1 class="display-4 text-center text-capitalize" style="color:white;">no help request yet!</h1><img src="css/assets/error-404.svg" class="rounded mx-auto d-block" style="margin-top:30px;width:150px; height:"150px"></div>'
                                    $('#help_request_container').append(jumbotronNoMessage)
                                }

                            })





                        }
                        else{
                            database.ref('users/'+user.uid+'/helprequests/'+index+'/').remove().then(function(){
                                $('#jumb_'+index).remove()
                                if($('#help_request_container').children().length==1){
                                    var jumbotronNoMessage='<div class="jumbotron" id="nomessage" style="background-color:#57626E"><h1 class="display-4 text-center text-capitalize" style="color:white;">no help request yet!</h1><img src="css/assets/error-404.svg" class="rounded mx-auto d-block" style="margin-top:30px;width:150px; height:"150px"></div>'
                                    $('#help_request_container').append(jumbotronNoMessage)
                                }
                            })
                        }

                    })



                })

                console.log('index to listen to '+index)
                database.ref('users/'+user.uid+'/helprequests/'+index+'/operator_message/').on('value',function(snapshot){
                    var operatorMessage=snapshot.val()
                    console.log('operator message '+operatorMessage)
                    $('#operator_message_'+index).last().text(operatorMessage)
                })
                database.ref('users/'+user.uid+'/helprequests/'+index+'/state/').on('value',function(snapshot){
                    var requestStatus=snapshot.val()
                    console.log('status request '+requestStatus)
                    switch(requestStatus){
                        case 'accepted':
                            $('#request_icon_'+index).last().attr('src','css/assets/accepted.svg')
                            $('#request_status_'+index).last().text('Status: accepted!')

                            break;
                        case 'refused':
                            $('#request_icon_'+index).last().attr('src','css/assets/notaccepted.svg')
                            $('#request_status_'+index).last().text('Status: refused!')

                            break;
                        case 'pending':
                            $(window).width()<400?$('#request_status_'+index).last().text('Status: pending ...'):$('#request_status_'+index).last().text('Status: pending...')

                            break;


                    }

                })       
                database.ref('users/'+user.uid+'/helprequests/'+index+'/place').once('value').then(function(snapshot){
                    var place=snapshot.val()
                    console.log('place for request '+place)
                    $('#whereabouts_'+index).last().text(place)
                })
                database.ref('users/'+user.uid+'/helprequests/'+index+'/time').once('value').then(function(snapshot){
                    var time=snapshot.val()
                    console.log('place for request '+time)
                    $('#time_'+index).last().text(time)
                })


            })


        } 

        else {
            // No user is signed in.
        }
    });  

}

function resize(width){
    if(width>=1000){
        var title=jQuery('.title')
        var col=jQuery('.icon_wrapper')



        if(title.hasClass('display-3')){

            title.removeClass('display-3')
            title.addClass('display-2')
        }
        if(col.hasClass('col-4')){
            col.removeClass('col-4')
            col.addClass('col-2 ')
        }



    }
    if(width>=768 && width<1000){
        var title=jQuery('.title')
        var col=jQuery('.icon_wrapper')

        if(title.hasClass('display-2')){
            title.removeClass('display-2')
            title.addClass('display-3')
        }
        else{
            title.removeClass('display-4')
            title.addClass('display-3')
        }
        if(col.hasClass('col-4')){
            console.log("hi come stai")
            col.removeClass('col-4')
            col.addClass('col-2 ')
        }

    }
    if(width<768){
        var title=jQuery('.title')
        var col=jQuery('.icon_wrapper')

        if(title.hasClass('display-3')){
            title.removeClass('display-3')
            title.addClass('display-4')
        }
        if(title.hasClass('display-2')){
            title.removeClass('display-2')
            title.addClass('display-4')
        }
        if(col.hasClass('col-2')){
            col.removeClass('col-2')
            col.addClass('col-4 ')
        }

    }
    var getDirectionsButton=jQuery('#getdirections')
    if(width<400 && getDirectionsButton.hasClass('btn-lg')){
        getDirectionsButton.removeClass('btn-lg')

    }
}
function resizeHelprequests(width){
    if(width<768){
        var title=jQuery('.title')
        var col=jQuery('.icon_wrapper')

        if(title.hasClass('display-3')){
            title.removeClass('display-3')
            title.addClass('display-4')
        }
        if(title.hasClass('display-2')){
            title.removeClass('display-2')
            title.addClass('display-4')
        }
        if(col.hasClass('col-2')){
            col.removeClass('col-2')
            col.addClass('col-5 ')
        }
    }
}





function setRowsAndCols(){
    var width=$(window).width()
    if(width<=768){
        
    }
}




