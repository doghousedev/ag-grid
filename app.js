// Created: 2019/06/04 12:24:41
// Last modified: 2020/02/23 13:13:47

console.log('loading app.js')

let quoteId = rec_id

// #region PICKLISTS
const uomValues = [] // Unit of Measure PickList
const categoryValues = [] // Category PickList
const stateValues = []
const jobCostClassValues = []
const taxRateValues = [] //Tax Rates
// #endregion PICKLISTS

// Grid 
let rowData = []

//#region URL
const ADD_ITEMS_URL = `https://net-av.longjump.com/networking/rest/record/Quote_Item_Details/?retrieveRecord=true&alt=json`

const DELETE_ITEMS_URL = `https://net-av.longjump.com/networking/rest/record/Quote_Item_Details/`

const FETCH_ITEMS_URL = `https://net-av.longjump.com/networking/rest/record/Quote_Item_Details?fieldList=*&filter=related_quote=${rec_id}&alt=json`

//#endregion URL

//#region Column Definition
const hideColumn = true

let columnDefs = [{
        headerName: "isEdited",
        field: "is_edited",
        editable: false,
        hide: false,
        rowDrag: true,
    },
    {
        headerName: "rec_id",
        field: "id",
        editable: false,
        hide: true,
        suppressColumnsToolPanel: true,
        rowDrag: false,
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
        hide: true,
    },
    {
        headerName: "Job Class",
        field: "job_cost_class",
        editable: true,
        enableRowGroup: true,
        cellEditor: 'agRichSelectCellEditor',
        cellEditorParams: {
            values: jobCostClassValues,
        },
        hide: true,
    },
    {
        headerName: "Qty",
        field: "quantity_total",
        editable: true,
        aggFunc: 'sum',
        cellClass: 'number-cell',
        valueParser: numberValueParser,

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
        suppressColumnsToolPanel: true,
        hide: true,
    },
    {
        headerName: "Pref Vendor",
        field: "preferred_vendor_display",
        enableRowGroup: true,
        hide: false,
    },
    {
        headerName: "Mfg Link",
        field: "mfg_link",
        suppressColumnsToolPanel: true,
        hide: true,
    },
    {
        headerName: "Mfg",
        field: "manufacturer",
        editable: true,
        enableRowGroup: true,
    },
    {
        headerName: "Part Number",
        field: "part_number",
        filter: true,
        editable: true,
        enableRowGroup: true,
        //   cellRenderer: function (params) {
        //      if (typeof params.value != "undefined") {
        //         return `<a href="https://google.com/search?q=${params.value}" target="_blank">${params.value}</a>`
        //      }
        //   }
        cellStyle: {
            color: 'RebeccaPurple'
        },
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
        cellRenderer: function (params) {
            if (params.node.group === true) {
                return ''
            } else {
                return params.value
            }
        },
        editable: true,
        valueParser: numberValueParser,
        valueFormatter: function (params) {
            return formatMoney(params.value)
        },
    },
    {
        headerName: "CMod",
        field: "cost_discount_percentage",
        cellStyle: {
            color: 'red'
        },
        editable: true,
    },
    {
        headerName: "Net Unit Cost",
        field: "net_unit_cost",
        cellClass: 'number-cell',
        cellRenderer: function (params) {
            if (params.node.group === true) {
                return ''
            } else {
                return params.value
            }
        },
        editable: false,
        type: "numericColumn",
        valueParser: numberValueParser,
        valueFormatter: function (params) {
            return formatMoney(params.value)
        },
    },
    {
        headerName: "Apply Cost Discount?",
        field: "apply_cost_discount",
        editable: true,
        cellEditor: 'agRichSelectCellEditor',
        cellEditorParams: {
            values: ['Y', 'N']
        },
        hide: hideColumn,
    },
    {
        headerName: "PMod",
        field: "price_modifier",
        cellStyle: {
            color: 'blue'
        },
        editable: true,
    },
    {
        headerName: "Unit Price",
        field: "unit_price",
        cellClass: 'number-cell',
        cellRenderer: function (params) {
            if (params.node.group === true) {
                return ''
            } else {
                return params.value
            }
        },
        type: "numericColumn",
        valueParser: numberValueParser,
        valueFormatter: function (params) {
            return formatMoney(params.value)
        },
    },
    {
        headerName: "DMod",
        field: "price_discount_percentage",
        cellStyle: {
            color: 'red'
        },
        editable: true,
    },
    {
        headerName: "Net Unit Price",
        field: "net_unit_price",
        cellClass: 'number-cell',
        cellRenderer: function (params) {
            if (params.node.group === true) {
                return ''
            } else {
                return params.value
            }
        },
        editable: false,
        type: "numericColumn",
        valueParser: numberValueParser,
        valueFormatter: function (params) {
            return formatMoney(params.value)
        },
    },
    {
        headerName: "List Price",
        field: "list_price",
        cellClass: 'number-cell',
        cellRenderer: function (params) {
            if (params.node.group === true) {
                return ''
            } else {
                return params.value
            }
        },
        type: "numericColumn",
        valueParser: numberValueParser,
        valueFormatter: function (params) {
            return formatMoney(params.value)
        },
        hide: true,
    },
    {
        headerName: "Ext Cost",
        field: "extended_cost",
        aggFunc: 'sum',
        cellClass: "number-cell",
        editable: false,
        enableValue: true,
        valueParser: numberValueParser,
        valueFormatter: function (params) {
            return formatMoney(params.value)
        },
        width: 100,
    },
    {
        headerName: "Ext Net Cost",
        field: "extended_net_cost",
        aggFunc: 'sum',
        cellClass: "number-cell",
        editable: false,
        enableValue: true,
        valueParser: numberValueParser,
        valueFormatter: function (params) {
            return formatMoney(params.value)
        },
        width: 100,
    },
    {
        headerName: "Ext Price",
        field: "extended_price",
        aggFunc: 'sum',
        cellClass: 'number-cell',
        editable: false,
        enableValue: true,
        valueParser: numberValueParser,
        valueFormatter: function (params) {
            return formatMoney(params.value)
        },
        width: 100,
    },
    {
        headerName: "Ext Net Price",
        field: "extended_net_price",
        aggFunc: 'sum',
        cellClass: 'number-cell',
        editable: false,
        enableValue: true,
        valueParser: numberValueParser,
        valueFormatter: function (params) {
            return formatMoney(params.value)
        },
        width: 100,
    },
    {
        headerName: "Ext List",
        field: "extended_list_price",
        aggFunc: 'sum',
        cellClass: 'number-cell',
        editable: false,
        enableValue: true,
        valueParser: numberValueParser,
        valueFormatter: function (params) {
            return formatMoney(params.value)
        },
        width: 100,
        hide: true,
    },
    {
        headerName: "Tax?",
        field: "istaxable",
        editable: true,
        cellEditor: 'agRichSelectCellEditor',
        cellEditorParams: {
            values: ['Y', 'N']
        },
        hide: hideColumn,
    },
    {
        headerName: "Tax",
        field: "tax_amount",
        aggFunc: 'sum',
        cellClass: 'number-cell',
        editable: false,
        enableValue: true,
        valueParser: numberValueParser,
        valueFormatter: function (params) {
            return formatMoney(params.value)
        },
        width: 60,
        hide: false,
    },
    {
        headerName: "Frgt",
        field: "freight_sell",
        aggFunc: 'sum',
        cellClass: 'number-cell',
        editable: false,
        enableValue: true,
        valueParser: numberValueParser,
        valueFormatter: function (params) {
            return formatMoney(params.value)
        },
        width: 60,
        hide: false,
    },
    {
        headerName: "Materials",
        field: "sundries_sell",
        aggFunc: 'sum',
        cellClass: 'number-cell',
        editable: false,
        enableValue: true,
        valueParser: numberValueParser,
        valueFormatter: function (params) {
            return formatMoney(params.value)
        },
        width: 60,
        hide: false,
    },
]
//#endregion Column Definition

//#region Grid
let gridOptions = {
    animateRows: true,
    autoGroupColumnDef: {
        headerName: 'Group',
        width: 100,
    },

    columnDefs: columnDefs,

    getContextMenuItems: getContextMenuItems,
    allowContextMenuWithControlKey: true,

    defaultColDef: {
        editable: true,
        filter: true,
        resizable: true,
        sortable: true,
        width: 70,
    },

    enableCellChangeFlash: true,
    enableFillHandle: false,
    enableRangeSelection: true,

    fillOperation: function (params) {
        // console.log(params)
        //    console.log(params.currentIndex)
        //     // gridOptions.api.forEachNodeAfterFilterAndSort(function (rowNode, index) {
        //     //     updateRowCalcPaste(rowNode)
        // })
        //     return false
    },

    getRowClass: function (params) {
        let rowNode = params.node
        if (rowNode.group) {
            return 'category-grey'
        } else {
            // no extra classes for leaf rows
            return null
        }
    },
    groupDefaultExpanded: 1,
    groupIncludeFooter: false,
    groupIncludeTotalFooter: true,
    groupSelectsChildren: true,

    icons: {
        'custom-stats': '<span class="ag-icon ag-icon-custom-stats"></span>'
    },

    multiSortKey: 'ctrl',

    onCellEditingStarted: function (e) {},

    onCellEditingStopped: function (e) {
        //run on matching one of the calculation columns
        const col_arr = ['category_id', 'description', 'quantity_total', 'unit_cost', 'unit_price', 'list_price', 'price_modifier']
        const matchFound = col_arr.find((matching_column) => matching_column === e.column.colId)

        if (true) {
            updateRowCalc(e)
        }
    },

    onCellValueChanged: function (event) {
        event.data.is_edited = 'edited'
    },

    onColumnResized: onColumnResized,

    onGridReady: function (params) {
        params.api.sizeColumnsToFit()
        console.log(`Grid ready`)
    },

    onPasteEnd: onPasteEnd,

    onRowEditingStarted: function (event) {},

    onRowEditingStopped: function (event) {},

    onRowDragMove: onRowDragMove,

    onRowValueChanged: function (e) {
        updateRowCalc()
    },

    pagination: false,
    pivotPanelShow: 'off',

    rememberGroupStateWhenNewData: true,
    rowDragManaged: false,
    rowData: rowData,
    rowGroupPanelShow: 'never',
    rowSelection: 'multiple',


    sideBar: {
        toolPanels: [{
                id: 'columns',
                labelDefault: 'Columns',
                labelKey: 'columns',
                iconKey: 'columns',
                toolPanel: 'agColumnsToolPanel',
            },
            {
                id: 'filters',
                labelDefault: 'Filters',
                labelKey: 'filters',
                iconKey: 'filter',
                toolPanel: 'agFiltersToolPanel',
            },
            {
                id: 'customStats',
                labelDefault: 'Recap',
                labelKey: 'customStats',
                iconKey: 'custom-stats',
                toolPanel: 'customStatsToolPanel',
            },
            {
                id: 'customCharts',
                labelDefault: 'Charts',
                labelKey: 'customCharts',
                iconKey: 'chart',
                toolPanel: 'customChartToolPanel',
            }
        ],
        defaultToolPanel: ''
    },
    components: {
        customStatsToolPanel: CustomStatsToolPanel,
        customChartToolPanel: CustomChartToolPanel,
    },

    suppressAggFuncInHeader: true,
    suppressClearOnFillReduction: true,
    suppressRowClickSelection: false,

    undoRedoCellEditing: true,
    undoRedoCellEditingLimit: 20,

}

// Render Grid
let eGridDiv = document.querySelector('#myGrid')

// create the grid passing in the div
new agGrid.Grid(eGridDiv, gridOptions)

//#endregion Grid

//#region Functions

//  Add record to the DB
const addRecordDB = async (url, method, data, rowNode) => {

    fetch(url, {
            method: method,
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            const rec_id = response.platform.record.id
            rowNode.setDataValue('id', rec_id)
            gridOptions.api.refreshCells()
        })
        .catch(error => console.error('Error:', error))
}

// Add a new price book item in using LJ functions
const addPricebookItem = (searchBoxPartNumber) => {
   //parent.window.lj_addCustomObjectRecord('0b36719500ab40b9aae9d1015df5ec2a-1','','Service?t=498&amp;id=-1&amp;a=add&amp;object_id=0b36719500ab40b9aae9d1015df5ec2a')
   parent.window.open('https://net-av.longjump.com/networking/Service?t=498&a=add&id=-1&object_id=0b36719500ab40b9aae9d1015df5ec2a&prefill_data=1&part_number='+ searchBoxPartNumber,'PopupPriceBook','width=1200,height=800')
    return true
}
// Format 1 or 0 to Yes (Y) or No (N)
function booleanToValue(params) {
    return (params === '1') ? 'Y' : 'N'
}

// remove special characters
function cleanText(text) {

    text = text.replace(/&quot/g, '\"')
    text = text.replace(/&#39/g, '\"')
    text = text.replace(/&amp/g, '\&')
    text = text.replace(/&#43/g, '\+')
    text = text.replace(/&#8486/g, 'ohm')
    text = text.replace(/[\uFFFD]/g, '') //special character of black diamond with white question mark

    return text
}

// Push Data from Fetched JSON to the Grid
function createData(record, index, arr) {

    record.apply_cost_discount = !record.apply_cost_discount ? 'N' : record.apply_cost_discount
    record.category_id = record.category_id.displayValue
    record.cost_discount_percentage = !record.cost_discount_percentage ? 'D0' : record.cost_discount_percentage
    record.description = cleanText(record.description)
    record.extended_cost = parseFloat(record.extended_cost)
    record.extended_price = parseFloat(record.extended_price)
    record.extended_net_cost = parseFloat(record.extended_net_cost)
    record.extended_net_price = parseFloat(record.extended_net_price)
    record.extended_list_price = parseFloat(record.extended_list_price)
    record.freight_sell = isNaN(record.freight_sell) ? 0.00 : parseFloat(record.freight_sell)
    record.isoptional = record.isoptional
    record.istaxable = record.istaxable
    record.job_cost_class = record.job_cost_class
    record.list_price = parseFloat(record.list_price).toFixed(2)
    record.mfg_link = record.mfg_link.content
    record.net_unit_cost = parseFloat(record.net_unit_cost).toFixed(2)
    record.net_unit_price = parseFloat(record.net_unit_price).toFixed(2)
    record.price_modifier = record.price_modifier.toUpperCase()
    record.preferred_vendor_display = cleanText(record.preferred_vendor_display)
    record.preferred_vendor_content = record.preferred_vendor.content
    record.pricebook_id = record.pricebook_part_number.content
    record.price_discount_percentage = !record.price_discount_percentage ? 'D0' : record.price_discount_percentage
    record.quantity_total = parseFloat(record.quantity_total)
    record.sundries_sell = parseFloat(record.sundries_sell)
    record.tax_amount = parseFloat(record.tax_amount)
    record.unit_cost = parseFloat(record.unit_cost).toFixed(2)
    record.unit_price = parseFloat(record.unit_price).toFixed(2)
    record.uom = record.uom.displayValue

    rowData.push(record)
}

// Push data to Row Data for new Item
function createNewRowData() {
    let newRowData = {
        apply_cost_discount: 'N',
        cost_discount_percentage: 'D0',
        extended_cost: 0.00,
        extended_price: 0.00,
        extended_net_cost: 0.00,
        extended_net_price: 0.00,
        extended_list_price: 0.00,
        freight_sell: 0.00,
        job_cost_class: 'Equipment',
        list_price: 0.00,
        isoptional: 'N',
        istaxable: 'Y',
        net_unit_cost: 0.00,
        net_unit_price: 0.00,
        price_discount_percentage: 'D0',
        price_modifier: 'P20',
        quantity_total: 1,
        sundries_sell: 0,
        tax_amount: 0.00,
        uom: 'Each',
        unit_cost: 0.00,
        unit_price: 0.00,

    }
    return newRowData
}

// Currency formatter
function currencyFormatter(params) {
    let newNum = parseFloat(params.value).toFixed(2)
    return '$' + newNum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    //  return newNum
}

// Remove record from DB
const deleteRecordDB = async function (url, method, rowNode) {
    //get the node record id
    let rec_id = rowNode.data.id

    //append the record id to the url
    url = `${url}${rec_id}`

    //call the delete REST call
    const res = await fetch(url, {
        method: method
    })

    let data = await res.json()
    let code = await data.platform.message.code

    if (code === '-1') {
        const error = data.platform.description
        console.error(error)
        // Swal.fire({
        //    title: 'Error!',
        //    text: error,
        //    type: 'warning',
        //    showConfirmButton: true
        // })
    }
    if (code === '0') { //code '0' is successful 
    }
    updateRecap()
}

//Fetch items from DB and build rowData for items
const fetchAsync = async (url, method) => {
    const result = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    data = await result.json()
    const records = data.platform.record
    let recordCount = data.platform.recordCount

    if (recordCount < 0) {
        console.log(`Fetch ajax call has returned an error.`)
    }

    if (recordCount == 0) {
        console.log(`No records to show.`)
    }

    if (recordCount == 1) {

        createData(records)
    }

    if (recordCount > 1) {
        const rows = records.forEach(createData)
    }

    gridOptions.api.setRowData(rowData)
}

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount)
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount

        const negativeSign = amount < 0 ? "-" : ""

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
        let j = (i.length > 3) ? i.length % 3 : 0

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "")
    } catch (e) {}
}

function getContextMenuItems(params) {
    let result = [{
            // custom item
            name: 'Add Row',
            action: function () {
                onAddRow()
            },
            disabled: false,
            tooltip: 'Add Line at end.'
        },
        {
            // custom item
            name: 'Insert Rows',
            action: function () {
                insertRows()
            },
            disabled: false,
            tooltip: 'Insert above cursor line at end.'
        },
        {
            // custom item
            name: 'Delete Rows',
            action: function () {
                onRemoveSelected()
            },
            disabled: false,
            tooltip: 'Delete the rows selected'
        },
        'separator',
        {
            // custom item
            name: 'Modify Price',
            action: function () {
                alert(`we'll add it later`)
            },
            disabled: false,
            tooltip: 'Modify'
        },
        // built in copy item
        'separator',
        'copy',
        'copyWithHeaders',
        'separator',
        'export',
        'separator',
        'chartRange'
    ]

    return result
}

//Initialize picklist values
function getPicklists() {
    getUom()
    getCategories()
    getStates()
    getJobCostClasses()
    getTaxRates()

    const stateList = new Array('--', 'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MH', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'PW', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY')

    //replace with pure js
    $('#sold_to_state').html($.map(stateList, function (i) {
        return '<option value="' + i + '">' + i + '</option>'
    }).join(''))

    $('#ship_to_state').html($.map(stateList, function (i) {
        return '<option value="' + i + '">' + i + '</option>'
    }).join(''))

    $('#bill_to_state').html($.map(stateList, function (i) {
        return '<option value="' + i + '">' + i + '</option>'
    }).join(''))
}

// Get selected rows
function getSelectedRows() {
    return gridOptions.api.getSelectedNodes().length
}

// Fetch the options for the Unit of Measure (uom)
const getUom = async () => {

    const res = await fetch(`https://net-av.longjump.com/networking/rest/globalPicklist/53e16e0fc6c641cf868279e1befc2723?alt=json`)

    const data = await res.json()
    const values = data.platform.globalPicklist.enumerationItems

    // Process through the return and build the array for the data column editor
    values.forEach((value) => {
        uomValues.push(`${value.picklistValue}`)
    })
    return uomValues
}

// Fetch the options for the Category Id (category_id)
const getCategories = async () => {

    const res = await fetch(`https://net-av.longjump.com/networking/rest/globalPicklist/303e4e6baf304f2785e8795c8f95e789?alt=json`)

    const data = await res.json()
    const values = data.platform.globalPicklist.enumerationItems

    // Process through the return and build the array for the data column editor
    values.forEach((value) => {

        categoryValues.push(`${value.picklistValue}`)
    })

    return categoryValues
}

const getJobCostClasses = async () => {

    const res = await fetch(`https://net-av.longjump.com/networking/rest/globalPicklist/f8cc9022d76a4a68a1515010fc22b752?alt=json`)

    const data = await res.json()
    const values = data.platform.globalPicklist.enumerationItems

    // Process through the return and build the array for the data column editor
    values.forEach((value) => {

        jobCostClassValues.push(`${value.picklistValue}`)
    })

    return jobCostClassValues
}

// Fetch the options for the states (state2)
const getStates = async () => {

    const res = await fetch(`https://net-av.longjump.com/networking/rest/globalPicklist/316671085?alt=json`)

    const data = await res.json()
    const values = data.platform.globalPicklist.enumerationItems

    // Process through the return and build the array for the data column editor
    values.forEach((value) => {

        stateValues.push(`${value.picklistValue}`)
    })

    return stateValues
}

// Fetch the options for the taxRates
const getTaxRates = async () => {

    const res = await fetch(`https://net-av.longjump.com/networking/rest/globalPicklist/4643e32b712847f7b6b26f97c3443183?alt=json`)

    const data = await res.json()
    const values = data.platform.globalPicklist.enumerationItems

    // Process through the return and build the array for the data column editor
    values.forEach((value) => {

        taxRateValues.push(`${value.picklistValue}`)
    })

    return taxRateValues
}

// Is the cell empty or null or undefined
function isNullOrEmpty(s) {
    return (s == null || s === "")
}

// Format number
function numberFormatter(params) {
    let newNum = parseFloat(params.value).toFixed(2)
    return newNum
}

// Parse strings into number
function numberParser(params) {
    return Number(params.newValue)
}

// Insert Rows
function insertRows() {

    let selectedNode = gridOptions.api.getSelectedNodes()

    let numOfSelectedRows = gridOptions.api.getSelectedNodes().length

    let insertRowIndex

    let newItem = createNewRowData()

    //determine if its inside of a group
    //if not grouped - then do this 

    if (selectedNode.length === 0) {
        insertRowIndex = 0

    } else {

        insertRowIndex = selectedNode[0].rowIndex

        let res = gridOptions.api.updateRowData({
            add: [newItem],
            addIndex: insertRowIndex
        })

        processDBRecord(res)
    }
}

// add rows
function onAddRow() {
    let newItem = createNewRowData()
    let res = gridOptions.api.updateRowData({
        add: [newItem]
    })

    processDBRecord(res)
}

// Ensure that the value is a number not a string being sent back the grid
function numberValueParser(params) {
    return Number.parseFloat(params.newValue)
}

function onColumnResized() {
    // gridOptions.api.resetRowHeights()
}

// Move to Selected Group
function onMoveToGroup() {

    let selectedNodeData = gridOptions.api.getSelectedNodes()
    let selectedRowData = gridOptions.api.getSelectedRows()

    // create a list of the items to choose from or enter your own
    groupBy = selectedNodeData.length == 0 ? '' : selectedNodeData[0].parent.field

    let key = []
    let group = []
    let newValue

    if (isNullOrEmpty(groupBy)) {
        //change to a swal alert for prettiness
        alert(`Check to be sure you've selected at least one row and a groupBy has been enabled for a column.`)
    } else {
        gridOptions.api.forEachLeafNode(function (rowNode, index) {
            key.push(rowNode.parent.key)
        })

        group = Array.from(new Set(key)).sort()
        newValue = prompt(`Please select a value and enter it`, `${group[0]}`)
    }

    selectedRowData.forEach(function (dataItem, index) {

        dataItem[groupBy] = newValue
        dataItem.is_edited = 'edited'
    })

    gridOptions.api.updateRowData({
        update: selectedRowData
    })
}

function onPasteEnd(params) {
    gridOptions.api.forEachNodeAfterFilterAndSort(function (rowNode, index) {
        updateRowCalcPaste(rowNode)
    })
}

function onRemoveSelected() {
    let selectedData = gridOptions.api.getSelectedRows()
    let res = gridOptions.api.updateRowData({
        remove: selectedData
    })
    processDBRecord(res)
}

function onRowDragMove(event) {
    let movingNode = event.node
    let overNode = event.overNode

    // find out what sortedBy group we are hovering over
    let groupKey, sortedBy
    sortedBy = event.columnApi.columnController.rowGroupColumns[0].colId

    if (overNode.group) {
        // if over a group, we take the group key (which will be the
        // sortedBy as we are grouping by sortedBy)
        groupKey = overNode.key
    } else {
        // if over a non-group, we take the sortedBy directly
        groupKey = overNode.data[sortedBy]
    }

    let needToChangeParent = movingNode[sortedBy] !== groupKey

    if (needToChangeParent) {
        let movingData = movingNode.data
        movingData[sortedBy] = groupKey
        movingData.is_edited = 'edited'
        gridOptions.api.updateRowData({
            update: [movingData]
        })
        gridOptions.api.clearFocusedCell()
    }
}

//Restore View
function onRestoreView() {

    const url = "https://net-av.longjump.com/networking/rest/record/AGView/1924905763"
    const method = "GET"

    fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            const lj_saved_column_state = response.platform.record.column_state
            const lj_saved_sort_state = response.platform.record.sort_state
            const lj_saved_filter_state = response.platform.record.filter_state

            gridOptions.columnApi.setColumnState(JSON.parse(lj_saved_column_state))
            gridOptions.api.setSortModel(JSON.parse(lj_saved_sort_state))
            gridOptions.api.setFilterModel(window.lj_saved_filter_state)

        })
        .catch(error => console.error('Error:', error))

    //for reference
    // gridOptions.columnApi.setColumnState(lj_saved_column_state)
    // gridOptions.columnApi.setColumnGroupState(window.group_state) //Does not seem to be 
    // gridOptions.api.setSortModel(window.sort_state)
    // gridOptions.api.setFilterModel(window.filter_state)
}

//Reset View 
function onResetView() {
    gridOptions.columnApi.resetColumnState()
    gridOptions.columnApi.resetColumnGroupState()
    gridOptions.api.setSortModel(null)
    gridOptions.api.setFilterModel(null)
}

function onSave() {
   Swal.fire(
      'Saving....!',
      'Updating totals and recap.',
      'success'
    )
    gridOptions.api.forEachLeafNode(function (rowNode, index) {
        updateRowCalcPaste(rowNode)
    }) 

    // Save the Quote Items Detail records
    SaveQuoteItems()

    //update the recap when we SAVE regardless of the number of edited rows
    updateRecap()

    onRestoreView()
}

//Save View
function onSaveView() {

    window.column_state = gridOptions.columnApi.getColumnState()
    window.filter_state = gridOptions.api.getFilterModel()
    window.sort_state = gridOptions.api.getSortModel()

    const url = "https://net-av.longjump.com/networking/rest/record/AGView"
    const method = "POST"

    // Save name. Trap special chararcters.  Need to make the name field unique index, and return any errors to the screen on the POST return results
    let viewName = prompt("Please enter a View Name", "AGView")
    viewName = viewName.replace(/[&\/\\#,+$~%.'":*?<>{}]/g, '')

    let data = `
    {
        "platform": {
            "record": {
                "column_state": '${JSON.stringify(column_state)}',
                "filter_state": '${JSON.stringify(filter_state)}',
                "sort_state": '${JSON.stringify(sort_state)}',
                "view_name": "${viewName}"
            }
        }
    }`

    fetch(url, {
            method: method,
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            const rec_id = response.platform.message.id
           // console.log(`view record id is = ${rec_id}`)
        })
        .catch(error => console.error('Error:', error))
}

//testing button
function onTestingButton() {}

//How to refactor this?
function processDBRecord(res) {
    if (res.add) {
        res.add.forEach(function (rowNode) {

            let json = JSON.stringify(rowNode.data)
            json =
                `{"platform":{"record":${json}}}`

            let data = json.replace(`"record":{`, `"record":{"related_quote":${quoteId},`)

            addRecordDB(ADD_ITEMS_URL, 'POST', data, rowNode)

        })
    }
    if (res.remove) {
        res.remove.forEach(function (rowNode) {
            deleteRecordDB(DELETE_ITEMS_URL, 'DELETE', rowNode)

        })
    }
    if (res.update) {
        res.update.forEach(function (rowNode) {})
    }
}

//Rounding function
function roundN(num, n) {
    return parseFloat(parseFloat(Math.round(num * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n))
}

function showFullScreen() {
    window.open (`https://net-av.longjump.com/networking/pages/testTabs.jsp?id=${rec_id}`)
}

function SaveQuoteItems() {
    // Create the JSON object  - Remember there is a 25 record limter per bulk update
    let data = {
        platform: {}
    }
    let arr_data = []

    //Bulk Update
    const MAX_BULK_RECORDS = 25
    const UPDATE_ITEMS_URL = `https://net-av.longjump.com/networking/rest/record/Quote_Item_Details/bulk/update?retrieveRecord=true&alt=json`

    //build the JSON payload
    gridOptions.api.forEachLeafNode(function (rowNode, index) {
        const record = rowNode.data

        if (record.is_edited === 'edited') {
            record.is_edited = '' //this should be moved to only on a valid write back
            arr_data.push({
                id: record.id,
                apply_cost_discount: !record.apply_cost_discount ? 'N' : record.apply_cost_discount,
                category_id: record.category_id,
                cost_discount_percentage: !record.cost_discount_percentage ? 'D0' : record.cost_discount_percentage,
                price_modifier: record.price_modifier,
                div_1: record.div_1,
                div_2: record.div_2,
                description: record.description,
                extended_cost: isNaN(record.extended_cost) ? 0.00 : record.extended_cost,
                extended_price: isNaN(record.extended_price) ? 0.00 : record.extended_price,
                extended_net_cost: isNaN(record.extended_net_cost) ? 0.00 : record.extended_net_cost,
                extended_net_price: isNaN(record.extended_net_price) ? 0.00 : record.extended_net_price,
                extended_list_price: isNaN(record.extended_list_price) ? 0.00 : record.extended_list_price,
                freight_sell: isNaN(record.freight_sell) ? 0.00 : record.freight_sell,
                isoptional: record.isoptional,
                istaxable: record.istaxable,
                job_cost_class: record.job_cost_class,
                list_price: isNaN(record.list_price) ? 0.00 : record.list_price,
                manufacturer: record.manufacturer,
                mfg_link: record.mfg_link,
                name: record.name,
                net_unit_cost: record.net_unit_cost,
                net_unit_price: record.net_unit_price,
                notes: record.notes,
                part_number: record.part_number,
                pricebook_part_number: record.pricebook_id,
                price_discount_percentage: !record.price_discount_percentage ? 'D0' : record.price_discount_percentage,
                price_modifier: !record.price_modifier ? 'P20' : record.price_modifier,
                preferred_vendor_display: !record.preferred_vendor_display ? record.manufacturer : record.preferred_vendor_display,
                quantity_total: record.quantity_total,
                sundries_sell: isNaN(record.sundries_sell) ? 0.00 : record.sundries_sell,
                tax_amount: isNaN(record.tax_amount) ? 0.00 : record.tax_amount,
                unit_cost: isNaN(record.unit_cost) ? 0.00 : parseFloat(record.unit_cost),
                unit_price: isNaN(record.unit_price) ? 0.00 : record.unit_price,
                uom: record.uom,
            })
        }
    })

    // Process the array by slicing out 25 at a time until the array is processed. 
    // Pass the 25 elements into the Fetch data payload
    while (arr_data.length > 0) {
        chunk = arr_data.splice(0, MAX_BULK_RECORDS)

        data.platform = {
            "record": chunk
        }

        fetch(UPDATE_ITEMS_URL, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(gridOptions.api.refreshCells()) //update the grid
            .catch(error => console.error('Error:', error))
    }

    saveQuote()
}

const updateRecordDB = async (url, method, data) => {

    fetch(url, {
            method: method,
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            gridOptions.api.refreshCells()
        })
        .catch(error => console.error('Error:', error))
}

const updateSurcharges = () => {

    // update the first 1000 items
    let itemsToUpdate = []

    gridOptions.api.forEachLeafNode(function (rowNode, index) {
        // only do first 5000
        if (index >= 5000) {
            return
        }

        var data = rowNode.data

        data.sundries_sell = data.job_cost_class === 'Equipment' || data.job_cost_class === 'Sundries' ? data.extended_price * (parseFloat(document.getElementById('sundries_rate').value) / 100) : 0

        data.freight_sell = data.job_cost_class === 'Equipment' || data.job_cost_class === 'Sundries' ? data.extended_price * (parseFloat(document.getElementById('freight_rate').value) / 100) : 0

        data.tax_amount = data.job_cost_class === 'Equipment' || data.job_cost_class === 'Sundries' ? data.extended_net_price * (parseFloat(document.getElementById('tax_rate').value) / 100) : 0

        data.is_edited = 'edited'

        itemsToUpdate.push(data)
    })

    var res = gridOptions.api.updateRowData({
        update: itemsToUpdate
    })
}

function updateRowCalc(e) {

    const row = e.node
    let newUnitPrice

    const applyCostDiscount = e.data.apply_cost_discount === 'Y' ? 1 : 0

    //Update cost discount value //
    const cMod = e.data.cost_discount_percentage
    const c_mod = cMod.substring(0, 1).toUpperCase()
    let c_pct = parseFloat(cMod.substring(1, cMod.length))

    switch (c_mod) {
        case 'D':
            c_pct = c_pct / 100
            row.setDataValue('net_unit_cost', e.data.unit_cost - (c_pct * e.data.unit_cost))
            break

        default:
                Swal.fire(
                'Error',
                'Invalid Cost Modifier.',
                'error'
              )
    }

    // Get price modifier type and value //
    const pMod = e.data.price_modifier
    const p_mod = pMod.substring(0, 1).toUpperCase()
    const p_pct = parseFloat(pMod.substring(1, pMod.length))

    switch (p_mod) {
        case 'D':
            newUnitPrice = e.data.list_price * (100 - p_pct) * .01
            break

        case 'M':
            newUnitPrice = applyCostDiscount ? e.data.net_unit_cost * (100 + p_pct) * .01 : e.data.unit_cost * (100 + p_pct) * .01
            break

        case 'L':
            newUnitPrice = e.data.list_price
            break

        case 'P':
            newUnitPrice = applyCostDiscount ? e.data.net_unit_cost / ((100 - p_pct) * .01) : e.data.unit_cost / ((100 - p_pct) * .01)
            break

        case 'X':
            newUnitPrice = e.data.unit_price
            break

        default:
            Swal.fire(
                'Error',
                'Invalid Price Modifier.',
                'error'
              )
    }

    //Update price discount value //
    const dMod = e.data.price_discount_percentage
    const d_mod = dMod.substring(0, 1).toUpperCase()
    let d_pct = parseFloat(dMod.substring(1, dMod.length))

    switch (d_mod) {
        case 'D':
            d_pct = d_pct / 100
            break

        default:
            Swal.fire(
                'Error',
                'Invalid Discount Modifier.',
                'error'
              )
    }

    const roundMe = (n) => (Math.round(n * 100) / 100)

    // Update the values in the grid
    row.setDataValue('cost_discount_percentage', e.data.cost_discount_percentage.toUpperCase())
    row.setDataValue('istaxable', e.data.job_cost_class === 'Equipment' || e.data.job_cost_class === 'Sundries' ? 'Y' : 'N')
    row.setDataValue('price_discount_percentage', e.data.price_discount_percentage.toUpperCase())
    row.setDataValue('price_modifier', e.data.price_modifier.toUpperCase())
    row.setDataValue('unit_price', roundMe(newUnitPrice))
    row.setDataValue('net_unit_price', roundMe(newUnitPrice - (d_pct * newUnitPrice)))

    row.setDataValue('extended_cost', e.data.quantity_total * e.data.unit_cost)
    row.setDataValue('extended_price', e.data.quantity_total * e.data.unit_price)
    row.setDataValue('extended_net_cost', e.data.quantity_total * e.data.net_unit_cost)
    row.setDataValue('extended_net_price', e.data.quantity_total * e.data.net_unit_price)
    row.setDataValue('extended_list_price', e.data.quantity_total * e.data.list_price)

    row.setDataValue('tax_amount', valueToBoolean(e.data.istaxable) * e.data.extended_net_price * parseFloat(document.getElementById('tax_rate').value) / 100)
    row.setDataValue('freight_sell', e.data.job_cost_class === 'Equipment' || e.data.job_cost_class === 'Sundries' ? e.data.quantity_total * e.data.unit_price * parseFloat(document.getElementById('freight_rate').value) / 100 : 0.00)
    row.setDataValue('sundries_sell', e.data.job_cost_class === 'Equipment' || e.data.job_cost_class === 'Sundries' ? e.data.quantity_total * e.data.unit_price * parseFloat(document.getElementById('sundries_rate').value) / 100 : 0.00)

    updateRecapNoSave()
}

function updateRowCalcPaste(e) {

    const row = e
    let newUnitPrice

    const applyCostDiscount = e.data.apply_cost_discount === 'Y' ? 1 : 0

    //Update cost discount value //
    const cMod = e.data.cost_discount_percentage
    const c_mod = cMod.substring(0, 1).toUpperCase()
    let c_pct = parseFloat(cMod.substring(1, cMod.length))

    switch (c_mod) {
        case 'D':
            c_pct = c_pct / 100
            row.setDataValue('net_unit_cost', e.data.unit_cost - (c_pct * e.data.unit_cost))
            break

        default:
            Swal.fire(
                'Error',
                'Invalid Cost Modifier.',
                'error'
              )
    }

    // Get price modifier type and value //
    const pMod = e.data.price_modifier
    const p_mod = pMod.substring(0, 1).toUpperCase()
    const p_pct = parseFloat(pMod.substring(1, pMod.length))

    switch (p_mod) {
        case 'D':
            newUnitPrice = e.data.list_price * (100 - p_pct) * .01
            break

        case 'M':
            newUnitPrice = applyCostDiscount ? e.data.net_unit_cost * (100 + p_pct) * .01 : e.data.unit_cost * (100 + p_pct) * .01
            break

        case 'L':
            newUnitPrice = e.data.list_price
            break

        case 'P':
            newUnitPrice = applyCostDiscount ? e.data.net_unit_cost / ((100 - p_pct) * .01) : e.data.unit_cost / ((100 - p_pct) * .01)
            break

        case 'X':
            newUnitPrice = e.data.unit_price
            break

        default:
            Swal.fire(
                'Error',
                'Invalid Price Modifier.',
                'error'
              )
    }

    //Update price discount value //
    const dMod = e.data.price_discount_percentage
    const d_mod = dMod.substring(0, 1).toUpperCase()
    let d_pct = parseFloat(dMod.substring(1, dMod.length))

    switch (d_mod) {
        case 'D':
            d_pct = d_pct / 100
            break

        default:
            Swal.fire(
                'Error',
                'Invalid Discount Modifier.',
                'error'
              )
    }

    const roundMe = (n) => (Math.round(n * 100) / 100)

    // Update the values in the grid
    row.setDataValue('cost_discount_percentage', e.data.cost_discount_percentage.toUpperCase())
    row.setDataValue('istaxable', e.data.job_cost_class === 'Equipment' || e.data.job_cost_class === 'Sundries' ? 'Y' : 'N')
    row.setDataValue('price_discount_percentage', e.data.price_discount_percentage.toUpperCase())
    row.setDataValue('price_modifier', e.data.price_modifier.toUpperCase())
    row.setDataValue('unit_price', roundMe(newUnitPrice))
    row.setDataValue('net_unit_price', roundMe(newUnitPrice - (d_pct * newUnitPrice)))

    row.setDataValue('extended_cost', e.data.quantity_total * e.data.unit_cost)
    row.setDataValue('extended_price', e.data.quantity_total * e.data.unit_price)
    row.setDataValue('extended_net_cost', e.data.quantity_total * e.data.net_unit_cost)
    row.setDataValue('extended_net_price', e.data.quantity_total * e.data.net_unit_price)
    row.setDataValue('extended_list_price', e.data.quantity_total * e.data.list_price)

    row.setDataValue('tax_amount', valueToBoolean(e.data.istaxable) * e.data.extended_net_price * parseFloat(document.getElementById('tax_rate').value) / 100)
    row.setDataValue('freight_sell', e.data.job_cost_class === 'Equipment' || e.data.job_cost_class === 'Sundries' ? e.data.quantity_total * e.data.unit_price * parseFloat(document.getElementById('freight_rate').value) / 100 : 0.00)
    row.setDataValue('sundries_sell', e.data.job_cost_class === 'Equipment' || e.data.job_cost_class === 'Sundries' ? e.data.quantity_total * e.data.unit_price * parseFloat(document.getElementById('sundries_rate').value) / 100 : 0.00)

    updateRecapNoSave()
}

// Update the recap page
const updateRecap = () => {
    const arr = []
    let recap_equipment_cost = 0,
        recap_equipment_sell = 0
    let recap_labor_cost = 0,
        recap_labor_sell = 0
    let recap_subcontractor_cost = 0,
        recap_subcontractor_sell = 0
    let recap_odc_cost = 0,
        recap_odc_sell = 0
    let recap_service_cost = 0,
        recap_service_sell = 0
    let recap_sundries_cost = 0,
        recap_sundries_sell = 0
    let recap_subtotal_cost = 0,
        recap_subtotal_sell = 0
    let recap_tax = 0
    let recap_shipping_cost = 0,
        recap_shipping_sell = 0
    let recap_grand_total_cost = 0,
        recap_grand_total_sell = 0

    gridOptions.api.forEachLeafNode(function (rowNode, index) {

        if (rowNode.data.job_cost_class === 'Equipment') {
            recap_equipment_cost += rowNode.data.extended_net_cost
            recap_equipment_sell += rowNode.data.extended_net_price
        }

        if (rowNode.data.job_cost_class === 'Labor') {
            recap_labor_cost += rowNode.data.extended_net_cost
            recap_labor_sell += rowNode.data.extended_net_price
        }

        if (rowNode.data.job_cost_class === 'Subcontractor') {
            recap_subcontractor_cost += rowNode.data.extended_net_cost
            recap_subcontractor_sell += rowNode.data.extended_net_price
        }

        if (rowNode.data.job_cost_class === 'ODC') {
            recap_odc_cost += rowNode.data.extended_net_cost
            recap_odc_sell += rowNode.data.extended_net_price
        }

        if (rowNode.data.job_cost_class === 'Service') {
            recap_service_cost += rowNode.data.extended_net_cost
            recap_service_sell += rowNode.data.extended_net_price
        }

        if (rowNode.data.job_cost_class === 'Sundries') {
            recap_sundries_cost += rowNode.data.extended_net_cost
            recap_sundries_sell += rowNode.data.extended_net_price
        }

        recap_tax += rowNode.data.tax_amount

        recap_shipping_cost += rowNode.data.freight_sell
        recap_shipping_sell += rowNode.data.freight_sell
    })

    recap_subtotal_cost = recap_equipment_cost + recap_labor_cost + recap_subcontractor_cost + recap_odc_cost + recap_service_cost + recap_sundries_cost
    recap_subtotal_sell = recap_equipment_sell + recap_labor_sell + recap_subcontractor_sell + recap_odc_sell + recap_service_sell + recap_sundries_sell
    recap_grand_total_cost = recap_subtotal_cost + recap_tax + recap_shipping_cost
    recap_grand_total_sell = recap_subtotal_sell + recap_tax + recap_shipping_sell


    // write the total to the screen
    document.getElementById("recap_equipment_cost").value = '$' + formatMoney(recap_equipment_cost)
    document.getElementById("recap_equipment_sell").value = '$' + formatMoney(recap_equipment_sell)

    document.getElementById("recap_labor_cost").value = '$' + formatMoney(recap_labor_cost)
    document.getElementById("recap_labor_sell").value = '$' + formatMoney(recap_labor_sell)

    document.getElementById("recap_subcontractor_cost").value = '$' + formatMoney(recap_subcontractor_cost)
    document.getElementById("recap_subcontractor_sell").value = '$' + formatMoney(recap_subcontractor_sell)

    document.getElementById("recap_odc_cost").value = '$' + formatMoney(recap_odc_cost)
    document.getElementById("recap_odc_sell").value = '$' + formatMoney(recap_odc_sell)

    document.getElementById("recap_service_cost").value = '$' + formatMoney(recap_service_cost)
    document.getElementById("recap_service_sell").value = '$' + formatMoney(recap_service_sell)

    document.getElementById("recap_sundries_cost").value = '$' + formatMoney(recap_sundries_cost)
    document.getElementById("recap_sundries_sell").value = '$' + formatMoney(recap_sundries_sell)

    document.getElementById("recap_subtotal_cost").value = '$' + formatMoney(recap_subtotal_cost)
    document.getElementById("recap_subtotal_sell").value = '$' + formatMoney(recap_subtotal_sell)

    document.getElementById("recap_tax_cost").value = '$' + formatMoney(recap_tax)
    document.getElementById("recap_tax_sell").value = '$' + formatMoney(recap_tax)

    document.getElementById("recap_shipping_cost").value = '$' + formatMoney(recap_shipping_sell)
    document.getElementById("recap_shipping_sell").value = '$' + formatMoney(recap_shipping_sell)

    document.getElementById("recap_grand_total_cost").value = '$' + formatMoney(recap_grand_total_cost)
    document.getElementById("recap_grand_total_sell").value = '$' + formatMoney(recap_grand_total_sell)

    let data = {
        "platform": {
            "record": {

                "recap_equipment_cost": isNaN(recap_equipment_cost) ? 0.00 : parseFloat(recap_equipment_cost),
                "recap_equipment_sell": recap_equipment_sell,
                "recap_labor_cost": recap_labor_cost,
                "recap_labor_sell": recap_labor_sell,
                "recap_subcontract_cost": recap_subcontractor_cost,
                "recap_subcontract_sell": recap_subcontractor_sell,
                "recap_odc_cost": recap_odc_cost,
                "recap_odc_sell": recap_odc_sell,
                "recap_service_cost": recap_service_cost,
                "recap_service_sell": recap_service_sell,
                "recap_subtotal_cost": recap_subtotal_cost,
                "recap_subtotal_sell": recap_subtotal_sell,
                "recap_sundries_cost": recap_sundries_cost,
                "recap_sundries_sell": recap_sundries_sell,
                "recap_tax": recap_tax,
                "recap_shipping": recap_shipping_sell,
                "recap_grand_total_cost": recap_grand_total_cost,
                "recap_grand_total_sell": recap_grand_total_sell,
            }
        }
    }

    // Update the Quote with values from the form fields
    const UPDATE_QUOTE = `https://net-av.longjump.com/networking/rest/record/Quotes/${quoteId}?retrieveRecord=true&alt=json`

    fetch(UPDATE_QUOTE, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
}

// Format 1 or 0 to Yes (Y) or No (N)
function valueToBoolean(params) {
    return (params === 'Y') ? 1 : 0
}

// Save the Quote 
const saveQuote = async (data) => {
    const UPDATE_QUOTE = `https://net-av.longjump.com/networking/rest/record/Quotes/${quoteId}?retrieveRecord=true&alt=json`

    url = UPDATE_QUOTE

    //Notes
    data = {
        platform: {
            record: {

                // default writeback to LJ
                sundries_rate: document.getElementById('sundries_rate').value,
                freight_default: document.getElementById('freight_rate').value,
                tax_rate: document.getElementById('tax_rate').value,

                //notes writeback to LJ
                notes_introduction: document.getElementById('notes_intro').value,
                notes_purchasing: document.getElementById('notes_purchasing').value,
                notes_internal: document.getElementById('notes_internal').value,
                notes_closing: document.getElementById('notes_closing').value,
            }
        }
    }

    //call the REST call
    const res = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    data = await res.json()

    let code = await data.platform.message.code

    if (code === '-1') {
        const error = data.platform.description
        console.error(error)
        // Swal.fire({
        //    title: 'Error!',
        //    text: error,
        //    type: 'warning',
        //    showConfirmButton: true
        // })
    }
    if (code === '0') { //code '0' is successful 
    }
}

//#endregion Functions

//#region Events
const saveChanges = document.getElementById("btn-update-row")
saveChanges.addEventListener('click', onSave)

const _saveView = document.getElementById("btn-save-view")
_saveView.addEventListener('click', onSaveView)

const _restoreView = document.getElementById("btn-restore-view")
_restoreView.addEventListener('click', onRestoreView)

const _resetView = document.getElementById("btn-reset-view")
_resetView.addEventListener('click', onResetView)

const fullScreen = document.getElementById("btn-full-screen")
fullScreen.addEventListener('click', showFullScreen)

const sundriesRate = document.getElementById("sundries_rate")
sundriesRate.addEventListener('input', updateSurcharges)

const freightRate = document.getElementById("freight_rate")
freightRate.addEventListener('input', updateSurcharges)

const taxRate = document.getElementById("tax_rate")
taxRate.addEventListener('input', updateSurcharges)

//#endregion Events

//#region Main Processing

//fetch the items json on load 

getPicklists()

fetchAsync(FETCH_ITEMS_URL, 'GET', '')

// #endregion Main Processing

//#region todo
/*
     Notes:
        LJ update (PUT) doesn't like any lookup field to be null value when trying to do an update (PUT)

        ?? Can you store an object in the grid node, if so then you should be able to pull back either the
        display value or content

       - 50% refactor code base to use separate scripts like components or modules like the Search function
       - hard to do since there needs some variables and items to be declared before others and the order of loading is not predicatable
       - keep the code logically ordered - or move to using Vuew/Angular/React and serve off of Node.JS server, but this is not practical as long as we are using LJ

       - This is better than what it was using 'defer' in the jsp <HEAD> section seems to be allowing scripts to load in sync.
     
       ERRORS TO FIX
       - ??? undo redo
       - ctrl+A trapping on grid form edit
       - ! Update calculations when pasting
       - indicator that says it needs to be saved
       - Fix where the insert context menu goes enters
       - shipping and handling use the default lookup to determine the rate.

       - Refactor the CRUD function to ES6 style and perform error checking (try catch and also get return values)
       - Refactor CRUD to use BULK Rest operations (Save is already done)
       - Refactor functions into const ES6

      UX
        - ! proper formatting of the numbers into decimal.2
        - insert the same number of rows as selected
        - 70% Add row dragging (might not be so easy), seems to work with limitations on the grouping and sorting disables it

      Features. 
         - Insert feature (using testing button at the moment) does not correctly insert the rec ID number but does insert the correct rows and placement, 
           but has the same rec_id for each row inserted.   The context right mouse option is tied to onTestingButton()

      Search
         -  fix the search 
         -  Search - can you cancel a fetch ie '100' brings back lots of items, and when you add and remove characters from the string you get a long delay but the original search on '100' show back in the output.  Probably need to filter trhough the first 2 character and filter down from there. 

         - Add deep search functions. 
         - Add a 'see more info' on the entire PB record  - linking to AV-IQ
         - include a way to add Qty by putting a space and then the number and perhaps a PMod


     */
// #endregion todo