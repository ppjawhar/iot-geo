import type { LocationNode, Node } from "../types";

import clsx from "clsx";

type Props = {
  root: LocationNode;
  expanded: Set<string>;
  onToggleExpand: (id: string) => void;
  onToggleStatusCascade: (id: string) => void;
  onCenterOnNode?: (n: Node) => void;
};

function Row({
  node,
  expanded,
  onToggleExpand,
  onToggleStatusCascade,
  onCenterOnNode
}: {
  node: Node;
  expanded: Set<string>;
  onToggleExpand: (id: string) => void;
  onToggleStatusCascade: (id: string) => void;
  onCenterOnNode?: (n: Node) => void;
}) {
  const isLoc = node.type === "location";
  const isOpen = isLoc && expanded.has(node.id);

  return (
    <div className="row">
      <div className="row-main">
        {isLoc ? (
          <button className="chev" onClick={() => onToggleExpand(node.id)}>
            {isOpen ? "▾" : "▸"}
          </button>
        ) : (
          <span className="chev-placeholder" />
        )}
        <span className={clsx("badge", isLoc ? "loc" : "dev")}>
          {isLoc ? "L" : "D"}
        </span>
        <span className="name" onClick={() => onCenterOnNode?.(node)}>
          {node.name}
        </span>
        <span className={clsx("status", node.status)}>{node.status}</span>
        <button className="btn" onClick={() => onToggleStatusCascade(node.id)}>
          Toggle
        </button>
      </div>

      {isLoc && isOpen && (
        <div className="children">
          {(node.children as Node[]).map((c) => (
            <Row
              key={c.id}
              node={c}
              expanded={expanded}
              onToggleExpand={onToggleExpand}
              onToggleStatusCascade={onToggleStatusCascade}
              onCenterOnNode={onCenterOnNode}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Tree({
  root,
  expanded,
  onToggleExpand,
  onToggleStatusCascade,
  onCenterOnNode
}: Props) {
  return (
    <div className="tree">
      <Row
        node={root}
        expanded={expanded}
        onToggleExpand={onToggleExpand}
        onToggleStatusCascade={onToggleStatusCascade}
        onCenterOnNode={onCenterOnNode}
      />
    </div>
  );
}
