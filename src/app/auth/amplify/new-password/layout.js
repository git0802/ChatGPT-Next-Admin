'use client';

import PropTypes from 'prop-types';

import { GuestGuard } from 'src/auth/guard';
import CompactLayout from 'src/layouts/compact';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <GuestGuard>
      <CompactLayout>{children}</CompactLayout>
    </GuestGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
