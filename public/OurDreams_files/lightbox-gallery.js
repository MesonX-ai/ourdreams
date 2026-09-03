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
					'.elementor-widget-ourdreams-image-carousel',
					'.elementor-widget-ourdreams-image-gallery',
					'.elementor-widget-ourdreams-blog-list',
					'.elementor-widget-ourdreams-archive-blog',
					'.elementor-widget-ourdreams-portfolio',
					'.elementor-widget-ourdreams-archive-portfolio',
					'.elementor-widget-ourdreams-popup',
				];

				widgets.forEach( element => {
					if ( $( element ).length > 0 ) {
						OurDreamsAddonsInit.defaultLightboxGallery( $( element ) );
					}
				});
			} else {
				const widgets = [
					'ourdreams-image-carousel.default',
					'ourdreams-image-gallery.default',
					'ourdreams-blog-list.default',
					'ourdreams-archive-blog.default',
					'ourdreams-portfolio.default',
					'ourdreams-archive-portfolio.default',
					'ourdreams-popup.default',
				];

				widgets.forEach( hook => {
					elementorFrontend.hooks.addAction( `frontend/element_ready/${hook}`, OurDreamsAddonsInit.defaultLightboxGallery );
				});
			}
		},
		defaultLightboxGallery: function() {
			if ( 'undefined' != typeof OurDreamsMain && $.inArray( 'magnific-popup', OurDreamsMain.disable_scripts ) < 0 ) {
				const lightboxgallerygroups = {};
				const $lightboxItems        = $( '.lightbox-group-gallery-item' );

				if ( $lightboxItems.length > 0 ) {
					$lightboxItems.each( function() {
						const groupId = $( this ).attr( 'data-group' );
						if ( ! lightboxgallerygroups[groupId] ) {
							lightboxgallerygroups[groupId] = [];
						}
						lightboxgallerygroups[groupId].push( this );
					});

					$.each( lightboxgallerygroups, function() {
						$( this ).magnificPopup({
							type: 'image',
							closeOnContentClick: true,
							closeBtnInside: false,
							fixedContentPos: true,
							gallery: {
								enabled: true
							},
							image: {
								titleSrc: function( item ) {
									const title   = item.el.attr( 'title' ) || '';
									const caption = item.el.attr( 'data-lightbox-caption' ) || '';
									return `${title}${caption ? `${caption}` : ''}`;
								}
							},
							callbacks: {
								close: function() {
									// Double clear just in case
									if ( $.magnificPopup && $.magnificPopup.instance ) {
										$.magnificPopup.instance._lastFocusedEl = null;
									}
								}
							}
						});
					});
				}
			}
		},
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

} )( jQuery );
