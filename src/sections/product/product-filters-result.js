import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ProductFiltersResult({
  filters,
  onFilters,
  //
  canReset,
  onResetFilters,
  //
  results,
  ...other
}) {
  const handleRemoveGender = (inputValue) => {
    const newValue = filters.gender.filter((item) => item !== inputValue);
    onFilters('gender', newValue);
  };

  const handleRemoveCategory = () => {
    onFilters('category', 'all');
  };

  const handleRemoveColor = (inputValue) => {
    const newValue = filters.colors.filter((item) => item !== inputValue);
    onFilters('colors', newValue);
  };

  const handleRemovePrice = () => {
    onFilters('priceRange', [0, 200]);
  };

  const handleRemoveRating = () => {
    onFilters('rating', '');
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
        {!!filters.gender.length && (
          <Block label="Gender:">
            {filters.gender.map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                onDelete={() => handleRemoveGender(item)}
              />
            ))}
          </Block>
        )}

        {filters.category !== 'all' && (
          <Block label="Category:">
            <Chip size="small" label={filters.category} onDelete={handleRemoveCategory} />
          </Block>
        )}

        {!!filters.colors.length && (
          <Block label="Colors:">
            {filters.colors.map((item) => (
              <Chip
                key={item}
                size="small"
                label={
                  <Box
                    sx={{
                      ml: -0.5,
                      width: 18,
                      height: 18,
                      bgcolor: item,
                      borderRadius: '50%',
                      border: (theme) => `solid 1px ${alpha(theme.palette.common.white, 0.24)}`,
                    }}
                  />
                }
                onDelete={() => handleRemoveColor(item)}
              />
            ))}
          </Block>
        )}

        {(filters.priceRange[0] !== 0 || filters.priceRange[1] !== 200) && (
          <Block label="Price:">
            <Chip
              size="small"
              label={`$${filters.priceRange[0]} - ${filters.priceRange[1]}`}
              onDelete={handleRemovePrice}
            />
          </Block>
        )}

        {!!filters.rating && (
          <Block label="Rating:">
            <Chip size="small" label={filters.rating} onDelete={handleRemoveRating} />
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

ProductFiltersResult.propTypes = {
  canReset: PropTypes.bool,
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  results: PropTypes.number,
  onResetFilters: PropTypes.func,
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
