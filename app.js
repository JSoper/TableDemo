Ext.application( {
	name : 'TableDemo',
	requires : ['TableDemo.view.Main'],
	launch : function launch$app() {
		console.log( arguments.callee.name );
		Ext.Viewport.add( Ext.create( 'TableDemo.view.Main' ) );
	}
} );
