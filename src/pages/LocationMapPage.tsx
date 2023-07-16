import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useSelectedDataContext } from '../store/SelectedItemsContext';
import styles from './LocationMapPage.module.css';

export default function LocationMapPage() {
  const { selectedData } = useSelectedDataContext();
  const mapContainerRef = useRef<HTMLDivElement>(null);

  if (!selectedData) {
    return <div>캠핑장 정보가 없습니다.</div>;
  }

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = mapContainerRef.current;
    const leafletMap = L.map(map);

    leafletMap.setView([+selectedData.mapY, +selectedData.mapX], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(leafletMap);

    L.marker([+selectedData.mapY, +selectedData.mapX], {
      icon: L.icon({
        iconUrl: markerIcon,
        iconRetinaUrl: markerIcon2x,
        shadowUrl: markerShadow,
        iconAnchor: [15, 41],
        iconSize: [30, 40],
      }),
    }).addTo(leafletMap);

    return () => {
      if (leafletMap) {
        leafletMap.remove();
      }
    };
  }, [selectedData]);

  return (
    <div className={`${styles.locationMapContainer} rounded mb-5`}>
      <h5 className="mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-signpost bg-warning rounded"
          viewBox="0 0 16 16"
        >
          <path d="M7 1.414V4H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5v6h2v-6h3.532a1 1 0 0 0 .768-.36l1.933-2.32a.5.5 0 0 0 0-.64L13.3 4.36a1 1 0 0 0-.768-.36H9V1.414a1 1 0 0 0-2 0zM12.532 5l1.666 2-1.666 2H2V5h10.532z" />
        </svg>{' '}
        캠핑장 위치
      </h5>
      <p className="mt-4 ms-5">
        {' '}
        <span className="fw-semibold">주소 :</span> {selectedData.addr1}
      </p>
      <p className="ms-5">
        {' '}
        <span className="fw-semibold">연락처 :</span> {selectedData.tel}
      </p>

      <div className={`${styles.mapContainer}`}>
        <div className={`${styles.mapArea}`} ref={mapContainerRef}>
          <MapContainer
            center={[+selectedData.mapY, +selectedData.mapX]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              icon={L.icon({
                iconUrl: markerIcon,
                iconRetinaUrl: markerIcon2x,
                shadowUrl: markerShadow,
                iconAnchor: [15, 41],
                iconSize: [30, 40],
              })}
              position={[+selectedData.mapY, +selectedData.mapX]}
            ></Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
