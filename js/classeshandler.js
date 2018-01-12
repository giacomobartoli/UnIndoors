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
        } 
        else{
            $('#is_friendly').text('Ask for help')
            $('#handy').click()
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

function writeHelpRequest(place,time){
    
    var user=firebase.auth().currentUser
    console.log('gheiiiiii '+user.uid.toString()   )
    firebase.database().ref('help_request/').on('value',function(snapshot){
        if(snapshot.numChildren()==0){
            database.ref('help_request/').set({
               "user":user.uid.toString(),
                "place":place,
                "time":time
            })
        }
    })

}







