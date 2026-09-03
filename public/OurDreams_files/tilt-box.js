( function( $ ) {

	"use strict";

	const $window = $( window );

	let OurDreamsAddonsInit = {
		init: function init() {
			if ( typeof OurDreamsMain !== 'undefined' && '1' === OurDreamsMain.ourdreamsDelay && 'delay' === OurDreamsMain.ourdreamsLoadStrategy ) {
				if ( typeof elementorFrontend === 'undefined' ) {
					return;
				}
			}

			if ( typeof OurDreamsMain !== 'undefined' && '1' === OurDreamsMain.ourdreamsDelay && 'delay' === OurDreamsMain.ourdreamsLoadStrategy && ! elementorFrontend.isEditMode() ) {
				const widgets = [
					'.elementor-widget-ourdreams-tilt-box',
					'.elementor-widget-ourdreams-image',
					'.elementor-widget-ourdreams-3d-parallax-hover',
				];

				widgets.forEach( element => {
					if ( $( element ).length > 0 ) {
						OurDreamsAddonsInit.tiltAtroposInit( $( element ) );
					}
				});
			} else {
				const widgets = [
					'ourdreams-tilt-box.default',
					'ourdreams-image.default',
					'ourdreams-3d-parallax-hover.default',
				];

				widgets.forEach( hook => {
					elementorFrontend.hooks.addAction( `frontend/element_ready/${hook}`, OurDreamsAddonsInit.tiltAtroposInit );
				});
			}
		},
		tiltAtroposInit: function tiltAtroposInit() {
			let atroposItems = document.querySelectorAll( '.has-atropos' );
			if ( atroposItems.length > 0 && 'undefined' != typeof OurDreamsMain && $.inArray( 'atropos', OurDreamsMain.disable_scripts ) < 0 ) {
				initAtropos();
				function initAtropos() {
					if ( getWindowWidth() > 1199 ) {
						atroposItems.forEach( function( atroposItem ) {
							let myAtropos = Atropos({
								el: atroposItem
							});
						});
					}
				}
			}

			function getWindowWidth() {
				return window.innerWidth;
			}
		}
	};

	// If Elementor is already initialized, manually trigger
	if ( typeof OurDreamsMain !== 'undefined' && '1' === OurDreamsMain.ourdreamsDelay && 'delay' === OurDreamsMain.ourdreamsLoadStrategy ) {
		if ( typeof elementorFrontend !== 'undefined' && ! elementorFrontend.isEditMode() ) {
			OurDreamsAddonsInit.init();
		} else {
			$window.on( 'elementor/frontend/init', OurDreamsAddonsInit.init );
		}
	} else {
		$window.on( 'elementor/frontend/init', OurDreamsAddonsInit.init );
	}

})( jQuery );
