import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { ColorSchemeScript } from "@mantine/core";
import DevicesContextProvider from "../contexts/DevicesContext";
import ReduxProvider from "@/redux/Provider";

const theme = createTheme({
    /** Put your mantine theme override here */
});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                {`<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '356136510430490');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=356136510430490&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->`}

                <ColorSchemeScript />
            </head>
            <body>
                <MantineProvider theme={theme}>
                    <ReduxProvider>
                        <DevicesContextProvider>{children}</DevicesContextProvider>
                    </ReduxProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
