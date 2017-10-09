import moment from 'moment';

const MAPS_API_KEY = 'AIzaSyD5XSex8F-5VHZtQ8io0T9BFf8O3zg9yZg';
const ANIMATE_DURATION = 3000;

export default {
  citation(snap, animate) {
    const val = snap.val ? snap.val() : snap;
    val.typeDescription = 'citation';
    val.timeAgo = moment(val.timestamp).fromNow();
    if (animate) {
      val.$animate = true;
    }
    if (snap.key) {
      val.$id = snap.key;
    }

    const lat = val.coords ? val.coords.lat : 10.3080;
    const lng = val.coords ? val.coords.lng : 7.0142;
    const width = 800;
    const height = 200;
    const zoom = 12;

    val.image = `https://maps.googleapis.com/maps/api/staticmap?key=${MAPS_API_KEY}&center=${lat},${lng}&zoom=${zoom}&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x202338&style=element:labels.text.fill%7Ccolor:0xa5a6b9&style=element:labels.text.stroke%7Ccolor:0x1a3646&style=feature:administrative.country%7Celement:geometry.stroke%7Ccolor:0x2c2e49&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0x64779e&style=feature:administrative.province%7Celement:geometry.stroke%7Ccolor:0x2c2e49&style=feature:landscape.man_made%7Celement:geometry.stroke%7Ccolor:0x334e87&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0x2c2e49&style=feature:poi%7Celement:geometry%7Ccolor:0x283d6a&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x797997&style=feature:poi%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0x023e58&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x3C7680&style=feature:road%7Celement:geometry%7Ccolor:0x585e8c&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:road%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:road.highway%7Celement:geometry%7Ccolor:0x585e8c&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x797997&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xa5a6b9&style=feature:road.highway%7Celement:labels.text.stroke%7Ccolor:0x797997&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:transit%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:transit.line%7Celement:geometry.fill%7Ccolor:0x283d6a&style=feature:transit.station%7Celement:geometry%7Ccolor:0x3a4762&style=feature:water%7Celement:geometry%7Ccolor:0x0e1626&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x4e6d70&size=${width}x${height}&markers=color:blue%7Clabel:S%7C${lat},${lng}`;

//     val.image = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&maptype=roadmap
// &markers=color:blue%7Clabel:S%7C${lat},${lng}
// &key=${MAPS_API_KEY}`;

    setTimeout(() => {
      val.$animate = false;
    }, ANIMATE_DURATION);
    return val;
  },
  collision(snap, animate) {
    const val = snap.val ? snap.val() : snap;
    // const timestamp = val.timestamp;
    val.typeDescription = 'collision';
    val.timeAgo = moment(val.timestamp).fromNow();
    if (animate) {
      val.$animate = true;
    }
    val.$id = snap.key;

    val.allDrivers = [];
    for (let j = 0; j < val.drivers.length; j += 1) {
      const driver = val.drivers[j];
      val.allDrivers.push(driver.name);
    }
    val.allDrivers = val.allDrivers.join(', ');

    val.allVehicles = [];
    for (let j = 0; j < val.vehicles.length; j += 1) {
      const vehicle = val.vehicles[j];
      val.allVehicles.push(vehicle.plate);
    }
    val.allVehicles = val.allVehicles.join(', ');

    const lat = val.coords ? val.coords.lat : 10.3080;
    const lng = val.coords ? val.coords.lng : 7.0142;
    const width = 800;
    const height = 200;
    const zoom = 12;
    val.image = `https://maps.googleapis.com/maps/api/staticmap?key=${MAPS_API_KEY}&center=${lat},${lng}&zoom=${zoom}&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x202338&style=element:labels.text.fill%7Ccolor:0xa5a6b9&style=element:labels.text.stroke%7Ccolor:0x1a3646&style=feature:administrative.country%7Celement:geometry.stroke%7Ccolor:0x2c2e49&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0x64779e&style=feature:administrative.province%7Celement:geometry.stroke%7Ccolor:0x2c2e49&style=feature:landscape.man_made%7Celement:geometry.stroke%7Ccolor:0x334e87&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0x2c2e49&style=feature:poi%7Celement:geometry%7Ccolor:0x283d6a&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x797997&style=feature:poi%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0x023e58&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x3C7680&style=feature:road%7Celement:geometry%7Ccolor:0x585e8c&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:road%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:road.highway%7Celement:geometry%7Ccolor:0x585e8c&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x797997&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xa5a6b9&style=feature:road.highway%7Celement:labels.text.stroke%7Ccolor:0x797997&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:transit%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:transit.line%7Celement:geometry.fill%7Ccolor:0x283d6a&style=feature:transit.station%7Celement:geometry%7Ccolor:0x3a4762&style=feature:water%7Celement:geometry%7Ccolor:0x0e1626&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x4e6d70&size=${width}x${height}&markers=color:blue%7Clabel:S%7C${lat},${lng}`;
//     val.image = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&maptype=roadmap
// &markers=color:blue%7Clabel:S%7C${lat},${lng}
// &key=${MAPS_API_KEY}`;

    setTimeout(() => {
      val.$animate = false;
    }, ANIMATE_DURATION);

    return val;
  },
};
