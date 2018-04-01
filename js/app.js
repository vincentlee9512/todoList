(function(){
    var app = angular.module('list',[]);
    var hashkey = 0;

    var cateList = [];
    if(localStorage['cateList'] === undefined){
        cateList = [
            {
                name: "reminder",
                color: "#4285F4"
            },
            {
                name: "grocery",
                color: "#34A853"
            },
            {
                name: "appointment",
                color: "#FBBC05"
            },
            {
                name: "bills",
                color: "#EA4335"
            }
        ];
        localStorage.setItem('cateList',  angular.toJson(cateList));
    }else{
        cateList = angular.fromJson(localStorage['cateList']);
        console.log(cateList);
    }


    var eventsArray = [];
    if(localStorage['eventsArray'] === undefined){
        localStorage.setItem('eventsArray', angular.toJson(eventsArray));
    }else{
        eventsArray = angular.fromJson(localStorage['eventsArray']);
        console.log(eventsArray);
    }



    app.controller('NavController', function () {
       this.tab = 1;
       this.cateColors = cateList;
       this.todoEvents = eventsArray;

       this.setTab = function(num) {
           this.tab = num;
       };

       this.isTab = function(num) {
           return this.tab === num;
       };

       this.findCateColor = function(cate){
           var cateObj = this.cateColors.find(function (el) {
               if(el.name === cate){
                   return el.color;
               }
           });

           return cateObj;
       };

       this.checkLocalStorage = function(){
           if(typeof (Storage) === "undefined"){
               window.alert("Warning: Your browser does not support storage feature. Your data will not be stored.")
           }
       };

    });

    app.controller('ListController', function(){

        this.noEvent = function(){
            return eventsArray.length === 0;
        };

        this.isComplete = function(todoEvent){
            return todoEvent.status !== "incomplete";
        };

        this.completeThisEvent = function($event, todoEvent){
            //modifying DOM
            $event.target.className = "btn btn-dark";
            angular.element($event.target).unbind("click");

            //modifying eventsArray
            eventsArray.find(function (el) {
               if(el.name === todoEvent.name){
                   el.status = "completed";
               }
            });

            localStorage.removeItem('eventsArray');
            localStorage.setItem('eventsArray', angular.toJson(eventsArray));

        };

        this.removeThisEvent = function ($event, todoEvent){
            var confirm = prompt("Please enter \"remove\" to DELETE this item");

            if(confirm === "remove"){
                //modifying DOM
                var root = $event.target.parentNode.parentNode.parentNode;
                console.log(root);

                angular.element(root).empty();

                //modifying eventsArray
                eventsArray = eventsArray.filter(function(el){
                    return el.name !== todoEvent.name;
                });
                console.log(eventsArray);
                localStorage.removeItem('eventsArray');
                localStorage.setItem('eventsArray', angular.toJson(eventsArray));
            }else{
                window.alert("The enter is not \"remove\" ");
            }


        };

        this.sortList = function (num) {
            if(num === 0){
                console.log(num);
                eventsArray.sort(function (a, b) {
                    if(a.deadline < b.deadline){
                        return -1;
                    }else{
                        return 1;
                    }
                })
            }else if(num === 1){
                console.log(num);
                eventsArray.sort(function (a, b) {
                    if(a.deadline < b.deadline){
                        return 1;
                    }else{
                        return -1;
                    }
                })
            }else if(num === 2){
                console.log(num);
                eventsArray.sort(function (a,b) {
                    if(a.cate < b.cate){
                        return -1;
                    }else{
                        return 1;
                    }
                });
            }else if(num === 3){
                console.log(num);
                eventsArray.sort(function (a,b) {
                    if(a.cate < b.cate){
                        return 1;
                    }else{
                        return -1;
                    }
                });
            }else if(num === 4){
                eventsArray.sort(function (a,b) {
                    if(a.status < b.status){
                        return 1;
                    }else{
                        return -1;
                    }
                });
            }else if(num === 5){
                eventsArray.sort(function (a,b) {
                    if(a.status < b.status){
                        return -1;
                    }else{
                        return 1;
                    }
                });
            }
            else{
                console.log(num);
                window.alert("something went wrong");
            }
        };

        this.print = function() {
            console.log(eventsArray);
        };
    });

    app.controller('EventCreateController',function() {
        this.event = {
            status: "incomplete"
        };
        console.log(this.event.status);
        this.addEvent = function(){
          eventsArray.push(this.event);
          localStorage.removeItem('eventsArray');
          localStorage.setItem('eventsArray', angular.toJson(eventsArray));
            this.event = {
                status: "incomplete"
            };
        };

    });
    
    app.controller('NewCateController',function () {
        this.newCate = {};

        this.addCate = function () {


            cateList.push(this.newCate);
            localStorage.removeItem('cateList');
            localStorage.setItem('cateList', angular.toJson(cateList));
            //window.alert("you have this category");


            this.newCate = {};
        };

    });

    app.directive('displayList', function(){
       return{
           restrict: 'E',
           templateUrl: 'display-list.html'
       };
    });

    app.directive('createEvent',function(){
        return{
            restrict: 'E',
            templateUrl: 'create-event.html'
        };
    });

    app.directive('createCate', function(){
       return{
           restrict: 'E',
           templateUrl: 'create-cate.html'
       }
    });


})();

