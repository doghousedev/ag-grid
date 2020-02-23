// Created: 2019/06/04 12:24:41
// Last modified: 2019/12/16 22:24:55

console.log('loading form-app component')

const fetchAsyncQuote = async (url, method) => {
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
   }

   if (recordCount == 0) {
   }

   if (recordCount == 1) {
   // Make this into a function or another page module or class or something like that

   //Customer 
      //Sold To
         document.getElementById('sold_to_account_name').value = data.platform.record.sold_to.displayValue
         document.getElementById('sold_to_contact').value = data.platform.record.contact_sold_to.displayValue
         document.getElementById('sold_to_street_address').value = data.platform.record.sold_to_street_address
         document.getElementById('sold_to_city').value = data.platform.record.sold_to_city
         document.getElementById('sold_to_state').value = data.platform.record.sold_to_state
         document.getElementById('sold_to_zipcode').value = data.platform.record.sold_to_zipcode
         document.getElementById('sold_to_phone').value = data.platform.record.sold_to_phone
         document.getElementById('sold_to_email').value = data.platform.record.sold_to_email

      // Ship To
         document.getElementById('ship_to_account_name').value = data.platform.record.ship_to.displayValue
         document.getElementById('ship_to_contact').value = data.platform.record.contact_ship_to.displayValue
         document.getElementById('ship_to_street_address').value = data.platform.record.ship_to_street_address
         document.getElementById('ship_to_city').value = data.platform.record.ship_to_city
         document.getElementById('ship_to_state').value = data.platform.record.ship_to_state
         document.getElementById('ship_to_zipcode').value = data.platform.record.ship_to_zipcode
         document.getElementById('ship_to_phone').value = data.platform.record.ship_to_phone

      // Bill To
         document.getElementById('bill_to_account_name').value = data.platform.record.bill_to.displayValue
         document.getElementById('bill_to_contact').value = data.platform.record.contact_bill_to.displayValue
         document.getElementById('bill_to_street_address').value = data.platform.record.bill_to_street_address
         document.getElementById('bill_to_city').value = data.platform.record.bill_to_city
         document.getElementById('bill_to_state').value = data.platform.record.bill_to_state
         document.getElementById('bill_to_zipcode').value = data.platform.record.bill_to_zipcode
         document.getElementById('bill_to_phone').value = data.platform.record.bill_to_phone
         document.getElementById('bill_to_email').value = data.platform.record.bill_to_email
      
      // Defaults   
         document.getElementById('sundries_rate').value = data.platform.record.sundries_rate
         document.getElementById('freight_rate').value = data.platform.record.freight_default
         document.getElementById('tax_rate').value = data.platform.record.tax_rate
         
         //make link and lookup via drop down or icon
         document.getElementById('quote_name').value = data.platform.record.quote_name

         document.getElementById('quote_date').value = data.platform.record.quote_date
         document.getElementById('quote_type').value = data.platform.record.quote_type.displayValue
         document.getElementById('revision').value = data.platform.record.revision
         document.getElementById('related_to').value = data.platform.record.related_to.displayValue

        //Recap
        document.getElementById('recap_equipment_cost').value = '$' + formatMoney(data.platform.record.recap_equipment_cost)
        document.getElementById('recap_equipment_sell').value = '$' + formatMoney(data.platform.record.recap_equipment_sell)
        document.getElementById('recap_labor_cost').value = '$' + formatMoney(data.platform.record.recap_labor_cost)
        document.getElementById('recap_labor_sell').value = '$' + formatMoney(data.platform.record.recap_labor_sell)
        document.getElementById('recap_subcontractor_cost').value = '$' + formatMoney(data.platform.record.recap_subcontractor_cost)
        document.getElementById('recap_subcontractor_sell').value = '$' + formatMoney(data.platform.record.recap_subcontractor_sell)
        document.getElementById('recap_odc_cost').value = '$' + formatMoney(data.platform.record.recap_odc_cost)
        document.getElementById('recap_odc_sell').value = '$' + formatMoney(data.platform.record.recap_odc_sell)
        document.getElementById('recap_service_cost').value = '$' + formatMoney(data.platform.record.recap_service_cost)
        document.getElementById('recap_service_sell').value = '$' + formatMoney(data.platform.record.recap_service_sell)
        
        document.getElementById('recap_subtotal_cost').value = '$' + formatMoney(data.platform.record.recap_subtotal_cost)
        document.getElementById('recap_subtotal_sell').value = '$' + formatMoney(data.platform.record.recap_subtotal_sell)

        document.getElementById('recap_sundries_cost').value = '$' + formatMoney(data.platform.record.recap_sundries_cost)
        document.getElementById('recap_sundries_sell').value = '$' + formatMoney(data.platform.record.recap_sundries_sell)
        document.getElementById('recap_tax_cost').value = '$' + formatMoney(data.platform.record.recap_tax)
        document.getElementById('recap_tax_sell').value = '$' + formatMoney(data.platform.record.recap_tax)
        document.getElementById('recap_shipping_cost').value = '$' + formatMoney(data.platform.record.recap_shipping)
        document.getElementById('recap_shipping_sell').value = '$' + formatMoney(data.platform.record.recap_shipping)
        document.getElementById('recap_grand_total_cost').value = '$' + formatMoney(data.platform.record.recap_grand_total_cost)
        document.getElementById('recap_grand_total_sell').value = '$' + formatMoney(data.platform.record.recap_grand_total_sell)

        //Notes
        document.getElementById('notes_intro').value = data.platform.record.notes_introduction
        document.getElementById('notes_purchasing').value = data.platform.record.notes_purchasing
        document.getElementById('notes_internal').value = data.platform.record.notes_internal
        document.getElementById('notes_closing').value = data.platform.record.notes_closing
    
    //return an object instead with all the values so we use then elsewhere
   }

   if (recordCount > 1) {
      //const rows = records.forEach(createData)
      console.log(`Fetch has made an error- too many rows.`)
   }
}

let quote = fetchAsyncQuote(`https://net-av.longjump.com/networking/rest/record/Quotes?fieldList=*&filter=id=${rec_id}&alt=json`,'GET')