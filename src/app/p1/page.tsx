"use client";
import { Stack, AppShell, Container } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ImgOne from "../../assets/images/romoch/1.png";
import ImgTwo from "../../assets/images/romoch/2.png";
import ImgThree from "../../assets/images/romoch/3.png";
import ImgFour from "../../assets/images/romoch/4.png";
import ImgFive from "../../assets/images/romoch/5.png";
import OrderNowFrom from "@/components/OrderNowFrom/OrderNowFrom";
import OrderNowBtn from "@/components/OrderNowBtn";
import { useDevicesContext } from "@/contexts/DevicesContext";
import { PixelPageViewScript } from "@/utils/facebookPixel";

export default function Romoch() {
    const { isTabletAndMobile } = useDevicesContext();
    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLFormElement>({
        offset: 60,
    });
   
    useEffect(() => {
        const doc = document.getElementById("pixel-fb");
        if (!doc) return;
        doc.innerHTML = PixelPageViewScript;
    }, []);

    return (
        <Container size={isTabletAndMobile ? "xl" : "md"} p={0} pb={60}>
            <Stack>
                <Image src={ImgOne} style={{ width: "100%", height: "100%" }} alt="image1" />
                <Image src={ImgTwo} style={{ width: "100%", height: "100%" }} alt="image1" />
                <Image src={ImgThree} style={{ width: "100%", height: "100%" }} alt="image1" />
                <Image src={ImgFour} style={{ width: "100%", height: "100%" }} alt="image1" />
                <Image src={ImgFive} style={{ width: "100%", height: "100%" }} alt="image1" />

                <OrderNowFrom color="#f16a8e" targetRef={targetRef} />
                <OrderNowBtn btnText="أطلبي الآن" color="#f16a8e" handleClick={scrollIntoView} />
            </Stack>
        </Container>
    );
}
