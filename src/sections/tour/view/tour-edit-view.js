'use client';

import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _tours } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import TourNewEditForm from '../tour-new-edit-form';

// ----------------------------------------------------------------------

export default function TourEditView({ id }) {
  const settings = useSettingsContext();

  const currentTour = _tours.find((tour) => tour.id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Tour',
            href: paths.dashboard.tour.root,
          },
          { name: currentTour?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <TourNewEditForm currentTour={currentTour} />
    </Container>
  );
}

TourEditView.propTypes = {
  id: PropTypes.string,
};
