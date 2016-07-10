/**
 * Created by grizzly on 07/07/2016.
 */
(function (window,chatroom,undefined) {
    chatroom.Components.userList=(function(){

        var template ='<article id="user{{ id }}" data-user="{{ id }}" class="wrap"><img class="dp-inline-block" src="data:image/jpeg;base64,{{ picture }}">' +
            '<div class="dp-inline-block"><h2 class="user-title dp-block" >{{ pseudo }}</h2><span class="user-status dp-block"></span></div>' +
            '</article>';

        var listUser=null;
        
        var __setTemplateList= function(){
            var users = chatroom.Models.user.getAllUser();

            for(var i=0; i<users.length; i++) {
                var tmp = template;
                tmp = tmp.replace('{{ picture }}', users[i].picture);
                tmp = tmp.replace('{{ id }}', users[i].id);
                tmp = tmp.replace('{{ pseudo }}', users[i].pseudo);

                listUser.innerHTML += tmp;
            }
        };



        /**
         * function d'initialisation de l'application
         */
        var init=function(){

            document.addEventListener('content', function (e) {
                listUser = document.querySelector('.menu-list');
                chatroom.Models.user.init();
            }, false);

            document.addEventListener('users', function (e) {
                __setTemplateList();
            }, false);
            
        };

        return{
            init        : init()
        }

    })();
})(window,chatroom);