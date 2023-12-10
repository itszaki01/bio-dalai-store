'use client'
import { Stack, AppShell } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import Image from 'next/image';
import React, { useState } from 'react'
import ImgOne from "../../assets/images/romoch/1.png";
import ImgTwo from "../../assets/images/romoch/2.png";
import ImgThree from "../../assets/images/romoch/3.png";
import ImgFour from "../../assets/images/romoch/4.png";
import ImgFive from "../../assets/images/romoch/5.png";
import OrderNowFrom from '@/components/OrderNowFrom/OrderNowFrom';
import OrderNowBtn from '@/components/OrderNowBtn';

export default function Romoch() {
    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLFormElement>({
      offset: 60,
  });

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
      <Stack>
          <Image src={ImgOne} style={{width:'100%',height:'100%'}} loading='lazy' alt='image1'/>
          <Image src={ImgTwo} style={{width:'100%',height:'100%'}} alt='image1' />
          <Image src={ImgThree} style={{width:'100%',height:'100%'}}  alt='image1' />
          <Image src={ImgFour} style={{width:'100%',height:'100%'}} alt='image1' />
          <Image src={ImgFive} style={{width:'100%',height:'100%'}} alt='image1' />

          <OrderNowFrom color="#f16a8e" targetRef={targetRef} />
          <AppShell footer={{ height: 60 }} hidden={hideBtn}>
              <AppShell.Footer>
                  <OrderNowBtn btnText="أطلبي الآن" color="#f16a8e" handleClick={scrollIntoView} />
              </AppShell.Footer>
          </AppShell>
      </Stack>
  );

}
