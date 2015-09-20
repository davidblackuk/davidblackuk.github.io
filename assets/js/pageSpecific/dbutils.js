
// Some javascript utilities to make page creation easier


var DBUtils;

(function (DBUtils) {

    // Class
    var LightBoxSupport = (function () {

        function LightBoxSupport(targets) {
            this.targets = targets;
        }
        
        // Instance member
        LightBoxSupport.prototype.initialize = function () {
            this.targets.each(function(){
            	$(this).height(100);
            	// WHY SO STUPID
            	$(this).css("background-color", "red");
            })
        };

        LightBoxSupport.origin = new Point(0, 0);
        return LightBoxSupport;
    })();
    DBUtils.LightBoxSupport = LightBoxSupport;


})(DBUtils || (DBUtils = {}));


$(function(){
	DBUtils.lightBoxInstance = new DBUtils.LightBoxSupport($("#lightBox"));
	DBUtils.lightBoxInstance.initialize();
})