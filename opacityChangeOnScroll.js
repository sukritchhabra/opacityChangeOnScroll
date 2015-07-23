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

            var newOpacity;

            var startPercentage = $(this).attr('data-start');   // Percentage offset from BOTTOM to start "animation"
            var endPercentage = $(this).attr('data-end');       // Percentage offset from TOP to start "animation"

            if(startPercentage == undefined) {
                startPercentage = 0;
            } else {
                startPercentage = parseInt(startPercentage);
            }

            if(endPercentage == undefined) {
                endPercentage = 0;
            } else {
                endPercentage = parseInt(endPercentage);
            }

            if (endPercentage > startPercentage) {
                throwError_startGreaterThanEnd();
            }

            var endValue = heightOfWindow*endPercentage/100;

            if(distanceOfElementFromTop < heightOfWindow) {
                newOpacity = 1 - ((distanceOfElementFromTop - currentScroll)/distanceOfElementFromTop);
            } else {
                newOpacity = 1 - ((distanceOfElementFromTop - currentScroll - endValue)/((heightOfWindow*(100 - startPercentage-endPercentage)/100)));
            }

            /**
             * To decrease on scroll down remove the "1 -".
             * Also change the .css("opacity", "1") to .css("opacity", "0") on line 42
             */

            /**
             * LOGIC
             *
             * If you're at the position where if you scroll the exact height of the window the top of your element will be the top of the page(not document, page),
             * that means (distanceOfElementFromTop(top of the document)-currentScroll) = heightOfWindow;
             * This yeilds an opacity 0. Basically when the element is just below the current window, i.e.,
             * one more pixel of a scroll down will reveal one pixel of the elementon the page, we want the opacity to be zero.
             *
             * eg: lets say windowHeight=1000; distanceOfElementFromTop(top of the document)=4000; currntScroll(the amount you've scrolled right now)=3000;
             * This means that on scrolling 1px currentScroll=3001; You are now 999px away from reaching 4000px but our element also exists at 4000px.
             * So when you reach a currentScroll=4000, the top of our element will align with the top of the page.
             */

            if(currentScroll <= distanceOfElementFromTop) {
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

            var newOpacity;

            var startPercentage = $(this).attr('data-start');       // Percentage offset from BOTTOM to start "animation"
            var endPercentage = $(this).attr('data-end');           // Percentage offset from TOP to start "animation"

            if(startPercentage == undefined) {
                startPercentage = 0;
            } else {
                startPercentage = parseInt(startPercentage);
            }

            if(endPercentage == undefined) {
                endPercentage = 0;
            } else {
                endPercentage = parseInt(endPercentage);
            }

            if (endPercentage > startPercentage) {
                throwError_startGreaterThanEnd();
            }

            var endValue = heightOfWindow*endPercentage/100;

            if(distanceOfElementFromTop < heightOfWindow) {
                newOpacity = ((distanceOfElementFromTop - currentScroll)/distanceOfElementFromTop);
            } else {
                newOpacity = ((distanceOfElementFromTop - currentScroll - endValue)/((heightOfWindow*(100 - startPercentage-endPercentage)/100)));
               
               /**
                * LOGIC
                *
                * The calculation above was different before the addition of different attributes. 
                * newOpacity = ((distanceOfElementFromTop - currentScroll )/heightOfWindow);
                *
                * For all purposes ahead lets assume distanceOfElementFromTop = 4000; currentScroll = 3000; heightOfWindow = 1000;
                *     In the earlier calculation difference(Step) between Opacity1(currentScroll = 3000) and Opacity2(currentScroll = 3001)
                *     was 1/1000 i.e. 0.001. That means, after a scroll of 1px, OPacity would decrease by 0.001;
                *     [for increase-on-scroll-down, it wouuld increase instead of decreasing]
                *
                *     Therefore, after a scroll of heightOfWindow, i.e., 1000px, the opacity would have decrease a complete 1 (from 1 -> 0)
                *     With the data-attributes, We want the step to be biggere because we are defining a region of the window 
                *     where we want this change to take place. 
                *     So if a user says, data-start = 20 and data-end = 40, i.e., start change when element is at a distance 80% away 
                *     from the top and end it when it is at a distance 40% away from the top, In our example we want the change to take 
                *     place between 800px and 400px. Therefore the step needs to be 1/(800-400) => 1/(heightOfWindow*((100 - startPercentage)-endPercentage)/100)
                *
                *     But we also want it to start from 1/0 => (distanceOfElementFromTop - currentScroll - (heightOfWindow*endPercentage/100) )
                */

                console.log(newOpacity);
            }

            if(currentScroll <= distanceOfElementFromTop) {
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

        function throwError_startGreaterThanEnd() {
            alert('ERROR!\n\'data-end\' attribute has a greater value than \'data-start\' attribute');
        }
    });
});
