// The current sole subclass of the BodyCell is the DataCell
// We could potentially have cells for group rows
// but the store would have to contain the relevant data for it to work.

Ext.define( 'TableDemo.view.touchtable.BodyCell', {
	extend : 'TableDemo.view.touchtable.TableCell',
	xtype : 'bodycell'
//	setCellContent : function ( value, columnConfig ) {
//		// console.log( arguments.callee.displayName, this, arguments );
//		var renderer = columnConfig.renderer || this.renderer
//		arguments[0] = 'FooterCell#setCellContent()'
//		this.callParent( arguments );
//	}
} );
