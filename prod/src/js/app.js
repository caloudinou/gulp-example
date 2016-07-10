/**
 * Created by grizzly on 06/07/2016.
 */
(function(window,undefined){
    /**
     * déclaration de l'objet chatroom
     * @type {{}}
     */
    var chatroom = window.chatroom = window.chatroom  || {};
    chatroom.Config  = {};
    chatroom.Models  = {};
    chatroom.Components={};
    chatroom.Common={};
    chatroom.Translation={};


})(window);
/**
 * Created by grizzly on 07/07/2016.
 */
(function (window,chatroom,undefined) {

    chatroom.Config.app=(function(){
        /**
         * déclaration des variables
         * @type {null}
         */
        var container;
        var version = 0.1;

        /**
         * Cible la division où sera contenu l'application
         * @private
         */
        var __targetAppContenaire = function(){
            container = document.getElementById('container');
        };

        /**
         * function d'initialisation de l'application
         */
        var init=function(){
            window.onload=function(){
                
                __targetAppContenaire();
                
                // Create the event.
                var eventInit = new Event('build');
                document.dispatchEvent(eventInit);
                
            }; 
        };

        /**
         * variable et méthode exposé
         */
        return {
            init:init(),
            getContainer : function() {
                return container;
            },
            getVersion: function(){
                return version;
            }
        };

    })();
})(window,chatroom);
/**
 * Created by grizzly on 07/07/2016.
 */

(function(window, undefined){
    
    window.Ajax = (function(){

        this.xhr = null;


        var init=function(){
            if (window.XMLHttpRequest || window.ActiveXObject) {

                if (window.ActiveXObject) {

                    try {
                        this.xhr = new ActiveXObject("Msxml2.XMLHTTP");
                    } catch(e) {
                        this.xhr = new ActiveXObject("Microsoft.XMLHTTP");
                    }

                } else {
                    this.xhr = new XMLHttpRequest();
                }

            } else {

                throw new Error("non supporté par le navigateur");

            }
        };
        init();

        this.get=function(url){
            var xhr     = this.xhr;
            var url     = url;
            var method  = "GET";

            xhr.open(method, url, true);
            xhr.send(null);
            return this;

        };

        this.post=function(url,data){
            var xhr     = this.xhr;
            var url     = url;
            var data    = data;
            var method  = "POST";


            xhr.open(method, url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(data);
            return this;

        };

        this.success=function(callback){
            var xhr = this.xhr;
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                    callback(xhr.responseText);
                }
            };
        };

        return this;

    })();




})(window);

/**
 * Created by grizzly on 07/07/2016.
 */
(function(window,chatroom, undefined){
    chatroom.Components.content=(function () {
        var template = '<section class="menu-list dp-inline-block-top"></section><section class="chat-room dp-inline-block-top">' +
            '<article class="chat-show" id="shower"></article><form class="chat-message wrap"><input type="text" name="message"><button>send</button></form>' +
            '</section>';

        var __setContent = function(){
            console.log(chatroom.Config.app.getContainer());
            chatroom.Config.app.getContainer().innerHTML=template;
            return dispatchEventContent();
        };
        var dispatchEventContent=function(){
            var eventContent = new Event('content');
            document.dispatchEvent(eventContent);
        };
        /**
         * function d'initialisation de l'application
         */
        var init=function(){

            document.addEventListener('build', function (e) {
                __setContent();
            }, false);
        };

        return{
            init:init()
        }

    })();
})(window,chatroom);
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
            return setStatus(null);
        };


        var setStatus = function(ids){
            var listMenu = document.getElementsByClassName('menu-list')[0].getElementsByClassName('user-status');
            for(var i = 0; i<listMenu.length;i++){
                listMenu.innerHTML="offline";
            }
            if(ids != null){
                for(var z = 0; z<ids.length;z++) {
                    document.getElementById('user' + ids[z]).getElementsByClassName('user-status')[0].innerHTML = "online";
                }
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
            init        : init(),
            setStatus   : setStatus
        }

    })();
})(window,chatroom);
/**
 * Created by grizzly on 07/07/2016.
 */
(function (window,chatroom, undefined) {
    chatroom.Components.message=(function () {

        var targetMessageShow = null;
        var template = '<div class="chat-show-card" style="background:{{ background }}"><p class="chat-show-message">{{ message }}</p><span class="chat-show-user">{{ user }} - {{ date }}</span></div>';
        var idMsg = null;
        var url = 'back/messages.php';
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
(function(window,chatroom,undefined){
    chatroom.Models.user=(function(){

        var users=[];

        var user={
            id      : null,
            pseudo  : null,
            img     : null
        };
        var currentUser= sessionStorage.length>0 ? JSON.parse(sessionStorage.getItem('user')) : Object.create(user);

        var init = function(){
            Ajax.get('src/config/users.json').success(function(data){
                return _setNewUserInUsers(JSON.parse(data));
            });
        };
        var setIdCurrentUser = function(){
            if(sessionStorage.length>0){
            }else{
                Ajax.get('src/config/user.json').success(function(data){
                    console.log(data);
                    return __setCurrentUser(data);
                });
            }
        };
        var __setCurrentUser = function(data){
                var current = JSON.parse(data);
                currentUser.id = current.id;
                currentUser.pseudo = "user"+current.id;

                sessionStorage.setItem('user',JSON.stringify(currentUser));


        };

        var _setNewUserInUsers = function(response){
            for(var i = 0; i< response.length; i++){
                var tmp         = Object.create(user);
                tmp.id          = response[i].id;
                tmp.pseudo      = response[i].login;
                tmp.picture     = response[i].image;
                users.push(tmp);

            }
            return dispatchEventUser();
        };

        var dispatchEventUser=function(){
            var eventUsers = new Event('users');
            document.dispatchEvent(eventUsers);
        };


        var getAllUser = function(){
            return users;
        };
        var getCurrentUser = function(){
            return currentUser;
        };
        return{
            init            : init,
            getAllUser      : getAllUser,
            setIdCurrentUser:setIdCurrentUser(),
            getCurrentUser  : getCurrentUser
        }

    })();
})(window,chatroom);