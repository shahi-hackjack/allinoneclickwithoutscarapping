 var app = angular.module('calculator', []);
    app.controller('calc',function ($scope,$http) {
        /*$scope.high = 123;
        $scope.open = 100;
        $scope.low=76;
        $scope.close=88;
*/
            console.log("GET DONE");
  $scope.upper=function () {
                    $scope.s.name=$scope.s.name.toUpperCase();

                }

        $scope.calculate=function () {

               console.log($scope.s);
 
            $http.post('/getdata',$scope.s).success(function (res) {
                console.log("i recievd d data");

               console.log(res);
                //console.log($scope.s.name);
                console.log(res.name);

    
                    $scope.s.open=parseFloat(res.open.replace(",", ""));
                    $scope.s.high =parseFloat(res.high.replace(",", ""));
                    $scope.s.low = parseFloat(res.low.replace(",", ""));
                    $scope.s.close = parseFloat(res.close.replace(",", ""));
                   $scope.s.hl=$scope.s.high-$scope.s.low;



html2canvas($(".container"), {
        onrendered: function (canvas) {
       var IMG=canvas.toDataURL();
           // document.body.appendChild(canvas);
        var a  = document.createElement('a');
    a.href = IMG;
    a.download = $scope.s.name+'.png';

    a.click();


        },
        width:1300,
        height:400
    });



                 
             }).error(function(){
   	$scope.s="";
   	console.log("STOCK NAME DIDNT MATCH");
   });

        };
       
    });
