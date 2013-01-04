CKEDITOR.plugins.add('pbcode', {
	icons: 'pbcode',
	lang : ['fr', 'en'],
	init: function(editor) {
		editor.addCommand('pbcodeCommand', new CKEDITOR.dialogCommand('pbcodeDialog'));	
	
		editor.ui.addButton('pbcode', {
			label: editor.lang.pbcode.title,
			command: 'pbcodeCommand'
		});

		CKEDITOR.dialog.add('pbcodeDialog', this.path + 'dialogs/pbcode.js' );
	}	
});