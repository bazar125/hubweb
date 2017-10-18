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

    val.image = `https://maps.googleapis.com/maps/api/staticmap?key=${MAPS_API_KEY}&center=${lat},${lng}&zoom=${zoom}&format=png&maptype=roadmap&&style=element:geometry%7Ccolor:0x202338&style=element:geometry%7Ccolor:0xacccdd&style=element:labels.text.fill%7Ccolor:0x6d8d9f%7Cvisibility:on&style=element:labels.text.stroke%7Csaturation:-30%7Clightness:-35%7Cgamma:0.75%7Cvisibility:off%7Cweight:2&style=feature:landscape%7Celement:geometry%7Ccolor:0xe7ecef%7Csaturation:30%7Clightness:30&style=feature:landscape.man_made%7Celement:geometry.fill%7Ccolor:0xe7ecef&style=feature:poi%7Celement:geometry%7Csaturation:20&style=feature:poi.park%7Ccolor:0xc3d8e3%7Cvisibility:simplified&style=feature:poi.park%7Celement:geometry%7Csaturation:-20%7Clightness:20&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x628497%7Cvisibility:on&style=feature:road%7Celement:geometry%7Csaturation:-30%7Clightness:10&style=feature:road%7Celement:geometry.stroke%7Csaturation:25%7Clightness:25&style=feature:road.arterial%7Celement:geometry.fill%7Ccolor:0xccd7dd&style=feature:road.arterial%7Celement:geometry.stroke%7Ccolor:0xcdd8de%7Cvisibility:on&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x6d8d9f&style=feature:road.arterial%7Celement:labels.text.stroke%7Ccolor:0xff0000%7Cvisibility:off&style=feature:road.local%7Celement:geometry.fill%7Ccolor:0xffffff%7Csaturation:-25%7Clightness:100%7Cvisibility:on&style=feature:road.local%7Celement:geometry.stroke%7Ccolor:0xffffff%7Csaturation:20%7Clightness:-100%7Cvisibility:on&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x6d8d9f%7Cvisibility:on&style=feature:road.local%7Celement:labels.text.stroke%7Cvisibility:off&style=feature:water%7Ccolor:0x8ad6ff%7Clightness:-20&size=${width}x${height}&markers=color:blue%7Clabel:S%7C${lat},${lng}`;

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
    val.image = `https://maps.googleapis.com/maps/api/staticmap?key=${MAPS_API_KEY}&center=${lat},${lng}&zoom=${zoom}&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xacccdd&style=element:labels.text.fill%7Ccolor:0x6d8d9f%7Cvisibility:on&style=element:labels.text.stroke%7Csaturation:-30%7Clightness:-35%7Cgamma:0.75%7Cvisibility:off%7Cweight:2&style=feature:landscape%7Celement:geometry%7Ccolor:0xe7ecef%7Csaturation:30%7Clightness:30&style=feature:landscape.man_made%7Celement:geometry.fill%7Ccolor:0xe7ecef&style=feature:poi%7Celement:geometry%7Csaturation:20&style=feature:poi.park%7Ccolor:0xc3d8e3%7Cvisibility:simplified&style=feature:poi.park%7Celement:geometry%7Csaturation:-20%7Clightness:20&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x628497%7Cvisibility:on&style=feature:road%7Celement:geometry%7Csaturation:-30%7Clightness:10&style=feature:road%7Celement:geometry.stroke%7Csaturation:25%7Clightness:25&style=feature:road.arterial%7Celement:geometry.fill%7Ccolor:0xccd7dd&style=feature:road.arterial%7Celement:geometry.stroke%7Ccolor:0xcdd8de%7Cvisibility:on&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x6d8d9f&style=feature:road.arterial%7Celement:labels.text.stroke%7Ccolor:0xff0000%7Cvisibility:off&style=feature:road.local%7Celement:geometry.fill%7Ccolor:0xffffff%7Csaturation:-25%7Clightness:100%7Cvisibility:on&style=feature:road.local%7Celement:geometry.stroke%7Ccolor:0xffffff%7Csaturation:20%7Clightness:-100%7Cvisibility:on&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x6d8d9f%7Cvisibility:on&style=feature:road.local%7Celement:labels.text.stroke%7Cvisibility:off&style=feature:water%7Ccolor:0x8ad6ff%7Clightness:-20&size=${width}x${height}&markers=color:blue%7Clabel:S%7C${lat},${lng}`;
//     val.image = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&maptype=roadmap
// &markers=color:blue%7Clabel:S%7C${lat},${lng}
// &key=${MAPS_API_KEY}`;

    setTimeout(() => {
      val.$animate = false;
    }, ANIMATE_DURATION);

    return val;
  },
};
