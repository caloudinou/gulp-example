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
