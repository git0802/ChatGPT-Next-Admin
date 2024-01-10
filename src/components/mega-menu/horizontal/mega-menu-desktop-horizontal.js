import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import NavList from './nav-list';

// ----------------------------------------------------------------------

export default function MegaMenuDesktopHorizontal({ data, sx, slotProps, ...other }) {
  return (
    <Stack
      component="nav"
      id="mega-menu-desktop-horizontal"
      direction="row"
      spacing={3}
      sx={{
        height: 1,
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

MegaMenuDesktopHorizontal.propTypes = {
  data: PropTypes.array,
  sx: PropTypes.object,
  slotProps: PropTypes.object,
};
