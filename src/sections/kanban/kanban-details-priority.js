import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function KanbanDetailsPriority({ priority, onChangePriority }) {
  return (
    <Stack direction="row" flexWrap="wrap" spacing={1}>
      {['low', 'medium', 'hight'].map((option) => (
        <ButtonBase
          key={option}
          onClick={() => onChangePriority(option)}
          sx={{
            py: 0.5,
            pl: 0.75,
            pr: 1.25,
            fontSize: 12,
            borderRadius: 1,
            lineHeight: '20px',
            textTransform: 'capitalize',
            fontWeight: 'fontWeightBold',
            boxShadow: (theme) => `inset 0 0 0 1px ${alpha(theme.palette.grey[500], 0.24)}`,
            ...(option === priority && {
              boxShadow: (theme) => `inset 0 0 0 2px ${theme.palette.text.primary}`,
            }),
          }}
        >
          <Iconify
            icon={
              (option === 'low' && 'solar:double-alt-arrow-down-bold-duotone') ||
              (option === 'medium' && 'solar:double-alt-arrow-right-bold-duotone') ||
              'solar:double-alt-arrow-up-bold-duotone'
            }
            sx={{
              mr: 0.5,
              ...(option === 'low' && {
                color: 'info.main',
              }),
              ...(option === 'medium' && {
                color: 'warning.main',
              }),
              ...(option === 'hight' && {
                color: 'error.main',
              }),
            }}
          />

          {option}
        </ButtonBase>
      ))}
    </Stack>
  );
}
KanbanDetailsPriority.propTypes = {
  priority: PropTypes.string,
  onChangePriority: PropTypes.func,
};
