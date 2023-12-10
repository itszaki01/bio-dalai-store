'use client'
import { Badge, Blockquote, Button, CheckIcon, Divider, Fieldset, Flex, NativeSelect, Radio, Stack, TextInput, Title } from "@mantine/core";
import React, { CSSProperties, useMemo, useState } from "react";
import "./OrderNowFrom.scss";
import { useSetState } from "@mantine/hooks";
import { useDevicesContext } from "@/contexts/DevicesContext"; 
import { wilayaList } from "../../data/wliayaList";
import { IconTruckDelivery } from "@tabler/icons-react";
type Props = {
    color: string;
    targetRef: React.RefObject<HTMLFormElement>;
    // containerRef: React.RefObject<HTMLFieldSetElement>;
};

export default function OrderNowFrom({ color, targetRef }: Props) {
    const [offer, setOffer] = useState<number>(2);
    const [prices, setPrices] = useSetState({ price: 3900, shipping: 0 });
    const { isTabletAndMobile } = useDevicesContext();
    const [orderData, setOrderData] = useState({
        realship: 0,
        date: Date.now(),
        orderstatus: "WAITING         (🔘)",
        timecode: "🕑",
        quantity: 2,
        netprice: 1300,
    });
    const handleOfferOneClick = () => {
        setOffer(1);
        setOrderData({...orderData,quantity:1})
        setPrices({ price: 2300, shipping: 600 });
    };
    
    const handleOfferTwoClick = () => {
        setOffer(2);
        setOrderData({...orderData,quantity:2})
        setPrices({ price: 3900, shipping: 0 });
    };

    const badgeStyle: CSSProperties = {
        fontSize: isTabletAndMobile ? 14 : 18,
        fontWeight: "bold",
    };

    const wilayaData = useMemo(()=>{
        const data = wilayaList.map((wilaya)=> ({label:wilaya.name,value:`${wilaya.name}|${wilaya.shipcost}`}))
        return data
    },[])

    return (
        <form dir="rtl" className="order-form" id="order-form" ref={targetRef}>
            <Fieldset legend="معلومات الزبون" variant="filled" mx={10} style={{ border: `3px solid ${color}` }}>
                <Stack>
                    <Flex justify="space-evenly">
                        <TextInput size="lg" w={"48%"} placeholder="الإسم" />
                        <TextInput size="lg" w={"48%"} placeholder="رقم الهاتف " />
                    </Flex>
                    <Flex justify="space-evenly">
                        <TextInput size="lg" w={"48%"} placeholder="البلدية و الحي" />
                        <NativeSelect
                            size="lg"
                            w={"48%"}
                            data={wilayaData}
                            onChange={(e) => setOrderData({ ...orderData, realship: +e.target.value.split("|")[1] })}
                        />
                           
                    </Flex>
                    <Divider
                        label={
                            <Badge size={"xl"} bg={color}>
                                إختاري العرض
                            </Badge>
                        }
                    />

                    <Radio
                        size="lg"
                        label="علبة واحدة ب 2300 دج + 600 دج توصيل"
                        name="check"
                        icon={CheckIcon}
                        color={color}
                        onClick={handleOfferOneClick}
                    />
                    <Radio
                        size="lg"
                        defaultChecked
                        label={
                            <>
                                {" 2 علب ب 3900 دج + توصيل مجاني "}
                                <Badge size="lg" bg={"red"} style={badgeStyle}>
                                    أفضل عرض
                                </Badge>{" "}
                            </>
                        }
                        name="check"
                        icon={CheckIcon}
                        color={color}
                        onClick={handleOfferTwoClick}
                    />

                    <Blockquote color={color} icon={<IconTruckDelivery />} mt="xl" mx={"md"} radius={5} py={10}>
                        <Title order={3}>
                            السعر:{" "}
                            <Badge size="lg" bg={color} style={badgeStyle}>
                                {`${prices.price} دج`}
                            </Badge>
                        </Title>
                        <Title order={3} display={"block"}>
                            التوصيل:{" "}
                            <Badge size="lg" bg={"green"} style={badgeStyle}>
                                {offer == 2 ? "مجاني" : `600 دج`}
                            </Badge>
                        </Title>
                        <Divider m={5} />
                        <Title order={3}>
                            الإجمالي:{" "}
                            <Badge size="lg" bg={"yellow"} style={badgeStyle}>
                                {prices.price + prices.shipping} دج
                            </Badge>
                        </Title>
                    </Blockquote>
                </Stack>
                <Button bg={color} my={15} fullWidth size="lg" className="animation">
                    تأكيد وإرسال الطلب
                </Button>
            </Fieldset>
        </form>
    );
}
