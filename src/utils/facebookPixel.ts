import ReactPixel from 'react-facebook-pixel';

const PIXEL_ID = '356136510430490'; // Replace with your actual Pixel ID

export const initFacebookPixel = () => {
  ReactPixel.init(PIXEL_ID);
};

export const pageView = () =>  ReactPixel.pageView()


export const pixelPurchase = ()=> {
    ReactPixel.fbq('track', 'Purchase')
}
