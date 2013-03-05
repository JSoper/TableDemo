var tableData =
	[
		{   text : 'One',
			num : 1,
			roman : 'I'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		},
		{  text : 'Two',
			num : 2,
			roman : 'II'
		}
	];

Ext.define( 'TableDemo.store.SimpleStore', {
		extend : 'Ext.data.Store',
		config : {
			storeId : 'SimpleStore',
			autoload : true,
			fields : ['text', 'num', 'roman'],
			data : tableData
		}
	},

	function createdFn$SimpleStore() {
		console.log( arguments.callee.name );
		Ext.create( 'TableDemo.store.SimpleStore' );
	}
);
