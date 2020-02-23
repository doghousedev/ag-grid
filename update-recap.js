const updateRecapNoSave = () => {
    const arr = []

    let recap_subtotal_cost = 0,
        recap_subtotal_sell = 0
    let recap_tax = 0
    let recap_shipping_cost = 0,
        recap_shipping_sell = 0
    let recap_grand_total_cost = 0,
        recap_grand_total_sell = 0

    // iterate through the leafNodes
    // build array of objects for the leaf nodes
    gridOptions.api.forEachLeafNode(function (rowNode, index) {
        arr.push({
            'job_cost_class': rowNode.data.job_cost_class,
            'cost_amount': rowNode.data.extended_net_cost,
            'sell_amount': rowNode.data.extended_net_price,
        })

        // Build tax and shipping amounts  
        recap_tax += rowNode.data.tax_amount
        recap_shipping_cost += rowNode.data.freight_sell
        recap_shipping_sell += rowNode.data.freight_sell
        recap_subtotal_cost += rowNode.data.extended_net_cost
        recap_subtotal_sell += rowNode.data.extended_net_price 
    })

    // create the grandtotals
    recap_grand_total_cost = recap_subtotal_cost + recap_shipping_cost + recap_tax
    recap_grand_total_sell = recap_subtotal_sell + recap_shipping_sell + recap_tax

    // Function creates an array of groups by job_cost class with summary of cost and sell amounts
    let map = arr.reduce((prev, next) => {
        if (next.job_cost_class in prev) {
            prev[next.job_cost_class].cost_amount += next.cost_amount
            prev[next.job_cost_class].sell_amount += next.sell_amount
        } else {
            prev[next.job_cost_class] = next
        }
        return prev
    }, {})

    let result = Object.keys(map).map(job_cost_class => map[job_cost_class])

    // Iterate though the aray and update the values to the DOM
    for (x of result) {
        // calculate the recap cost totals by job_cost_class
        const c_el= `recap_${x.job_cost_class.toLowerCase()}_cost`
        document.getElementById(c_el).value = '$' + formatMoney(x.cost_amount)

        // calculate the recap sell totals by job_cost_class
        const s_el = `recap_${x.job_cost_class.toLowerCase()}_sell`
        document.getElementById(s_el).value = '$' + formatMoney(x.sell_amount)
    }

    // Totals display
    document.getElementById("recap_tax_sell").value = '$' + formatMoney(recap_tax)    
    document.getElementById("recap_tax_cost").value = '$' + formatMoney(recap_tax)
    document.getElementById("recap_shipping_cost").value = '$' + formatMoney(recap_shipping_sell)
    document.getElementById("recap_shipping_sell").value = '$' + formatMoney(recap_shipping_sell)
   
    document.getElementById("recap_subtotal_cost").value = '$' + formatMoney(recap_subtotal_cost)
    document.getElementById("recap_subtotal_sell").value = '$' + formatMoney(recap_subtotal_sell)
    document.getElementById("recap_grand_total_cost").value = '$' + formatMoney(recap_grand_total_cost)
    document.getElementById("recap_grand_total_sell").value = '$' + formatMoney(recap_grand_total_sell)


    //write the data to LJ db
    //create the data payload JSON
    const UPDATE_QUOTE = `https://net-av.longjump.com/networking/rest/record/Quotes/${quoteId}?retrieveRecord=true&alt=json`
}

