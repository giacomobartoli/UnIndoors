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






function setUpTodayClasses(size) {
    var date = new Date();
    var today = date.getDay();

    database.ref('CesenaCampus/Corsi/').on('value',function (snapshot) {


        snapshot.forEach(function (childSnapshot) {
            var lessonName=childSnapshot.child('name').val().toString();
            console.log(lessonName,snapshot.numChildren())

            childSnapshot.child('schedule').ref.once('value').then(function (scheduleSnapshot) {
                var dayoflessons=[]
                scheduleSnapshot.forEach(function (daySnapshot) {
                    //  console.log('array size ',dayoflessons.length)
                    if(lessonName=='Business Intelligence'){
                        console.log(daySnapshot.val())
                    }
                    var dayNumber = daySnapshot.child('value').val();
                    //    console.log(daySnapshot.child('timeStart').val().toString())
                    var todayClass = {
                        name: lessonName,
                        timeStart: daySnapshot.child('timeStart').val().toString(),
                        timeEnd: daySnapshot.child('timeEnd').val().toString(),
                        place: daySnapshot.child('place').val().toString(),
                        imageUrl:renderLessonImage(lessonName),
                        numberOfDay:dayNumber,
                        day:daySnapshot.key

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
                        for(var i=0;i<dayoflessons.length;i++){
                            //  console.log(dayoflessons[i].name)
                            if(dayoflessons[i].name=='Business Intelligence'){
                                console.log('BI',dayoflessons)
                            }
                        }

                        var closest=getClosestLesson(dayoflessons,today)
                        for(var i=0;i<closest.length;i++){
                            if(size>768 && size<1000){
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

    var elementOfRow='<div class="col"><div class="card" id="'+name+'" onclick="test()"><img class="card-img-top" src="'+imageUrl+'" alt="Card image cap"><div class="card-body"><h4 class="card-title">'+name+'</h4><p class="card-text">'+timeStart+" "+timeEnd+" "+place+" day: "+day+'</p>';
    if(innerElement.children().length==0){
        var carouselItem=$('<div class="carousel-item" id="'+carouselOuterElementID+'" ></div>').appendTo(innerElement)     
        row=$('<div class="row"></div>').appendTo(carouselItem)        
        carouselItem.addClass('active')

    }
    row=innerElement.find('.row').last()

    if(row.children().length==numberOfImagesPerSlide){
        carouselItem=$('<div class="carousel-item" id="'+carouselOuterElementID+'" ></div>').appendTo(innerElement)     
        row=$('<div class="row"></div>').appendTo(carouselItem)
        var controls=' <a class="carousel-control-prev control" href="'+carouselOuterElementID+'" role="button" data-slide="prev" id="today_carousel_controls"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next control" href="'+carouselOuterElementID+'" role="button" data-slide="next" id="today_carousel_controls"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>'
        jQuery(carouselOuterElementID).append(controls)


    }
    row.append(elementOfRow)
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
    rowElements.forEach(function(element){

    })

    return rowElements;

}


function resizeAlgorithm(numberOfItemsPerSlide,rowElements,carouselInnerElementID,carouselOuterElementID){
    //    if(rowElements.length<=numberOfItemsPerSlide){
    //        console.log("removing controls",rowElements.length,numberOfItemsPerSlide,document.getElementById('today_carousel_controls'))
    //        $(carouselOuterElementID).remove('#today_carousel_controls');
    //        console.log(" after removing controls",rowElements.length,numberOfItemsPerSlide,document.getElementById('today_carousel_controls'))
    //
    //
    //
    //    }
    //    else if(document.getElementById('today_carousel_controls')==null && rowElements.length>numberOfItemsPerSlide){
    //        console.log('adding control at number of slide '+numberOfItemsPerSlide)
    //        var slideControls=' <a class="carousel-control-prev control" href="#carousel_today_classes" role="button" data-slide="prev" id="today_carousel_controls"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next control" href="#carousel_today_classes" role="button" data-slide="next" id="today_carousel_controls"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>';
    //        $(carouselOuterElementID).append(slideControls);

    //    }
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



function test(){
    console.log('click');
}







