Ext.define( 'TableDemo.view.touchtable.FooterRow', {
	extend : 'TableDemo.view.touchtable.FrameRow',
	xtype : 'footerrow',
	requires : 'TableDemo.view.touchtable.FooterCell',

	config : {
		docked : 'bottom',
		cellClassName : 'TableDemo.view.touchtable.FooterCell'
	}
} );
