"use strict";var mesureWidth=function(e){var t=$(window).width(),n=e.closest(".main-menu").find(".main-menu__item"),a=e.width()*n.length,o=window.matchMedia("(max-width: 768px)").matches,i=window.matchMedia("(max-width: 480px)").matches,n=0,e=e.find(".main-menu__text");return{container:n=o&&!i?t-a:i?t:524,textBlock:n-parseInt(e.css("padding-left"))-parseInt(e.css("padding-right"))}},releaseItem=function(e){var t=e.find(".main-menu__content"),n=mesureWidth(e),a=mesureWidth(e),o=e.find(".main-menu__text");t.width(n.container),e.addClass("main-menu__item--active"),o.width(a.textBlock)},closeEveryItems=function(e){var t=e.find(".main-menu__item"),e=e.find(".main-menu__content");t.removeClass("main-menu__item--active"),e.removeClass("active"),e.width(0)};$(".main-menu__title").on("click",function(e){e.preventDefault();var t=$(e.currentTarget),e=t.closest(".main-menu__item"),t=t.closest(".main-menu");e.hasClass("main-menu__item--active")?closeEveryItems(t):(closeEveryItems(t),releaseItem(e))});var openItem=function(e){var t=e.closest(".team-member"),n=t.find(".team-member__text-wrap"),e=n.find(".team-member__text").height();n.height(e),t.addClass("active")},closeAllMembers=function(e){e.find(".team-member__text-wrap").height(0)};$(".team-member__name").on("click",function(e){var t=$(e.currentTarget),e=(t.closest(".team-list"),t.closest(".team-member"));e.hasClass("active")?($(".team-member__text-wrap").height(0),e.removeClass("active")):($(".team-member__text-wrap").height(0),openItem(t))}),$(".form").on("submit",function(e){e.preventDefault();var t=$(e.currentTarget),n=t.find("[name= 'name']"),a=t.find("[name= 'phone']"),o=t.find("[name= 'comment']"),e=t.find("[name= 'to']"),i=$("#modal"),r=i.find(".modal__content");i.removeClass("error-modal"),[n,a,o,e].forEach(function(e){e.removeClass("input-error"),""===e.val().trim()&&e.addClass("input-error")}),0===t.find(".input-error").length&&$.ajax({url:"https://webdev-api.loftschool.com/sendmail",method:"post",data:{name:n.val(),phone:a.val(),comment:o.val(),to:e.val()},success:function(e){r.text(e.message);new Fancybox([{src:"#modal",type:"inline"}])},error:function(e){e=e.responseJSON.message;r.text(e),i.addClass("error-modal");new Fancybox([{src:"#modal",type:"inline"}])}})});var hamburger=document.querySelector(".hamburger"),hamburgerOpen=document.querySelector(".hamburger-icon"),hamburgerClose=document.querySelector(".hamburger-icon--close");function init(){var e=new ymaps.Map("map",{center:[55.751123,37.612779],zoom:15,controls:[]}),t=new ymaps.Placemark([55.751123,37.612779],{},{iconLayout:"default#image",iconImageHref:"../src/img/map-pin.png",iconImageSize:[58,73],iconImageOffset:[-3,-42]});e.geoObjects.add(t),e.behaviors.disable("scrollZoom")}hamburgerOpen.addEventListener("click",function(e){hamburger.style.display="block"}),hamburgerClose.addEventListener("click",function(e){hamburger.style.display="none"}),ymaps.ready(init),$(".app-submit-btn").on("click",function(e){e.preventDefault(),Fancybox.close()});var sections=$(".section"),display=$(".main-content"),inScroll=!1;sections.first().addClass("active");var sectionTransition=function(e){var t,n,a,o;!1===inScroll&&(inScroll=!0,t=-100*e,n=sections.eq(e).attr("data-sidemenu-theme"),a=$(".fixed-menu"),o=$(".fixed-menu__link"),"black"===n?a.addClass("fixed-menu--shadow"):a.removeClass("fixed-menu--shadow"),display.css({transform:"translateY(".concat(t,"%)")}),sections.eq(e).addClass("active").siblings().removeClass("active"),o.removeClass("fixed-menu__link--active"),a.find(".fixed-menu__link").eq(e).addClass("fixed-menu__link--active"),setTimeout(function(){inScroll=!1},1300))},nextOrPrev=function(e){var t=sections.filter(".active"),n=t.next(),t=t.prev();"next"===e&&n.length&&sectionTransition(n.index()),"prev"===e&&t.length&&sectionTransition(t.index())};$(window).on("wheel",function(e){e=e.originalEvent.deltaY;0<e&&nextOrPrev("next"),e<0&&nextOrPrev("prev")}),$(window).on("keydown",function(e){var t=e.originalEvent.keyCode,e=e.target.tagName.toLowerCase();if("input"!==e&&"textarea"!==e)switch(t){case 38:nextOrPrev("prev");break;case 40:nextOrPrev("next")}}),$("[data-scroll-to]").on("click",function(e){e.preventDefault();e=$(e.currentTarget).attr("data-scroll-to"),e=$("[data-section-id=".concat(e,"]"));sectionTransition(e.index())});var findSlideByTab=function(n){return $(".review").filter(function(e,t){return $(t).attr("data-linked-with")===n})};$(".reviews-menu__item").on("click",function(e){e.preventDefault();var t=$(e.currentTarget),e=$(e.currentTarget).attr("data-open"),e=findSlideByTab(e);t.addClass("reviews-menu__item--active").siblings("li").removeClass("reviews-menu__item--active"),e.addClass("review--active").siblings().removeClass("review--active")});var soundControl,intervalId,soundStatus,slider=$(".products").bxSlider({pager:!1,controls:!1});$(".arrow--left").on("click",function(e){e.preventDefault(),slider.goToPrevSlide()}),$(".arrow--right").on("click",function(e){e.preventDefault(),slider.goToNextSlide()});var durationControl,windowPlayBtn=document.querySelector(".player__button"),video=document.getElementById("player");(durationControl=document.getElementById("durationLevel")).min=0,durationControl.value=0,durationControl.max=video.duration,(soundControl=document.getElementById("soundLevel")).min=0,soundControl.max=10,soundControl.value=soundControl.max,durationControl.addEventListener("input",setVideoDuration);var soundBtn=document.getElementById("volume");soundBtn.addEventListener("click",soundOff),soundControl.addEventListener("input",changeSoundBar),video.addEventListener("click",playStop);for(var playButtons=document.querySelectorAll(".js-play"),i=0;i<playButtons.length;i++)playButtons[i].addEventListener("click",playStop);function playStop(){windowPlayBtn.classList.toggle("player__button--active"),video.paused?(video.play(),updateVideoDuration(),intervalId=setInterval(updateVideoDuration,1e3/60)):(video.pause(),clearInterval(intervalId))}function setVideoDuration(){video.currentTime=durationControl.value,updateVideoDuration()}function updateVideoDuration(){durationControl.value=video.currentTime;var e=video.duration/100,e=video.currentTime/e;durationControl.style.background="linear-gradient(90deg, #FEDB3F ".concat(e,"%, #626262 ").concat(e,"%)")}function soundOff(){0===video.volume?(video.volume=soundStatus,soundControl.value=10*soundStatus,soundBtn.classList.remove("active")):(soundStatus=video.volume,video.volume=0,soundControl.value=0,soundBtn.classList.add("active"))}function changeSoundBar(){video.volume=soundControl.value/10,0===video.volume?soundBtn.classList.add("active"):soundBtn.classList.remove("active"),console.log(video.volume),console.log(soundControl.value/10)}video.addEventListener("ended",function(){windowPlayBtn.classList.toggle("player__button--active"),video.currentTime=0});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZC1tZW51LWhvcml6LmpzIiwiYWNjb3JkLW1lbnUtdmVydGljYWwuanMiLCJmb3JtLXZhbGlkLmpzIiwiaGFtYnVyZ2VyLmpzIiwibWFwLmpzIiwibW9kYWwtZmFuY3lib3guanMiLCJvcHMuanMiLCJyZXZpZXdzLmpzIiwic2xpZGVyLmpzIiwidnBsYXllci5qcyJdLCJuYW1lcyI6WyJtZXN1cmVXaWR0aCIsIml0ZW0iLCJ3aW5kb3dXaWR0aCIsIiQiLCJ3aW5kb3ciLCJ3aWR0aCIsImxpc3RJdGVtcyIsImNsb3Nlc3QiLCJmaW5kIiwid2lkdGhPZkl0ZW1zIiwibGVuZ3RoIiwiaXNUYWJsZXQiLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsImlzTW9iaWxlIiwicmVxSXRlbVdpZHRoIiwidGV4dEJsb2NrIiwiY29udGFpbmVyIiwicGFyc2VJbnQiLCJjc3MiLCJyZWxlYXNlSXRlbSIsImhpZGRlbkNvbnRlbnQiLCJyZXFDb250ZW50V2lkdGgiLCJyZXFUZXh0QmxvY2tXaWR0aCIsImFkZENsYXNzIiwiY2xvc2VFdmVyeUl0ZW1zIiwiY29udGVudCIsInJlbW92ZUNsYXNzIiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCIkdGhpcyIsImN1cnJlbnRUYXJnZXQiLCJoYXNDbGFzcyIsIm9wZW5JdGVtIiwiY2xpY2tlZEl0ZW0iLCJibG9ja1RvT3BlbiIsInJlcUhlaWdodCIsImhlaWdodCIsImNsb3NlQWxsTWVtYmVycyIsImVsZW1Db250YWluZXIiLCJmb3JtIiwibmFtZSIsInBob25lIiwiY29tbWVudCIsInRvIiwibW9kYWwiLCJmb3JFYWNoIiwiZWxlbWVudCIsInZhbCIsInRyaW0iLCJhamF4IiwidXJsIiwibWV0aG9kIiwiZGF0YSIsInN1Y2Nlc3MiLCJ0ZXh0IiwibWVzc2FnZSIsIkZhbmN5Ym94Iiwic3JjIiwidHlwZSIsImVycm9yIiwicmVzcG9uc2VKU09OIiwiaGFtYnVyZ2VyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaGFtYnVyZ2VyT3BlbiIsImhhbWJ1cmdlckNsb3NlIiwiaW5pdCIsIm15TWFwIiwieW1hcHMiLCJNYXAiLCJjZW50ZXIiLCJ6b29tIiwiY29udHJvbHMiLCJteVBsYWNlbWFyayIsIlBsYWNlbWFyayIsImljb25MYXlvdXQiLCJpY29uSW1hZ2VIcmVmIiwiaWNvbkltYWdlU2l6ZSIsImljb25JbWFnZU9mZnNldCIsImdlb09iamVjdHMiLCJhZGQiLCJiZWhhdmlvcnMiLCJkaXNhYmxlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0eWxlIiwiZGlzcGxheSIsInJlYWR5IiwiY2xvc2UiLCJzZWN0aW9ucyIsImluU2Nyb2xsIiwiZmlyc3QiLCJzZWN0aW9uVHJhbnNpdGlvbiIsInNlY3Rpb25JbmRleCIsInBvc2l0aW9uIiwibWVudVRoZW1lIiwic2lkZU1lbnUiLCJmaXhlZE1lbnVMaW5rcyIsImVxIiwiYXR0ciIsInRyYW5zZm9ybSIsImNvbmNhdCIsInNpYmxpbmdzIiwic2V0VGltZW91dCIsIm5leHRPclByZXYiLCJkaXJlY3Rpb24iLCJhY3RpdmVTZWN0aW9uIiwiZmlsdGVyIiwibmV4dFNlY3Rpb24iLCJuZXh0IiwicHJldlNlY3Rpb24iLCJwcmV2IiwiaW5kZXgiLCJkZWx0YVkiLCJvcmlnaW5hbEV2ZW50Iiwia2V5Q29kZSIsImN1cnJlbnRUYWciLCJ0YXJnZXQiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJyZXFTZWN0aW9uIiwiZmluZFNsaWRlQnlUYWIiLCJ0YWIiLCJuZHgiLCJjdXJyZW50SXRlbSIsImN1cnJlbnRUYWIiLCJyZXF1aXJlZFNsaWRlIiwic291bmRDb250cm9sIiwiaW50ZXJ2YWxJZCIsInNvdW5kU3RhdHVzIiwic2xpZGVyIiwiYnhTbGlkZXIiLCJwYWdlciIsImdvVG9QcmV2U2xpZGUiLCJnb1RvTmV4dFNsaWRlIiwiZHVyYXRpb25Db250cm9sIiwid2luZG93UGxheUJ0biIsInZpZGVvIiwiZ2V0RWxlbWVudEJ5SWQiLCJtaW4iLCJ2YWx1ZSIsIm1heCIsImR1cmF0aW9uIiwic2V0VmlkZW9EdXJhdGlvbiIsInNvdW5kQnRuIiwic291bmRPZmYiLCJjaGFuZ2VTb3VuZEJhciIsInBsYXlTdG9wIiwicGxheUJ1dHRvbnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaSIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInBhdXNlZCIsInBsYXkiLCJ1cGRhdGVWaWRlb0R1cmF0aW9uIiwic2V0SW50ZXJ2YWwiLCJwYXVzZSIsImNsZWFySW50ZXJ2YWwiLCJjdXJyZW50VGltZSIsInN0ZXAiLCJwZXJjZW50IiwiYmFja2dyb3VuZCIsInZvbHVtZSIsInJlbW92ZSIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiJhQUNBLElBQUFBLFlBQUEsU0FBQUMsR0FDQSxJQUFBQyxFQUFBQyxFQUFBQyxRQUFBQyxRQUVBQyxFQURBTCxFQUFBTSxRQUFBLGNBQ0FDLEtBQUEsb0JBR0FDLEVBRkFSLEVBQUFJLFFBRUFDLEVBQUFJLE9BRUFDLEVBQUFQLE9BQUFRLFdBQUEsc0JBQUFDLFFBQ0FDLEVBQUFWLE9BQUFRLFdBQUEsc0JBQUFDLFFBRUFFLEVBQUEsRUFDQUMsRUFBQWYsRUFBQU8sS0FBQSxvQkFnQkEsTUFBQSxDQUNBUyxVQVRBRixFQURBSixJQUFBRyxFQUNBWixFQUFBTyxFQUNBSyxFQUNBWixFQUdBLElBS0FjLFVBQUFELEVBakJBRyxTQUFBRixFQUFBRyxJQUFBLGlCQUNBRCxTQUFBRixFQUFBRyxJQUFBLG9CQXNCQUMsWUFBQSxTQUFBbkIsR0FDQSxJQUFBb0IsRUFBQXBCLEVBQUFPLEtBQUEsdUJBSUFjLEVBQUF0QixZQUFBQyxHQUNBc0IsRUFBQXZCLFlBQUFDLEdBRUFlLEVBQUFmLEVBQUFPLEtBQUEsb0JBRUFhLEVBQUFoQixNQUFBaUIsRUFBQUwsV0FDQWhCLEVBQUF1QixTQUFBLDJCQUVBUixFQUFBWCxNQUFBa0IsRUFBQVAsWUFJQVMsZ0JBQUEsU0FBQVIsR0FDQSxJQUFBWCxFQUFBVyxFQUFBVCxLQUFBLG9CQUVBa0IsRUFBQVQsRUFBQVQsS0FBQSx1QkFFQUYsRUFBQXFCLFlB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QWlFLGlCQUNBVCxNQUFBMEIsT0FBQXBDLGFBQUFhLE1BQUEsR0FFQSxJQUFBSCxNQUFBMEIsT0FDQW5CLFNBQUFPLFVBQUF0RSxJQUFBLFVBR0ErRCxTQUFBTyxVQUFBYSxPQUFBLFVBRUFDLFFBQUFDLElBQUE3QixNQUFBMEIsUUFDQUUsUUFBQUMsSUFBQXZDLGFBQUFhLE1BQUEsSUF0REFILE1BQUFyRCxpQkFBQSxRQUFBLFdBQ0FvRCxjQUFBZSxVQUFBQyxPQUFBLDBCQUNBZixNQUFBc0IsWUFBQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgY29uc3QgbWVzdXJlV2lkdGggPSBpdGVtID0+IHtcbiAgICAgICAgY29uc3Qgd2luZG93V2lkdGggPSAkKHdpbmRvdykud2lkdGgoKVxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBpdGVtLmNsb3Nlc3QoXCIubWFpbi1tZW51XCIpXG4gICAgICAgIGNvbnN0IGxpc3RJdGVtcyA9IGNvbnRhaW5lci5maW5kKFwiLm1haW4tbWVudV9faXRlbVwiKVxuICAgICAgICBjb25zdCBpdGVtV2lkdGggPSBpdGVtLndpZHRoKClcblxuICAgICAgICBjb25zdCB3aWR0aE9mSXRlbXMgPSBpdGVtV2lkdGggKiBsaXN0SXRlbXMubGVuZ3RoXG5cbiAgICAgICAgY29uc3QgaXNUYWJsZXQgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDc2OHB4KVwiKS5tYXRjaGVzXG4gICAgICAgIGNvbnN0IGlzTW9iaWxlID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA0ODBweClcIikubWF0Y2hlc1xuXG4gICAgICAgIGxldCByZXFJdGVtV2lkdGggPSAwXG4gICAgICAgIGNvbnN0IHRleHRCbG9jayA9IGl0ZW0uZmluZChcIi5tYWluLW1lbnVfX3RleHRcIilcbiAgICAgICAgY29uc3QgcGFkZGluZ0xlZnQgPSBwYXJzZUludCh0ZXh0QmxvY2suY3NzKFwicGFkZGluZy1sZWZ0XCIpKVxuICAgICAgICBjb25zdCBwYWRkaW5nUmlnaHQgPSBwYXJzZUludCh0ZXh0QmxvY2suY3NzKFwicGFkZGluZy1yaWdodFwiKSlcblxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBpZiAoaXNUYWJsZXQgJiYgIWlzTW9iaWxlKSB7XG4gICAgICAgICAgICByZXFJdGVtV2lkdGggPSB3aW5kb3dXaWR0aCAtIHdpZHRoT2ZJdGVtc1xuICAgICAgICB9IGVsc2UgaWYgKGlzTW9iaWxlKSB7XG4gICAgICAgICAgICByZXFJdGVtV2lkdGggPSB3aW5kb3dXaWR0aFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVxSXRlbVdpZHRoID0gNTI0XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29udGFpbmVyOiByZXFJdGVtV2lkdGgsXG4gICAgICAgICAgICB0ZXh0QmxvY2s6IHJlcUl0ZW1XaWR0aCAtIHBhZGRpbmdMZWZ0IC0gcGFkZGluZ1JpZ2h0XG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICB9XG5cbiAgICBjb25zdCByZWxlYXNlSXRlbSA9IGl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBoaWRkZW5Db250ZW50ID0gaXRlbS5maW5kKFwiLm1haW4tbWVudV9fY29udGVudFwiKVxuICAgICAgICAvLyBjb25zdCBjb250ZW50Q29udGFpbmVyID0gaXRlbS5zaWJsaW5ncyhcIi5tYWluLW1lbnVfX2NvbnRlbnRcIilcbiAgICAgICAgLy8gY29uc3QgdGV4dEJsb2NrID0gY29udGVudENvbnRhaW5lci5maW5kKFwiLlwiKVxuXG4gICAgICAgIGNvbnN0IHJlcUNvbnRlbnRXaWR0aCA9IG1lc3VyZVdpZHRoKGl0ZW0pXG4gICAgICAgIGNvbnN0IHJlcVRleHRCbG9ja1dpZHRoID0gbWVzdXJlV2lkdGggKGl0ZW0pXG4gICAgICAgIC8vIGNvbnN0IHJlcVRleHRCbG9ja1dpZHRoID0gbWVzdXJlV2lkdGgoaXRlbSkudGV4dEJsb2NrXG4gICAgICAgIGNvbnN0IHRleHRCbG9jayA9IGl0ZW0uZmluZChcIi5tYWluLW1lbnVfX3RleHRcIilcblxuICAgICAgICBoaWRkZW5Db250ZW50LndpZHRoKHJlcUNvbnRlbnRXaWR0aC5jb250YWluZXIpXG4gICAgICAgIGl0ZW0uYWRkQ2xhc3MoXCJtYWluLW1lbnVfX2l0ZW0tLWFjdGl2ZVwiKVxuXG4gICAgICAgIHRleHRCbG9jay53aWR0aChyZXFUZXh0QmxvY2tXaWR0aC50ZXh0QmxvY2spXG5cbiAgICB9XG5cbiAgICBjb25zdCBjbG9zZUV2ZXJ5SXRlbXMgPSBjb250YWluZXIgPT4ge1xuICAgICAgICBjb25zdCBsaXN0SXRlbXMgPSBjb250YWluZXIuZmluZChcIi5tYWluLW1lbnVfX2l0ZW1cIilcblxuICAgICAgICBjb25zdCBjb250ZW50ID0gY29udGFpbmVyLmZpbmQoXCIubWFpbi1tZW51X19jb250ZW50XCIpXG5cbiAgICAgICAgbGlzdEl0ZW1zLnJlbW92ZUNsYXNzKFwibWFpbi1tZW51X19pdGVtLS1hY3RpdmVcIilcbiAgICAgICAgY29udGVudC5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKVxuICAgICAgICBjb250ZW50LndpZHRoKDApXG4gICAgfVxuXG4gICAgJChcIi5tYWluLW1lbnVfX3RpdGxlXCIpLm9uKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGNvbnN0ICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpXG4gICAgICAgIGNvbnN0IGl0ZW0gPSAkdGhpcy5jbG9zZXN0KFwiLm1haW4tbWVudV9faXRlbVwiKVxuICAgICAgICBjb25zdCBjb250YWluZXIgPSAkdGhpcy5jbG9zZXN0KFwiLm1haW4tbWVudVwiKVxuICAgICAgICBjb25zdCBpdGVtT3BlbmVkID0gaXRlbS5oYXNDbGFzcyhcIm1haW4tbWVudV9faXRlbS0tYWN0aXZlXCIpXG5cblxuICAgICAgICBpZiAoaXRlbU9wZW5lZCkge1xuICAgICAgICAgICAgY2xvc2VFdmVyeUl0ZW1zKGNvbnRhaW5lcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNsb3NlRXZlcnlJdGVtcyhjb250YWluZXIpXG4gICAgICAgICAgICByZWxlYXNlSXRlbShpdGVtKVxuICAgICAgICB9XG5cbiAgICB9KVxuIiwiLy90ZWFtIC0g0LDQutC60L7RgNC00LXQvtC9INCy0LXRgNGC0LjQutCw0LvRjNC90YvQuVxuICAgIGNvbnN0IG9wZW5JdGVtID0gY2xpY2tlZEl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBjbGlja2VkSXRlbS5jbG9zZXN0KFwiLnRlYW0tbWVtYmVyXCIpXG4gICAgICAgIGNvbnN0IGJsb2NrVG9PcGVuID0gY29udGFpbmVyLmZpbmQoXCIudGVhbS1tZW1iZXJfX3RleHQtd3JhcFwiKVxuICAgICAgICBjb25zdCBjb250ZW50ID0gYmxvY2tUb09wZW4uZmluZChcIi50ZWFtLW1lbWJlcl9fdGV4dFwiKVxuICAgICAgICBjb25zdCByZXFIZWlnaHQgPSBjb250ZW50LmhlaWdodCgpXG5cbiAgICAgICAgYmxvY2tUb09wZW4uaGVpZ2h0KHJlcUhlaWdodClcbiAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKFwiYWN0aXZlXCIpXG4gICAgfVxuXG4gICAgY29uc3QgY2xvc2VBbGxNZW1iZXJzID0gY29udGFpbmVyID0+IHtcbiAgICAgICAgY29uc3Qgd3JhcHNUb0Nsb3NlID0gY29udGFpbmVyLmZpbmQoXCIudGVhbS1tZW1iZXJfX3RleHQtd3JhcFwiKVxuICAgICAgICBcbiAgICAgICAgd3JhcHNUb0Nsb3NlLmhlaWdodCgwKVxuICAgIH1cblxuICAgICQoXCIudGVhbS1tZW1iZXJfX25hbWVcIikub24oXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgY29uc3QgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldClcbiAgICAgICAgY29uc3QgbWVtYmVyQ29udGFpbmVyID0gJHRoaXMuY2xvc2VzdChcIi50ZWFtLWxpc3RcIilcbiAgICAgICAgY29uc3QgZWxlbUNvbnRhaW5lciA9ICR0aGlzLmNsb3Nlc3QoXCIudGVhbS1tZW1iZXJcIilcblxuICAgICAgICBpZiAoZWxlbUNvbnRhaW5lci5oYXNDbGFzcyhcImFjdGl2ZVwiKSkge1xuICAgICAgICAgICAgJChcIi50ZWFtLW1lbWJlcl9fdGV4dC13cmFwXCIpLmhlaWdodCgwKVxuICAgICAgICAgICAgZWxlbUNvbnRhaW5lci5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gY2xvc2VBbGxNZW1iZXJzKG1lbWJlckNvbnRhaW5lcilcbiAgICAgICAgICAgICQoXCIudGVhbS1tZW1iZXJfX3RleHQtd3JhcFwiKS5oZWlnaHQoMClcbiAgICAgICAgICAgIG9wZW5JdGVtKCR0aGlzKVxuICAgICAgICB9XG4gICAgfSkiLCIvL2Zvcm0gLSDQstCw0LvQuNC00LDRhtC40Y8g0YTQvtGA0LzRi1xuICAgICQoXCIuZm9ybVwiKS5vbihcInN1Ym1pdFwiLCBlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgY29uc3QgZm9ybSA9ICQoZS5jdXJyZW50VGFyZ2V0KVxuICAgICAgICBjb25zdCBuYW1lID0gZm9ybS5maW5kKFwiW25hbWU9ICduYW1lJ11cIilcbiAgICAgICAgY29uc3QgcGhvbmUgPSBmb3JtLmZpbmQoXCJbbmFtZT0gJ3Bob25lJ11cIilcbiAgICAgICAgY29uc3QgY29tbWVudCA9IGZvcm0uZmluZChcIltuYW1lPSAnY29tbWVudCddXCIpXG4gICAgICAgIGNvbnN0IHRvID0gZm9ybS5maW5kKFwiW25hbWU9ICd0byddXCIpXG5cbiAgICAgICAgY29uc3QgbW9kYWwgPSAkKFwiI21vZGFsXCIpXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBtb2RhbC5maW5kKFwiLm1vZGFsX19jb250ZW50XCIpXG5cbiAgICAgICAgbW9kYWwucmVtb3ZlQ2xhc3MoXCJlcnJvci1tb2RhbFwiKVxuXG4gICAgICAgIGNvbnN0IHZhbEFyciA9IFtuYW1lLCBwaG9uZSwgY29tbWVudCwgdG9dIC8vP1xuXG4gICAgICAgIHZhbEFyci5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKFwiaW5wdXQtZXJyb3JcIilcblxuICAgICAgICAgICAgaWYgKGVsZW1lbnQudmFsKCkudHJpbSgpID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhcImlucHV0LWVycm9yXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGVycm9yRmllbGRzID0gZm9ybS5maW5kKFwiLmlucHV0LWVycm9yXCIpXG5cbiAgICAgICAgaWYgKGVycm9yRmllbGRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly93ZWJkZXYtYXBpLmxvZnRzY2hvb2wuY29tL3NlbmRtYWlsXCIsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcInBvc3RcIixcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUudmFsKCksXG4gICAgICAgICAgICAgICAgICAgIHBob25lOiBwaG9uZS52YWwoKSxcbiAgICAgICAgICAgICAgICAgICAgY29tbWVudDogY29tbWVudC52YWwoKSxcbiAgICAgICAgICAgICAgICAgICAgdG86IHRvLnZhbCgpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC50ZXh0KGRhdGEubWVzc2FnZSlcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmYW5jeWJveCA9IG5ldyBGYW5jeWJveChbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM6IFwiI21vZGFsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImlubGluZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkYXRhLnJlc3BvbnNlSlNPTi5tZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQudGV4dChtZXNzYWdlKVxuICAgICAgICAgICAgICAgICAgICBtb2RhbC5hZGRDbGFzcyhcImVycm9yLW1vZGFsXCIpXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmFuY3lib3ggPSBuZXcgRmFuY3lib3goW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBcIiNtb2RhbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJpbmxpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBcbiAgICB9KSIsIi8vINCz0LDQvNCx0YPRgNCz0LXRgCDQvNC10L3RjlxuICAgIGNvbnN0IGhhbWJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGFtYnVyZ2VyXCIpO1xuICAgIGNvbnN0IGhhbWJ1cmdlck9wZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhhbWJ1cmdlci1pY29uXCIpO1xuICAgIGNvbnN0IGhhbWJ1cmdlckNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgXCIuaGFtYnVyZ2VyLWljb24tLWNsb3NlXCJcbiAgICApO1xuXG4gICAgaGFtYnVyZ2VyT3Blbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaGFtYnVyZ2VyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfSk7XG5cbiAgICBoYW1idXJnZXJDbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaGFtYnVyZ2VyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9KTsiLCIgICBmdW5jdGlvbiBpbml0KCl7XG4gICAgICAgIC8vINCh0L7Qt9C00LDQvdC40LUg0LrQsNGA0YLRiy5cbiAgICAgICAgdmFyIG15TWFwID0gbmV3IHltYXBzLk1hcChcIm1hcFwiLCB7XG4gICAgICAgICAgICBjZW50ZXI6IFs1NS43NTExMjMsIDM3LjYxMjc3OV0sXG4gICAgICAgICAgICAvLyDQo9GA0L7QstC10L3RjCDQvNCw0YHRiNGC0LDQsdC40YDQvtCy0LDQvdC40Y8uINCU0L7Qv9GD0YHRgtC40LzRi9C1INC30L3QsNGH0LXQvdC40Y86XG4gICAgICAgICAgICAvLyDQvtGCIDAgKNCy0LXRgdGMINC80LjRgCkg0LTQviAxOS5cbiAgICAgICAgICAgIHpvb206IDE1LFxuICAgICAgICAgICAgY29udHJvbHM6IFtdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBteVBsYWNlbWFyayA9IG5ldyB5bWFwcy5QbGFjZW1hcmsoWzU1Ljc1MTEyMywgMzcuNjEyNzc5XSwge30sIHtcbiAgICAgICAgICAgIGljb25MYXlvdXQ6ICdkZWZhdWx0I2ltYWdlJyxcbiAgICAgICAgICAgIGljb25JbWFnZUhyZWY6ICcuLi9zcmMvaW1nL21hcC1waW4ucG5nJyxcbiAgICAgICAgICAgIGljb25JbWFnZVNpemU6IFs1OCwgNzNdLFxuICAgICAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTMsIC00Ml1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbXlNYXAuZ2VvT2JqZWN0cy5hZGQobXlQbGFjZW1hcmspXG5cbiAgICAgICAgbXlNYXAuYmVoYXZpb3JzLmRpc2FibGUoXCJzY3JvbGxab29tXCIpXG4gICAgfVxuXG4gICAgeW1hcHMucmVhZHkoaW5pdCkiLCIgICAgJChcIi5hcHAtc3VibWl0LWJ0blwiKS5vbihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBGYW5jeWJveC5jbG9zZSgpXG4gICAgXG4gICAgfSkiLCIgICAgY29uc3Qgc2VjdGlvbnMgPSAkKFwiLnNlY3Rpb25cIilcbiAgICBjb25zdCBkaXNwbGF5ID0gJChcIi5tYWluLWNvbnRlbnRcIilcblxuICAgIGxldCBpblNjcm9sbCA9IGZhbHNlXG5cbiAgICBzZWN0aW9ucy5maXJzdCgpLmFkZENsYXNzKFwiYWN0aXZlXCIpXG5cbiAgICBjb25zdCBzZWN0aW9uVHJhbnNpdGlvbiA9IHNlY3Rpb25JbmRleCA9PiB7XG4gICAgICAgIGlmIChpblNjcm9sbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGluU2Nyb2xsID0gdHJ1ZVxuXG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHNlY3Rpb25JbmRleCAqIC0xMDBcblxuICAgICAgICAgICAgY29uc3QgY3VycmVudFNlY3Rpb24gPSBzZWN0aW9ucy5lcShzZWN0aW9uSW5kZXgpXG4gICAgICAgICAgICBjb25zdCBtZW51VGhlbWUgPSBjdXJyZW50U2VjdGlvbi5hdHRyKFwiZGF0YS1zaWRlbWVudS10aGVtZVwiKVxuICAgICAgICAgICAgY29uc3Qgc2lkZU1lbnUgPSAkKFwiLmZpeGVkLW1lbnVcIilcbiAgICAgICAgICAgIGNvbnN0IGZpeGVkTWVudUxpbmtzID0gJChcIi5maXhlZC1tZW51X19saW5rXCIpXG5cbiAgICAgICAgICAgIGlmIChtZW51VGhlbWUgPT09IFwiYmxhY2tcIikge1xuICAgICAgICAgICAgICAgIHNpZGVNZW51LmFkZENsYXNzKFwiZml4ZWQtbWVudS0tc2hhZG93XCIpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNpZGVNZW51LnJlbW92ZUNsYXNzKFwiZml4ZWQtbWVudS0tc2hhZG93XCIpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRpc3BsYXkuY3NzKHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKCR7cG9zaXRpb259JSlgXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBzZWN0aW9ucy5lcShzZWN0aW9uSW5kZXgpLmFkZENsYXNzKFwiYWN0aXZlXCIpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIilcblxuICAgICAgICAgICAgZml4ZWRNZW51TGlua3MucmVtb3ZlQ2xhc3MoXCJmaXhlZC1tZW51X19saW5rLS1hY3RpdmVcIilcblxuICAgICAgICAgICAgc2lkZU1lbnUuZmluZChcIi5maXhlZC1tZW51X19saW5rXCIpLmVxKHNlY3Rpb25JbmRleClcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcImZpeGVkLW1lbnVfX2xpbmstLWFjdGl2ZVwiKVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpblNjcm9sbCA9IGZhbHNlXG5cbiAgICAgICAgICAgIH0sIDEzMDApXG5cbiAgICAgICAgfVxuICAgIH0gXG5cbiAgICBjb25zdCBuZXh0T3JQcmV2ID0gZGlyZWN0aW9uID0+IHtcbiAgICAgICAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IHNlY3Rpb25zLmZpbHRlcihcIi5hY3RpdmVcIilcbiAgICAgICAgY29uc3QgbmV4dFNlY3Rpb24gPSBhY3RpdmVTZWN0aW9uLm5leHQoKVxuICAgICAgICBjb25zdCBwcmV2U2VjdGlvbiA9IGFjdGl2ZVNlY3Rpb24ucHJldigpXG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJuZXh0XCIgJiYgbmV4dFNlY3Rpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWN0aW9uVHJhbnNpdGlvbihuZXh0U2VjdGlvbi5pbmRleCgpKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJwcmV2XCIgJiYgcHJldlNlY3Rpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICBzZWN0aW9uVHJhbnNpdGlvbihwcmV2U2VjdGlvbi5pbmRleCgpKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuXG4gICAgJCh3aW5kb3cpLm9uKFwid2hlZWxcIiwgZSA9PiB7XG4gICAgICAgIGNvbnN0IGRlbHRhWSA9IGUub3JpZ2luYWxFdmVudC5kZWx0YVlcblxuXG4gICAgICAgIGlmIChkZWx0YVkgPiAwKSB7XG4gICAgICAgICAgICBuZXh0T3JQcmV2KFwibmV4dFwiKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlbHRhWSA8IDApIHtcbiAgICAgICAgICAgIG5leHRPclByZXYoXCJwcmV2XCIpXG4gICAgICAgIH1cblxuXG4gICAgfSlcblxuICAgICQod2luZG93KS5vbihcImtleWRvd25cIiwgZSA9PiB7XG5cbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGUub3JpZ2luYWxFdmVudC5rZXlDb2RlXG4gICAgICAgIGNvbnN0IGN1cnJlbnRUYWcgPSBlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKClcblxuICAgICAgICBpZiAoY3VycmVudFRhZyAhPT0gXCJpbnB1dFwiICYmIGN1cnJlbnRUYWcgIT09IFwidGV4dGFyZWFcIikge1xuICAgICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgbmV4dE9yUHJldihcInByZXZcIilcblxuICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgbmV4dE9yUHJldihcIm5leHRcIilcblxuICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cblxuICAgICAgICBcbiAgICB9KVxuXG4gICAgJChcIltkYXRhLXNjcm9sbC10b11cIikub24oXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgY29uc3QgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldClcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gJHRoaXMuYXR0cihcImRhdGEtc2Nyb2xsLXRvXCIpXG4gICAgICAgIGNvbnN0IHJlcVNlY3Rpb24gPSAkKGBbZGF0YS1zZWN0aW9uLWlkPSR7dGFyZ2V0fV1gKVxuXG4gICAgICAgIHNlY3Rpb25UcmFuc2l0aW9uKHJlcVNlY3Rpb24uaW5kZXgoKSlcbiAgICB9KSIsIi8vcmV2aWV3cyAtINC+0YLQt9GL0LLRi1xuXG4gICAgY29uc3QgZmluZFNsaWRlQnlUYWIgPSB0YWIgPT4ge1xuICAgICAgICByZXR1cm4gJChcIi5yZXZpZXdcIikuZmlsdGVyKGZ1bmN0aW9uKG5keCwgaXRlbSl7XG4gICAgICAgICAgICByZXR1cm4gJChpdGVtKS5hdHRyKFwiZGF0YS1saW5rZWQtd2l0aFwiKSA9PT0gdGFiXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgJChcIi5yZXZpZXdzLW1lbnVfX2l0ZW1cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIFxuICAgICAgICBjb25zdCBjdXJyZW50SXRlbSA9ICQoZS5jdXJyZW50VGFyZ2V0KVxuICAgICAgICBjb25zdCBjdXJyZW50VGFiID0gJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoXCJkYXRhLW9wZW5cIilcbiAgICAgICAgY29uc3QgcmVxdWlyZWRTbGlkZSA9IGZpbmRTbGlkZUJ5VGFiKGN1cnJlbnRUYWIpXG4gICAgICAgIFxuICAgICAgICBjdXJyZW50SXRlbS5hZGRDbGFzcyhcInJldmlld3MtbWVudV9faXRlbS0tYWN0aXZlXCIpLnNpYmxpbmdzKFwibGlcIikucmVtb3ZlQ2xhc3MoXCJyZXZpZXdzLW1lbnVfX2l0ZW0tLWFjdGl2ZVwiKVxuXG5cbiAgICAgICAgcmVxdWlyZWRTbGlkZS5hZGRDbGFzcyhcInJldmlldy0tYWN0aXZlXCIpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoXCJyZXZpZXctLWFjdGl2ZVwiKVxuXG4gICAgfSkiLCJcbmNvbnN0IHNsaWRlcj0gJChcIi5wcm9kdWN0c1wiKS5ieFNsaWRlcih7XG4gICAgICAgIHBhZ2VyOiBmYWxzZSxcbiAgICAgICAgY29udHJvbHM6IGZhbHNlXG4gICAgfSlcblxuICAgICQoXCIuYXJyb3ctLWxlZnRcIikub24oXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIFxuICAgICAgICBzbGlkZXIuZ29Ub1ByZXZTbGlkZSgpXG4gICAgfSlcbiAgICAkKFwiLmFycm93LS1yaWdodFwiKS5vbihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgXG4gICAgICAgIHNsaWRlci5nb1RvTmV4dFNsaWRlKClcbiAgICB9KSIsIiAgICBsZXQgdmlkZW8gXG4gICAgbGV0IGR1cmF0aW9uQ29udHJvbFxuICAgIGxldCBzb3VuZENvbnRyb2xcbiAgICBsZXQgaW50ZXJ2YWxJZFxuICAgIGxldCBzb3VuZFN0YXR1cyBcblxuICAgIC8vIGNvbnN0IHBsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmR1cmF0aW9uX19wbGF5LWJ0blwiKVxuICAgIGNvbnN0IHdpbmRvd1BsYXlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcl9fYnV0dG9uXCIpXG5cbiAgICB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyXCIpXG5cbiAgICBkdXJhdGlvbkNvbnRyb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1cmF0aW9uTGV2ZWxcIilcbiAgICBkdXJhdGlvbkNvbnRyb2wubWluID0gMFxuICAgIGR1cmF0aW9uQ29udHJvbC52YWx1ZSA9IDBcbiAgICBkdXJhdGlvbkNvbnRyb2wubWF4ID0gdmlkZW8uZHVyYXRpb25cblxuICAgIHNvdW5kQ29udHJvbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic291bmRMZXZlbFwiKVxuICAgIHNvdW5kQ29udHJvbC5taW4gPSAwXG4gICAgc291bmRDb250cm9sLm1heCA9IDEwXG4gICAgc291bmRDb250cm9sLnZhbHVlID0gc291bmRDb250cm9sLm1heFxuXG4gICAgZHVyYXRpb25Db250cm9sLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBzZXRWaWRlb0R1cmF0aW9uKVxuXG4gICAgY29uc3Qgc291bmRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZvbHVtZVwiKVxuICAgIHNvdW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzb3VuZE9mZilcblxuICAgIHNvdW5kQ29udHJvbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgY2hhbmdlU291bmRCYXIpXG5cbiAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxheVN0b3ApXG4gICAgbGV0IHBsYXlCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1wbGF5XCIpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5QnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwbGF5QnV0dG9uc1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxheVN0b3ApXG4gICAgfVxuICAgIFxuICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoXCJlbmRlZFwiLCBmdW5jdGlvbigpe1xuICAgICAgICB3aW5kb3dQbGF5QnRuLmNsYXNzTGlzdC50b2dnbGUoXCJwbGF5ZXJfX2J1dHRvbi0tYWN0aXZlXCIpXG4gICAgICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gMFxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBwbGF5U3RvcCgpIHtcbiAgICAgICAgd2luZG93UGxheUJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwicGxheWVyX19idXR0b24tLWFjdGl2ZVwiKVxuXG4gICAgICAgIGlmICh2aWRlby5wYXVzZWQpIHtcbiAgICAgICAgICAgIHZpZGVvLnBsYXkoKVxuICAgICAgICAgICAgdXBkYXRlVmlkZW9EdXJhdGlvbigpXG4gICAgICAgICAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodXBkYXRlVmlkZW9EdXJhdGlvbiwgMTAwMCAvIDYwKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmlkZW8ucGF1c2UoKVxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0VmlkZW9EdXJhdGlvbigpIHtcbiAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSBkdXJhdGlvbkNvbnRyb2wudmFsdWVcbiAgICAgICAgdXBkYXRlVmlkZW9EdXJhdGlvbigpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlVmlkZW9EdXJhdGlvbigpIHtcbiAgICAgICAgZHVyYXRpb25Db250cm9sLnZhbHVlID0gdmlkZW8uY3VycmVudFRpbWVcbiAgICAgICAgY29uc3Qgc3RlcCA9IHZpZGVvLmR1cmF0aW9uIC8gMTAwXG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSB2aWRlby5jdXJyZW50VGltZSAvIHN0ZXBcblxuICAgICAgICBkdXJhdGlvbkNvbnRyb2wuc3R5bGUuYmFja2dyb3VuZCA9IGBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNGRURCM0YgJHtwZXJjZW50fSUsICM2MjYyNjIgJHtwZXJjZW50fSUpYFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNvdW5kT2ZmKCkge1xuICAgICAgICBpZiAodmlkZW8udm9sdW1lID09PSAwKSB7XG4gICAgICAgICAgICB2aWRlby52b2x1bWUgPSBzb3VuZFN0YXR1c1xuICAgICAgICAgICAgc291bmRDb250cm9sLnZhbHVlID0gc291bmRTdGF0dXMgKiAxMCBcbiAgICAgICAgICAgIHNvdW5kQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNvdW5kU3RhdHVzID0gdmlkZW8udm9sdW1lXG4gICAgICAgICAgICB2aWRlby52b2x1bWUgPSAwXG4gICAgICAgICAgICBzb3VuZENvbnRyb2wudmFsdWUgPSAwXG4gICAgICAgICAgICBzb3VuZEJ0bi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGFuZ2VTb3VuZEJhcigpIHtcbiAgICAgICAgdmlkZW8udm9sdW1lID0gc291bmRDb250cm9sLnZhbHVlIC8gMTBcblxuICAgICAgICBpZiAodmlkZW8udm9sdW1lID09PSAwKSB7XG4gICAgICAgICAgICBzb3VuZEJ0bi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNvdW5kQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh2aWRlby52b2x1bWUpXG4gICAgICAgIGNvbnNvbGUubG9nKHNvdW5kQ29udHJvbC52YWx1ZSAvIDEwKVxuICAgIH0iXX0=
