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
					'.elementor-widget-ourdreams-countdown',
				];

				widgets.forEach( element => {
					if ( $( element ).length > 0 ) {
						OurDreamsAddonsInit.countDownTimerInit( $( element ) );
					}
				});
			} else {
				elementorFrontend.hooks.addAction( 'frontend/element_ready/ourdreams-countdown.default', OurDreamsAddonsInit.countDownTimerInit );
			}
		},
		countDownTimerInit: function( $scope ) {
			$scope.each( function() {
				var $scope   = $( this );
				const target = $scope.find( '.elementor-countdown-wrapper' );

				// Early return if element not exist.
				if ( 0 === target.length ) {
					return;
				}

				let content     = null;
				const settings  = target.data( 'settings' ) || {};
				const enddate   = target.data( 'enddate' );
				const todaydate = target.data( 'today-date' );
				const template  = wp.template( 'count-down' );

				let dayDigit,
					hoursDigit,
					minutesDigit,
					secondsDigit;

				if ( todaydate === enddate ) {
					dayDigit     = 0;
					hoursDigit   = 0;
					minutesDigit = 0;
					secondsDigit = 0;
				} else {
					dayDigit     = '%D';
					hoursDigit   = '%H';
					minutesDigit = '%M';
					secondsDigit = '%S';
				}

				content = template( {
					day_show: settings['day_show'],
					dayDigit: dayDigit,
					dayLabel: settings['day_label'],
					hours_show: settings['hours_show'],
					hoursDigit: hoursDigit,
					hoursLabel: settings['hours_label'],
					minutes_show: settings['minutes_show'],
					minutesDigit: minutesDigit,
					minutesLabel: settings['minutes_label'],
					seconds_show: settings['seconds_show'],
					secondsDigit: secondsDigit,
					secondsLabel: settings['seconds_label']
				});

				if ( 'undefined' != typeof OurDreamsMain && $.inArray( 'jquery-countdown', OurDreamsMain.disable_scripts ) < 0 ) {
					if ( todaydate === enddate ) {
						$( '.countdown' ).html( content );
					} else {
						$( target ).countdown( enddate ).on( 'update.countdown', function( event ) {
							$( this ).html( event.strftime( '' + content ) );
						});
					}
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

})(	jQuery );
