'use client';

import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _jobs } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import JobNewEditForm from '../job-new-edit-form';

// ----------------------------------------------------------------------

export default function JobEditView({ id }) {
  const settings = useSettingsContext();

  const currentJob = _jobs.find((job) => job.id === id);

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
            name: 'Job',
            href: paths.dashboard.job.root,
          },
          { name: currentJob?.title },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <JobNewEditForm currentJob={currentJob} />
    </Container>
  );
}

JobEditView.propTypes = {
  id: PropTypes.string,
};
