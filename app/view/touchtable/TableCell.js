Ext.define( 'TableDemo.view.touchtable.TableCell', {
	extend : 'Ext.Component',
	xtype : 'tablecell',

	config : {
		border : '1',
		style : "border-style: solid",
		padding : '3 10'
	},

	setCellContent : function ( value ) {
		// console.log( arguments.callee.displayName, this, arguments );
		this.setHtml( value );
	},

	setProperty : function ( property, value ) {
		// console.log( arguments.callee.displayName, 'this=', this, arguments );
		var setterName = 'set' + Ext.String.capitalize( property );
		if ( setterName in this ) {
			// console.log( arguments.callee.displayName, 'setterName=', setterName );
			this[setterName]( value );
		}
		else {
			this[property] = value;
		}
	},

	copyProperties : Ext.Function.flexSetter(
		function setProperties( property, value ) {
			// console.log( arguments.callee.name, 'this', this );
			this.setProperty( property, value );
		}
	)
} );
