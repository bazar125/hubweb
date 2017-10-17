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
    const zoom = 14;

    val.image = `https://maps.googleapis.com/maps/api/staticmap?key=${MAPS_API_KEY}&center=${lat},${lng}&zoom=${zoom}&format=png&maptype=roadmap&&style=element:geometry%7Ccolor:0x202338&style=element:geometry%7Ccolor:0x212121&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry.fill%7Ccolor:0x2c2c2c&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x999999&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x5c5d6e&style=feature:road.highway%7Celement:geometry%7Ccolor:0x8f90a8&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x646778&style=feature:road.local%7Celement:geometry%7Ccolor:0x3e404b&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x777777&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d&size=${width}x${height}&markers=color:blue%7Clabel:S%7C${lat},${lng}`;

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
    const zoom = 14;
    val.image = `https://maps.googleapis.com/maps/api/staticmap?key=${MAPS_API_KEY}&center=${lat},${lng}&zoom=${zoom}&format=png&maptype=roadmap&&style=element:geometry%7Ccolor:0x202338&style=element:geometry%7Ccolor:0x212121&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry.fill%7Ccolor:0x2c2c2c&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x999999&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x5c5d6e&style=feature:road.highway%7Celement:geometry%7Ccolor:0x8f90a8&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x646778&style=feature:road.local%7Celement:geometry%7Ccolor:0x3e404b&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x777777&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d&size=${width}x${height}&markers=color:blue%7Clabel:S%7C${lat},${lng}`;
//     val.image = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&maptype=roadmap
// &markers=color:blue%7Clabel:S%7C${lat},${lng}
// &key=${MAPS_API_KEY}`;

    setTimeout(() => {
      val.$animate = false;
    }, ANIMATE_DURATION);

    return val;
  },
};
