(function ( $ ) {

    if ( ! window.console ) {
        window.console = {
            log: function(){},
            info: function(){},
            warn: function(){}
        }
    }

    $(document.documentElement).removeClass('no-js');

    $.fn.lightbox = function( options ) {

        var settings = $.extend({}, $.fn.lightbox.defaults, options);

        var data = $.fn.lightbox.data;

        function checkESC( event )
        {
            if ( event.keyCode == 27 && settings.closeOnESC ) {
                close();
            } 
        }

        function listenforESC()
        {
            $(document).on("keyup.lightbox", checkESC );
        }

        function dontlistenforESC()
        {
            $(document).unbind("keyup.lightbox");
        }

        function isOpen()
        {
            return $( settings.container ).hasClass( settings.isOpenClass );
        }

        function toggle( state )
        {
            state = state || false;

            if ( data.container ) {
                
            }

            data.container = $( settings.container );

            if ( settings.className ) {
                data.container.toggleClass(settings.className, state);
            }

            data.container.toggleClass(settings.isOpenClass, state);
            $( document.documentElement ).toggleClass("lightbox-open", state);
        }

        function close( event )
        {
            if ( event ) {
                event.preventDefault();
                event.stopPropagation();

                console.log(event);

                if ( event.target != event.currentTarget ) {
                    return;
                }
            }

            toggle(false);

            if ( data.currentTarget ) {
                data.currentTarget.removeClass( settings.activeClass ).trigger( "lightbox-closed" );
            }

            dontlistenforESC();
        }

        function load( content )
        {
            // console.info( content );
            $( settings.content ).empty().append( content );
        }

        function fetch( url )
        {
            $.ajax( url, {}).done( function( data, textStatus, jqXHR ) {
                if ( settings.processAjaxResponse ) {
                    data = settings.processAjaxResponse( data, textStatus, jqXHR );
                }
                load( data );
                toggle( true );
            } );
        }

        function handleClick( event )
        {
            listenforESC();

            var container = $( settings.container );

            if ( data.currentTarget ) {
                data.currentTarget.removeClass( settings.activeClass );
            }

            if ( data.className && ( ( settings.className && data.className != settings.className ) || ! settings.className ) ) {
                container.removeClass( data.className );
            }

            if ( settings.className ) {
                container.addClass( data.className = settings.className );
            }

            data.currentTarget = $( event.currentTarget );

            var dataContent = data.currentTarget.data("lightbox-content") || "";
            var href = data.currentTarget.attr("href") || "";

            if ( dataContent != "" ) {
                load( dataContent );
                toggle( true );
            } else if ( href ) {
                fetch( href );
            }

            data.container = container;
            
            data.currentTarget.addClass( settings.activeClass );

            return false;
        }

        if ( settings.closeOnClick ) {
            $( settings.closeOnClick ).on("click.lightbox", close );
            // $( settings.container ).unbind("click.lightbox");
        }
        
        this.click( handleClick );

        return this;
    };

    $.fn.lightbox.data = {};

    $.fn.lightbox.defaults = {
        container: ".lightbox",
        content: ".lightbox-content",
        isOpenClass: "open",
        activeClass: "active",
        closeOnClick: ".lightbox-overlay, .lightbox-close, .lightbox-frame",
        closeOnESC: true,
        processAjaxResponse: function( data, textStatus, jqXHR ) {

            var ct = jqXHR.getResponseHeader("content-type") || "";

            if ( ct.indexOf('json') > -1 ) {
                return data.content;
            }

            return data;
        }
    };

}( jQuery ));
