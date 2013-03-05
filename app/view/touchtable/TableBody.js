Ext.define( 'TableDemo.view.touchtable.TableBody', {
	extend : 'Ext.dataview.DataView', // List
	xtype : 'tablebody',

	requires : [
		'TableDemo.store.SimpleStore',
		'TableDemo.view.touchtable.DataRow'
	],

	config : {
		store : 'SimpleStore',
		useComponents : true,
		defaultType : 'datarow',
		defaults : {
			//			tableCell : true, // {},
			//			tableCell2 : true, // {},
			//			dataMap : {
			//				getTableCell : { setCellContent : 'text' },
			//				getTableCell2 : { setCellContent : 'num' }
			//			},
			// columnConfigs : this.columns
		},
		// layout : 'fit', //this screws up scrolling
	},
    /**
     * Refreshes the view by reloading the data from the store and re-rendering the template.
     */
//	refresh : function () {
//		console.group( arguments.callee.displayName, this, arguments );
//		this.callParent( arguments );
//		console.groupEnd();
//	},
	doRefresh : function () {
		// console.group( arguments.callee.displayName, this, arguments );
		Trace.start( arguments );
		this.callParent( arguments );
		console.groupEnd();
	},
	constructor : function () {
		Trace.start( arguments );
		this.callParent( arguments );
		console.groupEnd();
	},
	initialize : function () {
		Trace.start( arguments );
		this.callParent( arguments );
		console.groupEnd();
	},
//    /**
//     * Function which can be overridden to provide custom formatting for each Record that is used by this
//     * DataView's {@link #tpl template} to render each node.
//     * @param {Object/Object[]} data The raw data object that was used to create the Record.
//     * @param {Number} recordIndex the index number of the Record being prepared for rendering.
//     * @param {Ext.data.Model} record The Record being prepared for rendering.
//     * @return {Array/Object} The formatted data in a format expected by the internal {@link #tpl template}'s overwrite() method.
//     * (either an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'}))
//     */
	prepareData : function () {
		// console.group( arguments.callee.displayName, this, arguments );
		var result = this.callParent( arguments );
		// console.log( 'result:', result.toString() );
		Trace.vars( 'result', result);
		// console.groupEnd( );
		return result;
	},
	updateData : function () {
		console.group( arguments.callee.displayName, this, arguments );
		this.callParent( arguments );
		console.groupEnd();
	},
} );

//	onAfterRender : function () {
//		console.group( arguments.callee.displayName, this, arguments );
//		this.callParent( arguments );
//		console.groupEnd();
//	},
//	applyStore : function () {
//		console.group( arguments.callee.displayName, this, arguments );
//		var result = this.callParent( arguments );
//		console.groupEnd();
//		return result;
//	},
//	updateStore : function () {
//		console.group( arguments.callee.displayName, this, arguments );
//		this.callParent( arguments );
//		console.groupEnd();
//	},
//	onStoreUpdate : function () {
//		console.group( arguments.callee.displayName, this, arguments );
//		this.callParent( arguments );
//		console.groupEnd();
//	}
