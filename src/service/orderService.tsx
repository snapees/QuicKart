import {appAxios} from './apiInterceptors';

export const createOrder = async (items: any, totalPrice: number) => {
  try {
    const response = await appAxios.post('/order', {
      items: items,
      branch: '673c9ca7c7579ad152fc9842',
      totalPrice: totalPrice,
    });
    return response.data;
  } catch (error) {
    console.log('Create Order Error', error);
    return null;
  }
};
