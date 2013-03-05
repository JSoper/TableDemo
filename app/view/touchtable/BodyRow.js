Ext.define( 'TableDemo.view.touchtable.BodyRow', {
	extend : 'Ext.dataview.component.DataItem',
	xtype : 'bodyrow',
	requires : ['TableDemo.view.touchtable.DataCell'],

	config : {
		layout : 'hbox',
		// defaultType :  'datacell' , not needed
		/*
		 * @cfg {Boolean/Object} inline
		 * When set to true the items within the DataView will have their display set to inline-block
		 * and be arranged horizontally. By default the items will wrap to the width of the DataView.
		 * Passing an object with { wrap: false } will turn off this wrapping behavior and overflowed
		 * items will need to be scrolled to horizontally.
		 * @accessor
		 */
//		bodyCell0 : true, // {},
//		bodyCell1 : true, // {},
//		bodyCell2 : true, // {},
		/* really dont need dataMap
//			dataMap : { // replaced by call to setCellContent() in applyBodyCell()
//				getBodyCell0 : { setCellContent : 'text' },
//				getBodyCell1 : { setCellContent : 'num' },
//				getBodyCell2 : { setCellContent : 'french' }
//			},
*/
		items : [] // Defaults to: [{xtype: 'component'}], which creates a cell we don't want
	},

	// GET RID OF ALL THIS AND HAVE INITIALIZE BUILD THE CELLS
	// NEED TO WORK WHEN STORE IS UPDATED
//	applyBodyCell0 : function ( value ) {
//		return this.applyBodyCell( value );
//	},
//	applyBodyCell1 : function ( value ) {
//		return this.applyBodyCell( value );
//	},
//	applyBodyCell2 : function ( value ) {
//		return this.applyBodyCell( value );
//	},
//	updateBodyCell0 : function ( newCell, oldCell ) {
//		this.updateCell( newCell, oldCell );
//	},
//	updateBodyCell1 : function ( newCell, oldCell ) {
//		this.updateCell( newCell, oldCell );
//	},
//	updateBodyCell2 : function ( newCell, oldCell ) {
//		this.updateCell( newCell, oldCell );
//	},

	// TableBody needs to generate & insert the apply/update methods in the TableRow class based on what is in the config

//	applyBodyCell : function ( value ) {
//		console.log( arguments.callee.displayName, this, arguments );
//		var columnIndex = ++this.columnIndex;
//		return this.createBodyCell( columnIndex );
//	},

//	updateCell : function ( newCell, oldCell ) {
//		// console.log( arguments.callee.displayName, this, arguments );
//		if ( oldCell ) {
//			this.remove( oldCell );
//		}
//		if ( newCell ) {
//			this.add( newCell );
//		}
//	},

	//	var dataview = object.dataview; // this is the TableBody
	//	var defaults = object.defaults; // has an itemsCls property, which is null
	//	var record = object.record;
	//	var xtype = object.xtype;
//	constructor : function ( object ) {
//		console.log( arguments.callee.displayName, this, arguments );
//		this.columnIndex = -1;
//		this.callParent( arguments );
//		// this.createBodyCells();
//	},

	getColumnConfigs : function () { return this.dataview.columns; },

	getRowRecord : function () { return this.config.record; },

	createBodyCell : function ( columnIndex ) {
		// console.log( arguments.callee.displayName, this, arguments );
		// console.log( arguments.callee.displayName, 'dataview', this.dataview );
		var columnConfig = this.getColumnConfigs()[columnIndex];

		// console.log( arguments.callee.displayName, 'config:', this.config );
		// console.log( arguments.callee.displayName, 'config.record:', this.getRowRecord().id );
		// console.log( arguments.callee.displayName, 'config.record:', this.config.record );

		// debugger;
		var dataCell = Ext.create( 'TableDemo.view.touchtable.DataCell' );
		var record = this.getRowRecord();
		// console.log( arguments.callee.displayName, 'columnConfig:', columnConfig );
		var fieldName = columnConfig.dataIndex;
		var fieldValue;

		var row = this.dataview.items.getCount() - 1;
		// console.log( arguments.callee.displayName, 'row:', row );
		if ( row === 0 ) { // BUG: row is always = 0
			fieldValue = this.checkDataIndex( fieldName, columnConfig, record, columnIndex );
			// console.log( 'fieldValue:', fieldValue )
		}
		else {
			fieldValue = record.get( fieldName );
		}
		dataCell.setCellContent( fieldValue, arguments );
		return dataCell;
	},

	checkDataIndex : function ( fieldName, columnConfig, record, index ) {
		var fieldValue;
		if ( 'dataIndex' in columnConfig ) {
			var fieldNameOk = this.checkFieldName( fieldName, record, index );
			// console.log( 'fieldNameOk:', fieldNameOk )
			fieldValue = fieldNameOk ? record.get( fieldName ) : 'Bad dataIndex in columns config';
		}
		else {
			fieldValue = 'No dataIndex in columns config';
		}
		return fieldValue;
	},

	checkFieldName : function ( dataIndex, record, index ) {
		// console.log( arguments.callee.displayName, 'dataIndex:', dataIndex );
//		console.log( arguments.callee.displayName, 'record:', record );
//		console.log( arguments.callee.displayName, 'getFields:', record.getFields() );
		var fieldsCollection = record.getFields();
		var fieldNames = fieldsCollection.keys;
//		console.log( arguments.callee.displayName, 'fieldsCollection:', fieldsCollection );
//		console.log( arguments.callee.displayName, 'fieldNames', fieldNames );
		if ( -1 === fieldNames.indexOf( dataIndex ) ) {
			var message = 'The dataIndex, ' + dataIndex + ', for column #' + index + ' is not in this record:';
			console.error( message, record ); // record.statics().getName() );
			return false;
		}
		return true;
	},

	createBodyCells : function () {
		// console.group( arguments.callee.displayName, 'this=', this );
		var columnConfigs = this.getColumnConfigs();
		for ( var index = 0, length = columnConfigs.length; index < length; index++ ) {
			var dataCell = this.createBodyCell( index );
			this.add( dataCell );
		}
		// console.groupEnd();
	},

	setPropertiesInCells : function () {
		console.group( arguments.callee.displayName, 'this=', this );
		var columnConfigs = this.getColumnConfigs();
		var cellsCollection = this.items;
		var dataCells = cellsCollection.getRange();
		for ( var index = 0, length = dataCells.length; index < length; index++ ) {
			dataCells[index].copyProperties( columnConfigs[index] );
		}
		console.groupEnd();
	},

	initialize : function () {
		console.group( arguments.callee.displayName, this, arguments );
		this.createBodyCells();
		this.callParent( arguments );
		this.setPropertiesInCells();
		console.groupEnd();
	},

	updateRecord : function () {
		console.group( arguments.callee.displayName, this, arguments );
		this.callParent( arguments );
		// this.setPropertiesInCells();
		console.groupEnd();
	},

	updateListItem : function () {
		console.group( arguments.callee.displayName, this, arguments );
		this.callParent( arguments );
		console.groupEnd();
	}
} );
