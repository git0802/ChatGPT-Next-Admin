import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function JobFiltersResult({
  filters,
  onFilters,
  //
  canReset,
  onResetFilters,
  //
  results,
  ...other
}) {
  const handleRemoveEmploymentTypes = (inputValue) => {
    const newValue = filters.employmentTypes.filter((item) => item !== inputValue);
    onFilters('employmentTypes', newValue);
  };

  const handleRemoveExperience = () => {
    onFilters('experience', 'all');
  };

  const handleRemoveRoles = (inputValue) => {
    const newValue = filters.roles.filter((item) => item !== inputValue);
    onFilters('role', newValue);
  };

  const handleRemoveLocations = (inputValue) => {
    const newValue = filters.locations.filter((item) => item !== inputValue);
    onFilters('locations', newValue);
  };

  const handleRemoveBenefits = (inputValue) => {
    const newValue = filters.benefits.filter((item) => item !== inputValue);
    onFilters('benefits', newValue);
  };

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{results}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          results found
        </Box>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {!!filters.employmentTypes.length && (
          <Block label="Employment Types:">
            {filters.employmentTypes.map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                onDelete={() => handleRemoveEmploymentTypes(item)}
              />
            ))}
          </Block>
        )}

        {filters.experience !== 'all' && (
          <Block label="Experience:">
            <Chip size="small" label={filters.experience} onDelete={handleRemoveExperience} />
          </Block>
        )}

        {!!filters.roles.length && (
          <Block label="Roles:">
            {filters.roles.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemoveRoles(item)} />
            ))}
          </Block>
        )}

        {!!filters.locations.length && (
          <Block label="Locations:">
            {filters.locations.map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                onDelete={() => handleRemoveLocations(item)}
              />
            ))}
          </Block>
        )}

        {!!filters.benefits.length && (
          <Block label="Benefits:">
            {filters.benefits.map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                onDelete={() => handleRemoveBenefits(item)}
              />
            ))}
          </Block>
        )}

        {canReset && (
          <Button
            color="error"
            onClick={onResetFilters}
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
          >
            Clear
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

JobFiltersResult.propTypes = {
  canReset: PropTypes.bool,
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  onResetFilters: PropTypes.func,
  results: PropTypes.number,
};

// ----------------------------------------------------------------------

function Block({ label, children, sx, ...other }) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}

Block.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  sx: PropTypes.object,
};
