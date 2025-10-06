import { useMemo, useRef, useState } from "react";
import "./firebase";
import rootData from "./data/geoHierarchy";
import type { LocationNode, Node } from "./types";
import { replaceSubtree, setStatusDeep, toggleStatus } from "./lib/tree";
import MapView from "./components/MapView";
import Tree from "./components/Tree";

function clone<T>(x: T): T {
  return structuredClone ? structuredClone(x) : JSON.parse(JSON.stringify(x));
}

export default function App() {
  const [root, setRoot] = useState<LocationNode>(clone(rootData));
  // expanded: which locations are expanded (children visible)
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const mapRef = useRef<google.maps.Map | null>(null);

  const onToggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const onToggleStatusCascade = (id: string) => {
    setRoot((prev) =>
      replaceSubtree(prev, id, (node: Node) => {
        // For locations: cascade to descendants; for devices: just toggle self
        return node.type === "location" ? setStatusDeep(node, node.status === "on" ? "off" : "on") : toggleStatus(node);
      }) as LocationNode
    );
  };

  const onCenterOnNode = (n: Node) => {
    if (!mapRef.current) return;
    mapRef.current.panTo(n.coordinates);
    mapRef.current.setZoom(n.type === "location" ? 12 : 14);
  };

  

  const resetAll = () => {
    setRoot(clone(rootData));
    setExpanded(new Set());
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <h3 style={{ margin: "4px 0 10px" }}>Hierarchy</h3>
        <Tree
          root={root}
          expanded={expanded}
          onToggleExpand={onToggleExpand}
          onToggleStatusCascade={onToggleStatusCascade}
          onCenterOnNode={onCenterOnNode}
        />
        <hr style={{ margin: "12px 0" }} />
        <button className="btn" onClick={resetAll}>Reset data</button>
      </aside>

      <main className="map">
        <MapView
          root={root}
          expanded={expanded}
          onToggleExpand={onToggleExpand}
          onToggleStatusCascade={onToggleStatusCascade}
        />
      </main>
    </div>
  );
}
