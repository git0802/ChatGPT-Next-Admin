'use client';

import PropTypes from 'prop-types';

import AuthModernCompactLayout from 'src/layouts/auth/modern-compact';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return <AuthModernCompactLayout>{children}</AuthModernCompactLayout>;
}

Layout.propTypes = {
  children: PropTypes.node,
};
