/*!
 * map.js
 */

let mapClubs = document.getElementById("js-map-clubs");

if (mapClubs) {
  initMapClubs();
}

async function initMapClubs() {
  // Request needed libraries
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  let zoom = 8;

  const initCoordinates = { lat: 49.84692454446155, lng: 15.77757359818391 };

  const mqSmallMax = "(max-width: 800px)";
  const mqSmallMaxMethod = window.matchMedia(mqSmallMax);

  const mqExtraSmallMax = "(max-width: 576px)";
  const mqExtraSmallMaxMethod = window.matchMedia(mqExtraSmallMax);

  const setZoom = (ev) => {
    if (ev.media === mqSmallMax) {
      if (ev.matches) {
        zoom = 7;
      }
    }
    if (ev.media === mqExtraSmallMax) {
      if (ev.matches) {
        zoom = 6;
      }
    }
  };

  setZoom(mqSmallMaxMethod);
  setZoom(mqExtraSmallMaxMethod);

  mapClubs = new Map(document.getElementById("js-map-clubs"), {
    mapId: "4b3d018498d127fd",
    zoom: zoom,
    center: initCoordinates
  });

  const markerImg = isLocalhost ? "./img/icons/map_marker.svg" : "/dist/img/icons/map_marker.svg";

  // Custom cluster marker
  // const renderer = {
  //   render: ({ count, position }) =>
  //     new google.maps.Marker({
  //       position,
  //       icon: {
  //         url: "./img/icons/map_cluster_marker.svg"
  //         // scaledSize: new google.maps.Size(45, 45),
  //       },
  //       label: { text: String(count), color: "#FFFFFF", fontFamily: "Maison Neue Extended", fontSize: "24px", fontWeight: "600" }
  //       // zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count
  //     })
  // };

  const infoWindowHTML = "";
  const infoWindow = new google.maps.InfoWindow({
    content: infoWindowHTML,
    maxWidth: 280,
    pixelOffset: new google.maps.Size(0, 4)
  });

  const markers = clubs.map((club) => {
    const marker = new google.maps.Marker({
      position: club.coordinates,
      icon: markerImg,
      map: mapClubs
    });

    marker.addListener("click", () => {
      infoWindow.setContent(`<div class="GoogleMap-infoWindowInner">
        <img class="Logo" src="${club.logo ? club.logo : "/dist/img/logo-club-empty.svg"}" width="48" height="48" alt="logo ${club.name}" />
        <h5 class="H8 u-mt-8">${club.name}</h5>
        <a href="${club.url}" class="Button u-mt-8" tabindex="0">Detail klubu</a>
      </div>`);
      infoWindow.open({
        shouldFocus: false,
        anchor: marker,
        mapClubs
      });
    });

    return marker;
  });

  // const markerCluster = new markerClusterer.MarkerClusterer({ map, markers, renderer });
}
