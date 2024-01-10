'use client';

import PropTypes from 'prop-types';

import AuthClassicLayout from 'src/layouts/auth/classic';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <AuthClassicLayout title="Manage the job more effectively with Minimal">
      {children}
    </AuthClassicLayout>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
