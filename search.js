// Created: 2019/06/04 12:24:41
// Last modified: 2020/02/23 09:33:45

console.log(`Loading search component`)

// Allows popup 
const newPopup = (url) =>
    popupWindow = window.open(
        url, 'popUpWindow', 'height=300,width=400,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes'
)

//basic search on part number
const searchBox = document.getElementById('search-pricebook')
const matchList = document.getElementById('match-list')

//advanced search div
const advancedSearchBox = document.getElementById('advanced-search')

searchBox.addEventListener('input', () => lookupValue(searchBox.value))

searchBox.addEventListener('keydown', (event) => {
    const key = event.key // const {key} = event in ES6+
    if (key === "Escape") {

      // Search Cancelled
      searchBox.value = ''
      matches = []
      matchList.innerHTML = ''
    }
})

const lookupValue = async searchText => {

    if (searchBox.value.length > 2) {
        const res = await fetch(`https://net-av.longjump.com/networking/rest/record/Pricebook?fieldList=part_number,description,id,dealer_cost,list_price,map_price,manufacturer_link&filter=part_number starts with '${searchBox.value}'&sortBy=part_number&alt=json`)

        const data = await res.json()
        const recCount = data.platform.recordCount

        if(searchBox.value.length >= 3) {
             console.log (`firing on each key- ${searchBox.value.length}.
             Records returned are ${recCount}`)
        }

        let matches = ''

        // LJ returns an array of matching records. 
        if (recCount > 1) {
            matches = data.platform.record.filter(data => {
                const regex = new RegExp(`^${searchText}`, 'gi')
                return data.part_number.match(regex)
            })
        }

        // LJ does not return single records as Array, so we turn it into an array
        if (recCount == 1) {
            let str = JSON.stringify(data)

            str = str.replace('"record":', '"record": [')
            str = str.replace('"},"recordCount"', '"}],"recordCount"')

            let json = JSON.parse(str)

            matches = json.platform.record.filter(json => {
                const regex = new RegExp(`^${searchText}`, 'gi')
                return json.part_number.match(regex)
            })
        }

        // No match found. Pop a message in the match-list output div
        if (recCount == 0) {
            let s = searchBox.value.toUpperCase()
            matches = []
            matchList.innerHTML = `No Matches found -  <a href="#" id ="advanced-search" onclick="advancedSearch()">Advanced Search   |    </a> 
            <a href="#" id ="add-new-pricebook" onclick="addPricebookItem('${s}')">Add Pricebook Item</a>`
            return false
         }
    
        outputHtml(matches)

    } else {
        // Clear the array and empty the match-list output div
        matches = []
        matchList.innerHTML = ''
    }
}

const advancedSearch = async searchText => {

   if (searchBox.value.length > 2) {

       let txt = searchBox.value
  
       const res = await fetch(`https://net-av.longjump.com/networking/rest/record/Pricebook?fieldList=part_number,description,id,dealer_cost,list_price,map_price,manufacturer_link&filter=search_string contains '${txt}'&sortBy=part_number&alt=json`)

       const data = await res.json()
       const recCount = data.platform.recordCount

       console.log(`Advanced Search -- Record Count is: ${recCount}. searchText is "${txt}"`)
 
       let matches = ''

       // LJ returns an array of matching records. 
       if (recCount > 1) {
           matches = data.platform.record.filter(data => {
               const regex = new RegExp(`^${data.part_number}`, 'gi')
               return data.part_number.match(regex)
           })
       }

       // LJ does not return single records as Array, so we turn it into an array
       if (recCount == 1) {
           let str = JSON.stringify(data)

           str = str.replace('"record":', '"record": [')
           str = str.replace('"},"recordCount"', '"}],"recordCount"')

           let json = JSON.parse(str)

           matches = json.platform.record.filter(json => {
               const regex = new RegExp(`^${json.part_number}`, 'gi')
               return json.part_number.match(regex)
           })
       }

       // No match found. Pop a message in the match-list output div
       if (recCount == 0) {
           matches = []
           matchList.innerHTML = `No Matches found`
     }

     outputHtml(matches)

   } else {
       // Clear the array and empty the match-list output div
       matches = []
       matchList.innerHTML = ''
   }
}

const outputHtml = matches => {
    if (matches.length > 0) {

        const html = matches.map(
                match => `
                     <div class="card mb-1">
                           <div class="card-body" style="padding: .25rem">
                              <div class="outputGrid">
                                 <a href="#" id ="match-list" class="card-title" role="button" onclick="selectPriceBookItem(${match.id})">
                                       </h5>${cleanText(match.part_number)}
                                       </h5>
                                 </a>
                                 <p class="card-text text-secondary">
                                 ${cleanText(match.manufacturer_link.displayValue)}</p>
                                 <p class="card-text text-secondary">${cleanText(match.description)}</p>
                                 <p class="card-text text-secondary">Cost: $${formatMoney(match.dealer_cost)}</p>
                                 <p class="card-text text-secondary">List: $${formatMoney(match.list_price)}</p>
                                 <p class="card-text text-secondary">Map : $${formatMoney(match.map_price)}</p>
                              </div>
                           </div>
                     </div>`)
            .join('')
        matchList.innerHTML = html
    }
}

async function selectPriceBookItem(recId) {
    searchBox.value = ''
    matches = []
    matchList.innerHTML = ''

    const res = await fetch(`https://net-av.longjump.com/networking/rest/record/Pricebook?fieldList=*&filter=id=${recId}&alt=json`)

    const data = await res.json()
    const record = await data.platform.record

    //figure out where to insert the row
    let selectedNode = gridOptions.api.getSelectedNodes()

    let insertRowIndex

    if (selectedNode.length === 0) {
        console.log('nothing selected so it going on top')
        insertRowIndex = 0

    } else {
        console.log(`${selectedNode.length} row(s) selected`)
        insertRowIndex = selectedNode[0].rowIndex
        console.log(insertRowIndex)
    }
    /*************************/
    //gotta be a better way
    /*************************/
    let new_price_modifier = record.default_price_mod.content
    if (!new_price_modifier) {
        new_price_modifier = 'P20'
    }

    let pct = parseFloat(new_price_modifier.substring(1, new_price_modifier.length))

    let new_unit_cost = parseFloat(record.dealer_cost).toFixed(2) / ((100) * .01)

    let new_unit_price = parseFloat(record.dealer_cost).toFixed(2) / ((100 - pct) * .01)

    let new_extended_cost = parseFloat(new_unit_cost)

    let new_extended_price = new_unit_price

    let new_extended_net_cost = parseFloat(new_unit_cost)

    let new_extended_net_price = new_unit_price

    let new_extended_list_price = parseFloat(record.list_price).toFixed(2)

    let is_taxable = record.job_cost_class.displayValue === 'Equipment' || record.job_cost_class.displayValue === 'Sundries' ? 'Y' : 'N'

    let new_tax_rate = valueToBoolean(is_taxable) * new_unit_price * parseFloat(document.getElementById('tax_rate').value)/100

    let new_freight_sell = record.job_cost_class.displayValue === 'Equipment' || record.job_cost_class.displayValue === 'Sundries' ? new_unit_price * parseFloat(document.getElementById('freight_rate').value)/100 : 0.00

    let new_sundries_sell = record.job_cost_class.displayValue === 'Equipment' || record.job_cost_class.displayValue === 'Sundries' ? new_unit_price * parseFloat(document.getElementById('sundries_rate').value)/100 : 0.00
   
    /***************************************/

    // Define what we are writing to the grid
    let newItem = {
        apply_cost_discount: 'N',
        category_id: record.category_id.displayValue,
        cost_discount_percentage: 'D0',
        description: cleanText(record.description),
        extended_cost: new_extended_cost,
        extended_net_cost: new_extended_net_cost,
        extended_price: new_extended_price,
        extended_net_price: new_extended_net_price,
        extended_list_price: new_extended_list_price,
        freight_sell: new_freight_sell,
        isoptional: 'N',
        istaxable: is_taxable,
        job_cost_class: record.job_cost_class.displayValue,
        list_price: parseFloat(record.list_price),
        manufacturer: record.manufacturer_link.displayValue,
        mfg_link: record.manufacturer_link.content,
        net_unit_cost: parseFloat(record.dealer_cost).toFixed(2),
        net_unit_price: parseFloat(new_unit_price).toFixed(2),
        part_number: record.part_number,
        preferred_vendor_display: record.preferred_vendor.displayValue,
        pricebook_id: record.id,
        price_discount_percentage: 'D0',
        price_modifier: new_price_modifier,
        quantity_total: 1,
        related_quote: quoteId,
        sundries_sell: new_sundries_sell,
        tax_amount:new_tax_rate,
        unit_cost: parseFloat(record.dealer_cost).toFixed(2),
        unit_price: parseFloat(new_unit_price).toFixed(2),
        uom: record.uom.displayValue ? record.uom.displayValue : 'Each',
    }

    let result = gridOptions.api.updateRowData({
        add: [newItem],
        addIndex: insertRowIndex
    })

    processDBRecord(result)
    updateRecapNoSave()
}

//force the values of the unit price and extendeds
function setPriceValues(e) {
    // Get price modifier type and value
    const pMod = e.data.price_modifier
    let mod = pMod.substring(0, 1).toUpperCase()
    let pct = parseFloat(pMod.substring(1, pMod.length))

    let newUnitPrice

    switch (mod) {
        case 'D':
            newUnitPrice = e.data.list_price * (100 - pct) * .01
            break

        case 'M':
            newUnitPrice = e.data.unit_cost * (100 + pct) * .01
            break

        case 'L':
            newUnitPrice = e.data.list_price
            break

        case 'P':
            newUnitPrice = e.data.unit_cost / ((100 - pct) * .01)
            break

        case 'X':
            newUnitPrice = e.data.unit_price
            break

        default:
            alert("Price modifier invalid")
    }

    // Update the values in the grid
    const row = e.node
    row.setDataValue('unit_price', newUnitPrice)
    row.setDataValue('extended_cost', e.data.quantity_total * e.data.unit_cost)
    row.setDataValue('extended_price', e.data.quantity_total * newListPrice)
}