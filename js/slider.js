var windowWidth = $(window).width();
var newSlider=document.getElementById('sliderDiv');

if(windowWidth > 1200){
    
    var mySlider = '<div class="carousel-inner"><div class="carousel-item active"><img class=" img-fluid frontpage"  src="img1.jpg" alt="First slide"><div class="carousel-caption d-none d-md-block"><h1 class="display-4">Welcome to Uniboors!</h1><p class="lead" style="font-weight: 400">A web app designed to deliver the best indoors navigation experience right at the school of Computer Science and Engineering, in the heart of Cesena</p><p class="alignlead text-lg-center"><button class="btn btn-primary btn-lg" style="width:200px;" role="button" onclick="onClickExplore()">Explore</button></p></div></div><div class="carousel-item"><img class="img-fluid"  src="img2.jpg" alt="Second slide"><div class="carousel-caption d-none d-md-block"><h1 class="display-4">Welcome to Uniboors!</h1><p class="lead" style="font-weight: 400">Never miss a lecture! UniIndoors will guide you through the university campus.</p><p class="alignlead text-lg-center"><button class="btn btn-primary btn-lg" style="width:200px;" role="button" onclick="onClickExplore()">Explore</button></p></div></div></div>'
    
    newSlider.innerHTML = mySlider;
}else{
    
    var responsiveMode = '<div class=" jumbotron-fluid" id="start_jumb"><div class=" centered"><h1 class="display-4">Welcome to Uniboors!</h1><p class="lead" style="font-weight: 400">A web app designed to deliver the best indoors navigation experience right at the school of Computer Science and Engineering, in the heart of Cesena</p><p class="alignlead text-lg-center"><button class="btn btn-primary btn-lg" style="width:200px;" role="button" onclick="onClickExplore()">Explore</button></p></div></div>'
    newSlider.innerHTML = responsiveMode;
}