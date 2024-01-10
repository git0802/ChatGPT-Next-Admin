import PropTypes from 'prop-types';

import axios, { endpoints } from 'src/utils/axios';

import { ProductDetailsView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Product Details',
};

export default function ProductDetailsPage({ params }) {
  const { id } = params;

  return <ProductDetailsView id={id} />;
}

export async function generateStaticParams() {
  const res = await axios.get(endpoints.product.list);

  return res.data.products.map((product) => ({
    id: product.id,
  }));
}

ProductDetailsPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
