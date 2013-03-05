Ext.define( 'TableDemo.view.touchtable.TouchTable', {
	extend : 'Ext.Container',
	xtype : 'touchtable',

	requires : [
		'TableDemo.view.touchtable.HeaderRow',
		'TableDemo.view.touchtable.TableBody',
		'TableDemo.view.touchtable.FooterRow'
	],

	config : {
		// The horizontal margin * 2, plus the column widths should add up to 100%.
		margin : '0 5%',

		// This will need a config of columns, like in
		// http://localhost/extjs-4.1.1/docs/index.html#!/api/Ext.touchtable.Panel-cfg-columns
		// http://localhost/extjs-4.1.1/docs/index.html#!/api/Ext.touchtable.column.Column
		defaults : {
			// BodyRow#initialize() copies *all* of the columns config to the data cells.
			// dataCellClassName

			// FrameRow#buildCells() copies into its cell the width, minWidth, maxWidth if present.
			// Do not use a flex config, a cell component has no setFlex() accessor.
			// It also calls TableCell#setCellContent(),
			//      which puts the columnTitle into the header cell's html property.
			// FooterCell#setCellContent() overrides setCellContent() to allow customization

			// footerRenderer
			// footerCellClassName

			// The dataIndex is the name of the field in the record that appears in the column's data cells.
			// groupable, sortable, renderer,
			// xtype [datecolumn, templatecolumn, booleancolumn, numbercolumn (format), actioncolumn
			// maybe have an ellispsis property to designate the max character width
			columns : [ // default width should be 100px (GridColumn)
				{ columnTitle : 'First', dataIndex : 'text', width : '30%' },
				{ columnTitle : 'Second', dataIndex : 'num', width : '30%' },
				{ columnTitle : 'Third', dataIndex : 'roman', width : '30%' }
			]
		},

		items : [
			{  xtype : 'headerrow' },
			{  xtype : 'tablebody' },
			{  xtype : 'footerrow' }
		]
	}
} );
/* if the sum of the column minWidths is less than the screen width,
	TouchTable sets the layout of the dataRows to auto or vbox,
	and puts them into a ListView, grouped by record
	(with a designated listviewGrouping field)
	(or the rows themselves will have a border around them)

	The recommendation here is that width is in %, minWidth in pixels.
	*/
