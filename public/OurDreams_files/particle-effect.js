( function( $ ) {

	"use strict";

	const $window = $( window );

	let OurDreamsAddonsInit = {
		particleInitialized: false,
		particleInitTimer: null,
		
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
						OurDreamsAddonsInit.deferredParticleInit( $( element ) );
					}
				});
			} else {
				elementorFrontend.hooks.addAction( 'frontend/element_ready/ourdreams-particle-effect.default', OurDreamsAddonsInit.deferredParticleInit );
			}
		},
		
		deferredParticleInit: function deferredParticleInit( $scope ) {
			// Defer particle initialization until after page is fully loaded
			// This prevents particles.js from blocking the initial render
			if ( OurDreamsAddonsInit.particleInitialized ) {
				OurDreamsAddonsInit.particleEffectInit( $scope );
			} else {
				// Use requestIdleCallback for better performance, fallback to setTimeout
				if ( typeof requestIdleCallback !== 'undefined' ) {
					requestIdleCallback( function() {
						OurDreamsAddonsInit.particleEffectInit( $scope );
						OurDreamsAddonsInit.particleInitialized = true;
					}, { timeout: 2000 } );
				} else {
					// Delay by 800ms to allow other content to render first
					clearTimeout( OurDreamsAddonsInit.particleInitTimer );
					OurDreamsAddonsInit.particleInitTimer = setTimeout( function() {
						OurDreamsAddonsInit.particleEffectInit( $scope );
						OurDreamsAddonsInit.particleInitialized = true;
					}, 800 );
				}
			}
		},
		particleEffectInit: function particleEffectInit( $scope ) {
			const $particleItems = $scope.find( '.has-particle-effect' );
			
			// Check for reduced motion preference (accessibility)
			const prefersReducedMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

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
				
				// Performance optimization: reduce particle complexity on low-end devices or slow connections
				if ( particleItemOptions ) {
					// Disable particles if user prefers reduced motion
					if ( prefersReducedMotion ) {
						// Replace with a static background element instead of animation
						$elThis.css( 'background', 'linear-gradient(135deg, rgba(227, 0, 80, 0.05) 0%, rgba(255, 116, 35, 0.05) 100%)' );
						return;
					}
					
					// Reduce particle count on lower-end devices
					if ( particleItemOptions.particles && particleItemOptions.particles.number ) {
						// Detect device capability via effective connection type (if available)
						const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
						if ( connection && connection.effectiveType && connection.effectiveType === '4g' ) {
							// 4G or better - keep original
						} else if ( connection && ( connection.effectiveType === '3g' || connection.effectiveType === '2g' ) ) {
							// Slow connection - reduce particles
							particleItemOptions.particles.number.value = Math.ceil( particleItemOptions.particles.number.value * 0.5 );
						} else if ( navigator.deviceMemory && navigator.deviceMemory < 4 ) {
							// Low memory device - significantly reduce particles
							particleItemOptions.particles.number.value = Math.ceil( particleItemOptions.particles.number.value * 0.3 );
						}
						
						// Disable expensive interactivity on low-end devices
						if ( navigator.deviceMemory && navigator.deviceMemory < 4 ) {
							if ( particleItemOptions.interactivity ) {
								particleItemOptions.interactivity.events.onhover.enable = false;
								particleItemOptions.interactivity.events.onclick.enable = false;
							}
						}
					}
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

				// Add fade-in class for smooth appearance after initialization
				$elThis.addClass( 'particles-initializing' );
				
				// Initialize particles.js with the unique ID and options
				particlesJS( uniqid, particleItemOptions );
				
				// Remove fade-in class after animation completes
				setTimeout( function() {
					$elThis.removeClass( 'particles-initializing' );
				}, 1200 );
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
