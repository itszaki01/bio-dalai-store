"use client";
import { useDevicesContext } from "@/contexts/DevicesContext";
import { Container } from "@mantine/core";
import React from "react";

export default function RomochLayout({ children }: { children: React.ReactNode }) {
    const { isTabletAndMobile } = useDevicesContext();
    return (
        <Container size={isTabletAndMobile ? "xl" : "md"} p={0} pb={60}>
            {children}
        </Container>
    );
}
