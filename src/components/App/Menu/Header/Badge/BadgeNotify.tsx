"use client";
import { Badge } from "primereact/badge";

const BadgeNotify = () => {
  return (
    <i
      className="pi pi-bell p-overlay-badge"
      style={{ fontSize: "2rem", color: "white" }}
    >
      <Badge value="2"></Badge>
    </i>
  );
};

export default BadgeNotify;
