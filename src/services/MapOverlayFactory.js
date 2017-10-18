export default {
  pulseMarker(map, lat, lng, color) {
    // eslint-disable-next-line no-undef
    const overlay = new google.maps.OverlayView();
    overlay.setMap(map);

    overlay.onAdd = () => {
      const el = document.createElement('div');
      el.className = 'pulse-marker';
      if (color === 'red') {
        el.className += ' red';
      }
      overlay.el = el;
      el.style.borderStyle = 'none';
      el.style.borderWidth = '0px';
      el.style.position = 'absolute';
      el.style.zIndex = 100;

      const overlayLayer = overlay.getPanes().overlayLayer;
      const stopOverlayEvents = ['contextmenu', 'DOMMouseScroll', 'dblclick', 'mousedown'];
      overlayLayer.appendChild(el);

      for (let ev = 0; ev < stopOverlayEvents.length; ev += 1) {
        // eslint-disable-next-line no-loop-func
        ((object, name) => {
          // eslint-disable-next-line no-undef
          google.maps.event.addDomListener(object, name, (e) => {
            if (navigator.userAgent.toLowerCase().indexOf('msie') !== -1 && document.all) {
              e.cancelBubble = true;
              e.returnValue = false;
            } else {
              e.stopPropagation();
            }
          });
        })(el, stopOverlayEvents[ev]);
      }

      // TODO: Click callback
      // if (options.click) {
      //   panes.overlayMouseTarget.appendChild(overlay.el);
      //   google.maps.event.addDomListener(overlay.el, 'click', function () {
      //     options.click.apply(overlay, [overlay]);
      //   });
      // }

      // eslint-disable-next-line no-undef
      google.maps.event.trigger(this, 'ready');
    };

    overlay.draw = () => {
      const projection = overlay.getProjection();
      // eslint-disable-next-line no-undef
      const pixel = projection.fromLatLngToDivPixel(new google.maps.LatLng(lat, lng));

      const el = overlay.el;
      const contentHeight = 40;
      const contentWidth = 40;
      el.style.top = `${pixel.y - (contentHeight / 2)}px`;
      el.style.left = `${pixel.x - (contentWidth / 2)}px`;
      el.style.display = 'block';

      // if (!auto_show) {
      //   options.show.apply(this, [el]);
      // }
    };

    overlay.onRemove = () => {
      overlay.el.parentNode.removeChild(overlay.el);
      overlay.el = null;
      // if (options.remove) {
      //   options.remove.apply(this, [el]);
      // }
      // else {
      //   overlay.el.parentNode.removeChild(overlay.el);
      //   overlay.el = null;
      // }
    };

    // this.overlays.push(overlay);
    return overlay;
  },
};
