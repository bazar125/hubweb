// import * as moment from 'moment';
export default {
  // map: Google maps object, content: HTML as string
  createOverlay(map, lat, lng, content) {
    // eslint-disable-next-line no-undef
    const overlay = new google.maps.OverlayView();
    overlay.setMap(map);

    overlay.onAdd = () => {
      const el = document.createElement('div');
      overlay.el = el;
      el.style.borderStyle = 'none';
      el.style.borderWidth = '0px';
      el.style.position = 'absolute';
      el.style.zIndex = 100;
      if (content) {
        el.innerHTML = content;
      }

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
      let contentHeight = 40;
      let contentWidth = 40;
      if (el.children.length > 0) {
        const child = el.children[0];
        contentHeight = child.clientHeight;
        contentWidth = child.clientWidth;
      }
      el.style.top = `${pixel.y - (contentHeight / 2)}px`;
      el.style.left = `${pixel.x - (contentWidth / 2)}px`;
      el.style.display = 'block';
    };

    overlay.onRemove = () => {
      overlay.el.parentNode.removeChild(overlay.el);
      overlay.el = null;
    };

    return overlay;
  },
  pulseMarker(map, lat, lng, color) {
    if (color !== 'red' && color !== 'blue') {
      return null;
    }

    // const content = `<div class="pulse-marker ${color}"></div>`;
    const content = `<div class="ring-container">
                        <div class="ringring ${color}"></div>
                        <div class="circle ${color}"></div>
                    </div>`;
    
    const overlay = this.createOverlay(map, lat, lng, content);
    return overlay;
  },
  scannerUserMarker(map, lat, lng, scannerUser) {
    if (!scannerUser) {
      return null;
    }

    const content = `<div class="scanner-user-marker d-flex align-items-center">
      <img class="scanner-user-marker-image" src="${scannerUser.image}"></img>
      <div class="d-flex flex-column justify-content-start align-items-start" style="flex: 1;">
        <span class="scanner-user-marker-name">${scannerUser.name}</span>
        <span class="scanner-user-marker-zone">Deployed</span>
      </div>
    </div>`;
    // <span class="scanner-user-marker-timeago">${moment(scannerUser.timestamp).fromNow()}</span>
    const overlay = this.createOverlay(map, lat, lng, content);
    return overlay;
  },
};
