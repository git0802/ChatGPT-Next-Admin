'use client';

import PropTypes from 'prop-types';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
