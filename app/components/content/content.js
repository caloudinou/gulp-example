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