<!doctype html>
<html lang="en">

<head>

    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv=“Pragma” content=”no-cache”>
    <meta http-equiv=“Expires” content=”0″>
    <meta http-equiv=“CACHE-CONTROL” content=”NO-CACHE”>

    <!--  Font Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" />

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

    <!-- Jquery for ajax calls, to be replace by ES6 scripting natively support -->
    <script src="https://code.jquery.com/jquery-3.4.0.min.js"
        integrity="sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg=" crossorigin="anonymous"></script>

    <!-- ag-grid lib and related css -->
    <script src="https://unpkg.com/ag-grid-enterprise/dist/ag-grid-enterprise.min.noStyle.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-grid.css">
    <link rel="stylesheet" href="https://unpkg.com/ag-grid-community/dist/styles/ag-theme-balham.css">
    <link rel="stylesheet" href="https://doghousedev.com/ag-grid/style.css">

    <!-- popupmodal functions from sweetalter2.js -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>

    <!-- Optional JavaScript -->
    <!-- first Popper.js, then Bootstrap JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
        integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
        integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous">
    </script>

    <!-- select2 lib and related css -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/js/select2.min.js"></script>

    <script src="https://doghousedev.com/ag-grid/customStatsToolPanel.js " defer></script>
    <script src="https://doghousedev.com/ag-grid/customChartToolPanel.js" defer></script>
    <script src="https://doghousedev.com/ag-grid/form-app.js" defer></script>
    <script src="https://doghousedev.com/ag-grid/search.js" defer></script>
    <script src="https://doghousedev.com/ag-grid/update-recap.js" defer></script>
    <script src="https://doghousedev.com/ag-grid/app.js" defer></script>

    <title>Quotes</title>

</head>

<!-- #region TABS -->
<div class="tab">
    <button class="tablinks" onclick="openTab(event, 'Customer')">Customer</button>
    <button class="tablinks" onclick="openTab(event, 'Info')">Sale Info</button>
    <button class="tablinks" onclick="openTab(event, 'Items')">Items</button>
    <button class="tablinks" onclick="openTab(event, 'Notes')">Notes</button>
    <button class="tablinks" onclick="openTab(event, 'Recap')">Recap</button>

    <button id="btn-update-row" class="tablinks bg-primary text-white" style="float:right">Save</button>
</div>
<!-- #endregion TABS -->

<!-- #region CUSTOMER -->
<div id="Customer" class="tabcontent">
    <div class="container-fluid">
        <div class="row">

            <div class="col border-form">
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <H6><label class="text-uppercase font-weight-bold" for="sold_to_account_name">SOLD
                                    TO</label></H6>
                            <input type="text" class="form-control" id="sold_to_account_name" placeholder="">
                        </div>
                        <div class="form-group col-md-12">
                            <label for="sold_to_contact">Contact</label>
                            <input type="text" class="form-control" id="sold_to_contact" placeholder="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="sold_to_street_address">Address</label>
                        <textarea class="form-control" rows="4" style="height:100%;" id="sold_to_street_address"
                            placeholder=""></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="sold_to_city">City</label>
                            <input type="text" class="form-control" id="sold_to_city">
                        </div>
                        <div class="form-group col-md-3">
                            <label for="sold_to_state">State</label>
                            <select id="sold_to_state" class="form-control" name="sold_to_state">
                            </select>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="sold_to_zipcode">Zip</label>
                            <input type="text" class="form-control" id="sold_to_zipcode">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="sold_to_phone">Phone</label>
                        <input type="text" class="form-control" id="sold_to_phone" placeholder="">
                    </div>
                    <div class="form-group">
                        <label for="sold_to_email">Email</label>
                        <input type="email" class="form-control" id="sold_to_email" placeholder="">
                    </div>
                </form>
            </div>

            <div class="col border-form">
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <H6><label class="text-uppercase font-weight-bold" for="ship_to_account_name">SHIP
                                    TO</label></H6>
                            <input type="text" class="form-control" id="ship_to_account_name" placeholder="">
                        </div>
                        <div class="form-group col-md-12">
                            <label for="ship_to_contact">Contact</label>
                            <input type="text" class="form-control" id="ship_to_contact" placeholder="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="ship_to_street_address">Address</label>
                        <textarea class="form-control" rows="4" style="height:100%;" id="ship_to_street_address"
                            placeholder=""></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="ship_to_city">City</label>
                            <input type="text" class="form-control" id="ship_to_city">
                        </div>
                        <div class="form-group col-md-3">
                            <label for="ship_to_state">State</label>
                            <select id="ship_to_state" class="form-control">
                            </select>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="ship_to_zipcode">Zip</label>
                            <input type="text" class="form-control" id="ship_to_zipcode">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="ship_to_phone">Phone</label>
                        <input type="text" class="form-control" id="ship_to_phone" placeholder="">
                    </div>
                </form>
            </div>

            <div class="col border-form">
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <H6><label class="text-uppercase font-weight-bold" for="bill_to_account_name">BILL
                                    TO</label></H6>
                            <input type="text" class="form-control" id="bill_to_account_name" placeholder="">
                        </div>
                        <div class="form-group col-md-12">
                            <label for="bill_to_contact">Contact</label>
                            <input type="text" class="form-control" id="bill_to_contact" placeholder="">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="bill_to_street_address">Address</label>
                        <textarea class="form-control" rows="4" style="height:100%;" id="bill_to_street_address"
                            placeholder=""></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="bill_to_city">City</label>
                            <input type="text" class="form-control" id="bill_to_city">
                        </div>
                        <div class="form-group col-md-3">
                            <label for="bill_to_state">State</label>
                            <select id="bill_to_state" class="form-control">
                            </select>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="bill_to_zipcode">Zip</label>
                            <input type="text" class="form-control" id="bill_to_zipcode">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="bill_to_phone">Phone</label>
                        <input type="text" class="form-control" id="bill_to_phone" placeholder="">
                    </div>
                    <div class="form-group">
                        <label for="bill_to_email">Email</label>
                        <input type="email" class="form-control" id="bill_to_email" placeholder="">
                    </div>
                </form>
            </div>
        </div>
    </div>

</div>
<!-- #endregion -->

<!-- #region SALE INFO   -->
<div id="Info" class="tabcontent">
    <div class="container-fluid">

        <div class="row">
            <div class="col">
                <div class="form-group form-inline col-md-12">
                    <label class="text-right text-secondary col-md-2">Quote Date</label>
                    <input type="date" class="form-control col-md-8" id="quote_date" placeholder="">
                </div>
                <div class="form-group form-inline col-md-12">
                    <label class="text-right text-secondary col-md-2">Quote Type</label>
                    <select id="quote_type" class="form-control col-md-6" <option selected>...</option>
                        <option>Project</option>
                        <option>Product Order</option>
                        <option>Case</option>
                        <option>Service Agreement</option>
                    </select>

                </div>
                <div class="form-group form-inline col-md-12">
                    <label class="text-right text-secondary col-md-2">Quote Name</label>
                    <input type="text" class="form-control col-md-10" id="quote_name" placeholder="">
                </div>
                <div class="form-group form-inline col-md-12">
                    <label class="text-right text-secondary col-md-2">Revision</label>
                    <input type="number" class="form-control col-md-2" id="revision" placeholder="">
                </div>
            </div>
            <div class="col">
                <div class="form-group form-inline col-md-12">
                    <label class="text-right text-secondary col-md-2">Related To Opp</label>
                    <input type="text" class="form-control col-md-10" id="related_to" placeholder="">
                </div>
                <div class="form-group form-inline col-md-12">
                    <label class="text-right text-secondary col-md-2">Price Profile</label>
                    <input type="text" class="form-control col-md-6" id="price_profile" placeholder="">
                </div>
                <div class="form-group form-inline col-md-12">
                    <label class="text-right text-secondary col-md-2">Ship Via</label>
                    <input type="text" class="form-control col-md-8" id="ship_via" placeholder="">
                </div>
            </div>
            <div class="col">
                <div class="col">
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-2 col-md-2">Status</label>
                        <input type="text" class="form-control col-md-6" id="quote_status" placeholder="">
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-2">Credit Terms</label>
                        <input type="text" class="form-control col-md-6" id="credit_terms" placeholder="">
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-2">Credit Limit</label>
                        <input type="text" class="form-control col-md-6" id="credit_limit" placeholder="">
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-2">Tax Cert Filed</label>
                        <input type="text" class="form-control col-md-6" id="tax_exempt_on_file" placeholder="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- #endregion -->

<!-- #region ITEMS   -->
<div id="Items" class="tabcontent">
    <div style="display: flex; flex-direction: row">
        <div style=" overflow: hidden; flex-grow: 1">
            <!--- Search and Add -->
            <div class="inputWithIcon inputIconBg">

                <input type="text" id="search-pricebook" placeholder="Search for item" class="form-group input-lg"
                    style="width: 66%">
                <div style="float:right;">
                    <button class="btn btn-warning btn-sm" type="button" data-toggle="collapse"
                        data-target="#collapseDefaults" aria-expanded="false" aria-controls="collapseDefaults">&#9776;
                        <!-- <i class="fa fa-server"></i> -->
                    </button>
                    <button type="button" id="btn-save-view" class="btn btn-secondary btn-sm">save view</button>
                    <button type="button" id="btn-restore-view" class="btn btn-secondary btn-sm">restore view</button>
                    <button type="button" id="btn-reset-view" class="btn btn-secondary btn-sm">reset view</button>

                </div>
                <div class="collapse" id="collapseDefaults" >
                    <div class="card card-body bg-light border border-warning pt-0 pb-0" >
                        <p class="font-weight-bold mb-1"> Rates</p>
                        <div class="form-group form-inline col-md-5" id="defaults_id">
                            Materials %
                            <input type="number" class="text-center form-control col-sm-2 pl-1" id="sundries_rate" placeholder="">
                            <label class="text-secondary col-md-2 pr-0">Freight %</label>
                            <input type="number" class="text-center form-control col-sm-2 pl-1" id="freight_rate" placeholder="">
                            <label class="text-secondary col-md-2  pr-0">Tax %</label>
                            <input type="number" class="text-center form-control col-sm-2 pl-1" id="tax_rate" placeholder="">
                        </div>
                    </div>
                    <p></p>
                </div>
                <div id="match-list" class="text-secondary"></div>
                <div id="advanced-search"></div>
            </div>

            <div id="myGrid" class="ag-theme-balham" style="height: 600px; width: 100%;"></div>
        </div>
    </div>
</div>
<!-- #endregion -->

<!-- #region NOTES   -->
<div id="Notes" class="tabcontent">
    <p class="text-secondary">Enter your notes and standard print fields</p>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <h6> <label class="text-uppercase font-weight-bold">Introduction</label></h6>
                    <textarea id="notes_intro" class="form-control" rows="5"></textarea>
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <h6> <label class="text-uppercase font-weight-bold">Internal</label></h6>
                    <textarea id="notes_internal" class="form-control" rows="5"></textarea>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="form-group">
                    <h6><label class="text-uppercase font-weight-bold">Purchasing</label></h6>
                    <textarea class="form-control" id="notes_purchasing" rows="5"></textarea>
                </div>
            </div>
            <div class="col">
                <h6><label class="text-uppercase font-weight-bold">Closing Notes</label></h6>
                <textarea class="form-control" id="notes_closing" rows="5"
                    placeholder="Thank you for your business!"></textarea>
            </div>
        </div>
    </div>
</div>
<!-- #endregion -->

<!-- #region RECAP   -->
<div id="Recap" class="tabcontent">
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <form>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Equipment Sell</label>
                        <input type="text" class="form-control col-md-4 text-right" id="recap_equipment_sell"
                            placeholder="" readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Labor Sell </label>
                        <input type="text" class="form-control col-md-4 text-right" id="recap_labor_sell" placeholder=""
                            readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Subcontractor Sell</label>
                        <input type="text" class="form-control col-md-4 text-right" id="recap_subcontractor_sell"
                            placeholder="" readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">ODC Sell</label>
                        <input type="text" class="form-control col-md-4 text-right" id="recap_odc_sell" placeholder=""
                            readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Service Sell</label>
                        <input type="text" class="form-control col-md-4 text-right" id="recap_service_sell"
                            placeholder="" readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Sundries Sell</label>
                        <input type="text" class="form-control col-md-4 text-right" id="recap_sundries_sell"
                            placeholder="" readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Subtotal</label>
                        <input type="text" class="form-control col-md-4 text-right" id="recap_subtotal_sell"
                            placeholder="" readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Tax</label>
                        <input type="text" class="form-control col-md-4 text-right" id="recap_tax_sell" placeholder=""
                            readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Shipping</label>
                        <input type="text" class="form-control col-md-4 text-right" id="recap_shipping_sell"
                            placeholder="" readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Grand Total Sell</label>
                        <input type="text" class="form-control col-md-4 text-right" id="recap_grand_total_sell"
                            placeholder="" readonly>
                    </div>
                </form>
            </div>
            <div class="col">
                <form>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Equipment Cost</label>
                        <input type="text" class="form-control col-md-4 text-right" id="recap_equipment_cost"
                            placeholder="" readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Labor Cost</label>
                        <input type="text" class="form-control col-md-4 text-right" id="recap_labor_cost" placeholder=""
                            readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Subcontractor Cost</label>
                        <input type="text" class="form-control col-md-4 text-right" id="recap_subcontractor_cost"
                            placeholder="" readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">ODC Cost</label>
                        <input type="text" class="form-control col-md-4 text-right" id="recap_odc_cost" placeholder=""
                            readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Service Cost</label>
                        <input type="text" class="form-control col-md-4 text-right" id="recap_service_cost"
                            placeholder="" readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Sundries Cost</label>
                        <input type="text" class="form-control col-md-4 text-right" id="recap_sundries_cost"
                            placeholder="" readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Subtotal</label>
                        <input type="text" class="form-control col-md-4 text-right" id="recap_subtotal_cost"
                            placeholder="" readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Tax</label>
                        <input type="text" class="form-control col-md-4 text-right" id="recap_tax_cost" placeholder=""
                            readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Shipping</label>
                        <input type="text" class="form-control col-md-4 text-right" id="recap_shipping_cost"
                            placeholder="" readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Grand Total Cost</label>
                        <input type="text" class="form-control col-md-4 text-right" id="recap_grand_total_cost"
                            placeholder="" readonly>
                    </div>
                </form>
            </div>
            <div class="col">
                <form>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Labor Installation </label>
                        <input type="text" class="form-control text-right" id="recap_labor_installation" placeholder=""
                            readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Labor Engineering</label>
                        <input type="text" class="form-control text-right" id="recap__labor_engineering" placeholder=""
                            readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Labor Programming</label>
                        <input type="text" class="form-control text-right" id="recap_labor_programming" placeholder=""
                            readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Labor Project Management</label>
                        <input type="text" class="form-control text-right" id="recap_labor_pm" placeholder="" readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Labor Training</label>
                        <input type="text" class="form-control text-right" id="recap_labor_training" placeholder=""
                            readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Labor Service</label>
                        <input type="text" class="form-control text-right" id="recap_labor_service" placeholder=""
                            readonly>
                    </div>
                    <div class="form-group form-inline col-md-12">
                        <label class="text-right text-secondary col-md-4">Grand Total Cost</label>
                        <input type="text" class="form-control text-right" id="recap_grand_total_cost" placeholder=""
                            readonly>
                    </div>
                </form>
            </div>
        </div>

        <div class="chart-area">
            Charts go here
        </div>
    </div>
</div>
<!-- #endregion -->

<!-- #region INLINE SCRIPTS-->
<script>
    // get the record id to pass into the js data loading uri   
    let rec_id = '<%= request.getParameter("id") %>';

    function openTab(evt, tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    }
</script>
<script>
    $(document).ready(function () {});
</script>
<!-- #endregion -->

</body>

</html>