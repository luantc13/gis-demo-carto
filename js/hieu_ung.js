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

// animation
const viz = new carto.Viz(`
    @duration: 10
    @animation: animation($urlpubtimedate, @duration, fade(0, 0.5))
    filter: @animation
`);
const layer = new carto.Layer('layer', source, viz);
layer.addTo(map);
viz.variables.animation.play();