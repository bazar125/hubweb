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
    val.image = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&maptype=roadmap
&markers=color:blue%7Clabel:S%7C${lat},${lng}
&key=${MAPS_API_KEY}`;

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
    val.image = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&maptype=roadmap
&markers=color:blue%7Clabel:S%7C${lat},${lng}
&key=${MAPS_API_KEY}`;

    setTimeout(() => {
      val.$animate = false;
    }, ANIMATE_DURATION);

    return val;
  },
};
