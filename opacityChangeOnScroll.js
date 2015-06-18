/**
 * Library Name: opacityChangeOnScroll
 * Library URL: https://github.com/sukritchhabra/opacityChangeOnScroll
 * Description: The library allows you to, by just assigning classes to your HTML elements to change the opacities of these elements on scroll.
 * Author: Sukrit Chhabra
 * Author URI: http://sukritchhabra.com
 * License: MIT
 */

/*jslint browser: true*/
/*jslint node: true*/
/*global $, jQuery, alert*/

$(document).ready(function(){
    $(document).on("scroll", function(event) {
        $(".increase-on-scroll-down").each(function(index, el) {
            var distanceOfElementFromTop = $(this).offset().top;
            var currentScroll = $(window).scrollTop();
            var heightOfWindow = $(window).height();
            var heightOfElement = $(this).height();

            var newOpacity = 1 - ((distanceOfElementFromTop - currentScroll)/heightOfWindow);

        /**
         * To decrease on scroll down remove the "1 -".
         * Also change the .css("opacity", "1") to .css("opacity", "0") on line 42
         */

        /**
         * LOGIC
         *
         * If you're at the position where if you scroll the exact height of the window the top of your element will be the top of the page(not document, page),
         * that means (distanceOfElementFromTop(top of the document)-currentScroll) = heightOfWindow;
         * this yeilds an opacity 0. Basically when the element is just below the current window, i.e.,
         * one more pixel of a scroll down will reveal one pixel of the elementon the page, we want the opacity to be zero.
         *
         * eg: lets say windowHeight=1000; distanceOfElementFromTop(top of the document)=4000; currntScroll(the amount you've scrolled right now)=3000;
         * This means that on scrolling 1px currentScroll=3001; You are now 999px away from reaching 4000px but our element also exists at 4000px.
         * So when you reach a currentScroll=4000, the top of our element will align with the to of the page.
         */

            if(currentScroll <= distanceOfElementFromTop) {
                console.log("setting opacity to: " + newOpacity);
                $(this).css("opacity", newOpacity);
            } else {
                $(this).css("opacity", "1");
            }
        });

        $(".decrease-on-scroll-down").each(function(index, el) {
            var distanceOfElementFromTop = $(this).offset().top;
            var currentScroll = $(window).scrollTop();
            var heightOfWindow = $(window).height();
            var heightOfElement = $(this).height();

            var newOpacity = ((distanceOfElementFromTop - currentScroll)/heightOfWindow);

            if(currentScroll <= distanceOfElementFromTop) {
                console.log("setting opacity to: " + newOpacity);
                $(this).css("opacity", newOpacity);
            } else {
                $(this).css("opacity", "0");
            }
        });

        $(".increase-decrease-on-scroll-down").each(function(index, el) {
            var distanceOfElementFromTop = $(this).offset().top;
            var currentScroll = $(window).scrollTop();
            var heightOfWindow = $(window).height();
            var heightOfElement = $(this).height();
            var newOpacity;

            if (currentScroll <= distanceOfElementFromTop) {
                newOpacity = 1 - ((distanceOfElementFromTop - currentScroll)/(heightOfWindow));
                if (newOpacity < 0) {
                    newOpacity = 0;
                }
                $(this).css("opacity", newOpacity);
            } else if (currentScroll > distanceOfElementFromTop) {
                newOpacity = 1 - ((currentScroll - distanceOfElementFromTop)/heightOfElement);
                if (newOpacity < 0) {
                    newOpacity = 0;
                }
                $(this).css("opacity", newOpacity);
            }
        });
    });
});
