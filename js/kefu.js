var popupHtml = "<div id='popup' class='IE6PNG'><div class='popupFrame'><div class='popupBox'><a class='popupClose IE6PNG'></a><div class='popupContent'></div></div></div></div>";
var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko') && userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
var is_safari = (userAgent.indexOf('webkit') != -1 || userAgent.indexOf('safari') != -1);

var Common = new Object();
Common.htmlEncode = function(str)
{
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

Common.trim = function(str)
{
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

Common.strlen = function(str) {
    if (is_moz)
    {
        Charset = document.characterSet;
    }
    else
    {
        Charset = document.charset;
    }
    if (Charset.toLowerCase() == 'utf-8')
    {
        return str.replace(/[\u4e00-\u9fa5]/g, "***").length;
    }
    else
    {
        return str.replace(/[^\x00-\xff]/g, "**").length;
    }
}

Common.init = function() {
    $(function() {
        $("#getphonecode").on("click", function() {
            var url = '/account/getPhocode';
            var phone = '';
            $.post(url, {mobile: phone}, function(data) {
                if (data.result) {
                    Almessage(data.result, data.message);
                    //warning(data.message);
                    getnextCode();

                }
            }, 'json');
        });
        $("#mobilecode").on("blur", function() {
            var code = $('#mobilecode').val();
            if (code.length == 6) {
                var url = '/account/checkmobileCode'
                $.post(url, {code: code}, function(data) {
                    $('#codemessage').html(data.result);
                }, 'json');
            }
        });

        $('.menu').find('li').removeClass('on');
        var navsele = $('#navselect').val();
        $('#nav_' + navsele).addClass('on');
        //changer
        $(".tab ul li:first-child").addClass("on");
        $(".box .BoxContent:first-child").addClass("on");
        $(".tab ul li").hover(function() {
            $(this).addClass("on").siblings().removeClass("on");
            var $box = $(this).closest(".tab").siblings(".box").find(".BoxContent");
            var index = $(this).index();
            $box.eq(index).show().siblings().hide();
        });
    });

//changer
    $(".tab ul li:first-child").addClass("on");
    $(".box .BoxContent:first-child").addClass("on");
    $(".tab ul li").hover(function() {
        $(this).addClass("on").siblings().removeClass("on");
        var $box = $(this).closest(".tab").siblings(".box").find(".BoxContent");
        var index = $(this).index();
        $box.eq(index).show().siblings().hide();
    });

    $(".suspend").mouseover(function() {
        $(this).stop();
        $(this).animate({width: 160}, 400);
    })
    $(".suspend").mouseout(function() {
        $(this).stop();
        $(this).animate({width: 40}, 400);
    })


//headerAccount
    $(".headerAccount").mouseenter(function() {
        $(this).find(".headerAccountGuide").show();
    });
    $(".headerAccount").mouseleave(function() {
        $(this).find(".headerAccountGuide").hide();
    });

    topbar("#topbar");
    $(window).resize(function() {
        topbar("#topbar");
    });

//bankChoice
    $(".bankChoice dd:lt(3)").show();
    $(".bankChoice .bankChoiceMore").click(function() {
        $(".bankChoice").css("height", "auto");
        $(".bankChoice dd").show();
    });
    var chosebank = $("#chosebank").attr("value");
    $("#" + chosebank).siblings("span").css("border", "1px solid #e15b54");
    $("#" + chosebank).attr("checked", true).parent("dd").prependTo(".bankChoice");
    ;
    $(".bankChoice dd input[type=radio]").click(function() {
        $(this).parent("dd").prependTo(".bankChoice");
        $("#chosebank").val($(this).attr('id'));
        var span = $(this).siblings("span");
        span.css("border", "1px solid #e15b54").parent("dd").siblings("dd").find("span").css("border", "1px solid #cccccc")
        $(".bankChoice").css("height", "45px");
        $(".bankChoice dd:gt(2)").hide();
    });

//details
    centered(".detailsTable");
    $(window).resize(function() {
        centered(".detailsTable");
    });
    $(".details").click(function() {
        $(".detailsTable").show(200);
    });
    $(".closeDetailsTable").click(function() {
        $(".detailsTable").hide(200);
    });
}

//Slider
$(function() {
    var SliderPhoto = $(".Slider .SliderBox ul li").height();
    var len = $(".Slider .SliderBox ul li").length;
    var index = 0;
    var picTimer;
    $(".SliderFocus span").mouseenter(function() {
        index = $(".SliderFocus span").index(this);
        showPics(index);
    }).eq(0).trigger("mouseenter");
    $(".Slider .prev").click(function() {
        index -= 1;
        if (index == -1) {
            index = len - 1;
        }
        showPics(index);
    });
    $(".Slider .next").click(function() {
        index += 1;
        if (index == len) {
            index = 0;
        }
        showPics(index);
    });
    $(".Slider .SliderBox ul").css("height", SliderPhoto * (len));
    $(".Slider").hover(function() {
        clearInterval(picTimer);
    }, function() {
        picTimer = setInterval(function() {
            showPics(index);
            index++;
            if (index == len) {
                index = 0;
            }
        }, 2800);
    }).trigger("mouseleave");
    function showPics(index) {
        var nowTop = -index * SliderPhoto;
        $(".Slider .SliderBox ul").stop(true, false).animate({"top": nowTop}, 500);
        $(".SliderFocus span").stop(true, false).removeClass("on").eq(index).stop(true, false).addClass("on");
    }
});

$(function(){
    Common.init();
})