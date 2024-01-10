'use client';

import PropTypes from 'prop-types';

import AuthClassicLayout from 'src/layouts/auth/classic';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return <AuthClassicLayout>{children}</AuthClassicLayout>;
}

Layout.propTypes = {
  children: PropTypes.node,
};
