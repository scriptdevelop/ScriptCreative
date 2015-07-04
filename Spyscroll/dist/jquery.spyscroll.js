Skip to content
This repository  
Pull requests
Issues
Gist
 @scriptdevelop
 Unwatch 1
  Star 0
  Fork 0
scriptdevelop/ScriptCreative
 branch: jquery  ScriptCreative/Spyscroll/src/jquery.spyscroll.js
@scriptdevelopscriptdevelop 9 minutes ago jquery.spyscroll.js
1 contributor
RawBlameHistory     115 lines (85 sloc)  3.591 kB
/* ========================================================================
 * ScriptCreative: jquery.spyscroll.js v2.2.0
 * http://plugins.scriptcreative.com/plugins
 * ========================================================================
 * Copyright 2014-2016 ScriptCreative
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function (jQuery) {
    'use strict';

    /* SPYSCROLL OPTIONS DEFINITION */

   function Spyscroll(element, options) {
        this.body           = jQuery(document.body)
        this.window         = jQuery(window)
        this.options        = jQuery.extend({}, Spyscroll.DEFAULT, options)
        this.selector       = (jQuery(element).is(document.body)) ? this.$body : jQuery(element)
        this.targets        = []
        this.activeTarget   = null


        this.init()
        this.selector.on('scroll', jQuery.proxy(this.activate(), this))
    }

    Spyscroll.VERSION = '2.2.0'

    Spyscroll.DEFAULT = {
      activeClass:'current-menu-item'
    }

    Spyscroll.prototype.init = function () {

        if(this.window.scrollTop() == 0)
            this.body
                .find(this.selector)
                .find('li:first')
                .addClass(this.options.activeClass)

    }
    Spyscroll.prototype.retriveTarget = function () {

        var collection      = this.body.find(this.selector).find("a")

        this.activeTarget   = collection.map(function () {
        var currentEl       = jQuery(this)
        var filteredEL      = jQuery(currentEl.attr("href"));
            if (filteredEL.length) {
                return filteredEL;
            }
        });

        var objectRetrieve     =   []
            objectRetrieve.push(collection)
            objectRetrieve.push(this.activeTarget)

        return objectRetrieve

    }
    Spyscroll.prototype.activate = function () {

        var targets         =  this.retriveTarget()
        var activeEl        =  this.selector
        var activeClass     =  this.options.activeClass


        jQuery(window).bind('scroll',function () {
            var lastId      =   null
            var elFromTop   =   jQuery(this).scrollTop() + activeEl.outerHeight()
            var activeItem  =   targets[1].map(function () {
                      if (jQuery(this).offset().top < elFromTop)
                        return this;
                });

            activeItem      =   activeItem[activeItem.length - 1];
            var activeId    =   activeItem && activeItem.length ? activeItem[0].id : '';

            if (lastId !== activeId) {
                    lastId = activeId;

                targets[0]
                    .parent()
                    .removeClass(activeClass)
                    .end()
                    .filter("[href=#" + activeId + "]")
                    .parent()
                    .addClass(activeClass);
            }
        });
    }
    /* SPYSCROLL PLUGIN DEFINITION */

    function Plugin(option) {
        return this.each(function () {
            var $this = jQuery(this)
            var data = $this.data('spyscroll')
            var options = typeof option == 'object' && option

            if (!data) $this.data('spyscroll', (data = new Spyscroll(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }


    jQuery.fn.spyscroll = Plugin
    jQuery.fn.spyscroll.Constructor = Spyscroll


    /* SPYSCROLL NO CONFLICT */
    jQuery.fn.spyscroll.noConflict = jQuery.noConflict

}(jQuery);
Status API Training Shop Blog About Help
© 2015 GitHub, Inc. Terms Privacy Security Contact
