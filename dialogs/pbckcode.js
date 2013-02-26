CKEDITOR.dialog.add('pbckcodeDialog', function ( editor ) {

// load JS file
var head = document.getElementsByTagName('HEAD').item(0);
var script= document.createElement("script");
script.type = "text/javascript";
script.src = CKEDITOR.plugins.getPath('pbckcode') + "dialogs/ace/ace.js";
head.appendChild(script);

// load CSS file
var link  = document.createElement('link');
link.rel  = 'stylesheet';
link.type = 'text/css';
link.href = CKEDITOR.plugins.getPath('pbckcode') + "dialogs/style.css";
link.media = 'all';
head.appendChild(link);

// default values of the plugin
if(editor.config.pbckcode.cls == undefined)
	editor.config.pbckcode.cls = "prettyprint linenums";
if(editor.config.pbckcode.modes == undefined)
	editor.config.pbckcode.modes =  [ ['PHP', 'php'], ['HTML', 'html'], ['CSS', 'css'] ]
if(editor.config.pbckcode.defaultMode == undefined)
	editor.config.pbckcode.defaultMode =  editor.config.pbckcode.modes[0][1];
if(editor.config.pbckcode.theme == undefined)
	editor.config.pbckcode.theme = 'textmate';
if (editor.config.pbckcode.highlitjs == undefined)
    editor.config.pbckcode.highlitjs = false;

//check if highlight.js is used and set names of element/attribute
if(editor.config.pbckcode.highlitjs){
editor.config.pbckcode.languagePrefix ="class";
editor.config.pbckcode.htmlElement ="code"
} else {
editor.config.pbckcode.languagePrefix ="data-language";
editor.config.pbckcode.htmlElement ="pre"
}

var AceEditor;

return {
		// Basic properties of the dialog window: title, minimum size.
		title: editor.lang.pbckcode.title,
		minWidth: 600,
		minHeight: 400,

		// Dialog window contents definition.
		contents:
		[{
			id		 : 'code-container',
			label	 : editor.lang.pbckcode.tabCode,
			elements :
			[{
				type        : 'select',
				id          : 'code-select',
				items       : editor.config.pbckcode.modes,
				defaultMode : editor.config.pbckcode.defaultMode,
				setup       : function(element) {	
					this.setValue(element.getAttribute(editor.config.pbckcode.languagePrefix));
				},
				commit : function(element) {
					element.setAttribute(editor.config.pbckcode.languagePrefix, this.getValue());
				},
				onChange: function(api) {
					AceEditor.getSession().setMode("ace/mode/" + this.getValue());
				}
			},
			{
				type  : 'html',
				html  : '<div id="code"></div>',
				setup : function(element) {
					// get the value of the editor
					code = element.getHtml();
					code = code.replace(new RegExp('<br/>', 'g'), '\n');
					code = code.replace(new RegExp('<br>', 'g'), '\n');
					code = code.replace(new RegExp('&lt;', 'g'), '<');
					code = code.replace(new RegExp('&gt;', 'g'), '>');
					code = code.replace(new RegExp('&amp;', 'g'), '&');
					
					AceEditor.setValue(code);
				}, 
				commit : function(element) {
					element.setText(AceEditor.getValue());
				}
			}]
		}],
		onLoad: function() {
			// we get the #code div and style it
			var code = document.getElementById('code');
			code.style.width = '600px';
			code.style.height = '380px';
			code.style.position = 'relative';
			
			// we load the ACE plugin to our div
			AceEditor = ace.edit("code");
			AceEditor.getSession().setMode("ace/mode/" + editor.config.pbckcode.defaultMode);
			AceEditor.setTheme("ace/theme/" + editor.config.pbckcode.theme);
		},
		onShow : function() {
			// get the select
			var selection = editor.getSelection();
			// get the entire element
			var element = selection.getStartElement();
			
			// looking for the pre parent tag
			if(element)
				element = element.getAscendant(editor.config.pbckcode.htmlElement, true);
			
			// if there is no pre tag, it is an addition. Therefore, it is an edition
			if(!element || element.getName() != editor.config.pbckcode.htmlElement) {
				element = editor.document.createElement(editor.config.pbckcode.htmlElement);
				this.insertMode = true;
			}
			else
				this.insertMode = false;
			
			// get the element to fill the inputs
			this.element = element;
			
			// we empty the editor
			AceEditor.setValue('');
			
			// we fill the inputs
			if(!this.insertMode)
				this.setupContent(this.element);		
		},
		// This method is invoked once a user clicks the OK button, confirming the dialog.
		onOk: function() {
			var dialog = this,
				element = this.element;
			
			// we get the value of the inputs
			this.commitContent(element);
			
			// we add a new pre tag into ckeditor editor
			if(this.insertMode) {

				// when highlight.js is used, check if 'pre' is the parent node otherwise add 'pre' element
				if(editor.config.pbckcode.highlitjs){ 
					var codeElement = element;
					element = codeElement.getParent();
	                if(!element || element.getName() != 'pre'){
	                    element = editor.document.createElement('pre');
	                    codeElement.appendTo(element);
	                }
         	   }
         	   	element.setAttribute('class', editor.config.pbckcode.cls);
				editor.insertElement(element);
			}
		}
	};


});