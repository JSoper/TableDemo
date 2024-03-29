Ext.define( 'extspect.view.object.tabpanel.MixedCollectionTabPanel',
	{  extend : 'extspect.view.ExtSpectTabPanel',
		xtype : 'mixedcollectiontabpanel',
		isMixedCollectionTabPanel : true,

		config : {    items : [
			{  title : 'Items',
				items : { xtype : 'arraylist' }
			} ,
			{  title : 'Properties',
				items : [
					{ xtype : 'extpropertieslist' } ,
					{ xtype : 'propertieslisttoolbar' }
				]
			} ,
			{  title : 'Internal',
				items : [
					{ xtype : 'internallist' } ,
					{ xtype : 'propertieslisttoolbar' }
				]
			} ,
			{  title : 'Methods',
				items : [
					{ xtype : 'methodlist' } ,
					{ xtype : 'methodslisttoolbar' }
				]
			}
		]
		}
	}
);
