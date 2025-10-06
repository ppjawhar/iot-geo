import type { Node, LocationNode, Status } from "../types";

/** Recursively set status on node and all descendants (devices + locations). */
export function setStatusDeep(node: Node, status: Status): Node {
  if (node.type === "location") {
    return {
      ...node,
      status,
      children: node.children.map((c) => setStatusDeep(c, status)),
    };
  }
  return { ...node, status };
}

/** Replace subtree at `id` by applying `transform` to that subtree. */
export function replaceSubtree(
  node: Node,
  id: string,
  transform: (n: Node) => Node
): Node {
  if (node.id === id) {
    return transform(node);
  }
  if (node.type === "location") {
    return {
      ...node,
      children: node.children.map((c) => replaceSubtree(c, id, transform)),
    };
  }
  return node;
}

/** Toggle status (for location: cascade; for device: just itself). */
export function toggleStatus(node: Node): Node {
  const next: Status = node.status === "on" ? "off" : "on";
  if (node.type === "location") return setStatusDeep(node, next);
  return { ...node, status: next };
}

/** Collect nodes that should be visible given expanded set. Root is always visible. */
export function getVisibleNodes(root: LocationNode, expanded: Set<string>): Node[] {
    const acc: Node[] = [];
  
    const visit = (n: Node) => {
      const isLoc = n.type === "location";
      const isExpanded = isLoc && expanded.has(n.id);
  
      // Show rules:
      // - Devices: show only if their ancestor chain is opened up to them (handled by recursion).
      // - Locations: show only if NOT expanded. If expanded, hide this marker and show its children.
      const shouldShow = !isLoc || !isExpanded;
      if (shouldShow) acc.push(n);
  
      if (isLoc && isExpanded) {
        // Only when a location is expanded do we traverse into its children.
        n.children.forEach(visit);
      }
    };
  
    // Root behavior:
    // - If root is not expanded: show only root
    // - If root is expanded: hide root, show its (recursively filtered) children
    const rootIsExpanded = expanded.has(root.id);
    if (!rootIsExpanded) {
      acc.push(root);
    } else {
      root.children.forEach(visit);
    }
  
    return acc;
  }
  

/** Find a node by id (read-only). */
export function findNode(node: Node, id: string): Node | null {
  if (node.id === id) return node;
  if (node.type === "location") {
    for (const c of node.children) {
      const found = findNode(c, id);
      if (found) return found;
    }
  }
  return null;
}
