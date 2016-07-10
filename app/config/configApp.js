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