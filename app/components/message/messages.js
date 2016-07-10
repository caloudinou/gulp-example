/**
 * Created by grizzly on 07/07/2016.
 */
(function (window,chatroom, undefined) {
    chatroom.Components.message=(function () {

        var targetMessageShow = null;
        var template = '<div class="chat-show-card" style="background:{{ background }}"><p class="chat-show-message">{{ message }}</p><span class="chat-show-user">{{ user }} - {{ date }}</span></div>';
        var idMsg = null;
        var url = 'src/config/message.json';
        var background = null;

        var setMessage = function(data){
            var tmp = template;
            tmp = tmp.replace('{{ message }}', data.message);
            tmp = tmp.replace('{{ user }}', data.login);
            tmp = tmp.replace('{{ date }}', data.date);
            tmp = tmp.replace('{{ background }}', background);
            targetMessageShow.innerHTML += tmp;
        };
        
        var __check = function(){
           Ajax.get(url).success(function(messages){

               var messages = JSON.parse(messages);
               targetMessageShow.innerHTML ='';

               console.log(messages);

               for(var i = 0; i<messages.length;i++){

                   console.log(messages[i].user_id);

                       __setBackground(messages[i]);
                       setMessage(messages[i]);
                       idMsg = messages[i].user_id;

               }

           });
            //@todo:notify
        };

        var __send = function(message){
            Ajax.post(url, "IdEditor=" +encodeURIComponent(message)+'&user='+chatroom.Models.user.getCurrentUser().id).success(function(messages){
                var messages = JSON.parse(messages);
                console.log(messages);
                targetMessageShow.innerHTML ='';

                for(var i = 0; i<messages.length;i++){

                    console.log(message.user_id);
                        __setBackground(messages[i]);
                        setMessage(messages[i]);
                        idMsg = messages[i].user_id;

                }
            });
        };
        var __setBackground = function(message){
            var user =chatroom.Models.user.getCurrentUser();
            console.log(message.user_id);
            if(message.user_id == user.id){
                background = "#FFFFFF";
            }else{
                background = "#407AFF";
            }
        };
        /**
         * function d'initialisation de l'application
         */
        var init=function(){

            document.addEventListener('content', function (e) {
                targetMessageShow = document.querySelector('#shower');

                /**
                 * reception message
                 */
                setInterval(function(){
                    __check();
                }, 3000);

                /**
                 * send message
                 */
                document.querySelector('.chat-message > button').onclick=function () {
                    __send(document.querySelector('.chat-message > input').value);
                };

            }, false);
        };
        
        return{
            init:init()
        }

    })();
})(window,chatroom);