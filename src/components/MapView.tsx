import { useMemo, useState, useCallback } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import type { LocationNode, Node } from "../types";
import { getVisibleNodes, findNode } from "../lib/tree";
import clsx from "clsx";

type Props = {
  root: LocationNode;
  expanded: Set<string>;
  onToggleExpand: (id: string) => void;
  onToggleStatusCascade: (id: string) => void;
};

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

const SG_CENTER = { lat: 1.3521, lng: 103.8198 };

function svgPin(color: string, size = 28) {
  // Simple map-pin SVG as a data URL (colorable)
  const svg = `
  <svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="${color}" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
  </svg>`;
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

function iconFor(node: Node) {
  const isOn = node.status === "on";
  // Colors: locations = blue/gray, devices = green/gray
  const color = node.type === "location"
    ? (isOn ? "#2D7EF7" : "#9AA4B2")
    : (isOn ? "#2ECC71" : "#9AA4B2");
  // Slightly different sizes to differentiate
  const size = node.type === "location" ? 80 : 80;
  return {
    url: svgPin(color, size),
    anchor: { x: size / 2, y: size }, // visually sits on lat/lng point
  } as google.maps.Icon;
}

export default function MapView({
  root,
  expanded,
  onToggleExpand,
  onToggleStatusCascade,
}: Props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visible = useMemo(() => getVisibleNodes(root, expanded), [root, expanded]);
  const selected = useMemo(() => {
    if (!selectedId) return null;
    return findNode(root, selectedId);
  }, [root, selectedId]);

  const handleMarkerClick = useCallback((node: Node) => {
    setSelectedId(node.id);
  }, []);

  if (!isLoaded) return <div style={{ padding: 16 }}>Loading map…</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={SG_CENTER}
      zoom={11}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      }}
    >
      {visible.map((node) => (
        <Marker        
          key={`${node.id}-${node.status}`}  
          position={node.coordinates}
          icon={iconFor(node)}
          onClick={() => handleMarkerClick(node)}
          label={node.type === "location" ? "L" : "D"}
        />
      ))}

      {selected && (
        <InfoWindow
          position={selected.coordinates}
          onCloseClick={() => setSelectedId(null)}
        >
          <div style={{ minWidth: 220 }}>
            <div className="iw-title" style={{ fontWeight: 700, marginBottom: 6 }}>
              {selected.name} {selected.type === "location" ? "(Location)" : "(Device)"}
            </div>
            <div className={clsx("status", selected.status === "on" ? "on" : "off")}>
              Status: <strong>{selected.status.toUpperCase()}</strong>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              {selected.type === "location" && (
                <button
                  onClick={() => {
                    onToggleExpand(selected.id);
                    // keep info window open and reflect new children visibility
                  }}
                  style={{ padding: "6px 10px" }}
                >
                  {expanded.has(selected.id) ? "Collapse" : "Expand"}
                </button>
              )}

              <button
                onClick={() => onToggleStatusCascade(selected.id)}
                style={{ padding: "6px 10px" }}
              >
                Toggle Power
              </button>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
