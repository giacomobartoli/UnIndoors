var width=$(window).width()
//listGroupClassrooms.append('<h1>gehdufbj</h1>')
window.setInterval(checkTimeAndLesson,15000)
function listOtherPlaces(){
    database.ref('otherplaces/').once('value').then(function(snapshot){

        snapshot.forEach(function(childsnapshot){

        })

    })
}
function listClassrooms(){
    database.ref('CesenaCampus/').on('child_added',childsnapshot=>{
        var classroomName=childsnapshot.child('name').val()
        var key=childsnapshot.key
        var listGroupClassrooms=$('#classrooms_list')
        var domToAdd
        if(width>500){
            domToAdd='<li class="list-group-item  flex-column align-items-start "><div class="d-flex w-100 justify-content-between"><div class="row justify-content-start" style="max-width: 900px;"><div class="col-auto" ><p class="mb-1 display-4 place_name" >'+classroomName+'</p></div><div class="col-auto" style="padding-left: 0px;"> <img  class=" d-block mx-auto" src="css/assets/information.svg" data-toggle="tooltip" data-placement="right" title="Click for more info" style="width: 15px; height: 15px;"></div></div><span class="badge badge-pill badge-info" style="height: 17px;" id="badge_'+key+'"></span></div><div class=" row justify-content-center" style=" max-width: 1100px; margin-top: 20px;" id="class_and_time"><div class="col-auto"><img  class="icon d-block mx-auto" src="css/assets/lesson.svg" ></div>    <div class="col"><p class=" text-left text-capitalize d-block mx-auto my-auto classroom_info" id="lesson_'+key+'" ></p></div><div class="col-auto col-dir  no-gutters" style="max-width: 70px;" ><img  class="icon d-block mx-auto" src="css/assets/clock.svg" ></div>    <div class="col"><p class=" text-left text-capitalize d-block mx-auto my-auto classroom_info" id="time_'+key+'"></p></div></div></li>'

        }
        else{
            
            
        }
            
        if(key!='Corsi' && key!='name'){
            listGroupClassrooms.append(domToAdd)

            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })

        }
        var lessonsPerClassroom=[]
        setCurrentOrNextLesson(lessonsPerClassroom,key,classroomName)
    })
}

function checkTimeAndLesson(){
    console.log(new Date().getSeconds())
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
            //console.log(lessonName.val())
            var scheduleChild=lessonSnapshot.child('schedule')
            scheduleChild.forEach(daysSnapshot=>{
                var lessonClassroom=daysSnapshot.child('place').val()
                var timeStart=daysSnapshot.child('timeStart').val()
                var timeEnd=daysSnapshot.child('timeEnd').val()
                var dayValue=daysSnapshot.child('value').val()
                var date=new Date()
                var isLessonOnGoing=timeStart<=date.getHours() && timeEnd>new Date().getHours()
                if(lessonClassroom==classroomKey ){//controllo se la lezione è nella classe indicata dalla chiave
                    var place={
                        'lessonName':lessonName,
                        'timeStart':timeStart,
                        'timeEnd':timeEnd,
                        'dayValue':dayValue,
                        'place':classroomName

                    }
                    lessonsPerClassroom.push(place)
                    //  console.log(place)
                }


            })
            //            for(var j=0;j<lessonsPerClassroom.length;j++){
            //                console.log(lessonsPerClassroom[j])
            //            }
            if(lessonsPerClassroom.length>0){
                getLesson(lessonsPerClassroom,classroomKey)
            }
        })




    })
}

function getLesson(lessonsPerClassroom,id){
    var date=new Date()
    var currentHour=date.getHours()
    var currentDay=date.getDay()
    var temp=lessonsPerClassroom[0]

    // if(temp.place=='Aula A')

    for(var i=0;i<lessonsPerClassroom.length;i++){

        //var lessonNamefordebug=lessonsPerClassroom[i].lessonName
        //  console.log(lessonsPerClassroom[i])
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

        //            if(dayDifference==0){
        //                if(timeDiff1<timeDiff2 && currentHour<=16 && currentHour>lessonsPerClassroom[i].timeEnd){
        //                    var isLessonGoing=currentHour>= lessonsPerClassroom[i].timeStart && currentHour<lessonsPerClassroom[i].timeEnd
        //
        //                    var text=isLessonGoing?'Current lesson: '+lessonsPerClassroom[i].lessonName:'Next Lesson: '+lessonsPerClassroom[i].lessonName
        //                    $('#lesson_'+id).text(text)
        //                    var dayString='Today'
        //                    var time=lessonsPerClassroom[i].timeStart.toString()+':00'
        //                    $('#time_'+id).text(dayString+', '+time)
        //                    getTime(lessonsPerClassroom[i].timeStart,currentHour<lessonsPerClassroom[i].timeEnd,id,lessonsPerClassroom[i].dayValue)
        //                    return
        //                    //            return lessonsPerClassroom[i]
        //
        //
        //                }
        //                
        //                else if( timeDiff1>timeDiff2 && currentHour<=16 && currentHour>temp.timeEnd){
        //                    var isLessonGoing=currentHour>= temp.timeStart && temp.timeEnd>currentHour
        //
        //                    var text=isLessonGoing?'Current lesson: '+temp.lessonName:'Next Lesson: '+temp.lessonName
        //                    $('#lesson_'+id).text(text)
        //                    var dayString='Today'
        //                    var time=temp.timeStart.toString()+':00'
        //
        //                    $('#time_'+id).text(dayString+', '+time)
        //                    getTime(temp.timeStart,temp.timeEnd,id,temp.dayValue)
        //
        //                    return         
        //                }
        //            }
        //
        //
        //            else if(currentHour<=16 && currentDay-temp.dayValue>currentDay-lessonsPerClassroom[i].dayValue  ){
        //                var startHourDifference=temp.timeStart-lessonsPerClassroom[i].timeStart
        //                if(startHourDifference<0){
        //                    temp=lessonsPerClassroom[i]
        //                }
        //            }
        //        }

        var isLessonGoingAndToday=currentHour>= temp.timeStart && temp.timeEnd>currentHour && temp.dayValue==currentDay
        var dayString=temp.dayValue==currentDay?'Today':renderDay(temp.dayValue)
        var time=temp.timeStart.toString()+':00'
        $('#time_'+id).text(dayString+', '+time)
        var text=isLessonGoingAndToday?'Current lesson: '+temp.lessonName:'Next Lesson: '+temp.lessonName
        $('#lesson_'+id).text(text)
        getTime(temp.timeStart,temp.timeEnd,id,temp.dayValue)




    }
}
function getTime(timeStart,timeEnd,id,lessonDayValue){

    var date=new Date()
    var currentHour=date.getHours()
    var currentMinute=date.getMinutes()
    // console.log('I have been called '+date.getSeconds())
    var timeDifference=currentHour-timeStart.toString().split(":",1)
    //var isLessonGoing=timeStart<= currentHour && timeDifference>currentHour
    var minuteToPrint=currentMinute<10?'0'+currentMinute:currentMinute
    var timeToPrint= timeDifference>0?(currentHour-timeStart)+':'+currentMinute+' ago':(Math.abs(timeDifference)-1).toString()+':'+(60-currentMinute).toString()+' hence'

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
                //            case 1:
                //                if(timeStart==currentHour){
                //                    var time=currentMinute.toString()+' minutes ago'
                //                    $('#badge_'+id).text(time)
                //                }
                //                if( timeStart<currentHour){
                //                    var minuteMinor10=currentMinute<10?'0'+currentMinute:(60-currentMinute)
                //
                //                    var time=(Math.abs(timeDifference)).toString()+':'+(minuteMinor10).toString()+' hours ago'
                //                    $('#badge_'+id).text(time)
                //                }
                //                if( timeStart>currentHour){
                //                    var minuteMinor10=(60-currentMinute)<10?'0'+(60-currentMinute):(60-currentMinute)
                //                    var time=(Math.abs(timeDifference)).toString()+':'+minuteMinor10.toString()+' hours hence'
                //                    $('#badge_'+id).text(time)
                //
                //                }
                //                break;
                //            default:
                //
                //                if( timeStart>currentHour){
                //                    var minuteMinor10=(60-currentMinute)<10?'0'+(60-currentMinute):(60-currentMinute)
                //
                //                    var time=(Math.abs(timeDifference)-1).toString()+':'+minuteMinor10.toString()+' hours hence'
                //                    $('#badge_'+id).text(time)
                //
                //                }
                //                if(timeStart<=currentHour){
                //                    var minuteMinor10=currentMinute<10?'0'+currentMinute:(60-currentMinute)
                //
                //                    $('#badge_'+id).text(Math.abs(timeDifference)-1+':'+minuteMinor10+' hours ago')
                //
                //                }   


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