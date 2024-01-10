import PropTypes from 'prop-types';

import { _invoices } from 'src/_mock/_invoice';

import { InvoiceEditView } from 'src/sections/invoice/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Invoice Edit',
};

export default function InvoiceEditPage({ params }) {
  const { id } = params;

  return <InvoiceEditView id={id} />;
}

export async function generateStaticParams() {
  return _invoices.map((invoice) => ({
    id: invoice.id,
  }));
}

InvoiceEditPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
