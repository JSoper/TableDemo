Ext.define( 'TableDemo.view.touchtable.FrameRow', {
	extend : 'TableDemo.view.touchtable.TableRow',

	config : {
		layout : 'hbox'
	},

	buildCells : function () {
		var columnConfigs = this.columns;

		for ( var length = columnConfigs.length, index = 0; index < length; index++ ) {
			var cell = Ext.create( this.getCellClassName(), {} );
			var columnConfig = columnConfigs[index];
			// console.log( arguments.callee.displayName, columnConfig );

			cell.setCellContent( columnConfig.columnTitle, columnConfig );

			// Copy over properties if they are in the columnConfig
			var properties = ['width', 'minWidth', 'maxWidth', 'sortable', 'groupable'];
			var propertiesLength = properties.length;
			for ( var propertyIndex = 0; propertyIndex < propertiesLength; propertyIndex++ ) {
				var property = properties[propertyIndex];
				var value = columnConfig[property];
				// console.log( arguments.callee.displayName, property, value );
				if ( value ) { cell.setProperty( property, value ); }
			}

			this.add( cell );
		}
	},

	initialize : function () {
		// console.log( arguments.callee.displayName, this, arguments );
		this.buildCells();
	}
} );
