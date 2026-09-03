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
					'.elementor-widget-ourdreams-particle-effect',
				];
				widgets.forEach( element => {
					if ( $( element ).length > 0 ) {
						OurDreamsAddonsInit.particleEffectInit( $( element ) );
					}
				});
			} else {
				elementorFrontend.hooks.addAction( 'frontend/element_ready/ourdreams-particle-effect.default', OurDreamsAddonsInit.particleEffectInit );
			}
		},
		particleEffectInit: function particleEffectInit( $scope ) {
			const $particleItems = $scope.find( '.has-particle-effect' );

			$.each( $particleItems, function() {
				let $elThis             = $( this );
				let uniqid              = $elThis.attr( 'id' );
				let particleItemOptions = $elThis.attr( 'data-particles-options' );

				// Generate unique ID if not present
				if ( ! uniqid ) {
					uniqid = 'particle-' + Math.random().toString( 36 ).substring( 2, 11 );
					$elThis.attr( 'id', uniqid );
				}

				// Skip if already initialized
				if ( $elThis.attr( 'data-particles-initialized' ) ) {
					return;
				}

				$elThis.attr( 'data-particles-initialized', true );

				if ( 'undefined' != particleItemOptions && typeof particleItemOptions !== typeof undefined ) {
					particleItemOptions = JSON.parse( particleItemOptions );
				}

				if ( particleItemOptions && particleItemOptions.asBG ) {
					$elThis.closest( '.elementor-section, .e-container, .e-con' ).find( '.lqd-particles-bg-wrap' ).remove();
					const particlesBgWrap  = $( '<div class="lqd-particles-bg-wrap lqd-overlay pointer-events-none"></div>' );
					const elementContainer = $elThis.closest( '.ourdreams-particles-container' );
					let parentSection      = $elThis.closest( '.elementor-section' ).last();
	
					if ( ! parentSection.length ) {
						parentSection = $elThis.closest( '.e-container, .e-con' );
					}

					const sectionContainerElement = parentSection.children( '.elementor-container' );

					if ( ! elementContainer.hasClass( '.particles-as-bg' ) ) {
						particlesBgWrap.append( elementContainer );
					}

					if ( sectionContainerElement.length ) {
						particlesBgWrap.insertBefore( sectionContainerElement );
					} else {
						particlesBgWrap.prependTo( parentSection );
					}
				} else {
					$elThis.find( '.lqd-particles-bg-wrap' ).remove();
				}

				// Initialize particles.js with the unique ID and options
				particlesJS( uniqid, particleItemOptions );
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
