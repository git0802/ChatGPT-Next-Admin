import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import NavList from './nav-list';

// ----------------------------------------------------------------------

export default function MegaMenuMobile({ data, slotProps, ...other }) {
  return (
    <Stack component="nav" id="mega-menu-mobile" {...other}>
      {data.map((list) => (
        <NavList key={list.title} data={list} slotProps={slotProps} />
      ))}
    </Stack>
  );
}

MegaMenuMobile.propTypes = {
  data: PropTypes.array,
  slotProps: PropTypes.object,
};
