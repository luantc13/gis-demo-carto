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
    color: green
    width: 10
`);
const layer = new carto.Layer('layer', source, viz);
layer.addTo(map);

// GEOJson và SQL
const offices = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-73.944158, 40.678178]
            },
            "properties": {
                "address": "Brooklyn, New York"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-3.70379, 40.416775]
            },
            "properties": {
                "address": "Madrid, Spain"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-77.036871, 38.907192]
            },
            "properties": {
                "address": "Washington, DC"
            }
        }
    ]
};
const officesSource = new carto.source.GeoJSON(offices);
const officesLayer = new carto.Layer('offices', officesSource, new carto.Viz());
officesLayer.addTo(map);

const query = 'SELECT * FROM gdeltgkg_cartodb_hourly WHERE urltone = 0';
const megacitiesSource = new carto.source.SQL(query, {
    username: 'luantc-uit',
    apiKey: '236a6fe4176ddba383917f868481bc5f120e1fcf'
});
const megacitiesViz = new carto.Viz('color: blue');
const megacitiesLayer = new carto.Layer('megacities', megacitiesSource, megacitiesViz);
megacitiesLayer.addTo(map);