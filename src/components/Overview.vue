<template>
  <div class="overview d-flex flex-column">
    <div class="stats-container d-flex justify-content-start align-items-center">
      <stats-widget type="Citations" icon="book" :value="statCitations"></stats-widget>
      <stats-widget type="Collisions" icon="fire" :value="statCollisions"></stats-widget>
      <stats-widget type="Notifications" icon="exclamation" :value="statNotifications"></stats-widget>
    </div>

    <div class="map-container d-flex flex-column justify-content-start align-items-center">
      <div class="map-overlay d-flex justify-content-start align-items-center">
        <icon name="check-circle-o" class="icon-status color-green"></icon>
        <span class="txt-status">All systems are functioning normally</span>

        <icon name="exclamation" class="icon-status" style="margin-left: 15px;"></icon>
        <span class="txt-status">No pending notifications</span>

        <icon name="circle-thin" class="ml-auto icon-status color-red" style="margin-left: 15px;"></icon>
        <span class="txt-status">Collision</span>

        <icon name="circle-thin" class="icon-status color-blue" style="margin-left: 15px;"></icon>
        <span class="txt-status" style="margin-right: 15px;">Citation</span>

        <icon name="clock-o" class="icon-clock"></icon>
        <clock class="custom-clock" :blink="true" :displaySeconds="false" />
      </div>

      <v-map class="live-map" ref="map" :zoom="8" :center="center">
        <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
        <!-- <v-marker :lat-lng="center"></v-marker> -->
      </v-map>
    </div>
  </div>
</template>

<script>
import Clock from 'vue-digital-clock';
import L from 'leaflet';
import * as d3 from 'd3';

import TablePageLoader from '@/services/TablePageLoader';
import StatsWidget from '@/components/StatsWidget';

const pageLoader = new TablePageLoader('citation');

/* eslint-disable */
/**
 * L is defined by the Leaflet library, see git://github.com/Leaflet/Leaflet.git for documentation
 * We extend L.SVG to take advantage of built-in zoom animations.
 */
L.PingLayer = L.SVG.extend({
  includes: [L.Mixin.Events],

	/*
	 * Default options
	 */
  options: {
    duration: 800,
    fps: 32,
    opacityRange: [1, 0],
    radiusRange: [3, 15]
  },


  // Initialization of the plugin
  initialize(options) {
    L.setOptions(this, options);

    this._fn = {
      lng(d) { return d[0]; },
      lat(d) { return d[1]; },
      radiusScaleFactor(d) { return 1; }
    };

    this._scale = {
      radius: d3.scalePow().exponent(0.35),
      opacity: d3.scaleLinear()
    };

    this._lastUpdate = Date.now();
    this._fps = 0;

    this._scale.radius
      .domain([0, this.options.duration])
      .range(this.options.radiusRange)
      .clamp(true);
    this._scale.opacity
      .domain([0, this.options.duration])
      .range(this.options.opacityRange)
      .clamp(true);
  },

  // Called when the plugin layer is added to the map
  onAdd(map) {

    L.SVG.prototype.onAdd.call(this);

    // Store a reference to the map for later use
    this._map = map;

    // Init the state of the simulation
    this._running = false;

    // Set up events
    map.on({ 'move': this._updateContainer }, this);

  },

  // Called when the plugin layer is removed from the map
  onRemove(map) {

    L.SVG.prototype.onRemove.call(this);

    // Destroy the svg container
    this._destroyContainer();

    // Remove events
    map.off({ 'move': this._updateContainer }, this);

    this._map = null;
    this._data = null;

  },


	/*
	 * Private Methods
	 */

  // Initialize the Container - creates the svg pane
  _initContainer() {

    L.SVG.prototype._initContainer.call(this);
    this._d3Container = d3.select(this._container).select('g');

  },

  // Update the container - Updates the dimensions of the svg pane
  _updateContainer() {

    this._updatePings(true);

  },

  // Cleanup the svg pane
  _destroyContainer() {

    // Don't do anything

  },


  // Calculate the circle coordinates for the provided data
  _getCircleCoords(geo) {
    const point = this._map.latLngToLayerPoint(geo);
    return { x: point.x, y: point.y };
  },


  // Add a ping to the map
  _addPing(data, cssClass) {
    // Lazy init the data array
    if (null == this._data) this._data = [];

    // Derive the spatial data
    const geo = [this._fn.lat(data), this._fn.lng(data)];
    const coords = this._getCircleCoords(geo);

    // Add the data to the list of pings
    const circle = {
      data,
      geo,
      ts: Date.now(),
      nts: 0
    };
    circle.c = this._d3Container.append('circle')
      .attr('class', (null != cssClass) ? `ping ${cssClass}` : 'ping')
      .attr('cx', coords.x)
      .attr('cy', coords.y)
      .attr('r', this._fn.radiusScaleFactor.call(this, data) * this._scale.radius.range()[0]);

    // Push new circles
    this._data.push(circle);
  },

  // Main update loop
  _updatePings(immediate) {
    const nowTs = Date.now();
    if (null == this._data) this._data = [];

    let maxIndex = -1;

    // Update everything
    for (let i = 0; i < this._data.length; i++) {

      const d = this._data[i];
      const age = nowTs - d.ts;

      if (this.options.duration < age) {

        // If the blip is beyond it's life, remove it from the dom and track the lowest index to remove
        d.c.remove();
        maxIndex = i;

      }
      else {

        // If the blip is still alive, process it
        if (immediate || d.nts < nowTs) {

          const coords = this._getCircleCoords(d.geo);

          d.c.attr('cx', coords.x)
            .attr('cy', coords.y)
            .attr('r', this._fn.radiusScaleFactor.call(this, d.data) * this._scale.radius(age))
            .attr('fill-opacity', this._scale.opacity(age))
            .attr('stroke-opacity', this._scale.opacity(age));
          d.nts = Math.round(nowTs + 1000 / this.options.fps);

        }
      }
    }

    // Delete all the aged off data at once
    if (maxIndex > -1) {
      this._data.splice(0, maxIndex + 1);
    }

    // The return function dictates whether the timer loop will continue
    this._running = (this._data.length > 0);

    if (this._running) {
      this._fps = 1000 / (nowTs - this._lastUpdate);
      this._lastUpdate = nowTs;
    }

    return !this._running;
  },

  // Expire old pings
  _expirePings() {
    let maxIndex = -1;
    const nowTs = Date.now();

    // Search from the front of the array
    for (let i = 0; i < this._data.length; i++) {
      const d = this._data[i];
      const age = nowTs - d.ts;

      if (this.options.duration < age) {
        // If the blip is beyond it's life, remove it from the dom and track the lowest index to remove
        d.c.remove();
        maxIndex = i;
      }
      else {
        break;
      }
    }

    // Delete all the aged off data at once
    if (maxIndex > -1) {
      this._data.splice(0, maxIndex + 1);
    }
  },

	/*
	 * Public Methods
	 */

  duration(v) {
    if (!arguments.length) { return this.options.duration; }
    this.options.duration = v;

    return this;
  },

  fps(v) {
    if (!arguments.length) { return this.options.fps; }
    this.options.fps = v;

    return this;
  },

  lng(v) {
    if (!arguments.length) { return this._fn.lng; }
    this._fn.lng = v;

    return this;
  },

  lat(v) {
    if (!arguments.length) { return this._fn.lat; }
    this._fn.lat = v;

    return this;
  },

  radiusRange(v) {
    if (!arguments.length) { return this.options.radiusRange; }
    this.options.radiusRange = v;
    this._scale.radius().range(v);

    return this;
  },

  opacityRange(v) {
    if (!arguments.length) { return this.options.opacityRange; }
    this.options.opacityRange = v;
    this._scale.opacity().range(v);

    return this;
  },

  radiusScale(v) {
    if (!arguments.length) { return this._scale.radius; }
    this._scale.radius = v;

    return this;
  },

  opacityScale(v) {
    if (!arguments.length) { return this._scale.opacity; }
    this._scale.opacity = v;

    return this;
  },

  radiusScaleFactor(v) {
    if (!arguments.length) { return this._fn.radiusScaleFactor; }
    this._fn.radiusScaleFactor = v;

    return this;
  },

	/*
	 * Method by which to "add" pings
	 */
  ping(data, cssClass) {
    this._addPing(data, cssClass);
    this._expirePings();

    // Start timer if not active
    if (!this._running && this._data.length > 0) {
      this._running = true;
      this._lastUpdate = Date.now();

      const that = this;
      d3.timer(() => { that._updatePings.call(that, false) });
    }

    return this;
  },

  getActualFps() {
    return this._fps;
  },

  data() {
    return this._data;
  },

});

L.pingLayer = options => new L.PingLayer(options);

/* eslint-disable no-underscore-dangle */
export default {
  name: 'Overview',
  components: {
    Clock,
    StatsWidget,
  },
  data() {
    return {
      pingLayer: {},
      center: [10.3080, 7.0142],
      statCitations: 314,
      statCollisions: 214,
      statNotifications: 34,
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      const options = {
        duration: 800,
      };

      this.pingLayer = L.pingLayer(options).addTo(this.$refs.map.mapObject);
      this.pingLayer.radiusScale().range([2, 18]);
      this.pingLayer.opacityScale().range([1, 0]);

      // const paused = false;
      const update = () => {
        const latlng = [d3.randomNormal(this.center[0], 1)(), d3.randomNormal(this.center[0], 1)()];
        // console.log(latlng);
        this.pingLayer.ping(latlng, (Math.random() > 0.5) ? 'red' : 'blue');
        setTimeout(update, 100 + (Math.random() * 400));
      };
      setTimeout(update);

      pageLoader.load(1).then((page) => {
        this.items = this.processRows(page.items);
        this.totalRows = page.totalRows;
      });
    },
    pageChanged(newPage) {
      pageLoader.load(newPage).then((page) => {
        this.items = this.processRows(page.items);
        this.totalRows = page.totalRows;
      });
    },
    processRows(items) {
      for (let i = 0; i < items.length; i += 1) {
        const row = items[i];
        if (row.completionStatus === 'Overdue') {
          row._dirtyClass = 'danger';
          row._cellVariants = {
            completionStatus: 'danger',
          };
        } else if (row.completionStatus === 'Awaiting Payment') {
          row._dirtyClass = 'alert';
          row._cellVariants = {
            completionStatus: 'alert',
          };
        } else if (row.completionStatus === 'Paid') {
          row._dirtyClass = 'success';
          row._cellVariants = {
            completionStatus: 'success',
          };
        }
      }
      return items;
    },
  },
};
</script>

<style scoped>
.overview {
  height: 100%;
  /* Sidenav width: 150px */
  width: calc(100% - 150px);
}

.map-container {
  position: relative;
  overflow: hidden;
  flex: 1;
  /* padding: 10px 20px; */
}

.stats-container {
  background-color: #ececec;
}

.map-overlay {
  position: absolute;
  overflow: hidden;
  top: 0;
  width: 100%;
  padding-left: 50px;
  padding-right: 20px;
  border-bottom: 1px solid #ececec;
  color: white;
  background-color: rgba(0, 0, 0, .7);
  z-index: 999;
}

.search-input {
  width: 150px;
  /* height: 40px; */
}

.filter-bar {
  padding: 8px;
}

.pagination {
  margin-top: 0px;
}

.custom-table {
  width: 100%;
}
</style>

<style>
.custom-table-cell {
  cursor: pointer;
}

.overview-lower .table-footer {
  margin-bottom: 0px !important;
}

.icon-status {
  width: 15px;
  height: 15px;
  margin-right: 10px;
}

.icon-clock {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}

.color-green {
  color: #00B76F;
}

.custom-clock {
  font-size: 16px;
  padding: 3px 0px;
}

circle.ping {
  stroke: #000;
  stroke-width: 1px;
}

circle.red {
  fill: red;
}

circle.blue {
  fill: steelblue;
}

.color-red {
  color: red;
}

.color-blue {
  color: steelblue;
}

/* red is ef3135 */
.txt-status {

}

.live-map {
  flex: 1;
}
</style>
