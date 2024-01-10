'use client';

import { useContext, createContext } from 'react';

// ----------------------------------------------------------------------

export const CheckoutContext = createContext({});

export const useCheckoutContext = () => {
  const context = useContext(CheckoutContext);

  if (!context) throw new Error('useCheckoutContext must be use inside CheckoutProvider');

  return context;
};
