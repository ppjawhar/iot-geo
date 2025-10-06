export type Status = "on" | "off";
export type NodeType = "location" | "device";

export interface BaseNode {
  id: string;
  type: NodeType;
  name: string;
  status: Status;
  coordinates: { lat: number; lng: number };
  parentId: string | null;
  capabilities?: string[];
}

export interface DeviceNode extends BaseNode {
  type: "device";
}

export interface LocationNode extends BaseNode {
  type: "location";
  children: Node[];
}

export type Node = LocationNode | DeviceNode;
