"use client";
import { useEffect } from "react";
import ThankYouImg from "../../assets/thankyou.jpg";
import { Container } from "@mantine/core";
import Image from "next/image";
import { useDevicesContext } from "@/contexts/DevicesContext";
export default function Page() {
    const { isTabletAndMobile } = useDevicesContext();

    useEffect(() => {
        const doc = document.getElementById("pixel-fb");
        if (!doc) return;
        doc.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '665240662159794');
        fbq('track', 'PageView');
        fbq('track', 'Purchase');
        `;
    }, []);

    return (
        <Container size={isTabletAndMobile ? "xl" : "md"} p={0} pb={60}>
            <Image src={ThankYouImg} style={{ width: "100%", height: "100%" }} alt="image1" />
        </Container>
    );
}
