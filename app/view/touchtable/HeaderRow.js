Ext.define( 'TableDemo.view.touchtable.HeaderRow', {
	extend : 'TableDemo.view.touchtable.FrameRow',
	xtype : 'headerrow',
	requires : 'TableDemo.view.touchtable.HeaderCell',

	config : {
		docked : 'top',
		cellClassName : 'TableDemo.view.touchtable.HeaderCell'
	}
} );
