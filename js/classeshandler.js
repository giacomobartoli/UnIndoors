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
        var carouselLessonItem='<div class="col"><div class="card" style="max-width: 400px; max-height: 400px"; min-width="350px;"><img class="card-img-top" src="'+imageUrl+'" alt="Card image cap"><div class="card-body"><h4 class="card-title">'+name+'</h4><p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content</p>';
        carouselRow.insertAdjacentHTML('beforeend',carouselLessonItem);

    }

    //vado a cercare la riga corrente e ci piazzo la card
    //    var id=new String("row_"+rowIDNumber)
    //    carouselRow=document.getElementById(id);
    else if(carouselRow.childElementCount<numberOfImagesPerSlide){
        var carouselLessonItem='<div class="col"><div class="card" style="max-width: 400px; max-height: 400px"; min-width="350px;"><img class="card-img-top" src="'+imageUrl+'" alt="Card image cap"><div class="card-body"><h4 class="card-title">'+name+'</h4><p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content</p>';

        carouselRow.insertAdjacentHTML('beforeend',carouselLessonItem);

    }

    if(carouselNotActiveItemNumber==1 && document.getElementById("today_carousel_controls")==null){

        var slideControls=' <a class="carousel-control-prev" href="#carousel_today_classes" role="button" data-slide="prev" id="today_carousel_controls"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#carousel_today_classes" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>';
        carouselOuterElement.insertAdjacentHTML('beforeend',slideControls);

    }
}
function resizeCarouselItems(numberOfItemsPerSlide){
    var lessonsToMove=[];    
    console.log(numberOfItemsPerSlide)
    for(var i=0;i<carouselInnerElementToday.childNodes.length;i++){
        var carouselItem=carouselInnerElementToday.childNodes[i];
        var row=carouselItem.firstChild;
        
        while(row.childElementCount>numberOfItemsPerSlide){
            lessonsToMove.push(row.lastChild);
            row.removeChild(row.lastChild);

        }

    }
    var newItemsToAdd=Math.floor(lessonsToMove.length/numberOfItemsPerSlide) +lessonsToMove.length%numberOfItemsPerSlide

    for(var i=0;i<newItemsToAdd;i++){
        console.log(lessonsToMove[i])
        var row=document.getElementById(new String('row_resized_'+i))
        console.log(i%numberOfItemsPerSlide,i,numberOfItemsPerSlide);
        if(i%numberOfItemsPerSlide==0 && row==null){
            var item='<div class="carousel-item"><div class="row" id="row_resized_'+i+'"></div></div>'
            carouselInnerElementToday.insertAdjacentHTML('beforeend',item)
            row=document.getElementById(new String('row_resized_'+i))

            row.appendChild(lessonsToMove[i]);

        }
        else{
            console.log(numberOfItemsPerSlide,'Im here!!!!!')
            row=document.getElementById(new String('row_resized_'+i))
            row.appendChild(lessonsToMove[i]);

        }


    }



}








