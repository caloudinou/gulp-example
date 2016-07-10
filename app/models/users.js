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