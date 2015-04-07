
# CKEditor Embed Workflow plugin

This is just a demonstration plugin, highlighting how you can extend [embedbase](ckeditor.com/addon/embedbase) plugin to serve custom content.

This plugin uses a custom server side implementation written in NodeJS.

## Customizations

This plugin shows you following customization:

### Custom response markup

It shows that you can modify host response using `handleResponse` event.

### Insert embed widgets using API

Introduces `editor.insertEmbedWorkflow` method that allows you to easily insert a embed widget using API only.

### Changes default validation RegExp

With changing default validation RegExp you can achieve some neat tricks. For example: this plugin will allow you to provide a string like `#10925` and server-side will recognize it as a ticket abbreviation.

Again for that you need a server-side support.

## Installation

Install this plugin for CKEditor.

Most likely you'll want also to run server side at your localhost, for that see [micro-oembed installation](https://github.com/mlewand/micro-oembed) guide. Having the server running you can start mess up with the plugin.

This is just a test plugin, so it uses `localhost:9090` host by default.