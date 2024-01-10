import PropTypes from 'prop-types';

import { _jobs } from 'src/_mock/_job';

import { JobDetailsView } from 'src/sections/job/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Job Details',
};

export default function JobDetailsPage({ params }) {
  const { id } = params;

  return <JobDetailsView id={id} />;
}

export async function generateStaticParams() {
  return _jobs.map((job) => ({
    id: job.id,
  }));
}

JobDetailsPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
