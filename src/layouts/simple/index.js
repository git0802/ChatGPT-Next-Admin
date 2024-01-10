import PropTypes from 'prop-types';

import Header from '../common/header-simple';

// ----------------------------------------------------------------------

export default function SimpleLayout({ children }) {
  return (
    <>
      <Header />

      {children}
    </>
  );
}

SimpleLayout.propTypes = {
  children: PropTypes.node,
};
