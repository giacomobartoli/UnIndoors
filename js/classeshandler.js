// Initialize Firebase
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
var carouselNotActiveItemNumber=0;
var rowIDNumber=0;
var todayClassesCarouselSlide=document.getElementById('carouselExampleControls');






function setUpTodayClasses(size) {
    var date = new Date();
    var today = date.getDay();
    var classes=[];

    database.ref('CesenaCampus/Corsi/').once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var lessonName=childSnapshot.child('name').val().toString();

            childSnapshot.child('schedule').ref.once('value').then(function (scheduleSnapshot) {
                scheduleSnapshot.forEach(function (daySnapshot) {
                    var dayNumber = daySnapshot.child('value').val();
                    if (dayNumber == today) {
                        var todayClass = {
                            name: lessonName,
                            timeStart: daySnapshot.child('timeStart').val().toString(),
                            timeEnd: daySnapshot.child('timeEnd').val().toString(),
                            place: daySnapshot.child('place').val().toString(),
                            imageUrl:renderLessonImage(lessonName)

                        }
                        classes.push(todayClass);
                        console.log(classes)
                        if(size>768 && size<1000){
                            fillCarouselRow(todayClass,carouselInnerElementToday,carouselOuterElementToday,2);
                        }
                        if(size<768){
                            fillCarouselRow(todayClass,carouselInnerElementToday,carouselOuterElementToday,1);
                        }
                        if(size>=1000){
                            fillCarouselRow(todayClass,carouselInnerElementToday,carouselOuterElementToday,3);
                        }



                    }
                });

            });

        });

    });


}
function resetIndexes(){
    carouselNotActiveItemNumber=0;
    rowIDNumber=0;
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
            return 'css/assets/web_development.svg'
        default: return null;



    }
}



function fillCarouselRow(todayClass,carouselInnerElement,carouselOuterElement,numberOfImagesPerSlide){

    var carouselRow;
    var name=todayClass.name;
    var imageUrl=todayClass.imageUrl;



    //    var timeStart=todayClass.timeStart;
    //    var timeEnd=todayClass.timeEnd;
    //    var place=todayClass.place;

    /*first item active already in default html template: it gets filled up by max 3 elements
   */
    //create new active item
    if(carouselInnerElement.childElementCount==0){
        var activeItem='<div class="carousel-item active" id="carousel_item_'+carouselNotActiveItemNumber+'"><div class="row" id="row_'+rowIDNumber+'"></div></div>';
        carouselInnerElement.insertAdjacentHTML('beforeend',activeItem);    



    }
    var id=new String("row_"+rowIDNumber)
    carouselRow=document.getElementById(id);
    //creo un nuovo item (ma non active)

    if(carouselRow.childElementCount==numberOfImagesPerSlide){
        rowIDNumber++;
        carouselNotActiveItemNumber++;
        var newCarouselItemNotActive='<div class="carousel-item" id="carousel_item_'+carouselNotActiveItemNumber+'" ><div class="row" id="row_'+rowIDNumber+'"></div></div>'
        carouselInnerElement.insertAdjacentHTML('beforeend',newCarouselItemNotActive);
        var newId=new String("row_"+rowIDNumber);
        carouselRow=document.getElementById(newId);
        var carouselLessonItem='<div class="col"><div class="card" ><img class="card-img-top" src="'+imageUrl+'" alt="Card image cap"><div class="card-body"><h4 class="card-title">'+name+'</h4><p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content</p>';
        carouselRow.insertAdjacentHTML('beforeend',carouselLessonItem);

    }

    else if(carouselRow.childElementCount<numberOfImagesPerSlide){
        var carouselLessonItem='<div class="col"><div class="card" "><img class="card-img-top" src="'+imageUrl+'" alt="Card image cap"><div class="card-body"><h4 class="card-title">'+name+'</h4><p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content</p>';

        carouselRow.insertAdjacentHTML('beforeend',carouselLessonItem);

    }

    if(carouselNotActiveItemNumber==1 && document.getElementById("today_carousel_controls")==null){

        var slideControls=' <a class="carousel-control-prev control" href="#carousel_today_classes" role="button" data-slide="prev" id="today_carousel_controls"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next control" href="#carousel_today_classes" role="button" data-slide="next" id="today_carousel_controls"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>';
        carouselOuterElement.insertAdjacentHTML('beforeend',slideControls);

    }
}

function getCarouselItems(carouselInnerElementID){

    var rowElements=[];

    $(carouselInnerElementID).find('.carousel-item').each(function(){
        $(this).find('.row').each(function(){
            $(this).find('.col').each(function(){
                rowElements.push($(this))
            })

        })
    })
    rowElements.forEach(function(element){
        console.log('item ',element);

    })

    return rowElements;

}


function resizeAlgorithm(numberOfItemsPerSlide,rowElements,carouselInnerElementID){
    if(rowElements.length<=numberOfItemsPerSlide){
        console.log("removing controls",rowElements.length,numberOfItemsPerSlide,document.getElementById('today_carousel_controls'))
        $('#carousel_today_classes').remove('#today_carousel_controls');
         console.log(" after removing controls",rowElements.length,numberOfItemsPerSlide,document.getElementById('today_carousel_controls'))



    }
    else if(document.getElementById('today_carousel_controls')==null && rowElements.length>numberOfItemsPerSlide){
        console.log('adding control at number of slide '+numberOfItemsPerSlide)
        var slideControls=' <a class="carousel-control-prev control" href="#carousel_today_classes" role="button" data-slide="prev" id="today_carousel_controls"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next control" href="#carousel_today_classes" role="button" data-slide="next" id="today_carousel_controls"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>';
        $('#carousel_today_classes').append(slideControls);
    }
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








