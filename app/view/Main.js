Ext.define( 'TableDemo.view.Main', {
	extend : 'Ext.tab.Panel',
	requires : [
		'TableDemo.view.touchtable.TouchTable',
		'TableDemo.view.HtmlTable',
		'extspect.ExtSpect'
	],
	config : {
		width : '100%', // window.innerWidth,
		height : '100%', // window.innerHeight,
		defaults : {
			layout : 'fit'
		},
		items : [
			{  title : 'Touch Table',
				xtype : 'touchtable'
			},
			{  title : 'Html Table',
				xtype : 'htmltable'
			},
			{  xtype : 'extspect',
				app : TableDemo.app
			}
		]
	},
	initialize : function () {
		console.log( arguments.callee.displayName, arguments );
		// this.add( Ext.create( 'extspect.ExtSpect', { app:  TableDemo.app } ) );
		this.callParent( arguments );
	}
} );
