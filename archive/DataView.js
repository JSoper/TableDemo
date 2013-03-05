
Ext.define('Ext.dataview.DataView', {
    extend: 'Ext.Container',

    alternateClassName: 'Ext.DataView',

    mixins: ['Ext.mixin.Selectable'],

    xtype: 'dataview',

    requires: [
        'Ext.LoadMask',
        'Ext.data.StoreManager',
        'Ext.dataview.component.Container',
        'Ext.dataview.element.Container'
    ],

    /**
     * @event select
     * @preventable doItemSelect
     * Fires whenever an item is selected
     * @param {Ext.dataview.DataView} this
     * @param {Ext.data.Model} record The record assosciated to the item
     */

    /**
     * @event refresh
     * @preventable doRefresh
     * Fires whenever the DataView is refreshed
     * @param {Ext.dataview.DataView} this
     */

    config: {
        store: null,

        /**
         * @cfg
         * @inheritdoc
         */
        baseCls: Ext.baseCSSPrefix + 'dataview',

        itemTpl: '<div>{text}</div>',

        /**
         * @cfg {Boolean/Object} inline
         * When set to true the items within the DataView will have their display set to inline-block
         * and be arranged horizontally. By default the items will wrap to the width of the DataView.
         * Passing an object with { wrap: false } will turn off this wrapping behavior and overflowed
         * items will need to be scrolled to horizontally.
         * @accessor
         */
        inline: null,

        /**
         * @cfg {Boolean} useComponents
         * Flag the use a component based DataView implementation.  This allows the full use of components in the
         * DataView at the cost of some performance.
         *
         * Checkout the [DataView Guide](#!/guide/dataview) for more information on using this configuration.
         * @accessor
         */
        useComponents: null,

        /**
         * @cfg {Object} itemConfig
         * A configuration object that is passed to every item created by a component based DataView. Because each
         * item that a DataView renders is a Component, we can pass configuration options to each component to
         * easily customize how each child component behaves.
         * Note this is only used when useComponents is true.
         * @accessor
         */
        itemConfig: {},

        /**
         * @cfg {String} defaultType
         * The xtype used for the component based DataView. Defaults to dataitem.
         * Note this is only used when useComponents is true.
         * @accessor
         */
        defaultType: 'dataitem',
    },

    constructor: function(config) {
        var me = this;

        // <debug warn>
        if (config && config.layout) {
            Ext.Logger.warn('Attempting to create a DataView with a layout. DataViews do not have a layout configuration as their items are laid out automatically.');
            delete config.layout;
        }
        // </debug>

        me.hasLoadedStore = false;

        me.mixins.selectable.constructor.apply(me, arguments);

        me.callParent(arguments);
    },

    storeEventHooks: {
        beforeload: 'onBeforeLoad',
        load: 'onLoad',
        refresh: 'refresh',
        addrecords: 'onStoreAdd',
        removerecords: 'onStoreRemove',
        updaterecord: 'onStoreUpdate'
    },

    initialize: function() {
        this.callParent();
        var me = this,
            container;

        me.on(me.getTriggerCtEvent(), me.onContainerTrigger, me);

        container = me.container = this.add(new Ext.dataview[me.getUseComponents() ? 'component' : 'element'].Container({
            baseCls: this.getBaseCls()
        }));
        container.dataview = me;

        me.on(me.getTriggerEvent(), me.onItemTrigger, me);

        container.on({
            itemtouchstart: 'onItemTouchStart',
            itemtouchend: 'onItemTouchEnd',
            itemtap: 'onItemTap',
            itemtaphold: 'onItemTapHold',
            itemtouchmove: 'onItemTouchMove',
            itemsingletap: 'onItemSingleTap',
            itemdoubletap: 'onItemDoubleTap',
            itemswipe: 'onItemSwipe',
            scope: me
        });

        if (this.getStore()) {
            this.refresh();
        }
    },

    applyInline: function(config) {
        if (Ext.isObject(config)) {
            config = Ext.apply({}, config);
        }
        return config;
    },

    updateInline: function(newInline, oldInline) {
        var baseCls = this.getBaseCls();
        if (oldInline) {
            this.removeCls([baseCls + '-inlineblock', baseCls + '-nowrap']);
        }
        if (newInline) {
            this.addCls(baseCls + '-inlineblock');
            if (Ext.isObject(newInline) && newInline.wrap === false) {
                this.addCls(baseCls + '-nowrap');
            }
            else {
                this.removeCls(baseCls + '-nowrap');
            }
        }
    },

    /**
     * Function which can be overridden to provide custom formatting for each Record that is used by this
     * DataView's {@link #tpl template} to render each node.
     * @param {Object/Object[]} data The raw data object that was used to create the Record.
     * @param {Number} recordIndex the index number of the Record being prepared for rendering.
     * @param {Ext.data.Model} record The Record being prepared for rendering.
     * @return {Array/Object} The formatted data in a format expected by the internal {@link #tpl template}'s overwrite() method.
     * (either an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'}))
     */
    prepareData: function(data, index, record) {
        data.xindex = index + 1;
        return data;
    },

    updateData: function(data) {
        var store = this.getStore();
        if (!store) {
            this.setStore(Ext.create('Ext.data.Store', {
                data: data
            }));
        } else {
            store.add(data);
        }
    },

    applyStore: function(store) {
        var me = this,
            bindEvents = Ext.apply({}, me.storeEventHooks, { scope: me }),
            proxy, reader;

        if (store) {
            store = Ext.data.StoreManager.lookup(store);
            if (store && Ext.isObject(store) && store.isStore) {
                store.on(bindEvents);
                proxy = store.getProxy();
                if (proxy) {
                    reader = proxy.getReader();
                    if (reader) {
                        reader.on('exception', 'handleException', this);
                    }
                }
            }
            //<debug warn>
            else {
                Ext.Logger.warn("The specified Store cannot be found", this);
            }
            //</debug>
        }

        return store;
    },

    updateStore: function(newStore, oldStore) {
        var me = this,
            bindEvents = Ext.apply({}, me.storeEventHooks, { scope: me }),
            proxy, reader;

        if (oldStore && Ext.isObject(oldStore) && oldStore.isStore) {
            if (oldStore.autoDestroy) {
                oldStore.destroy();
            }
            else {
                oldStore.un(bindEvents);
                proxy = oldStore.getProxy();
                if (proxy) {
                    reader = proxy.getReader();
                    if (reader) {
                        reader.un('exception', 'handleException', this);
                    }
                }
            }
        }

        if (newStore) {
            if (newStore.isLoaded()) {
                this.hasLoadedStore = true;
            }

            if (newStore.isLoading()) {
                me.onBeforeLoad();
            }
            if (me.container) {
                me.refresh();
            }
        }
    },

    onLoad: function(store) {
        var scrollable = this.getScrollable();

        //remove any masks on the store
        this.hasLoadedStore = true;
        this.setMasked(false);

        //enable the scroller again
        if (scrollable) {
            scrollable.getScroller().setDisabled(false);
        }
        if (!store.getCount()) {
            this.showEmptyText();
        }
    },

    /**
     * Refreshes the view by reloading the data from the store and re-rendering the template.
     */
    refresh: function() {
        var me = this,
            container = me.container;

        if (!me.getStore()) {
            if (!me.hasLoadedStore && !me.getDeferEmptyText()) {
                me.showEmptyText();
            }
            return;
        }
        if (container) {
            me.fireAction('refresh', [me], 'doRefresh');
        }
    },

    applyItemTpl: function(config) {
        return (Ext.isObject(config) && config.isTemplate) ? config : new Ext.XTemplate(config);
    },

    onAfterRender: function() {
        var me = this;
        me.callParent(arguments);
        me.updateStore(me.getStore());
    },

    getViewItems: function() {
        return this.container.getViewItems();
    },

    doRefresh: function(me) {
        var container = me.container,
            store = me.getStore(),
            records = store.getRange(),
            items = container.getViewItems(),
            recordsLn = records.length,
            itemsLn = items.length,
            deltaLn = recordsLn - itemsLn,
            scrollable = me.getScrollable(),
            i, item;

        if (this.getScrollToTopOnRefresh() && scrollable) {
            scrollable.getScroller().scrollToTop();
        }

        // No items, hide all the items from the collection.
        if (recordsLn < 1) {
            me.onStoreClear();
            return;
        }

        // Too many items, hide the unused ones
        if (deltaLn < 0) {
            container.moveItemsToCache(itemsLn + deltaLn, itemsLn - 1);
            // Items can changed, we need to refresh our references
            items = container.getViewItems();
            itemsLn = items.length;
        }
        // Not enough items, create new ones
        else if (deltaLn > 0) {
            container.moveItemsFromCache(store.getRange(itemsLn));
        }

        // Update Data and insert the new html for existing items
        for (i = 0; i < itemsLn; i++) {
            item = items[i];
            container.updateListItem(records[i], item);
        }
    },

    onStoreClear: function() {
        var me = this,
            container = me.container,
            items = container.getViewItems();

        container.moveItemsToCache(0, items.length - 1);
        this.showEmptyText();
    },

    // private
    onStoreAdd: function(store, records) {
        if (records) {
            this.container.moveItemsFromCache(records);
        }
    },

    // private
    onStoreRemove: function(store, records, indices) {
        var container = this.container,
            ln = records.length,
            i;
        for (i = 0; i < ln; i++) {
            container.moveItemsToCache(indices[i], indices[i]);
        }
    },

    // private
    onStoreUpdate: function(store, record, newIndex, oldIndex) {
        var me = this,
            container = me.container;
        oldIndex = (typeof oldIndex === 'undefined') ? newIndex : oldIndex;


        if (oldIndex !== newIndex) {
            container.moveItemsToCache(oldIndex, oldIndex);
            container.moveItemsFromCache([record]);
            if (me.isSelected(record)) {
                me.doItemSelect(me, record);
            }
        }
        else {
            // Bypassing setter because sometimes we pass the same record (different data)
            container.updateListItem(record, container.getViewItems()[newIndex]);
        }
    }
    //<deprecated product=touch since=2.0>
}, function() {

});
