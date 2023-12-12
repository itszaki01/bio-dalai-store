"use client";
import { useEffect } from "react";
import ThankYouImg from "../../assets/thankyou.jpg";
import { Container } from "@mantine/core";
import Image from "next/image";
import { useDevicesContext } from "@/contexts/DevicesContext";
import { PixelPerchaseScript } from "@/utils/facebookPixel";
export default function Page() {
    const { isTabletAndMobile } = useDevicesContext();
    useEffect(() => {
        const doc = document.getElementById("pixel-fb");
        if (!doc) return;
        doc.innerHTML = PixelPerchaseScript;
    }, []);

    return (
        <Container size={isTabletAndMobile ? "xl" : "md"} p={0} pb={60}>
            <Image src={ThankYouImg} style={{ width: "100%", height: "100%" }} alt="image1" />
        </Container>
    );
}
