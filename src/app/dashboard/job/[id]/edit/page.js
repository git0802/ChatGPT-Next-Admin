import PropTypes from 'prop-types';

import { _jobs } from 'src/_mock/_job';

import { JobEditView } from 'src/sections/job/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Job Edit',
};

export default function JobEditPage({ params }) {
  const { id } = params;

  return <JobEditView id={id} />;
}

export async function generateStaticParams() {
  return _jobs.map((job) => ({
    id: job.id,
  }));
}

JobEditPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
