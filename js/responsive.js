$( document ).ready(function() {

            var width=$( window ).width();


            if(width>=1000){
                var title=jQuery('.title')

                if(title.hasClass('display-3')){
                    title.removeClass('display-3')
                    title.addClass('display-2')
                }


            }
            if(width>=768 && width<1000){
                console.log("only two")
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
                console.log("only one")
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




        });
        $(window).resize(function(){
            var width=$( window ).width();
            if(width>=1000){
                var title=jQuery('.title')

                if(title.hasClass('display-3')){
                    title.removeClass('display-3')
                    title.addClass('display-2')
                }


            }
            if(width>=768 && width<1000){
                console.log("only two")
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
                console.log("only one")
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
        });