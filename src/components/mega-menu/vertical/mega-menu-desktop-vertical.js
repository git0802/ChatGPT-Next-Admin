import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import NavList from './nav-list';

// ----------------------------------------------------------------------

export default function MegaMenuDesktopVertical({ data, sx, slotProps, ...other }) {
  return (
    <Stack
      component="nav"
      id="mega-menu-desktop-vertical"
      sx={{
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      {data.map((list) => (
        <NavList key={list.title} data={list} slotProps={slotProps} />
      ))}
    </Stack>
  );
}

MegaMenuDesktopVertical.propTypes = {
  data: PropTypes.array,
  sx: PropTypes.object,
  slotProps: PropTypes.object,
};
