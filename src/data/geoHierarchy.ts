import type { LocationNode } from "../types";

const root: LocationNode = {
  id: "loc_singapore",
  type: "location",
  name: "Singapore",
  status: "on",
  coordinates: { lat: 1.3521, lng: 103.8198 },
  parentId: null,
  children: [
    {
      id: "loc_sg_north",
      type: "location",
      name: "North",
      status: "on",
      coordinates: { lat: 1.438, lng: 103.789 },
      parentId: "loc_singapore",
      children: [
        {
          id: "loc_woodlands",
          type: "location",
          name: "Woodlands",
          status: "on",
          coordinates: { lat: 1.436, lng: 103.786 },
          parentId: "loc_sg_north",
          children: [
            {
              id: "dev_wdl_cam01",
              type: "device",
              name: "WDL-CAM-01",
              status: "on",
              coordinates: { lat: 1.4385, lng: 103.7879 },
              parentId: "loc_woodlands",
              capabilities: ["onoff"]
            },
            {
              id: "dev_wdl_meter01",
              type: "device",
              name: "WDL-METER-01",
              status: "off",
              coordinates: { lat: 1.4348, lng: 103.7842 },
              parentId: "loc_woodlands",
              capabilities: ["onoff"]
            }
          ]
        },
        {
          id: "loc_yishun",
          type: "location",
          name: "Yishun",
          status: "off",
          coordinates: { lat: 1.429, lng: 103.835 },
          parentId: "loc_sg_north",
          children: [
            {
              id: "dev_ysh_sensor01",
              type: "device",
              name: "YSH-SENSOR-01",
              status: "off",
              coordinates: { lat: 1.4302, lng: 103.8359 },
              parentId: "loc_yishun",
              capabilities: ["onoff"]
            },
            {
              id: "dev_ysh_gate01",
              type: "device",
              name: "YSH-GATE-01",
              status: "off",
              coordinates: { lat: 1.4278, lng: 103.8332 },
              parentId: "loc_yishun",
              capabilities: ["onoff"]
            }
          ]
        }
      ]
    },
    {
      id: "loc_sg_south",
      type: "location",
      name: "South",
      status: "on",
      coordinates: { lat: 1.28, lng: 103.846 },
      parentId: "loc_singapore",
      children: [
        {
          id: "loc_marina_bay",
          type: "location",
          name: "Marina Bay",
          status: "on",
          coordinates: { lat: 1.283, lng: 103.86 },
          parentId: "loc_sg_south",
          children: [
            {
              id: "dev_mrb_light01",
              type: "device",
              name: "MRB-LIGHT-01",
              status: "on",
              coordinates: { lat: 1.2836, lng: 103.8595 },
              parentId: "loc_marina_bay",
              capabilities: ["onoff"]
            },
            {
              id: "dev_mrb_cam01",
              type: "device",
              name: "MRB-CAM-01",
              status: "on",
              coordinates: { lat: 1.2824, lng: 103.8612 },
              parentId: "loc_marina_bay",
              capabilities: ["onoff"]
            }
          ]
        },
        {
          id: "loc_bukit_merah",
          type: "location",
          name: "Bukit Merah",
          status: "off",
          coordinates: { lat: 1.285, lng: 103.819 },
          parentId: "loc_sg_south",
          children: [
            {
              id: "dev_bmrh_env01",
              type: "device",
              name: "BMRH-ENV-01",
              status: "off",
              coordinates: { lat: 1.2857, lng: 103.8203 },
              parentId: "loc_bukit_merah",
              capabilities: ["onoff"]
            }
          ]
        }
      ]
    }
  ]
};

export default root;
