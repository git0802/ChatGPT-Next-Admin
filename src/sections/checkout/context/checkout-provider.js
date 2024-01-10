'use client';

import uniq from 'lodash/uniq';
import PropTypes from 'prop-types';
import { useMemo, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { getStorage, useLocalStorage } from 'src/hooks/use-local-storage';

import { PRODUCT_CHECKOUT_STEPS } from 'src/_mock/_product';

import { CheckoutContext } from './checkout-context';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'checkout';

const initialState = {
  activeStep: 0,
  items: [],
  subTotal: 0,
  total: 0,
  discount: 0,
  shipping: 0,
  billing: null,
  totalItems: 0,
};

export function CheckoutProvider({ children }) {
  const router = useRouter();

  const { state, update, reset } = useLocalStorage(STORAGE_KEY, initialState);

  const onGetCart = useCallback(() => {
    const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

    const subTotal = state.items.reduce((total, item) => total + item.quantity * item.price, 0);

    update('subTotal', subTotal);
    update('totalItems', totalItems);
    update('billing', state.activeStep === 1 ? null : state.billing);
    update('discount', state.items.length ? state.discount : 0);
    update('shipping', state.items.length ? state.shipping : 0);
    update('total', state.subTotal - state.discount + state.shipping);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.items,
    state.activeStep,
    state.billing,
    state.discount,
    state.shipping,
    state.subTotal,
  ]);

  useEffect(() => {
    const restored = getStorage(STORAGE_KEY);

    if (restored) {
      onGetCart();
    }
  }, [onGetCart]);

  const onAddToCart = useCallback(
    (newItem) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === newItem.id) {
          return {
            ...item,
            colors: uniq([...item.colors, ...newItem.colors]),
            quantity: item.quantity + 1,
          };
        }
        return item;
      });

      if (!updatedItems.some((item) => item.id === newItem.id)) {
        updatedItems.push(newItem);
      }

      update('items', updatedItems);
    },
    [update, state.items]
  );

  const onDeleteCart = useCallback(
    (itemId) => {
      const updatedItems = state.items.filter((item) => item.id !== itemId);

      update('items', updatedItems);
    },
    [update, state.items]
  );

  const onBackStep = useCallback(() => {
    update('activeStep', state.activeStep - 1);
  }, [update, state.activeStep]);

  const onNextStep = useCallback(() => {
    update('activeStep', state.activeStep + 1);
  }, [update, state.activeStep]);

  const onGotoStep = useCallback(
    (step) => {
      update('activeStep', step);
    },
    [update]
  );

  const onIncreaseQuantity = useCallback(
    (itemId) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });

      update('items', updatedItems);
    },
    [update, state.items]
  );

  const onDecreaseQuantity = useCallback(
    (itemId) => {
      const updatedItems = state.items.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });

      update('items', updatedItems);
    },
    [update, state.items]
  );

  const onCreateBilling = useCallback(
    (address) => {
      update('billing', address);

      onNextStep();
    },
    [onNextStep, update]
  );

  const onApplyDiscount = useCallback(
    (discount) => {
      update('discount', discount);
    },
    [update]
  );

  const onApplyShipping = useCallback(
    (shipping) => {
      update('shipping', shipping);
    },
    [update]
  );

  const completed = state.activeStep === PRODUCT_CHECKOUT_STEPS.length;

  // Reset
  const onReset = useCallback(() => {
    if (completed) {
      reset();
      router.replace(paths.product.root);
    }
  }, [completed, reset, router]);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      completed,
      //
      onAddToCart,
      onDeleteCart,
      //
      onIncreaseQuantity,
      onDecreaseQuantity,
      //
      onCreateBilling,
      onApplyDiscount,
      onApplyShipping,
      //
      onBackStep,
      onNextStep,
      onGotoStep,
      //
      onReset,
    }),
    [
      completed,
      onAddToCart,
      onApplyDiscount,
      onApplyShipping,
      onBackStep,
      onCreateBilling,
      onDecreaseQuantity,
      onDeleteCart,
      onGotoStep,
      onIncreaseQuantity,
      onNextStep,
      onReset,
      state,
    ]
  );

  return <CheckoutContext.Provider value={memoizedValue}>{children}</CheckoutContext.Provider>;
}

CheckoutProvider.propTypes = {
  children: PropTypes.node,
};
