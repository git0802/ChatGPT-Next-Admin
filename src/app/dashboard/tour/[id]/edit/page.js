import PropTypes from 'prop-types';

import { _tours } from 'src/_mock/_tour';

import { TourEditView } from 'src/sections/tour/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Tour Edit',
};

export default function TourEditPage({ params }) {
  const { id } = params;

  return <TourEditView id={id} />;
}

export async function generateStaticParams() {
  return _tours.map((tour) => ({
    id: tour.id,
  }));
}

TourEditPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
