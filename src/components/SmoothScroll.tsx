"use client";

import { useEffect } from "react";
import { startSmoothScroll } from "@/lib/smooth-scroll";

export default function SmoothScroll() {
  useEffect(() => startSmoothScroll(), []);
  return null;
}
