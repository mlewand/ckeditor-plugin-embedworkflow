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

				upcast: function( el, data ) {
					if ( el.name == 'div' && el.attributes[ urlAttribute ] ) {
						data.url = el.attributes[ urlAttribute ];

						return true;
					}
				},

				downcast: function( el ) {
					el.attributes[ urlAttribute ] = this.data.url;
				}
			}, true );

			editor.widgets.add( 'embedworkflow', widgetDefinition );

			// Do not filter contents of the div[<urlAttribute>] at all.
			editor.filter.addElementCallback( function( el ) {
				if ( urlAttribute in el.attributes ) {
					return CKEDITOR.FILTER_SKIP_TREE;
				}
			} );
		}
	} );

} )();
