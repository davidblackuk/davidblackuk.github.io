
// Some javascript utilities to make page creation easier


var DBUtils;

(function (DBUtils) {

    // Class
    var LightBoxSupport = (function () {

        function LightBoxSupport(targets) {
            this.targets = targets;
        }
        
/*
<a class="fancybox" href="../../images/2015-09-18/speccy.jpg" data-fancybox-group="gallery" title="Lorem ipsum dolor sit amet"><img src="../../images/2015-09-18/speccy.jpg" alt="" />
</a>
*/

        // Instance member
        LightBoxSupport.prototype.initialize = function () {
            this.targets.each(function(index, element){
                var target = $(this);
                var loc = "../../images/"+target.attr("data-src");
                var a = $("<a/>").appendTo(target)
                a.attr('href', loc)
                var img = $("<img/>").appendTo(a);
                img.attr("src", loc);   
                img.attr('class', target.attr('class'));
                a.attr('title', target.attr('title'));
                a.fancybox();     	
            })
        };
        return LightBoxSupport;
    })();
    DBUtils.LightBoxSupport = LightBoxSupport;


})(DBUtils || (DBUtils = {}));


$(function(){

	DBUtils.lightBoxInstance = new DBUtils.LightBoxSupport($(".dbImg"));
	DBUtils.lightBoxInstance.initialize();
})