Ext.define( 'TableDemo.view.touchtable.FooterCell', {
	extend : 'TableDemo.view.touchtable.FrameCell',
	xtype : 'footercell',

	config : { html : 'touchtable.FooterCell' },

	setCellContent : function ( value, columnConfig ) {
		// console.log( arguments.callee.displayName, this, arguments );
		var renderer = columnConfig.footerRenderer || this.renderer;
		// this.setHtml( 'FooterCell#setCellContent()' );
		arguments[0] = 'FooterCell#setCellContent()';
		this.callParent( arguments );
	}
} );
