import { memo } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import NavList from './nav-list';

// ----------------------------------------------------------------------

function NavBasicMobile({ data, slotProps, ...other }) {
  return (
    <Stack component="nav" id="nav-basic-mobile" {...other}>
      {data.map((list) => (
        <NavList key={list.title} data={list} depth={1} slotProps={slotProps} />
      ))}
    </Stack>
  );
}

NavBasicMobile.propTypes = {
  data: PropTypes.array,
  slotProps: PropTypes.object,
};

export default memo(NavBasicMobile);
