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
    color: ramp($urltone, [darkorange, darkviolet, darkturquoise])
    width: 10
`);
const layer = new carto.Layer('layer', source, viz);
layer.addTo(map);

function rgbToHex(color) {
    return "#" + ((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1);
}

layer.on('loaded', () => {

    const colorLegend = layer.viz.color.getLegendData();
    let colorLegendList = '';

    colorLegend.data.forEach((legend, index) => {
        const color = rgbToHex(legend.value);

        colorLegendList +=
            `<li><span class="point-mark" style="background-color:${color};border: 1px solid black;"></span> <span>${legend.key}</span></li>\n`;
    });

    document.getElementById('content').innerHTML = colorLegendList;
});