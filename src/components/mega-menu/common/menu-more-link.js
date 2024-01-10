import PropTypes from 'prop-types';

import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';

import Iconify from '../../iconify';

// ----------------------------------------------------------------------

export default function MenuMoreLink({ title, path }) {
  return (
    <Link
      component={RouterLink}
      href={path}
      color="inherit"
      sx={{
        alignItems: 'center',
        typography: 'caption',
        display: 'inline-flex',
        alignSelf: 'flex-end',
        fontWeight: 'fontWeightBold',
      }}
    >
      {title} <Iconify icon="eva:arrow-ios-forward-fill" width={16} />
    </Link>
  );
}

MenuMoreLink.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string,
};
