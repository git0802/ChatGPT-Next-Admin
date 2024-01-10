import Link from 'next/link';
import { forwardRef } from 'react';

// ----------------------------------------------------------------------

const RouterLink = forwardRef(({ ...other }, ref) => <Link ref={ref} {...other} />);

export default RouterLink;
