/**
 * Droppics
 *
 * We developed this code with our hearts and passion.
 * We hope you found it useful, easy to understand and to customize.
 * Otherwise, please feel free to contact us at contact@joomunited.com *
 * @package Droppics
 * @copyright Copyright (C) 2013 JoomUnited (http://www.joomunited.com). All rights reserved.
 * @copyright Copyright (C) 2013 Damien Barrère (http://www.crac-design.com). All rights reserved.
 * @license GNU General Public License version 2 or later; http://www.gnu.org/licenses/gpl-2.0.html
 */
var droppicsSliders = {};
var droppicsSriptBxsliderLoaded;
var pathname = window.location.pathname;
(function($){
    $(document).ready(function(){

        if(typeof(bxslider_cat_id_click)==='undefined') {
            bxslider_cat_id_click = "";
        }
        if(typeof(hash_category_id)==='undefined') {
            hash_category_id = "";
        }
        if(typeof(initGallery)==='undefined') {
            initGallery = false;
        }
        if(!initGallery && hash_category_id != bxslider_cat_id_click) {
            $('.droppicsgallery').each(function (index) {
                listchid = $(this).data('listchid').split(",");
                if ($.inArray(hash_category_id.toString(), listchid) > -1 ) {
                    $(this).empty();
                    that_bxslider = this;
                    initGallery = true;
                    $.ajax({
                        type: "GET",
                        dataType: "html",
                        url: "index.php?option=com_droppics&view=frontgallery&&id_gallery=" + hash_category_id
                    }).done(function (data) {
                        unloadStyleId('droppicsgalleryStyle' + $(that_bxslider).data('id'));
                        unloadHeadFiles();
                        $(window).scrollTop($(that_bxslider).offset().top);
                        $(that_bxslider).replaceWith(data);
                    });
                    return;
                }
            })
        }

        droppicsSriptBxsliderLoaded=setInterval(function(){
            if(typeof(window.droppicsHeadLoaded)==='undefined' ||
                (typeof(window.droppicsHeadLoaded)==='boolean' && window.droppicsHeadLoaded===true)){
                $('.droppicsgallerybxslider').each(function(){

                    options = new Array();
                    that = $(this);
                    if( $(this).find('.videoWrapper').length > 0 ) {
                        options['video'] = true;
                        options['useCSS'] = false;
                    }

                    options['controls'] = true;
                    if(parseInt(that.data('shownav'))!==1){
                        options['controls'] = false;
                    }
                    options['autoControls'] = false;
                    if(parseInt(that.data('onhover'))){
                        options['autoHover'] = true;
                    }
                    options['adaptiveHeight'] = true;
                    if(parseInt(that.data('adaptive'))!==1){
                        options['adaptiveHeight'] = false;
                    }

                    options['mode']='horizontal';
                    if(parseInt(that.data('mode'))===1){
                        options['mode']='vertical';
                    }else if(parseInt(that.data('mode'))===2){
                        options['mode']='fade';
                    }

                    options['pause'] = 4000;
                    if(parseInt(that.data('pause'))!==0){
                        options['pause'] = parseInt(that.data('pause'));
                    }
                    if(parseInt(that.data('showbotnav'))==0){
                        options['pager'] = false;
                    }else if(parseInt(that.data('showbotnav'))==2){
                        options['pagerCustom'] = '#'+$(this).attr('id')+' #bx-pager';
                    }

                    options['onSliderLoad'] =  function () {

                        $("#"+$(that).attr('id')+" .bx-controls-direction a").click(function(){
                            var sliderId = $(this).parents('.droppicsgallerybxslider').data('id') ;
                            droppicsSlider = droppicsSliders[sliderId];
                            current = $(this).data("slide-index");
                            current = droppicsSlider.getCurrentSlide();
                            if($('.droppicsgallerybxslider .wimg').find(".videoWrapper").length >0) { //is video
                                $('.droppicsgallerybxslider .wimg[data-index!='+current+'] .videoWrapper iframe').each(function(){
                                    $(this).attr('src', $(this).attr('src') );
                                })
                            }else {
                                droppicsSlider.goToSlide(current);
                                droppicsSlider.stopAuto();
                                restart=setTimeout(function(){
                                    droppicsSlider.startAuto();
                                },500);

                                return false;
                            }
                        }) ;
                        $("#"+$(that).attr('id')+" #bx-pager a").click(function(){
                            var sliderId = $(this).parents('.droppicsgallerybxslider').data('id') ;
                            var droppicsSlider = droppicsSliders[sliderId];
                            current = $(this).data("slide-index");
                            if($('.droppicsgallerybxslider .wimg').find(".videoWrapper").length >0) { //is video
                                $('.droppicsgallerybxslider .wimg[data-index!='+current+'] .videoWrapper iframe').each(function(){
                                    $(this).attr('src', $(this).attr('src') );
                                })
                            } else {
                                droppicsSlider.goToSlide(current);
                                droppicsSlider.stopAuto();
                                restart=setTimeout(function(){
                                    droppicsSlider.startAuto();
                                },500);

                                return false;
                            }
                        });
                    };
                    if(parseInt(that.data('autostart'))!==1){
                        options['autoStart'] = false;
                        options['auto'] = false;
                        options['onSliderLoad'] = function () {
                        };
                    }
                    if(parseInt(that.data('autostart')) ==1){
                        options['autoStart'] = true;
                        options['auto'] = true;
                    }

                    droppicsSliders[that.data('id')] = that.find('.bxSlider').bxSlider(options);

                });
                clearInterval(droppicsSriptBxsliderLoaded);
            }
        },100);

        if(bxslider_cat_id_click){
            prependTo_gallery = '#droppicsgallery'+bxslider_cat_id_click ;
        }else {
            prependTo_gallery = '.droppicsgallerybxslider';
        }
        $(''+prependTo_gallery+' .droppicscats .wcat').each(function () {
            if (typeof($(this).find('.droppicscatslink').data('catimage')) !== 'undefined' && $(this).find('.droppicscatslink').data('catimage') == '1') {
                return;
            }
            $(this).find('.droppicscatslink').css('margin-left', ($(this).width() - ($(this).find('.droppicscatslink img').width() + parseInt($(this).find('.droppicscatslink img').css('margin-left')) + parseInt($(this).find('.droppicscatslink img').css('margin-right')))) / 2);
            elem = $(this).find('.droppicscatslink').clone();
            ;
            elem.find('span').remove();
            elem.css({
                'position': 'absolute',
                'top': $(this).find('.droppicscatslink').position().top,
                'left': $(this).find('.droppicscatslink').position().left
            });
            if ($(this).parent().hasClass('show')) {
                rot = Math.floor((Math.random() * 10) + 1);
                elem.css({
                    '-webkit-transform': 'rotate(' + rot + 'deg)',
                    '-moz-transform': 'rotate(' + rot + 'deg)',
                    '-ms-transform': 'rotate(' + rot + 'deg)',
                    'transform': 'rotate(' + rot + 'deg)'
                })
                    .prependTo($(this));
                rot = Math.floor((Math.random() * 10) + 1);
                elem.clone().css({
                    '-webkit-transform': 'rotate(-' + rot + 'deg)',
                    '-moz-transform': 'rotate(-' + rot + 'deg)',
                    '-ms-transform': 'rotate(-' + rot + 'deg)',
                    'transform': 'rotate(-' + rot + 'deg)'
                })
                    .prependTo($(this));
            }
        });

        $(".droppicsgallerybxslider .droppicscatslink").unbind('click').click(function(e) {
            e.preventDefault();
            that = this;
            categorytitle = $(that).data('categorytitle').toString().replace(/ /g, '-');
            var  urlnewparam = addParameter(categorytitle,$(that).data('id'));
            $.ajax({
                type: "GET",
                dataType: "html",
                url: "index.php?option=com_droppics&view=frontgallery&&id_gallery=" + $(that).data('id'),
            }).done(function (data) {
                unloadStyleId('droppicsgalleryStyle' + $(that).closest('.droppicsgallerybxslider').data('id'));
                unloadHeadFiles();
                $(window).scrollTop($(that).closest('.droppicsgallery').offset().top);
                $(that).closest('.droppicsgallery').replaceWith(data);
                window.history.pushState('', document.title,urlnewparam);
            });
        });

    });
})(jQuery);
