import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useMemo, useEffect, useCallback } from 'react';

import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { countries } from 'src/assets/data';
import { _tags, _tourGuides, TOUR_SERVICE_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFAutocomplete,
  RHFMultiCheckbox,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function TourNewEditForm({ currentTour }) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const NewTourSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    content: Yup.string().required('Content is required'),
    images: Yup.array().min(1, 'Images is required'),
    //
    tourGuides: Yup.array().min(1, 'Must have at least 1 guide'),
    durations: Yup.string().required('Duration is required'),
    tags: Yup.array().min(2, 'Must have at least 2 tags'),
    services: Yup.array().min(2, 'Must have at least 2 services'),
    destination: Yup.string().required('Destination is required'),
    available: Yup.object().shape({
      startDate: Yup.mixed().nullable().required('Start date is required'),
      endDate: Yup.mixed()
        .required('End date is required')
        .test(
          'date-min',
          'End date must be later than start date',
          (value, { parent }) => value.getTime() > parent.startDate.getTime()
        ),
    }),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentTour?.name || '',
      content: currentTour?.content || '',
      images: currentTour?.images || [],
      //
      tourGuides: currentTour?.tourGuides || [],
      tags: currentTour?.tags || [],
      durations: currentTour?.durations || '',
      destination: currentTour?.destination || '',
      services: currentTour?.services || [],
      available: {
        startDate: currentTour?.available.startDate || null,
        endDate: currentTour?.available.endDate || null,
      },
    }),
    [currentTour]
  );

  const methods = useForm({
    resolver: yupResolver(NewTourSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentTour) {
      reset(defaultValues);
    }
  }, [currentTour, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentTour ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.tour.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', []);
  }, [setValue]);

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Title, short description, image...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Name</Typography>
              <RHFTextField name="name" placeholder="Ex: Adventure Seekers Expedition..." />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Content</Typography>
              <RHFEditor simple name="content" />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Images</Typography>
              <RHFUpload
                multiple
                thumbnail
                name="images"
                maxSize={3145728}
                onDrop={handleDrop}
                onRemove={handleRemoveFile}
                onRemoveAll={handleRemoveAllFiles}
                onUpload={() => console.info('ON UPLOAD')}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderProperties = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Properties
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Additional functions and attributes...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Properties" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack>
              <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                Tour Guide
              </Typography>

              <RHFAutocomplete
                multiple
                name="tourGuides"
                placeholder="+ Tour Guides"
                disableCloseOnSelect
                options={_tourGuides}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
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

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Available</Typography>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <Controller
                  name="available.startDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      format="dd/MM/yyyy"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!error,
                          helperText: error?.message,
                        },
                      }}
                    />
                  )}
                />
                <Controller
                  name="available.endDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      format="dd/MM/yyyy"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!error,
                          helperText: error?.message,
                        },
                      }}
                    />
                  )}
                />
              </Stack>
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Duration</Typography>
              <RHFTextField name="durations" placeholder="Ex: 2 days, 4 days 3 nights..." />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Destination</Typography>
              <RHFAutocomplete
                name="destination"
                placeholder="+ Destination"
                options={countries.map((option) => option.label)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => {
                  const { code, label, phone } = countries.filter(
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
              />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle2">Services</Typography>
              <RHFMultiCheckbox
                name="services"
                options={TOUR_SERVICE_OPTIONS}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                }}
              />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Tags</Typography>
              <RHFAutocomplete
                name="tags"
                placeholder="+ Tags"
                multiple
                freeSolo
                options={_tags.map((option) => option)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={option}
                      size="small"
                      color="info"
                      variant="soft"
                    />
                  ))
                }
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Publish"
          sx={{ flexGrow: 1, pl: 3 }}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentTour ? 'Create Tour' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderProperties}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}

TourNewEditForm.propTypes = {
  currentTour: PropTypes.object,
};
