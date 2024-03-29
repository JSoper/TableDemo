// dataview List explained p. 4-31

Ext.define( 'extspect.view.object.datalist.PropertiesOrArrayList',
	{  extend : 'extspect.view.ExtSpectDataList',

		config : {    indexBar : true, // Ext.IndexBar
			// TODO: indexBar should only be true if more than 10 items

			// TODO: TEST FOR DIRECT DATA  object.hasOwnProperty( pname )
			itemTpl : // direct data should be bold, inherited plain
				'<span style = "font-weight : bold">{id} : </span>' +
					'<span style = "font-weight : normal">{text}</span>'
		},

		determineAndSetIndexBar : function () {
			var groupedOk = this.determineGroupedOk();
			this.setGrouped( groupedOk );
			// determineStoreName() depends on this.getGrouped()

			// We do not use the indexBar for groups because the
			// groupings by datatype follow at the bottom in lowercase.
			this.setIndexBar( !groupedOk );

			// this.callParent( arguments )
		},

		createRowObject : function ( value, id ) { return { id : id, value : value, text : StringOf.to$( value ) }; },

		// TODO: arg list for onItemDisclosure is WRONG in doc, BUG
		handleItemTap : function ( dataview, index, element, record, event, object, eOptsObject ) {
			var value = record.data.value;

			var id = record.data.id;
			var navigationView = this.up( 'objectnavigationview' );
			var parentTabPanel = this.fetchParentTabPanel();

			if ( ( value instanceof Ext.util.MixedCollection ) ||
				( value instanceof Ext.util.HashMap ) )
			{
				value = this.extCollectionToArray( value );
				navigationView.pushNewArrayPanel( value, id, parentTabPanel,
					'extspect.view.object.tabpanel.MixedCollectionTabPanel' );
			}
			else {
				if ( value instanceof Ext.util.Collection ) {
					navigationView.pushNewArrayPanel( value, id, parentTabPanel,
						'extspect.view.object.tabpanel.CollectionTabPanel' );
				}
				else {
					if ( value instanceof Array )
					{ navigationView.pushNewArrayPanel( value, id, parentTabPanel ); }
					else {
						if ( value instanceof Object )
						{ navigationView.pushNewPropertiesPanel( value ); }
					}
				}
			}
		}
	}
);
