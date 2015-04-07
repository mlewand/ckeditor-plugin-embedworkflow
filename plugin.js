/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

/**
 * @fileOverview The "embedworkflow" plugin.
 *
 */

( function() {
	'use strict';

	CKEDITOR.plugins.add( 'embedworkflow', {
		lang: 'en', // %REMOVE_LINE_CORE%
		icons: 'embedworkflow', // %REMOVE_LINE_CORE%
		hidpi: true, // %REMOVE_LINE_CORE%
		requires: 'embedbase',

		init: function( editor ) {
			var widgetDefinition = CKEDITOR.plugins.embedBase.createWidgetBaseDefinition( editor ),
				defaultInit = widgetDefinition.init,
				// Name of custom attribute used to store the oEmbed URL.
				urlAttribute = 'data-oembed-workflow-url';

			CKEDITOR.tools.extend( widgetDefinition, {
				dialog: 'embedBase',
				button: editor.lang.embedworkflow.button,
				allowedContent: 'div[!' + urlAttribute + ']',
				requiredContent: 'div[' + urlAttribute + ']',
				providerUrl: new CKEDITOR.template(
					editor.config.embedworkflow_provider ||
					// By default we'll simply use a localhost machine.
					'//localhost:9090/?url={url}&callback={callback}'
				),

				init: function( wid ) {
					defaultInit.call( this );

					this.on( 'handleResponse', this._handleWorkflowResponse, null, null, 1000 );
				},

				upcast: function( el, data ) {
					if ( el.name == 'div' && el.attributes[ urlAttribute ] ) {
						data.url = el.attributes[ urlAttribute ];

						return true;
					}
				},

				downcast: function( el ) {
					el.attributes[ urlAttribute ] = this.data.url;
				},

				// RegExp will match anything, because we want to allow some shortcuts like:
				// * #12345 - for ticket numbers.
				// * ckPlugin:tabletools - for CKEditor plugins.
				//
				// Still we want ofc to allow users to use valid URLs.
				urlRegExp: /.*/,

				_handleWorkflowResponse: function( evt ) {

					var hasHtml = evt.data && evt.data.html,
						provider = evt.data.response && evt.data.response.provider_name;

					if ( hasHtml && provider == 'tracTicket' ) {
						// Let's say that we want to add a link to each ticket widget.
						evt.data.html += '<a href="http://dev.ckeditor.com/">See all tickets</a>';
					} else {
						console.log( 'no html :(' );
					}
				}
			}, true );

			editor.widgets.add( 'embedworkflow', widgetDefinition );

			// Expose a convenient API to insert a widget.
			editor.insertEmbedWorkflow = function( url, params ) {
				var editor = this,
					element = editor.document.createElement( 'div' ),
					widget;

				editor.insertElement( element );
				widget = editor.widgets.initOn( element, 'embedworkflow' );
				widget.loadContent( url, params );

				return widget;
			};

			// Do not filter contents of the div[<urlAttribute>] at all.
			editor.filter.addElementCallback( function( el ) {
				if ( urlAttribute in el.attributes ) {
					return CKEDITOR.FILTER_SKIP_TREE;
				}
			} );
		}
	} );

} )();
