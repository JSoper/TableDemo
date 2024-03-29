Ext.define( 'extspect.view.tree.TreeNavigationView',
	{  extend : 'extspect.view.ExtSpectNavigationView',
		xtype : 'treenavigationview',
		id : 'es-treenavigationview',
		requires : ['extspect.view.tree.tabpanel.TreeTabPanel'],
		dataListStoreName : 'extspect.store.tree.TreeListStore',

		showListing : false,
		showListeners : false,
		showInstances : true,

		config : { items : [
			{ xtype : 'treetabpanel' }
		] },

		fetchDataLists : function () { return this.query( '[isExtSpectDataList=true]' ); },

		// A new object has appeared in the Object view
		// Try to select it on the datalist in the tree
		selectNewObject : function ( newObject ) {
			var dataLists = this.fetchDataLists();
			for ( var index = 0 , len = dataLists.length; index < len; index++ ) {
				var dataList = dataLists[ index ];
				var store = dataList.getStore();
				if ( store ) { // a list that is not visible mght not have a store
					var record = store.findRecord( "text", StringOf.to$( newObject ), 0, true );
					if ( record ) {
						dataList.deselectAll();
						dataList.select( record, false );
					}
				}
			}
		}
	}
);
