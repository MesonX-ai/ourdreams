( function ( $ ) {

	"use strict";

	var animeBreakPoint = 1199;

	/****** Get window width ******/
	function getWindowWidth() {
		return window.innerWidth;
	}

	$( document ).ready( function() {

		let el_preloader_overlay = $( '.preloader-overlay' );

		function isElementInViewport( el ) {
			const rect = el.getBoundingClientRect();
			return rect.top < window.innerHeight && rect.bottom > 0;
		}

		function checkWidgetsInView() {
			const selected_widgets = `
				.elementor-widget-ourdreams-blog-list.entrance-animation,
				.elementor-widget-ourdreams-archive-blog.entrance-animation,
				.elementor-widget-ourdreams-archive-portfolio.entrance-animation,
				.elementor-widget-ourdreams-portfolio.entrance-animation,
				.elementor-widget-ourdreams-product-taxonomy.entrance-animation,
				.elementor-widget-ourdreams-product-list.entrance-animation,
				.elementor-widget-ourdreams-archive-property.entrance-animation,
				.elementor-widget-ourdreams-property.entrance-animation,
				.elementor-widget-ourdreams-archive-tours.entrance-animation,
				.elementor-widget-ourdreams-tours.entrance-animation
				.elementor-widget-ourdreams-portfolio-categories.entrance-animation
			`;

			$( selected_widgets ).each( function () {
				const $widget = $( this );

				if ( isElementInViewport( this ) && ! $widget.hasClass( 'animation-done' ) ) {
					const check_widget = setInterval( () => {
						if ( $widget.find( '.grid-loading' ).length === 0 ) {
							clearInterval( check_widget );
							animeEffect( $widget );
							$widget.addClass( 'animation-done' );
						}
					}, 100 );
				}
			});
		}

		function animateNonWidgets() {
			const listed_widgets = `
				.elementor-widget-ourdreams-blog-list.entrance-animation,
				.elementor-widget-ourdreams-archive-blog.entrance-animation,
				.elementor-widget-ourdreams-archive-portfolio.entrance-animation,
				.elementor-widget-ourdreams-portfolio.entrance-animation,
				.elementor-widget-ourdreams-product-taxonomy.entrance-animation,
				.elementor-widget-ourdreams-product-list.entrance-animation,
				.elementor-widget-ourdreams-archive-property.entrance-animation,
				.elementor-widget-ourdreams-property.entrance-animation,
				.elementor-widget-ourdreams-archive-tours.entrance-animation,
				.elementor-widget-ourdreams-tours.entrance-animation
				.elementor-widget-ourdreams-portfolio-categories.entrance-animation
			`;
			const $nonListed = $( '.entrance-animation' ).not( $( listed_widgets ) );

			if ( $nonListed.length > 0 ) {
				animeEffect( $nonListed );
				$nonListed.addClass( 'animation-done' );
			}
		}

		$( window ).on( 'scroll', checkWidgetsInView );

		if ( el_preloader_overlay.length > 0 ) {
			let checkPreloader = setInterval( () => {
				if ( el_preloader_overlay.css( 'display' ) === 'none' ) {
					clearInterval( checkPreloader );
					animateNonWidgets();
					checkWidgetsInView();
				}
			}, 100 );
		} else {
			animateNonWidgets();
			checkWidgetsInView();
		}
		 
		/** Start Text Reveal Animation */
		if ( $( '.text-reveal-animation' ).length && $(window).width() > 1199 ) {
			setTimeout( function() {
				initTextReveal();
			}, 100 );

			 $(window).on('scroll resize', function () {
				if ($(window).width() > 1199) {
					updateReveal();
				}
			});
		}

		function initTextReveal() {
			$( '.text-reveal-animation' ).each(function () {

				const $el = $( this );
				const linesData = Splitting({
					target: this,
					by: 'lines'
				});

				linesData.forEach( function ( data ) {
					const revealColor = $el.attr( 'data-text-reveal-color' );
					const highlightColor = $el.attr( 'data-text-highlight-color' );
					const html = data.lines.map( function ( line ) {
						return '<span class="heading-line-wrap">' +
							line.map( function ( span ) {
								return span.innerHTML;
							}).join( ' ' ) +
							'</span>';
					}).join( ' ' );

					$el.html( html );
					$el.find( '.heading-line-wrap' ).css({
						'--reveal-color': revealColor,
						'--highlight-color': highlightColor
					});
				});
				Splitting({
					target: $el.find( '.heading-line-wrap' ).toArray(),
					by: 'words'
				});
			});
			updateReveal();
		}

		function updateReveal() {

			const windowHeight = $( window ).height();
			const scrollTop = $( window ).scrollTop();

			$( '.text-reveal-animation' ).each( function () {

				const $section = $( this );
				const sectionTop = $section.offset().top;
				const start = sectionTop - windowHeight * 0.8;
				const end = sectionTop - windowHeight * 0.3;
				let overallProgress = ( scrollTop - start ) / ( end - start );
				overallProgress = Math.max( 0, Math.min( overallProgress, 1 ) );

				const $lines = $section.find( '.heading-line-wrap' );
				const totalLines = $lines.length;

				$lines.each( function ( index ) {
					const segmentStart = index / totalLines;
					const segmentEnd = ( index + 1 ) / totalLines;
					let lineProgress = ( overallProgress - segmentStart ) / ( segmentEnd - segmentStart );
					lineProgress = Math.max( 0, Math.min( lineProgress, 1 ) );

					$( this ).css( '--highlight-offset', ( lineProgress * 100 ) + '%' );
				});
			});
		}
		/** End Text Reveal Animation */

		function animeAnimation( target, options ) {
			let child           = target;
			let staggerValue    = options.staggervalue || 0;
			let delay           = options.delay || 0;
			let anime_animation = anime.timeline();
	
			function applyTransitionStyles( elements ) {
				for ( let i = 0; i < elements.length; i++ ) {
					const element = elements[i];
					element.style.transition = 'none';
					if ( options.willchange ) {
						element.style.willChange = 'transform';
					}
				}
			}

			if ( ( options.targets === undefined || options.targets === '' ) ) {
				if ( 'childs' === options.el ) {
					child = target.children;
					applyTransitionStyles( target.children );
				}
			}

			if ( 'lines' === options.el ) {
				function lineSplitting() {
					const linesData = Splitting( { target: target, by: 'lines' } );
			
					// Extract lines while preserving spaces
					const line = linesData[0].lines.map( line => 
						line.map( word => word.innerHTML ).join( " " )
					);
			
					// Set target innerHTML while preserving spaces
					target.innerHTML = line.map( item => `<span class="d-inline-flex">${item}</span>` ).join( ' ' );
			
					return target.querySelectorAll( '.d-inline-flex' );
				}
			
				child = lineSplitting();
			}

			if ( 'words' === options.el ) {
				function wordSplitting() {
					const words = Splitting( { target: target, by: 'words' } );
					return words[0].words; // Return words directly
				}
				child = wordSplitting();
			}
			
			if ( 'chars' === options.el ) {
				function charSplitting() {
					const chars = Splitting( { target: target, by: 'chars' } );
					return chars[0].chars; // Return characters directly
				}
				child = charSplitting();
			}

			if ( options.perspective ) {
				target.style.perspective = `${options.perspective}px`;
			}
	
			if ( options.willchange ) {
				target.style.willChange = options.willchange;
			}
	
			anime_animation.add({
				targets: child,
				...options,
				delay: anime.stagger( staggerValue, { start: delay } ),
				complete: function() {

					if ( options.el ) {
						target.classList.add( 'anime-child' );
						target.classList.add( 'anime-complete' );
						
						for ( let i = 0; i < target.children.length; i++ ) {
							const element = target.children[i];
							element.style.removeProperty( 'opacity' );
							element.style.removeProperty( 'transform' );
							element.style.removeProperty( 'transition' );
	
							if ( target.classList.contains( 'grid' ) ) {
								element.style.transition = 'none';
							}
						}

						if ( 'lines' === options.el ) {
							for ( let i = 0; i < target.children.length; i++ ) {
								const element = target.children[i];
								element.classList.remove( 'd-inline-flex' );
								element.classList.add( 'd-inline' );
								element.style.willChange = "inherit";
							}
						}
					} else if ( options.targets ) {
						target.classList.add( 'anime-complete' );
						const element = options.targets;
						$( element ).removeAttr( 'style' );
					} else {
						target.classList.add( 'anime-complete' );
						target.style.removeProperty( 'opacity' );
						target.style.removeProperty( 'transform' );
						target.style.removeProperty( 'transition' );
					}
				}
			});
		}

		// Anime text revealer js
		function slideAnimation( target, options ) {
			let duration  = options.speed ? options.speed : 100,
				direction = options.direction ? options.direction : "lr",
				delay     = options.delay ? options.delay : 0;
	
			target.style.position = 'relative';
	
			// Create slide panel div
			let tmp                  = document.createElement( 'div' );
				tmp.style.width      = tmp.style.height = '100%';
				tmp.style.top        = tmp.style.left   = 0;
				tmp.style.background = options.color ? options.color : '#fff';
				tmp.style.position   = 'absolute';
	
			if ( direction === 'lr' ) {
				tmp.style.WebkitTransformOrigin = tmp.style.transformOrigin = '0% 50%';
				tmp.style.WebkitTransform = tmp.style.transform = 'scaleX(0)';
			} else if ( direction === 'tb' ) {
				tmp.style.WebkitTransformOrigin = tmp.style.transformOrigin = '50% 0%';
				tmp.style.WebkitTransform = tmp.style.transform = 'scaleY(0)';
			} else if ( direction === 'bt' ) {
				tmp.style.WebkitTransformOrigin = tmp.style.transformOrigin = '100% 100%';
				tmp.style.WebkitTransform = tmp.style.transform = 'scaleY(0)';
			} else {
				tmp.style.WebkitTransformOrigin = tmp.style.transformOrigin = '100% 50%';
				tmp.style.WebkitTransform = tmp.style.transform = 'scaleX(0)';
			}
			target.appendChild( tmp );
	
			// init Anime js.
			let slide_anime = anime.timeline();
			slide_anime.add({
				targets: tmp,
				scaleX: ( direction === 'lr' || direction === 'rl' ) ? [0, 1] : [1, 1],
				scaleY: ( direction === 'tb' || direction === 'bt' ) ? [0, 1] : [1, 1],
				duration: duration + 500,
				easing: 'easeInOutCubic',
				delay: delay,
				complete: function() {
					if ( direction === 'lr' ) {
						tmp.style.WebkitTransformOrigin = tmp.style.transformOrigin = '100% 50%';
					} else if ( direction === 'tb' ) {
						tmp.style.WebkitTransformOrigin = tmp.style.transformOrigin = '50% 100%';
					} else if ( direction === 'bt' ) {
						tmp.style.WebkitTransformOrigin = tmp.style.transformOrigin = '0% 0%';
					} else {
						tmp.style.WebkitTransformOrigin = tmp.style.transformOrigin = '0% 50%';
					}
	
					anime({
						targets: tmp,
						duration: duration + 500,
						easing: 'easeInOutCubic',
						scaleX: ( direction === 'lr' || direction === 'rl' ) ? [1, 0] : [1, 1],
						scaleY: ( direction === 'tb' || direction === 'bt' ) ? [1, 0] : [1, 1],
						complete: function() {
							target.removeChild( tmp );
							if ( typeof callback === 'function' ) {
								callback();
							}
						}
					});
				}
			}).add( {
				targets: target.querySelector( '*' ),
				easing: 'easeOutQuint',
				delay: direction === 'lr' ? anime.stagger( duration, { start: 1000 } ) : anime.stagger( -duration, { start: 1000 } ),
				opacity: [ 0, 1 ]
			}, "-=900" );
		}

		function animeEffect( entrance_anime_element ) {
			entrance_anime_element.each( function() {
				let _self        = $( this );
				let animeOptions = _self.attr( 'data-anime' );

				_self.appear();
				$( window ).trigger( 'resize' );

				if ( animeOptions && getWindowWidth() > animeBreakPoint ) {
					animeOptions = JSON.parse( animeOptions );
					const effect = animeOptions.effect && animeOptions.effect.toLowerCase();					
					setTimeout( () => {
						try {
							if ( _self.is( ':appeared' ) ) {
								_self.addClass( 'appear' );
								if ( 'slide' === effect ) {
									slideAnimation( this, animeOptions );
								} else {
									if ( 'undefined' != typeof OurDreamsFrontend && '0' === OurDreamsFrontend.all_animations_disable ) {
										animeAnimation( this, animeOptions );
									}
								}
							} else {
								_self.on( 'appear', function() {
									if ( ! _self.hasClass( 'appear' ) ) {
										_self.addClass( 'appear' );
										if ( 'slide' === effect ) {
											slideAnimation( this, animeOptions );
										} else {
											if ( 'undefined' != typeof OurDreamsFrontend && '0' === OurDreamsFrontend.all_animations_disable ) {
												animeAnimation( this, animeOptions );
											}
										}
									}

									if ( _self.hasClass( 'grid' ) ) {
										_self.find( '.grid-sizer' ).removeAttr( 'style' );
									}
								});
							}
						} catch ( error ) {
							console.error( 'Error parsing anime options:', error );
						}
					}, 100 );
				} else {
					if ( 'undefined' != typeof OurDreamsFrontend && '1' === OurDreamsFrontend.mobile_animation_disable ) {
						_self.removeAttr( 'data-anime' );
					} else {
						animeOptions = JSON.parse( animeOptions );
						const effect = animeOptions.effect && animeOptions.effect.toLowerCase();
						setTimeout( () => {
							try {
								_self.appear();
								if ( _self.is( ':appeared' ) ) {
									_self.addClass( 'appear' );
									if ( 'slide' === effect ) {
										slideAnimation( this, animeOptions );
									} else {
										if ( 'undefined' != typeof OurDreamsFrontend && '0' === OurDreamsFrontend.all_animations_disable ) {
											animeAnimation( this, animeOptions );
										}
									}
								} else {
									_self.on( 'appear', function() {
										if ( ! _self.hasClass( 'appear' ) ) {
											_self.addClass( 'appear' );
											if ( 'slide' === effect ) {
												slideAnimation( this, animeOptions );
											} else {
												if ( 'undefined' != typeof OurDreamsFrontend && '0' === OurDreamsFrontend.all_animations_disable ) {
													animeAnimation( this, animeOptions );
												}
											}
										}

										if ( _self.hasClass( 'grid' ) ) {
											_self.find( '.grid-sizer' ).removeAttr( 'style' );
										}
									});
								}
							} catch ( error ) {
								console.error( 'Error parsing anime options:', error );
							}
						}, 100 );
					}
				}
			});
		}
	});

})( jQuery );
