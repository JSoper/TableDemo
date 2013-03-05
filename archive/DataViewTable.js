// DataViews allow the use of stores

Ext.define( 'TableDemo.view.DataViewTable', {
	extend : 'Ext.DataView',
	xtype : 'dataviewtable',
	requires : ['TableDemo.store.SimpleStore'],
	config : {
		scrollable : 'vertical',
		styleHtmlContent : true,
		// html : '<table>',
		// baseCls : 'jim',
		itemCls : 'someitem',
		store : 'SimpleStore',
		itemTpl : '<tr><td>{text}</td><td>{num}</td></tr>'
//		itemTpl : '{text}={num}'

		// http://www.vanseodesign.com/css/tables/
//		itemTpl : '<div style="display:table-row"><div style="display:table-cell">{text}</div>' +
//			'<div style="display:table-cell">{p}</div></div>'

		// The problem with using tpl is that Touch rewrites the containing divs
		// converting them to read <div class=x-dataview-item">
		// It also wraps each <div> with <div class="data-view-item">
		// And the num field does not get included

//		tpl : [
//			'<table>',
//				'<tpl for=".">' ,
//					'<tr><td>{text}</td><td>{num}</td></tr>',
//				'</tpl>',
//			'</table>'
//		]

//		tpl : [
//			'<div style="display:table">',
//				'<tpl for=".">' ,
//					'<div style="display:table-row">',
//						'<div style="display:table-cell">{text}</div>',
//						'<div style="display:table-cell">{num}</div>',
//					'</div>',
//				'</tpl>',
//			'</div>'
//		]
	},
	initialize : function initialize$DataViewTable() {
		console.log( arguments.callee.name );
		console.log( arguments.callee.displayName, arguments );
		this.callParent( arguments );
	}
} );

//		initialize : function initialize$Main() {
//			console.log( arguments.callee.name, arguments );
////			var dataview = this.down( //'dataview-container' ) ;
////			 'dataview' )
////			console.log( arguments.callee.name, dataview.element );
////			// dataview.element.wrap( window.document.createElement( 'table' ) ) ;
////			dataview.element.wrap( { tag : 'table' }) ;
//			var component = this.down( //'.x-dataview-container' ) ;
//			 'dataview' )
//			console.log( arguments.callee.name, 'component=', component );
//			// component.element.wrap( window.document.createElement( 'table' ) ) ;
//			component.element.wrap( { tag : 'div', style : 'display:table' }) ;
//			this.callParent( arguments );
//		}
//	}
//);

