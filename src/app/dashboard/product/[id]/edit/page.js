import PropTypes from 'prop-types';

import axios, { endpoints } from 'src/utils/axios';

import { ProductEditView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Product Edit',
};

export default function ProductEditPage({ params }) {
  const { id } = params;

  return <ProductEditView id={id} />;
}

export async function generateStaticParams() {
  const res = await axios.get(endpoints.product.list);

  return res.data.products.map((product) => ({
    id: product.id,
  }));
}

ProductEditPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
