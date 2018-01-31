window.setInterval(checkTimeAndLesson,15000)


function listOtherPlaces(){
    $('.list-group-item-interest').remove()

    database.ref('otherplaces/').on('child_added',function(interestSnapshot){

        var type=interestSnapshot.child('type').val()
        var name=interestSnapshot.child('name').val()
        var key=interestSnapshot.key
        var imageUrl=getUrlImage(type)
        var listGroupContainer=$('#interest_list')

        var domToAdd
        if($(window).width()>700){
            domToAdd='<li class="list-group-item list-group-item-interest flex-column align-items-start "><div class="d-flex w-100 justify-content-between"><div class="row justify-content-start" style="max-width: 900px;"><div class="col-auto" ><p class="mb-1 display-4 place_name" >'+name+'</p></div><div class="col-auto" style="padding-left: 0px;"> <img  class=" d-block mx-auto" src="css/assets/information.svg" data-toggle="tooltip" data-placement="right" title="Click for more info" style="width: 15px; height: 15px;" id="info_'+key+'"></div></div><span class="badge badge-pill badge-info" style="height: 17px;" id="badge_'+key+'"></span></div><div class=" row justify-content-center" style=" max-width: 1100px; margin-top: 20px;" ><div class="col-auto"><img  class="icon d-block mx-auto" src="'+imageUrl+'" ></div><div class="col"><p class=" text-left text-capitalize d-block mx-auto my-auto classroom_info" id="lesson_'+key+'" ></p></div><div class="col-auto col-dir  no-gutters" style="max-width: 70px;" ><img  class="icon d-block mx-auto" src="css/assets/clock.svg" ></div>    <div class="col"><p class=" text-left text-capitalize d-block mx-auto my-auto classroom_info" id="time_'+key+'"></p></div></div></li>'

        }
        else{
            domToAdd='<li class="list-group-item  flex-column align-items-start "><div class="d-flex justify-content-between"><div class="row justify-content-start" style="width: 500px;"><div class="col-auto" ><p class="mb-1 display-4 place_name" >'+name+'</p></div><div class="col-auto"   style="padding-left: 0px;"><img  class=" d-block mx-auto" src="css/assets/information.svg" data-toggle="tooltip" data-placement="right" title="Click for more info" style="width: 15px; height: 15px;" id="info_'+key+'"></div></div><span class="badge badge-pill badge-info" id="badge_'+key+'" style="height: 17px;"></span></div><div class=" row justify-content-center" style=" max-width: 1100px; margin-top: 20px;" id="class_and_time"><div class="col-auto col-dir  no-gutters" style="max-width: 70px;" ><img  class="icon d-block mx-auto" src="css/assets/lesson.svg" ></div>    <div class="col"><p class=" text-left text-capitalize d-block mx-auto my-auto classroom_info" id="lesson_'+key+'" ></p></div></div><div class=" row justify-content-center" style=" max-width: 1100px; margin-top: 20px;" id="class_and_time"><div class="col-auto col-dir  no-gutters" style="max-width: 70px;" ><img  class="icon d-block mx-auto" src="css/assets/clock.svg" ></div>    <div class="col"><p class=" text-left text-capitalize d-block mx-auto my-auto classroom_info" id="time_'+key+'" ></p></div></div></li>'
        }
        $('.loader-interest').remove()

        listGroupContainer.append(domToAdd)

        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
        $('#info_'+key).click(function(){
            var key=$(this).attr('id').split("_",2)
            var interestPlaceInfo={
                'type':type,
                'name':name,
                'key':key,
                'imageUrl':imageUrl
            }
            localStorage.setItem('place_clicked',JSON.stringify(interestPlaceInfo))
            location.replace("ClassDetailed.html");
        })




    })
}






function listClassrooms(){
    $('.list-group-item-classrooms').remove()
    database.ref('CesenaCampus/').on('child_added',childsnapshot=>{

        var key=childsnapshot.key

        if(key!='Corsi' && key!='name') {
            var listGroupClassrooms=$('#classrooms_list')
            var classroomName=childsnapshot.child('name').val()
            if(classroomName=="Laboratorio Informatico 2" && $(window).width()<700){
                classroomName='Lab. Inf. 2'
            }
            if(classroomName=="Laboratorio Informatico 3" && $(window).width()<700){
                classroomName='Lab. Inf. 3'
            } 

            var domToAdd
            if($(window).width()>700){
                domToAdd='<li class="list-group-item list-group-item-classrooms flex-column align-items-start "><div class="d-flex w-100 justify-content-between"><div class="row justify-content-start" style="max-width: 900px;"><div class="col-auto" ><p class="mb-1 display-4 place_name" >'+classroomName+'</p></div><div class="col-auto" style="padding-left: 0px;"> <img  class=" d-block mx-auto" src="css/assets/information.svg" data-toggle="tooltip" data-placement="right" title="Click for more info" style="width: 15px; height: 15px;" id="info_'+key+'"></div></div><span class="badge badge-pill badge-info" style="height: 17px;" id="badge_'+key+'"></span></div><div class=" row justify-content-center" style=" max-width: 1100px; margin-top: 20px;" id="class_and_time"><div class="col-auto"><img  class="icon d-block mx-auto" src="css/assets/lesson.svg" ></div><div class="col"><p class=" text-left text-capitalize d-block mx-auto my-auto classroom_info" id="lesson_'+key+'" ></p></div><div class="col-auto col-dir  no-gutters" style="max-width: 70px;" ><img  class="icon d-block mx-auto" src="css/assets/clock.svg" ></div>    <div class="col"><p class=" text-left text-capitalize d-block mx-auto my-auto classroom_info" id="time_'+key+'"></p></div></div></li>'

            }
            else{
                domToAdd='<li class="list-group-item list-group-item-classrooms flex-column align-items-start "><div class="d-flex justify-content-between"><div class="row justify-content-start" style="width: 500px;"><div class="col-auto" ><p class="mb-1 display-4 place_name" >'+classroomName+'</p></div><div class="col-auto"   style="padding-left: 0px;"><img  class=" d-block mx-auto" src="css/assets/information.svg"  style="width: 15px; height: 15px;" id="info_'+key+'"></div></div><span class="badge badge-pill badge-info" id="badge_'+key+'" style="height: 17px;"></span></div><div class=" row justify-content-center" style=" max-width: 1100px; margin-top: 20px;" id="class_and_time"><div class="col-auto col-dir  no-gutters" style="max-width: 70px;" ><img  class="icon d-block mx-auto" src="css/assets/lesson.svg" ></div>    <div class="col"><p class=" text-left text-capitalize d-block mx-auto my-auto classroom_info" id="lesson_'+key+'" ></p></div></div><div class=" row justify-content-center" style=" max-width: 1100px; margin-top: 20px;" id="class_and_time"><div class="col-auto col-dir  no-gutters" style="max-width: 70px;" ><img  class="icon d-block mx-auto" src="css/assets/clock.svg" ></div>    <div class="col"><p class=" text-left text-capitalize d-block mx-auto my-auto classroom_info" id="time_'+key+'" ></p></div></div></li>'

            }

            listGroupClassrooms.append(domToAdd)
            $('.loader-classes').remove()


            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })


            var lessonsPerClassroom=[]
            setCurrentOrNextLesson(lessonsPerClassroom,key,classroomName)
        }
    })




}

function checkTimeAndLesson(){
    database.ref('CesenaCampus/').on('child_added',childsnapshot=>{
        var classroomName=childsnapshot.child('name').val()
        var key=childsnapshot.key
        var lessonsPerClassroom=[]

        setCurrentOrNextLesson(lessonsPerClassroom,key,classroomName)
    })

}
function setCurrentOrNextLesson(lessonsPerClassroom,classroomKey,classroomName){
    database.ref('CesenaCampus/Corsi/').once('value').then(lessons=>{
        // alert(lessonSnapshot.key)

        lessons.forEach(function(lessonSnapshot){ 


            var lessonName=lessonSnapshot.child('name').val()
            var teacher=lessonSnapshot.child('teacher').val()
            //console.log(lessonName.val())
            var scheduleChild=lessonSnapshot.child('schedule')
            scheduleChild.forEach(daysSnapshot=>{
                var lessonClassroom=daysSnapshot.child('place').val()
                var timeStart=daysSnapshot.child('timeStart').val()
                var timeEnd=daysSnapshot.child('timeEnd').val()
                var dayValue=daysSnapshot.child('value').val()


                var date=new Date()
                if(lessonClassroom==classroomKey){//controllo se la lezione è nella classe indicata dalla chiave
                    var place={
                        'lessonName':lessonName,
                        'timeStart':timeStart,
                        'timeEnd':timeEnd,
                        'dayValue':dayValue,
                        'day':daysSnapshot.key,
                        'place':lessonClassroom,
                        'teacher':teacher,
                        'name':lessonName


                    }
                    lessonsPerClassroom.push(place)
                }


            })


            getLesson(lessonsPerClassroom,classroomKey)

        })




    })
}

function getLesson(lessonsPerClassroom,id){
    var date=new Date()
    var currentHour=date.getHours()
    var currentDay=date.getDay()
    var temp=lessonsPerClassroom[0]


    for(var i=0;i<lessonsPerClassroom.length;i++){

     
        var dayDifference=lessonsPerClassroom[i].dayValue-temp.dayValue

        var timeDiffStart1= Math.abs(lessonsPerClassroom[i].timeStart-currentHour)
        var timeDiffStart2= Math.abs(temp.timeStart-currentHour)
        var lessonToCompare=lessonsPerClassroom[i]
        var dayDiff1=lessonToCompare.dayValue-currentDay
        var dayDiff2=temp.dayValue-currentDay
        
        //caso in cui temp è oggi, ma è già finità la lezione
        if(temp.dayValue==currentDay && temp.timeEnd<currentHour){
            temp=lessonToCompare
        }
        //caso in cui sono entrambe lo stesso giorno ma una l'altra inizia prima di temp con la condizione che time end > current hour
        if(dayDifference==0 && timeDiffStart2>timeDiffStart1 && lessonToCompare.timeEnd>currentHour ){
            temp=lessonToCompare
        }
        //caso in cui sono dello stesso giorno ma non quello corrente devo confrontare solo chi ha starttime più piccolo
        else if(dayDifference==0 && temp.dayValue!=currentDay && lessonToCompare.timeStart-temp.timeStart<0){
            temp=lessonToCompare
        }
        // caso in cui lesson to compare è oggi e temp no
        else if(lessonToCompare.dayValue==currentDay && temp.dayValue!=currentDay && lessonToCompare.timeEnd>currentHour){
            temp=lessonToCompare
        }
        //caso in cui nessuna delle due è oggi, devo prendere quella più vicino

        //se una differenza è < 0 e l'altra no prendo quella positiva
        else if(temp.dayValue-currentDay<0 && lessonToCompare.dayValue-currentDay>0){
            temp=lessonToCompare
        }
        // in tutti gli altri casi devo sempre prendere quella più piccola
        else if(dayDiff1<dayDiff2 && dayDiff1>0){
            temp=lessonToCompare
        }


        var isLessonGoingAndToday=currentHour>= temp.timeStart && temp.timeEnd>currentHour && temp.dayValue==currentDay
        var dayString=temp.dayValue==currentDay?'Today':renderDay(temp.dayValue)
        var time=temp.timeStart.toString()+':00'
        $('#time_'+id).text(dayString+', '+time)
        var text=isLessonGoingAndToday?'Current lesson: '+temp.lessonName:'Next Lesson: '+temp.lessonName
        $('#lesson_'+id).text(text)
        //  if(id='LaboratorioInformatico3')
        getTime(temp.timeStart,temp.timeEnd,id,temp.dayValue)
        localStorage.setItem('todayClass_'+id,JSON.stringify(temp))

        $('#info_'+id).click(function(){
            var value=JSON.parse(localStorage.getItem('todayClass_'+id))
            localStorage.setItem('todayClass',JSON.stringify(value))
            location.replace('ClassDetailed.html')
        })


    }
}
function getTime(timeStart,timeEnd,id,lessonDayValue){

    var date=new Date()
    var currentHour=date.getHours()
    var currentMinute=date.getMinutes()
    var timeDifference=currentHour-timeStart.toString().split(":",1)
    var minuteToPrint=currentMinute<10?'0'+currentMinute:currentMinute
    var timeToPrint= timeDifference>0?(currentHour-timeStart)+':'+minuteToPrint+' hours ago':(Math.abs(timeDifference)-1).toString()+':'+(60-currentMinute).toString()+' hours hence'

    var abs=Math.abs(timeDifference)
    if(lessonDayValue-date.getDay()==1){
        //var time=lessonDayValue-date.getDay()+' days hence'
        $('#badge_'+id).text('Tomorrow')
    }
    else if(lessonDayValue-date.getDay()>0){
        var time=lessonDayValue-date.getDay()+' days hence'
        $('#badge_'+id).text(time)
    }
    else if(lessonDayValue-date.getDay()<0){
        var time=7-(date.getDay()-lessonDayValue)+' days hence'
        $('#badge_'+id).text(time)
    }
    else if(lessonDayValue-date.getDay()==0 && timeEnd<=currentHour){

        var time=7-(date.getDay()-lessonDayValue)+' days hence'
        $('#badge_'+id).text(time)


    }
    else{
        switch(Math.abs(timeDifference)){
            case 0:
                if(timeStart<= currentHour){
                    $('#badge_'+id).text(currentMinute+' minutes ago')
                }
                else{
                    $('#badge_'+id).text(currentMinute+' minutes hence')
                }


                break;
            default:
                $('#badge_'+id).text(timeToPrint)

                break;

        }

    }


}


function renderDay(dayNumber){

    switch(dayNumber){
        case 0:
            return 'sunday';
        case 1:
            return 'monday';
        case 2:
            return 'tuesday';
        case 3:
            return 'wednesday';
        case 4:
            return 'thursday';
        case 5:
            return 'friday';
        case 6:
            return 'saturday';
    }
}
function getUrlImage(type){
    switch(type){
        case 'biblioteca':
            return 'css/assets/library.svg'
        case 'recreation':
            return 'css/assets/vending-machine.svg'
        case 'office':
            return 'css/assets/office.svg'

    }
}
function resize(width){

    if(width>=1000){
        var title=jQuery('.title')



        if(title.hasClass('display-3')){

            title.removeClass('display-3')
            title.addClass('display-2')
        }




    }
    if(width>=768 && width<1000){
        var title=jQuery('.title')

        if(title.hasClass('display-2')){
            title.removeClass('display-2')
            title.addClass('display-3')
        }
        else{
            title.removeClass('display-4')
            title.addClass('display-3')
        }


    }
    if(width<768){
        var title=jQuery('.title')

        if(title.hasClass('display-3')){
            title.removeClass('display-3')
            title.addClass('display-4')
        }
        if(title.hasClass('display-2')){
            title.removeClass('display-2')
            title.addClass('display-4')
        }


    }
    var button=jQuery('.btn')
    if(width<400 && button.hasClass('btn-lg')){

        button.removeClass('btn-lg')

    }
    else if(width>400 && !button.hasClass('btn-lg')){
        button.addClass('btn-lg')
    }
    var formInput=$('.form-control')
    if(width<400 && formInput.hasClass('form-control-lg')){
        formInput.removeClass('form-control-lg')
    }
    else if(width>400 && !formInput.hasClass('form-control-lg')){
        formInput.addClass('form-control-lg')
    }

}