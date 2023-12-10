"use client";
import { AppShell, Button, Center } from "@mantine/core";
import "./OrderNowBtn.scss";
import { useDevicesContext } from "@/contexts/DevicesContext";
import { useState } from "react";
type Props = {
    btnText: string;
    color?: string;
    handleClick: () => void;
};
export default function OrderNowBtn({ btnText, color, handleClick }: Props) {
    const { isTabletAndMobile } = useDevicesContext();
    const [hideBtn, setHideBtn] = useState(false);

    setTimeout(() => {
        const element = document.getElementById("order-form");

        const elementRect = element?.getBoundingClientRect();
        if (!elementRect) return;

        const elementPosition = {
            top: elementRect?.top + window.scrollY,
            left: elementRect?.left + window.scrollX, // If you want horizontal position as well
        };
        onscroll = () => {
            if (scrollY + 500 >= elementPosition.top) {
                setHideBtn(true);
            } else {
                setHideBtn(false);
            }
        };
    }, 1000);
    return (
        <AppShell footer={{ height: 60 }} hidden={hideBtn}>
            <AppShell.Footer>
                <Center h={"100%"}>
                    <Button w={isTabletAndMobile ? "80%" : 300} size={"lg"} bg={color || "red"} className="animation" onClick={() => handleClick()}>
                        {btnText || "اطلب الآن"}
                    </Button>
                </Center>
            </AppShell.Footer>
        </AppShell>
    );
}
