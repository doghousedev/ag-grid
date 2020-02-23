const uomValues = []; // Unit of Measure PickList
const categoryValues = []; // Category PickList

// Fetch the options for the Unit of Measure (uom)
const getUom = async () => {

   const res = await fetch(`https://net-av.longjump.com/networking/rest/globalPicklist/53e16e0fc6c641cf868279e1befc2723?alt=json`);

   const data = await res.json();
   const values = data.platform.globalPicklist.enumerationItems;

   // Process through the return and build the array for the data column editor
   values.forEach((value) => {
       uomValues.push(`${value.picklistValue}`);
   });
   return uomValues;
}

// Fetch the options for the Category Id (category_id)
const getCategories = async () => {

   const res = await fetch(`https://net-av.longjump.com/networking/rest/globalPicklist/303e4e6baf304f2785e8795c8f95e789?alt=json`);

   const data = await res.json();
   const values = data.platform.globalPicklist.enumerationItems;

   // Process through the return and build the array for the data column editor
   values.forEach((value) => {

       categoryValues.push(`${value.picklistValue}`);
   });

   return categoryValues;
}

//Fetch and load values 
getUom();
getCategories();

// #region Column Definition
let columnDefs = [{
        headerName: "isEdited",
        field: "is_edited",
        editable: false,
        hide: false,
    },
    {
        headerName: "rec_id",
        field: "id",
        editable: false,
        hide: false,
        rowDrag: true,
    },
    {
        headerName: "Notes",
        field: "notes",
        editable: true,
        hide: true,
    },
    {
        headerName: "Location",
        field: "div_1",
        editable: true,
        enableRowGroup: true,
        hide: true,
    },
    {
        headerName: "System",
        field: "div_2",
        editable: true,
        enableRowGroup: true,
        hide: true,
    },
    {
        headerName: "Category",
        field: "category_id",
        editable: true,
        enableRowGroup: true,
        cellEditor: 'agRichSelectCellEditor',
        cellEditorParams: {
            values: categoryValues,
        }
    },
    {
        headerName: "Optional",
        field: "isoptional",
        editable: true,
        cellEditor: 'agRichSelectCellEditor',
        cellEditorParams: {
            values: ['N', 'Y'],
        },
    },
    {
        headerName: "Qty",
        field: "quantity_total",
        editable: true,
        valueParser: numberParser,
    },
    {
        headerName: "UoM",
        field: "uom",
        editable: true,
        cellEditor: 'agRichSelectCellEditor',
        cellEditorParams: {
            values: uomValues,
        },
    },
    {
        headerName: "Pricebook Id",
        field: "pricebook_id",
        hide: true,
    },
    {
        headerName: "Pref Vendor",
        field: "preferred_vendor_display",
        enableRowGroup: true,
        hide: false,
    },
    {
        headerName: "Part Number",
        field: "part_number",
        filter: true,
        editable: true,
        enableRowGroup: true,
    },
    {
        headerName: "Mfg Link",
        field: "mfg_link",
        hide: true,
    },
    {
        headerName: "Mfg",
        field: "manufacturer",
        editable: true,
        enableRowGroup: true,
    },
    {
        headerName: "Description",
        field: "description",
        // autoHeight: true,
        cellClass: 'cell-wrap-text',
        cellEditor: 'agLargeTextCellEditor',
        cellEditorParams: {
            maxLength: 500,
            rows: 10,
            cols: 60,
        },
        editable: true,
        width: 200,
    },
    {
        headerName: "Unit Cost",
        field: "unit_cost",
        cellClass: 'number-cell',
        editable: true,
        type: "numericColumn",
        // valueFormatter: numberFormatter,
        //   valueParser: numberParser,
    },
    {
        headerName: "PMod",
        field: "price_modifier",
        editable: true,
    },
    {
        headerName: "Unit Price",
        field: "unit_price",
        cellClass: 'number-cell',
        type: "numericColumn",
        // valueFormatter: numberFormatter,
        // valueParser: numberParser,
    },
    {
        headerName: "List Price",
        field: "list_price",
        type: "numericColumn",
    },
    {
        headerName: "Ext Cost",
        field: "extended_cost",
        aggFunc: 'sum',
        cellClass: "number-cell",
        editable: false,
        enableValue: true,
        //    valueGetter:  function(params) {
        //       return params.data.quantity_total * params.data.unit_cost;
        //   },
        valueFormatter: numberFormatter,
        valueParser: numberParser,
        width: 100,
    },
    {
        headerName: "Ext Price",
        field: "extended_price",
        aggFunc: 'sum',
        cellClass: 'number-cell',
        editable: false,
        enableValue: true,
        //    valueGetter:  function(params) {
        //       return params.data.quantity_total * params.data.unit_price;
        //   },
        valueFormatter: numberFormatter,
        valueParser: numberParser,
        width: 100,
    },
    {
        headerName: "Ext List",
        field: "extended_list_price",
        aggFunc: 'sum',
        cellClass: 'number-cell',
        editable: false,
        enableValue: true,
        //    valueGetter:  function(params) {
        //       return params.data.quantity_total * params.data.unit_price;
        //   },
        valueFormatter: numberFormatter,
        valueParser: numberParser,
        width: 100,
    },
    {
        headerName: "Tax",
        field: "istaxable",
        editable: true,
        cellEditor: 'agRichSelectCellEditor',
        cellEditorParams: {
            values: ['Y', 'N']
        },
    },
];
//#endregion Column Definition