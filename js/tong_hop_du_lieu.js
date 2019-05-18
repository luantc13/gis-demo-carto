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

// tổng hợp viewport
const viewportViz = new carto.Viz(`
    color: green
    width: 20
    @v_sum: viewportSum($urltone)
`);
const viewportLayer = new carto.Layer('viewportLayer', source, viewportViz);
viewportLayer.addTo(map);

function displayViewportValues() {
    console.log(`Viewport Sum: ${viewportViz.variables.v_sum.value}`);
}
viewportLayer.on('updated', displayViewportValues);

// tổng hợp global
const globalViz = new carto.Viz(`
    color: red
    width: 50
    @g_max: globalMax($urltone)
    filter: $urltone == @g_max
`);
const globalLayer = new carto.Layer('globalLayer', source, globalViz);
globalLayer.addTo(map);