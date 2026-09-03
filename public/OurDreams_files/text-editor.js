( function( $ ) {
 
	"use strict";

	const $window = $( window );

	let OurDreamsAddonsInit = {
		settings: {
			selectors: {
				paragraph: 'p:first',
			},
			classes: {
				dropCap: 'elementor-drop-cap',
				dropCapLetter: 'elementor-drop-cap-letter',
			},
		},
		init: function() {
			if ( typeof OurDreamsMain !== 'undefined' && '1' === OurDreamsMain.ourdreamsDelay && 'delay' === OurDreamsMain.ourdreamsLoadStrategy ) {
				if ( typeof elementorFrontend === 'undefined' ) {
					return;
				}
			}

			if ( typeof OurDreamsMain !== 'undefined' && '1' === OurDreamsMain.ourdreamsDelay && 'delay' === OurDreamsMain.ourdreamsLoadStrategy && ! elementorFrontend.isEditMode() ) {
				const widgets = [
					'.elementor-widget-ourdreams-text-editor',
				];

				widgets.forEach( element => {
					if ( $( element ).length > 0 ) {
						OurDreamsAddonsInit.textEditorInit( $( element ) );
					}
				});
			} else {
				const widgets = [
					'ourdreams-text-editor.default',
				];

				widgets.forEach( hook => {
					elementorFrontend.hooks.addAction( `frontend/element_ready/${hook}`, OurDreamsAddonsInit.textEditorInit );
				});
			}
		},
		textEditorInit: function( $scope ) {
			$scope.each( function() {
				var $scope = $( this );

				const selectors  = OurDreamsAddonsInit.settings.selectors;
				const classes    = OurDreamsAddonsInit.settings.classes;
				const $paragraph = $scope.find( selectors.paragraph );

				if ( ! $paragraph.length ) {
					return;
				}

				const $dropCap       = $( '<span>', { class: classes.dropCap } );
				const $dropCapLetter = $( '<span>', { class: classes.dropCapLetter } );
				$dropCap.append( $dropCapLetter );

				const paragraphContent = $paragraph.html().replace( /&nbsp;/g, ' ' );
				const firstLetterMatch = paragraphContent.match( /^ *([^ ] ?)/ );

				if ( ! firstLetterMatch ) {
					return;
				}

				const firstLetter        = firstLetterMatch[ 1 ];
				const trimmedFirstLetter = firstLetter.trim();

				if ( '<' === trimmedFirstLetter ) {
					return;
				}

				$dropCapLetter.text( trimmedFirstLetter );

				const restoredParagraphContent = paragraphContent
					.slice( firstLetter.length )
					.replace( /^ */, ( match ) => {
						return new Array( match.length + 1 ).join( '&nbsp;' );
					} );

				let drop_cap_value = $scope.find( '.elementor-drop-cap-yes' );
				if ( $( drop_cap_value ).length > 0 ) {
					$paragraph.html( restoredParagraphContent ).prepend( $dropCap );
				}
			} );
		},
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
