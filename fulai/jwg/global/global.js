define(function(require, exports, module) {

    "use strict";

    var $ = require('jquery');

    var Global = exports;

    Global.initHead = function() {
        $(window).scroll(function() {
            var win_top = $(document).scrollTop();
            if (win_top >= 100) {
                $("body").find(".topnav").fadeIn(500)
            } else {

                $("body").find(".topnav").fadeOut()
            }
        })


    };
    Global.float_nav = function() {
        var Dom = '<div id="float_service" style="position: fixed; right: -242px; top: 135px;">' + '<div class="float_start">' + '&lt;<br>服<br>务<br>在<br>线' + '</div>' + '<div class="float_contact">' + '<ul class="float_contact-ul">' + '<li class="tel-pic"></li>' + '<li class="server-q">' + '<a target="_blank" id="service_qq1" href="javascript:void(0)">' + '<em></em>' + '<span class="server">在线客服</span>' + '</a>' + ' </li>' + '<li class="wx-pic"></li>' + '</ul>' + '</div>' + '</div>';

        if (!$("body").find('#float_service').length > 0) {
            $("body").append(Dom)
        }
        /*-------------内容切换-----------------*/
        $("#float_service").stop().animate({
            "right": "-212px"
        }, 350)
        $("body").on("mouseenter", '#float_service', function() {
            var me = $(this);
            if (me.hasClass("float_show")) {

                $("#float_service").stop().animate({
                    "right": "-212px"
                }, 350)
                me.removeClass("float_show");
                return false
            } else {
                me.addClass("float_show");
                $("#float_service").stop().animate({
                    "right": "0"
                }, 350)
            }
        })
        $("body").on("mouseleave", '#float_service', function() {
            var me = $(this);
            $("#float_service").stop().animate({
                "right": "-212px"
            }, 350)
            me.removeClass("float_show");
            return false
        })

    }

})