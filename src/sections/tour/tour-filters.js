import PropTypes from 'prop-types';
import { useCallback } from 'react';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export default function TourFilters({
  open,
  onOpen,
  onClose,
  //
  filters,
  onFilters,
  //
  canReset,
  onResetFilters,
  //
  destinationOptions,
  tourGuideOptions,
  serviceOptions,
  //
  dateError,
}) {
  const handleFilterServices = useCallback(
    (newValue) => {
      const checked = filters.services.includes(newValue)
        ? filters.services.filter((value) => value !== newValue)
        : [...filters.services, newValue];
      onFilters('services', checked);
    },
    [filters.services, onFilters]
  );

  const handleFilterStartDate = useCallback(
    (newValue) => {
      onFilters('startDate', newValue);
    },
    [onFilters]
  );

  const handleFilterEndDate = useCallback(
    (newValue) => {
      onFilters('endDate', newValue);
    },
    [onFilters]
  );

  const handleFilterDestination = useCallback(
    (newValue) => {
      onFilters('destination', newValue);
    },
    [onFilters]
  );

  const handleFilterTourGuide = useCallback(
    (newValue) => {
      onFilters('tourGuides', newValue);
    },
    [onFilters]
  );

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2, pr: 1, pl: 2.5 }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Filters
      </Typography>

      <Tooltip title="Reset">
        <IconButton onClick={onResetFilters}>
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="solar:restart-bold" />
          </Badge>
        </IconButton>
      </Tooltip>

      <IconButton onClick={onClose}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>
    </Stack>
  );

  const renderDateRange = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        Durations
      </Typography>
      <Stack spacing={2.5}>
        <DatePicker label="Start date" value={filters.startDate} onChange={handleFilterStartDate} />

        <DatePicker
          label="End date"
          value={filters.endDate}
          onChange={handleFilterEndDate}
          slotProps={{
            textField: {
              error: dateError,
              helperText: dateError && 'End date must be later than start date',
            },
          }}
        />
      </Stack>
    </Stack>
  );

  const renderDestination = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        Destination
      </Typography>

      <Autocomplete
        multiple
        disableCloseOnSelect
        options={destinationOptions.map((option) => option.label)}
        getOptionLabel={(option) => option}
        value={filters.destination}
        onChange={(event, newValue) => handleFilterDestination(newValue)}
        renderInput={(params) => <TextField placeholder="Select Destination" {...params} />}
        renderOption={(props, option) => {
          const { code, label, phone } = destinationOptions.filter(
            (country) => country.label === option
          )[0];

          if (!label) {
            return null;
          }

          return (
            <li {...props} key={label}>
              <Iconify
                key={label}
                icon={`circle-flags:${code.toLowerCase()}`}
                width={28}
                sx={{ mr: 1 }}
              />
              {label} ({code}) +{phone}
            </li>
          );
        }}
        renderTags={(selected, getTagProps) =>
          selected.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={option}
              label={option}
              size="small"
              variant="soft"
            />
          ))
        }
      />
    </Stack>
  );

  const renderTourGuide = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        Tour Guide
      </Typography>

      <Autocomplete
        multiple
        disableCloseOnSelect
        options={tourGuideOptions}
        value={filters.tourGuides}
        onChange={(event, newValue) => handleFilterTourGuide(newValue)}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField placeholder="Select Tour Guides" {...params} />}
        renderOption={(props, tourGuide) => (
          <li {...props} key={tourGuide.id}>
            <Avatar
              key={tourGuide.id}
              alt={tourGuide.avatarUrl}
              src={tourGuide.avatarUrl}
              sx={{ width: 24, height: 24, flexShrink: 0, mr: 1 }}
            />

            {tourGuide.name}
          </li>
        )}
        renderTags={(selected, getTagProps) =>
          selected.map((tourGuide, index) => (
            <Chip
              {...getTagProps({ index })}
              key={tourGuide.id}
              size="small"
              variant="soft"
              label={tourGuide.name}
              avatar={<Avatar alt={tourGuide.name} src={tourGuide.avatarUrl} />}
            />
          ))
        }
      />
    </Stack>
  );

  const renderServices = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Services
      </Typography>
      {serviceOptions.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              checked={filters.services.includes(option)}
              onClick={() => handleFilterServices(option)}
            />
          }
          label={option}
        />
      ))}
    </Stack>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="ic:round-filter-list" />
          </Badge>
        }
        onClick={onOpen}
      >
        Filters
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 280 },
        }}
      >
        {renderHead}

        <Divider />

        <Scrollbar sx={{ px: 2.5, py: 3 }}>
          <Stack spacing={3}>
            {renderDateRange}

            {renderDestination}

            {renderTourGuide}

            {renderServices}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}

TourFilters.propTypes = {
  canReset: PropTypes.bool,
  dateError: PropTypes.bool,
  destinationOptions: PropTypes.array,
  filters: PropTypes.object,
  onClose: PropTypes.func,
  onFilters: PropTypes.func,
  onOpen: PropTypes.func,
  onResetFilters: PropTypes.func,
  open: PropTypes.bool,
  serviceOptions: PropTypes.array,
  tourGuideOptions: PropTypes.array,
};
