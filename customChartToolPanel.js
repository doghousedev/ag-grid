class CustomChartToolPanel {
    constructor() {
    }
    init(params) {
        this.eGui = document.createElement('div');
        this.eGui.style.textAlign = "center";

        // make a graph when new rows loaded, i.e. onModelUpdated
        var renderStats = () => this.eGui.innerHTML = calculateGraph(params);

        params.api.addEventListener('modelUpdated', renderStats);
        params.api.addEventListener('cellValueChanged', renderStats);
    }
    getGui() {
        return this.eGui;
    }
}

function calculateGraph(params) {
    return `<span>
               <h3><i class="fas fa-chart-bar"></i>Charts</h3>
               <dl style="font-size: small; padding: 20px 30px 10px 20px">
               <hr class="largeLine">
               <dt style="padding-bottom: 15px">Charts goes here</b></dt>
               </dl>
            </span>`;
}