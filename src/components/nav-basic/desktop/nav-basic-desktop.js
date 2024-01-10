import { memo } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import NavList from './nav-list';

// ----------------------------------------------------------------------

function NavBasicDesktop({ data, slotProps, ...other }) {
  return (
    <Stack component="nav" id="nav-basic-desktop" spacing={5} direction="row" {...other}>
      {data.map((list) => (
        <NavList key={list.title} data={list} depth={1} slotProps={slotProps} />
      ))}
    </Stack>
  );
}

NavBasicDesktop.propTypes = {
  data: PropTypes.array,
  slotProps: PropTypes.object,
};

export default memo(NavBasicDesktop);
