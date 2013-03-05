Ext.define( 'TableDemo.view.touchtable.DataCell', {
	extend : 'TableDemo.view.touchtable.BodyCell',
	xtype : 'datacell',

	setCellContent : function ( value, columnConfig ) {
		// console.log( arguments.callee.displayName, this, arguments );
		// var renderer = columnConfig.renderer || this.renderer;
		this.callParent( arguments );
	}
} );
