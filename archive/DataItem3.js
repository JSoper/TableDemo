﻿
Ext.define('Ext.dataview.component.DataItem', {
    extend: 'Ext.Container',
    xtype : 'dataitem',

    config: {
        baseCls: Ext.baseCSSPrefix + 'data-item',

        defaultType: 'component',

        /**
         * @cfg {Ext.data.Model} record The model instance of this DataItem. It is controlled by the Component DataView
         * @accessor
         */
        record: null,

        /**
         * @cfg {String} itemCls
         * An additional CSS class to apply to items within the DataView.
         * @accessor
         */
        itemCls: null,

        /**
         * @cfg dataMap
         * The dataMap allows you to map {@link #record} fields to specific configurations in this component.
         *
         * For example, lets say you have a `text` configuration which, when applied, gets turned into an instance of an Ext.Component.
         * We want to update the {@link #html} of this component when the 'text' field of the record gets changed.
         * For example:
         *
         *      dataMap: {
         *          getText: {
         *              setHtml: 'text'
         *          }
         *      }
         *
         * In this example, it is simply a matter of setting the key of the object to be the getter of the config (getText), and then give that
         * property a value of an object, which then has 'setHtml' (the html setter) as the key, and 'text' (the field name) as the value.
         */
        dataMap: {},

        items: [{
            xtype: 'component'
        }]
    },

    /**
     * Updates this container's child items, passing through the dataMap.
     * @param newRecord
     * @private
     */
    updateRecord: function(newRecord) {
        if (!newRecord) {
            return;
        }
        this._record = newRecord;

        var me = this,
            dataview = me.config.dataview,
            data = dataview.prepareData(newRecord.getData(true), dataview.getStore().indexOf(newRecord), newRecord),
            items = me.getItems(),
            item = items.first(),
            dataMap = me.getDataMap(),
            componentName, component, setterMap, setterName;

        if (!item) {
            return;
        }
        for (componentName in dataMap) {
            setterMap = dataMap[componentName];
            component = me[componentName]();
            if (component) {
                for (setterName in setterMap) {
                    if (component[setterName]) {
                        component[setterName](data[setterMap[setterName]]);
                    }
                }
            }
        }

        /**
         * @event updatedata
         * Fires whenever the data of the DataItem is updated
         * @param {Ext.dataview.component.DataItem} this The DataItem instance
         * @param {Object} newData The new data
         */
        me.fireEvent('updatedata', me, data);

        // Bypassing setter because sometimes we pass the same object (different properties)
        item.updateData(data);
    }
});
