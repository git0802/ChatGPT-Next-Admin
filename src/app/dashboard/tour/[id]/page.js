import PropTypes from 'prop-types';

import { _tours } from 'src/_mock/_tour';

import { TourDetailsView } from 'src/sections/tour/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Tour Details',
};

export default function TourDetailsPage({ params }) {
  const { id } = params;

  return <TourDetailsView id={id} />;
}

export async function generateStaticParams() {
  return _tours.map((tour) => ({
    id: tour.id,
  }));
}

TourDetailsPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
