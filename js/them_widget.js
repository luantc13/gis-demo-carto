const map = new mapboxgl.Map({
    container: 'map',
    style: carto.basemaps.voyager,
    center: [0, 30],
    zoom: 2
});

carto.setDefaultAuth({
    username: 'luantc-uit',
    apiKey: '236a6fe4176ddba383917f868481bc5f120e1fcf'
});

const source = new carto.source.Dataset('gdeltgkg_cartodb_hourly');

const viz = new carto.Viz(`
    @histogram: viewportHistogram($urltone, 6)
`);
const layer = new carto.Layer('layer', source, viz);
layer.addTo(map);

layer.on('updated', drawHistogram);

function drawHistogram() {
    var histogramWidget = document.querySelector('as-histogram-widget');
    const histogram = layer.viz.variables.histogram.value;
    histogramWidget.data = histogram.map(entry => {
        return {
            start: entry.x[0] / 1e6,
            end: entry.x[1] / 1e6,
            value: Math.log(entry.y + 1)
        }
    });
}