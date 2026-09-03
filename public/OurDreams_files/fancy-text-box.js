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
					'.elementor-widget-ourdreams-fancy-text-box',
				];
				widgets.forEach( element => {
					if ( $( element ).length > 0 ) {
						OurDreamsAddonsInit.fancyTextBoxInit( $( element ) );
					}
				});
			} else {
				elementorFrontend.hooks.addAction( 'frontend/element_ready/ourdreams-fancy-text-box.default', OurDreamsAddonsInit.fancyTextBoxInit );
			}
		},
		fancyTextBoxInit: function fancyTextBoxInit( $scope ) {
			$scope.each( function() {
				var $scope    = $( this );
				const $target = $scope.find( '.fancy-text-box-style-2' );

				if ( $target.length > 0 ) {
					$target.each( function() {
						const $elThis    = $( this );
						const figcaption = $elThis.find( 'figcaption' );

						if ( figcaption.length > 0 ) {
							setTimeout( function() {
								$elThis.css( {
									'padding-bottom': figcaption.outerHeight()
								});
							}, 200 );
						}
					});
				}
			});
		}
	}

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
