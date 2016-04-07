webpackJsonp([0],[function(e,t,a){e.exports=a(1)},function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(2),r=i(n),o=a(4),l=i(o),s=a(5),c=i(s),u=a(16),d=i(u),p=a(46),f=i(p),m=a(71),v=i(m);a(76),t["default"]=r["default"].module("app",["mgcrea.ngStrap",l["default"],d["default"],f["default"],v["default"]]).config(c["default"]),e.exports=t["default"]},,,,function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(6),r=i(n),o=a(7),l=i(o),s=a(8),c=i(s),u=a(9),d=i(u),p=a(10),f=i(p),m=a(11),v=i(m),g=a(12),h=i(g),b=a(13),x=i(b),y=a(14),w=i(y),_=a(15),C=i(_);t["default"]=["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t,a){"ngInject";a.html5Mode({enabled:!0,requireBase:!1}),t.otherwise("/"),e.state("app",{url:"","abstract":!0,templateUrl:r["default"],controller:"ApplicationController"}).state("app.about",{url:"/about/",templateUrl:w["default"],controller:"AboutController"}).state("app.register",{url:"/register/",templateUrl:C["default"],controller:"RegisterController"}).state("app.home",{url:"/",templateUrl:c["default"],controller:"HomeController"}).state("app.team",{url:"/team/:id",templateUrl:v["default"],controller:"TeamController"}).state("app.challenge",{url:"/challenge/:id",templateUrl:h["default"],controller:"ChallengeController"}).state("app.exercise",{url:"/exercise/:id",templateUrl:x["default"],controller:"ExerciseController"}).state("app.login",{url:"/login",templateUrl:d["default"],controller:"LoginController"}).state("app.my",{url:"/my",templateUrl:l["default"],controller:"AuthenticationController"}).state("app.my.profile",{url:"/profile",templateUrl:f["default"],controller:"MyProfileController"})}],e.exports=t["default"]},function(e,t){var a="controllers/application/template.html";window.angular.module("ng").run(["$templateCache",function(e){e.put(a,"<div id=application><ui-view></ui-view></div>")}]),e.exports=a},function(e,t){var a="controllers/authentication/template.html";window.angular.module("ng").run(["$templateCache",function(e){e.put(a,"<div id=authentication><ui-view></ui-view></div>")}]),e.exports=a},function(e,t){var a="controllers/home/template.html";window.angular.module("ng").run(["$templateCache",function(e){e.put(a,"<div id=home><div class=container><br><div class=jumbotron><h1>Competitively workout with friends</h1><hr><p>This is some description of the website. We gotta make this lot good.</p></div></div></div>")}]),e.exports=a},function(e,t){var a="controllers/login/template.html";window.angular.module("ng").run(["$templateCache",function(e){e.put(a,'<h1>CompFit</h1><div id=login><h2>Log in</h2><form><div class="form-group row"><input type=email class=form-control ng-model=user.email placeholder=Email required></div><div class="form-group row"><input type=password class=form-control ng-model=user.password placeholder=Password required></div><div class="form-group row"><button class="btn btn-primary" ng-click=login()>Log in</button></div></form></div><p>Don\'t have an account? <a href=#>Register here.</a></p>')}]),e.exports=a},function(e,t){var a="controllers/myProfile/template.html";window.angular.module("ng").run(["$templateCache",function(e){e.put(a,'<div id=my-profile><div class=jumbotron><h1>This! Is! My profile!!1</h1><div><button class="btn btn-default" ng-click=logout()>logout</button></div><div><img ng-src={{ngImg}} alt=""></div></div></div>')}]),e.exports=a},function(e,t){var a="controllers/team/template.html";window.angular.module("ng").run(["$templateCache",function(e){e.put(a,'<div id=team><div class=container><div class=row><div class=col-sm-3><seed-sidebar></seed-sidebar></div><div class=col-sm-9><div class="topSection row" ng-show=team_selected><div class=col-sm-2><img src={{avatar}} alt=/img/team_avatars/default-avatar.png class=img-thumbnail></div><div class=col-sm-10><h1>Team {{team_id}}</h1><button class="btn btn-info players_dropdown_btn" ng-click="players_dropdown = !players_dropdown">Players <span class=caret></span></button><div class="list-group players_dropdown" ng-show=players_dropdown><div ng-repeat="player in players"><a class=list-group-item>{{player.username}}</a></div></div></div></div><div class=topSection ng-show=!team_selected><h2>Select a Team</h2></div><create-team-modal id=createteammodal title="New Team"></div></div></div></div>')}]),e.exports=a},function(e,t){var a="controllers/challenge/template.html";window.angular.module("ng").run(["$templateCache",function(e){e.put(a,'<div id=challenge><div class=container><div class=row><div class=col-sm-3><challenges-sidebar></challenges-sidebar></div><div class=col-sm-9><div class="topSection row" ng-show=challenge_selected></div><div class=topSection ng-show=!challenge_selected><h2>Select a Challenge</h2></div></div></div></div></div>')}]),e.exports=a},function(e,t){var a="controllers/exercise/template.html";window.angular.module("ng").run(["$templateCache",function(e){e.put(a,'<div id=exercise><div class=container><div class=row><div class=col-sm-3><exercises-sidebar></exercises-sidebar></div><div class=col-sm-9><div class="topSection row" ng-show=exercise_selected></div><div class=topSection ng-show=!exercise_selected><h2>Select an Exercise</h2></div></div></div></div></div>')}]),e.exports=a},function(e,t){var a="controllers/about/template.html";window.angular.module("ng").run(["$templateCache",function(e){e.put(a,'<div id=about><div class=aboutCompFit><h2>About CompFit</h2><div>Compfit is an interactive app that allows people to join fitness teams and compete against others. Users can collaborate with their teammates to complete goals and gain the motivation they need to workout and get fit. Competition will drive users to work harder and hold their teammates accountable to meet their goals.</div></div><hr><div class=aboutdEVolution><h2>About dEVolution</h2><div class=row><h3>GUI Team</h3><div class=col-md-4><span>Ashley Pancho</span><br><img src="/img/devolution/ashley.jpg"></div><div class=col-md-4><span>Travis Siems</span><br><img src="/img/devolution/travis.jpeg"></div><div class=col-md-4><span>Emely Villeda-Principe</span><br><img src="/img/devolution/emely.jpg"></div></div><div class=row><h3>Database Team</h3><div class=col-md-4><span>Nigel Saurino</span><br><img src="/img/devolution/nigel.png"></div><div class=col-md-4><span>Elena Sharp</span><br><img src="/img/devolution/elena.jpeg"></div><div class=col-md-4><span>Emily Stephanian</span><br></div></div></div></div>')}]),e.exports=a},function(e,t){var a="controllers/register/template.html";window.angular.module("ng").run(["$templateCache",function(e){e.put(a,'<div id=register><div class="col-md-4 col-md-offset-4"><h1>CompFit</h1><h2>Register</h2><br><button type=button class="btn btn-primary">Log in with Facebook</button><hr><div class=form-group-row ng-app=registerForm ng-controller=registerController><form class=register><input ng-model=newUser.firstName class=form-control placeholder="First Name" required><input ng-model=newUser.lastName class=form-control placeholder="Last Name" required><input ng-model=newUser.username class=form-control placeholder=Username required><input type=email ng-model=newUser.email class=form-control placeholder=leela.turanga@planetexpress.com required><input type=password ng-model=newUser.password class=form-control placeholder=password required><button type=submit ng-click=submit(newUser) class="btn btn-primary">Submit</button></form>Already have an account? <a ui-sref=app.login>Log in.</a></div></div></div>')}]),e.exports=a},function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(2),r=i(n),o=a(17),l=i(o),s=a(22),c=i(s),u=a(23),d=i(u),p=a(26),f=i(p),m=a(27),v=i(m),g=a(31),h=i(g),b=a(34),x=i(b),y=a(37),w=i(y),_=a(40),C=i(_),k=a(43),$=i(k);t["default"]=r["default"].module("app.controllers",[]).controller("ApplicationController",l["default"]).controller("AuthenticationController",c["default"]).controller("HomeController",d["default"]).controller("LoginController",f["default"]).controller("MyProfileController",v["default"]).controller("TeamController",h["default"]).controller("ChallengeController",x["default"]).controller("ExerciseController",w["default"]).controller("AboutController",C["default"]).controller("RegisterController",$["default"]).name,e.exports=t["default"]},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),a(18),t["default"]=function(){"ngInject"},e.exports=t["default"]},[87,19,19,19],function(e,t,a){t=e.exports=a(20)(),t.push([e.id,"",""])},,,function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=["$state","Authentication",function(e,t){"ngInject";t.loggedIn||e.go("app.login")}],e.exports=t["default"]},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),a(24),t["default"]=["$scope","$http","Teams",function(e,t,a){"ngInject"}],e.exports=t["default"]},[87,25,25,25],function(e,t,a){t=e.exports=a(20)(),t.push([e.id,"#home{background-image:URL('/img/banner.jpg');background-size:cover;min-height:626px;color:#fff;text-align:center}#home .jumbotron{background-color:rgba(0,0,0,.4);height:50%}#home h1{color:#fff;width:50%}",""])},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=["$scope","$state","Authentication",function(e,t,a){"ngInject";e.login=function(){a.logIn(),t.go("app.my.profile")},e.isLoggedIn=function(){return a.loggedIn}}],e.exports=t["default"]},function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),a(28);var n=a(30),r=i(n);t["default"]=["$scope","$state","Authentication",function(e,t,a){"ngInject";e.ngImg=r["default"],e.logout=function(){a.logOut(),t.go("app.home")}}],e.exports=t["default"]},[87,29,29,29],function(e,t,a){t=e.exports=a(20)(),t.push([e.id,"#my-profile .btn{margin-bottom:10px}",""])},function(e,t,a){e.exports=a.p+"assets/a47e8e32b39fd933eef45b7f5503bfc9angular.png"},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),a(32),t["default"]=["$scope","$stateParams","Teams","$rootScope",function(e,t,a,i){"ngInject";e.toggleModal=function(){$("#createteammodal").modal("show")},e.team_id=-1,e.avatar="/img/team_avatars/default-avatar.png",e.players=[],e.players_dropdown=!1,e.team_selected=!1,""!=t.id&&(e.team_id=t.id,e.team_selected=!0,a.getTeamById(e.team_id).then(function(t){e.thisTeam=t.data,console.log(t.data),e.avatar=t.data.avatar,e.players=t.data.players}))}],e.exports=t["default"]},[87,33,33,33],function(e,t,a){t=e.exports=a(20)(),t.push([e.id,"#team .topSection{height:200px}#team .topSection img{width:130px;height:130px;float:left;margin-top:20px}#team .topSection .players_dropdown_btn{display:block}#team .topSection .players_dropdown{width:75pt}#team .topSection .players_dropdown .list-group-item{display:block;padding:3px 5px;margin:-1px}",""])},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),a(35),t["default"]=["$scope","$stateParams","Challenges",function(e,t,a){"ngInject";e.challenge_selected=!1}],e.exports=t["default"]},[87,36,36,36],function(e,t,a){t=e.exports=a(20)(),t.push([e.id,"#challenge .topSection{height:200px}#challenge .topSection img{width:130px;height:130px;float:left;margin-top:20px}",""])},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),a(38),t["default"]=["$scope","$stateParams","Challenges",function(e,t,a){"ngInject";e.exercise_selected=!1}],e.exports=t["default"]},[87,39,39,39],function(e,t,a){t=e.exports=a(20)(),t.push([e.id,"#exercise .topSection{height:200px}#exercise .topSection img{width:130px;height:130px;float:left;margin-top:20px}",""])},[88,41],[87,42,42,42],function(e,t,a){t=e.exports=a(20)(),t.push([e.id,"#about .topSection{height:200px;background-color:#d3d3d3}#about img{width:40%;height:auto}#about .topSection h1{display:inline-block}",""])},[88,44],[87,45,45,45],function(e,t,a){t=e.exports=a(20)(),t.push([e.id,"#register .topSection{height:200px;background-color:#d3d3d3}#register .topSection img{display:inline-block;width:140px;height:140px;margin-left:20px;margin-top:20px;margin-right:20px}#register .topSection h1{display:inline-block}",""])},function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(2),r=i(n),o=a(47),l=i(o),s=a(51),c=i(s),u=a(55),d=i(u),p=a(59),f=i(p),m=a(63),v=i(m),g=a(67),h=i(g);t["default"]=r["default"].module("app.directives",[]).directive("seedSidebar",["Teams",l["default"]]).directive("createTeamModal",["Teams",c["default"]]).directive("challengesSidebar",["Challenges",d["default"]]).directive("exercisesSidebar",["Exercises",f["default"]]).directive("seedNavbar",v["default"]).directive("seedLogbutton",h["default"]).name,e.exports=t["default"]},function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),a(48);var n=a(50),r=i(n);t["default"]=function(e){return{restrict:"E",replace:!0,link:function(t,a,i){t.teams=e.getTeams(),console.log(t.teams),t.teams||e.getTeamsForUser(1).then(function(e){console.log(e.data),t.teams=e.data})},templateUrl:r["default"]}},e.exports=t["default"]},[87,49,49,49],function(e,t,a){t=e.exports=a(20)(),t.push([e.id,"@media (min-width:768px){.col-sm-3{width:20%!important}.teams-sidebar{position:fixed;left:0;height:100%;min-width:250px}.teams-sidebar .navbar .navbar-collapse{padding:0;max-height:none}.teams-sidebar h3{padding-left:10px;padding-right:10px}.navbar{height:100%;border-radius:0}}",""])},function(e,t){var a="directives/teams_sidebar/template.html";window.angular.module("ng").run(["$templateCache",function(e){e.put(a,'<div class=teams-sidebar><div class="navbar navbar-default" role=navigation><div><h3>Your Teams <a ng-click=toggleModal()><i class="fa fa-plus-circle fa-lg fa-pull-right"></i></a></h3><div class="nav list-group"><div ng-repeat="team in teams"><a class=list-group-item ui-sref-active=active ui-sref=app.team({id:{{team.team_id}}})>{{team.team_name}}</a></div></div></div></div></div>')}]),e.exports=a},function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),a(52);var n=a(54),r=i(n);t["default"]=function(e){return{restrict:"E",replace:!0,scope:!0,link:function(e,t,a){e.title=a.title},templateUrl:r["default"]}},e.exports=t["default"]},[87,53,53,53],49,function(e,t){var a="directives/create_team_modal/template.html";window.angular.module("ng").run(["$templateCache",function(e){e.put(a,'<div class="modal fade"><div class=modal-dialog><div class=modal-content><div class=modal-header><button type=button class=close data-dismiss=modal aria-hidden=true>&times;</button><h4 class=modal-title>{{ title }}</h4></div><div class=modal-body><form role=form><div class=form-group><label for=team_name>Team Name</label><input class=form-control placeholder="Team Name" required></div><div class=form-group><label for=players>Add Players</label><div class=input-group><input class=form-control placeholder="Search username..."> <span class=input-group-btn><button class="btn btn-primary" type=button>Add</button></span></div></div><button type=submit class="btn btn-success">Create</button></form></div></div></div></div>')}]),e.exports=a},function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),a(56);var n=a(58),r=i(n);t["default"]=function(e){return{restrict:"E",replace:!0,link:function(e,t,a){},templateUrl:r["default"]}},e.exports=t["default"]},[87,57,57,57],function(e,t,a){t=e.exports=a(20)(),t.push([e.id,"@media (min-width:768px){.col-sm-3{width:20%!important}.challenges-sidebar{position:fixed;left:0;height:100%;min-width:250px}.challenges-sidebar .navbar .navbar-collapse{padding:0;max-height:none}.challenges-sidebar h3{padding-left:10px;padding-right:10px}.navbar{height:100%;border-radius:0}}",""])},function(e,t){var a="directives/challenges_sidebar/template.html";window.angular.module("ng").run(["$templateCache",function(e){e.put(a,'<div class=challenges-sidebar><div class="navbar navbar-default" role=navigation><div><h3>Your Challenges <a ui-sref-active=active ui-sref=app.challenge><i class="fa fa-plus-circle fa-lg fa-pull-right"></i></a></h3><div class="nav list-group"><div ng-repeat="challenge in challenges"><a class=list-group-item ui-sref-active=active ui-sref=app.challenge({id:{{challenge.challenge_id}}})>{{challenge.challenge_name}}</a></div></div></div></div></div>')}]),e.exports=a},function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),a(60);var n=a(62),r=i(n);t["default"]=function(e){return{restrict:"E",replace:!0,link:function(e,t,a){},templateUrl:r["default"]}},e.exports=t["default"]},[87,61,61,61],function(e,t,a){t=e.exports=a(20)(),t.push([e.id,"@media (min-width:768px){.col-sm-3{width:20%!important}.exercises-sidebar{position:fixed;left:0;height:100%;min-width:250px}.exercises-sidebar .navbar .navbar-collapse{padding:0;max-height:none}.exercises-sidebar h3{padding-left:10px;padding-right:10px}.navbar{height:100%;border-radius:0}}",""])},function(e,t){var a="directives/exercises_sidebar/template.html";window.angular.module("ng").run(["$templateCache",function(e){e.put(a,'<div class=exercises-sidebar><div class="navbar navbar-default" role=navigation><div><h3>Exercise Log</h3><div class="nav list-group"><div ng-repeat="exercise in log"><a class=list-group-item ui-sref-active=active ui-sref=app.exercise({id:{{exercise.exercise_id}}})>{{exercise.exercise_name}}</a></div></div></div></div></div>')}]),e.exports=a},function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),a(64);var n=a(66),r=i(n);t["default"]=function(){return{restrict:"E",templateUrl:r["default"]}},e.exports=t["default"]},[87,65,65,65],function(e,t,a){t=e.exports=a(20)(),t.push([e.id,"@media (min-width:768px){.navbar{margin-bottom:0!important;border-radius:0!important}.navbar-brand{padding:0 15px}.navbar-brand>img{height:100%}}",""])},function(e,t){var a="directives/navbar/template.html";window.angular.module("ng").run(["$templateCache",function(e){e.put(a,'<nav class="navbar navbar-default" role=navigation bs-navbar><div class=container><div class=navbar-header><a class=navbar-brand ui-sref=app.home><img src="/img/application/logo-name.png"></a></div><div class="navbar-collapse collapse"><ul class="nav navbar-nav"><li ui-sref-active=active><a ui-sref=app.home>Home</a></li><li ui-sref-active=active><a ui-sref=app.team>Teams</a></li><li ui-sref-active=active><a ui-sref=app.challenge>Challenges</a></li><li ui-sref-active=active><a ui-sref=app.exercise>Exercises</a></li></ul><ul class="nav navbar-nav navbar-right"><li ui-sref-active=active><a ui-sref=app.register>Register</a></li><li ui-sref-active=active><a ui-sref=app.my.profile>My Profile</a></li><li ui-sref-active=active><a ui-sref=app.about>About</a></li></ul></div></div></nav>')}]),e.exports=a},function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),a(68);var n=a(70),r=i(n);t["default"]=function(){return{restrict:"E",replace:!0,templateUrl:r["default"]}},e.exports=t["default"]},[87,69,69,69],19,function(e,t){var a="directives/logbutton/template.html";window.angular.module("ng").run(["$templateCache",function(e){e.put(a,'<button type=button class="btn btn-success btn-block"><h3>Log Workout</h3></button>')}]),e.exports=a},function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(2),r=i(n),o=a(72),l=i(o),s=a(73),c=i(s),u=a(74),d=i(u),p=a(75),f=i(p);t["default"]=r["default"].module("app.services",[]).service("Authentication",l["default"]).service("Teams",["$http",c["default"]]).service("Challenges",["$http",d["default"]]).service("Exercises",["$http",f["default"]]).name,e.exports=t["default"]},function(e,t){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),n=function(){function e(){a(this,e),this.loggedIn=!1}return i(e,[{key:"logIn",value:function(){this.loggedIn=!0}},{key:"logOut",value:function(){this.loggedIn=!1}}]),e}();t["default"]=n,e.exports=t["default"]},function(e,t){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),n=function(){function e(t){a(this,e),this.$http=t;var i=this;i.teams=[]}return i(e,[{key:"getTeamById",value:function(e){return this.$http({method:"GET",url:"http://private-c84bfb-compfit.apiary-mock.com/team/"+e}).then(function(e){return e},function(e){return e})}},{key:"getTeamsForUser",value:function(e){return this.$http({method:"GET",url:"http://private-c84bfb-compfit.apiary-mock.com/teams/"+e}).then(function(e){return self.teams=e.data,e},function(e){return e})}},{key:"getTeams",value:function(){return self.teams}}]),e}();t["default"]=n,e.exports=t["default"]},function(e,t){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),n=function(){function e(t){a(this,e),this.$http=t;var i=this;i.challenges=[]}return i(e,[{key:"getChallengeById",value:function(e){return this.$http({method:"GET",url:"http://private-c84bfb-compfit.apiary-mock.com/team/"+team_id}).then(function(e){return e},function(e){return e})}},{key:"getChallengesForUser",value:function(e){return this.$http({method:"GET",url:"http://private-c84bfb-compfit.apiary-mock.com/teams/"+e}).then(function(e){return self.challenges=e.data,e},function(e){return e})}},{key:"getChallenges",value:function(){return self.challenges}}]),e}();t["default"]=n,e.exports=t["default"]},function(e,t){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),n=function(){function e(t){a(this,e),this.$http=t;var i=this;i.exercises=[]}return i(e,[{key:"getExerciseById",value:function(e){return this.$http({method:"GET",url:"http://private-c84bfb-compfit.apiary-mock.com/team/"+team_id}).then(function(e){return e},function(e){return e})}},{key:"getExercisesForUser",value:function(e){return this.$http({method:"GET",url:"http://private-c84bfb-compfit.apiary-mock.com/teams/"+e}).then(function(e){return self.exercises=e.data,e},function(e){return e})}},{key:"getExercises",value:function(){return self.exercise}}]),e}();t["default"]=n,e.exports=t["default"]},function(e,t,a){var i=a(77);"string"==typeof i&&(i=[[e.id,i,""]]);var n=a(21)(i,{});i.locals&&(e.exports=i.locals),i.locals||e.hot.accept(77,function(){var t=a(77);"string"==typeof t&&(t=[[e.id,t,""]]),n(t)}),e.hot.dispose(function(){n()})},function(e,t,a){t=e.exports=a(20)(),t.push([e.id,"html{position:relative;min-height:100%}.topSection{height:200px;background-color:#d3d3d3}.topSection img{width:140px;height:140px;margin-left:20px;margin-top:20px;margin-right:20px}.topSection h1,.topSection img{display:inline-block}",""])},,,,,,,,,,function(e,t,a,i,n,r){var o=a(i);"string"==typeof o&&(o=[[e.id,o,""]]);var l=a(21)(o,{});o.locals&&(e.exports=o.locals),o.locals||e.hot.accept(n,function(){var t=a(r);"string"==typeof t&&(t=[[e.id,t,""]]),l(t)}),e.hot.dispose(function(){l()})},function(e,t,a,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),a(i),t["default"]=["$scope","$stateParams","Teams",function(e,t,a){"ngInject";e.team_id=t.id,e.avatar="/img/team_avatars/default-avatar.png",a.getTeamById(e.team_id).then(function(t){e.thisTeam=t.data,console.log(t.data),e.avatar=t.data.avatar})}],e.exports=t["default"]}]);