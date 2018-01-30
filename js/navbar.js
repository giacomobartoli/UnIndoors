function setNavbar(){

    var x = document.cookie;
    if(x==''){
        //alert('nessuno è loggato')
    }else{
        //alert(x)
        $("a:contains('Log in')").text('Log out');
        $("a:contains('Log out')").attr("href", "index.html")
    }
    
}

function logOut(){
    //alert('mi sono sloggato')
    document.cookie = "UniIndoors=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
