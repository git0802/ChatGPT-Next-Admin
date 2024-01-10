import PropTypes from 'prop-types';

import axios, { endpoints } from 'src/utils/axios';

import { ProductShopDetailsView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Product: Details',
};

export default function ProductShopDetailsPage({ params }) {
  const { id } = params;

  return <ProductShopDetailsView id={id} />;
}

export async function generateStaticParams() {
  const res = await axios.get(endpoints.product.list);

  return res.data.products.map((product) => ({
    id: product.id,
  }));
}

ProductShopDetailsPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
