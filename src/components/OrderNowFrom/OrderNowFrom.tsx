"use client";
import { Badge, Blockquote, Button, CheckIcon, Divider, Fieldset, Flex, NativeSelect, Radio, Stack, TextInput, Title } from "@mantine/core";
import React, { CSSProperties, useMemo, useState } from "react";
import "./OrderNowFrom.scss";
import { useDevicesContext } from "@/contexts/DevicesContext";
import { wilayaList } from "../../data/wliayaList";
import { IconTruckDelivery } from "@tabler/icons-react";
import { useCreateNewOrderMutation } from "@/redux/services/ordersApiService/ordersApiService";
import { useForm } from "react-hook-form";
import { TOrderREQ } from "@/@types/Order.type";
import moment from "moment";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
type Props = {
    color: string;
    targetRef: React.RefObject<HTMLFormElement>;
    // containerRef: React.RefObject<HTMLFieldSetElement>;
};

const formSchema = yup.object().shape({
    name: yup.string().required('الرجاء كتابة الإسم').min(3,'يجب أن يكون الإسم من 3 حروف على الأقل'),
    adress: yup.string().required('الرجاء كتابة العنوان').min(3,'يجب أن يكون العنوان من 3 حروف على الأقل'),
    phone: yup.string().required('الرجاء كتابة رقم الهاتف').min(10,'رقم الهاتف خاطئ').max(10,'رقم الهاتف خاطئ'),
    wilaya: yup.string().matches(/^(?!.*الولاية).*/,'الرجاء إختيار الولاية'),
    shipcost: yup.number().required(),
    price: yup.number().required(),
})
export default function OrderNowFrom({ color, targetRef }: Props) {
    const [offer, setOffer] = useState<number>(2);
    const { isTabletAndMobile } = useDevicesContext();
    const [CreateNewOrder, { isLoading }] = useCreateNewOrderMutation();
    const { handleSubmit, register, setValue, watch,formState:{errors} } = useForm<TOrderREQ>({
        defaultValues: {
            price: 3900,
            shipcost: 0,
            realship: 0,
            quantity: 2,
            netprice: 1300,
            wilaya: "الولاية",
            shortname: "زيت الرموش (2)",
        },
        //@ts-ignore
        resolver: yupResolver(formSchema)
    });

    const handleOfferOneClick = () => {
        setOffer(1);
        setValue("quantity", 1);
        setValue("price", 2300);
        setValue("shipcost", 600);
        setValue("netprice", 650);
        setValue("shortname", `زيت الرموش (1)`);
    };

    const handleOfferTwoClick = () => {
        setOffer(2);
        setValue("quantity", 2);
        setValue("price", 3900);
        setValue("netprice", 1300);
        setValue("shipcost", 0);
        setValue("shortname", `زيت الرموش (2)`);
    };

    const badgeStyle: CSSProperties = {
        fontSize: isTabletAndMobile ? 14 : 18,
        fontWeight: "bold",
    };

    const wilayaData = useMemo(() => {
        const data = wilayaList.map((wilaya) => ({ label: wilaya.name, value: `${wilaya.name}|${wilaya.shipcost}` }));
        return data;
    }, []);

    const handleWilayaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue("realship", +e.target.value.split("|")[1]);
        setValue("wilaya", `${e.target.value.split("|")[0]}`);
    };

    const onSubmit = (data: TOrderREQ) => {
        const newData = {
            ...data,
            total: watch("price") + watch("shipcost"),
            date: moment().format("L LTS"),
            timecode: "🕑",
        };
        CreateNewOrder(newData);
    };
    return (
        <form dir="rtl" className="order-form" id="order-form" ref={targetRef} onSubmit={handleSubmit(onSubmit)}>
            <Fieldset legend="معلومات الزبون" variant="filled" mx={10} style={{ border: `3px solid ${color}` }}>
                <Stack>
                    <Flex justify="space-evenly">
                        <TextInput error={errors?.name?.message} size="lg" w={"48%"} {...register("name")} placeholder="الإسم" />
                        <TextInput  error={errors?.phone?.message} size="lg" w={"48%"} {...register("phone")} placeholder="رقم الهاتف " />
                    </Flex>
                    <Flex justify="space-evenly">
                        <TextInput error={errors?.adress?.message} size="lg" w={"48%"} {...register("adress")} placeholder="العنوان" />
                        <NativeSelect error={errors?.wilaya?.message} size="lg" w={"48%"} data={wilayaData} onChange={handleWilayaChange} />
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
                                {`${watch("price")} دج`}
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
                                {watch("price") + watch("shipcost")} دج
                            </Badge>
                        </Title>
                    </Blockquote>
                </Stack>
                <Button type="submit" loading={isLoading} bg={color} my={15} fullWidth size="lg" className="animation">
                    تأكيد وإرسال الطلب
                </Button>
            </Fieldset>
        </form>
    );
}
