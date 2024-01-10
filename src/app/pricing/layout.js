'use client';

import PropTypes from 'prop-types';

import SimpleLayout from 'src/layouts/simple';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return <SimpleLayout>{children}</SimpleLayout>;
}

Layout.propTypes = {
  children: PropTypes.node,
};
