// It would be possible to do this every time the store gets
// change record event

Ext.define( 'TableDemo.view.HtmlTable',
	{  extend : 'Ext.Container',
		xtype : 'htmltable',
		config : {
			layout : 'fit',
			scrollable : 'vertical',
			styleHtmlContent : true
		},
		initialize : function () {
			console.log( arguments.callee.displayName, arguments );
			var html = Ext.DomHelper.markup(
				{  tag : 'table',
					border : 1,
					children : [
						{  tag : 'tr',
							children : [
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' }
							]
						},
						{  tag : 'tr',
							children : [
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' }
							]
						},
						{  tag : 'tr',
							children : [
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' }
							]
						},
						{  tag : 'tr',
							children : [
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' }
							]
						},
						{  tag : 'tr',
							children : [
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' }
							]
						},
						{  tag : 'tr',
							children : [
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' }
							]
						},
						{  tag : 'tr',
							children : [
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' }
							]
						},
						{  tag : 'tr',
							children : [
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' }
							]
						},
						{  tag : 'tr',
							children : [
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' }
							]
						},
						{  tag : 'tr',
							children : [
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' }
							]
						},
						{  tag : 'tr',
							children : [
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' }
							]
						},
						{  tag : 'tr',
							children : [
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' }
							]
						},
						{  tag : 'tr',
							children : [
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' }
							]
						},
						{  tag : 'tr',
							children : [
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' }
							]
						},
						{  tag : 'tr',
							children : [
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' }
							]
						},
						{  tag : 'tr',
							children : [
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' }
							]
						},
						{  tag : 'tr',
							children : [
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' }
							]
						},
						{  tag : 'tr',
							children : [
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' },
								{ tag : 'td', html : '1234' }
							]
						}
					]
				}
			);
			this.setHtml( html );
			this.callParent( arguments );
		}
	} );

/*{
 http://www.sencha.com/forum/showthread.php?203687-How-to-style-an-HTML-TABLE-to-have-the-Sencha-Touch-look

 xtype: 'panel',
 tpl: Ext.create('Ext.XTemplate',
 '<table>',
 '<tpl for="."><tpl for="nested_node"><tr>',
 '<td>{firstname}</td><td>{lastname}</td></tr></tpl></tpl>',
 '</table>'),
 },
 */

/* http://www.sencha.com/forum/showthread.php?182835-How-to-build-table-in-Xtemplate
 var tpl = new Ext.XTemplate(
 '<table>',
 '<tr>',
 '<td>Col 1</td>',
 '<td>Col 2</td>',
 '<td>Col 3</td>',
 '</tr>',
 '<tpl for=".">',
 '<tr>',
 '<td>{col1}</td>',
 '<td>{col2}</td>',
 '<td>{col3}</td>',
 '</tr>',
 '</tpl>',
 '</table>'
 );

 var html = tpl.apply([
 { col1 : 'one', col2 : 'two', col3 : 'three' },
 { col1 : 'one', col2 : 'two', col3 : 'three' }
 ]);

 new Ext.Panel({
 fullscreen : true,
 html       : html
 });
 */
