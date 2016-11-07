(function () {
    angular
        .module("utility",[])
        .directive("sortable",sortable);
    
    function sortable() {
        function linker(scope, element, attributes) {
            var start =-1;
            var end  = -1;
            element.sortable({
                start:function (event,ui) {
                    start = $(ui.item).index();
                },
                stop: function (event, ui) {
                    end = $(ui.item).index();
                    var elem = element.context.baseURI.split("/");
                    var pid;
                    for(w in elem){
                        if(elem[w]=="page"){
                            pid = elem[Number.parseInt(w)+1];
                        }
                    }
                    console.log([start,end]);
                    scope.sortController.sort(start,end,pid);
                }
            });
        }

        return {
            scope:{},
            link:linker,
            controller : sortController,
            controllerAs : 'sortController'
        }
        function sortController(WidgetService) {
            var vm = this;
            vm.sort = sort;
            function sort(start,end,pid) {console.log([start,end]);
                WidgetService.sort(start,end,pid);
            }
        }
    }
})();