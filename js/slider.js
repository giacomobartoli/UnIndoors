var windowWidth = $(window).width();
var newSlider=document.getElementById('sliderDiv');

var WINDOWS_SIZE_LIMIT = 900;


var mySlider = '<div class="carousel-inner"><div class="carousel-item active"><img class=" img-fluid frontpage"  src="img1.jpg" alt="First slide"><div class="carousel-caption d-none d-md-block"><h1 class="display-4">Welcome to Uniboors!</h1><p class="lead" style="font-weight: 400">A web app designed to deliver the best indoors navigation experience right at the school of Computer Science and Engineering, in the heart of Cesena</p><p class="alignlead text-lg-center"><button class="btn btn-primary btn-lg" style="width:200px;" role="button" onclick="onClickExplore()">Explore</button></p></div></div><div class="carousel-item"><img class="img-fluid"  src="img2.jpg" alt="Second slide"><div class="carousel-caption d-none d-md-block"><h1 class="display-4">Welcome to Uniboors!</h1><p class="lead" style="font-weight: 400">Never miss a lecture! UniIndoors will guide you through the university campus.</p><p class="alignlead text-lg-center"><button class="btn btn-primary btn-lg" style="width:200px;" role="button" onclick="onClickExplore()">Explore</button></p></div></div></div>';

var responsiveMode = '<div class=" jumbotron-fluid" id="start_jumb"><div class=" centered"><h1 class="display-4">Welcome to Uniboors!</h1><p class="lead" style="font-weight: 400">A web app designed to deliver the best indoors navigation experience right at the school of Computer Science and Engineering, in the heart of Cesena</p><p class="alignlead text-lg-center"><button class="btn btn-primary btn-lg" style="width:200px;" role="button" onclick="onClickExplore()">Explore</button></p></div></div>';

$(document).ready(function(){
    
    if(windowWidth > WINDOWS_SIZE_LIMIT){
    newSlider.innerHTML = mySlider;
}else{
    newSlider.innerHTML = responsiveMode;
}
})
    

window.addEventListener('resize', function(event){
  // do stuff here
    
    if(windowWidth > WINDOWS_SIZE_LIMIT){ 
    newSlider.innerHTML = "";
    newSlider.innerHTML = mySlider;
        location.reload();
}else{
    newSlider.innerHTML = "";
    newSlider.innerHTML = responsiveMode;
    
    }
});

