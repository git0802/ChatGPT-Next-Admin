'use client';

import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { _mock } from 'src/_mock';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  MegaMenuMobile,
  MegaMenuDesktopVertical,
  MegaMenuDesktopHorizontal,
} from 'src/components/mega-menu';

// ----------------------------------------------------------------------

export default function MegaMenuView() {
  const pathname = usePathname();

  const mobileOpen = useBoolean();

  useEffect(() => {
    if (mobileOpen) {
      mobileOpen.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderHorizontal = (
    <AppBar
      position="static"
      color="transparent"
      sx={{
        height: 72,
        boxShadow: (theme) => theme.customShadows.z8,
      }}
    >
      <Toolbar component={Container} disableGutters sx={{ height: 1 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Menu Horizon
        </Typography>

        <MegaMenuDesktopHorizontal data={NAV_ITEMS} />
      </Toolbar>
    </AppBar>
  );

  const renderVertical = (
    <Stack direction="row" spacing={3} mt={5}>
      <Card sx={{ width: 260, flexShrink: 0, overflow: 'unset', zIndex: 9 }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Menu Vertical
        </Typography>

        <MegaMenuDesktopVertical data={NAV_ITEMS} />
      </Card>

      <div>
        <Box component="img" alt="any photo" src={_mock.image.cover(2)} sx={{ borderRadius: 1 }} />
      </div>
    </Stack>
  );

  const renderMobile = (
    <>
      <Button
        color="inherit"
        variant="contained"
        onClick={mobileOpen.onTrue}
        startIcon={<Iconify icon="carbon:menu" />}
      >
        Menu Mobile
      </Button>

      <Drawer
        open={mobileOpen.value}
        onClose={mobileOpen.onFalse}
        PaperProps={{
          sx: {
            pb: 5,
            width: 260,
          },
        }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <MegaMenuMobile data={NAV_ITEMS} />
        </Scrollbar>
      </Drawer>
    </>
  );

  return (
    <>
      <Box
        sx={{
          py: 5,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
        }}
      >
        <Container>
          <CustomBreadcrumbs
            heading="Mega Menu"
            links={[
              {
                name: 'Components',
                href: paths.components,
              },
              { name: 'Mega Menu' },
            ]}
          />
        </Container>
      </Box>

      {renderHorizontal}

      <Container sx={{ my: 10 }}>
        {renderMobile}

        {renderVertical}
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

const NAV_ITEMS = [
  {
    title: 'Item 1',
    path: '#',
    icon: <Iconify icon="carbon:accessibility-alt" sx={{ width: 1, height: 1 }} />,
    products: [...Array(10)].map((_, index) => ({
      name: _mock.productName(index),
      coverUrl: _mock.image.product(index),
      path: '#',
    })),
    moreLink: {
      title: 'More Categories',
      path: '#',
    },
    tags: [
      { title: 'Paper Cup', path: '#' },
      { title: 'Lotion Pump', path: '#' },
      { title: 'Brush Cutter', path: '#' },
      { title: 'Display Rack', path: '#' },
      { title: 'Glass Bottle', path: '#' },
    ],
    children: [
      {
        subheader: 'Other Machinery & Parts',
        items: [
          { title: 'Metallic Processing Machinery', path: '#' },
          { title: 'Machinery for Food, Beverage & Cereal', path: '#' },
          { title: 'Laser Equipment', path: '#' },
          { title: 'Mould', path: '#' },
          { title: 'Textile Machinery & Parts', path: '#' },
          { title: 'Cutting & Fold-bend Machine', path: '#' },
          { title: 'Paper Machinery', path: '#' },
          { title: 'Rubber Machinery', path: '#' },
          { title: 'Chemical Equipment & Machinery', path: '#' },
          { title: 'Mixing Equipment', path: '#' },
          { title: 'Machinery for Garment, Shoes & Accessories', path: '#' },
          { title: 'Crushing & Culling Machine', path: '#' },
        ],
      },
      {
        subheader: 'Plastic & Woodworking',
        items: [
          { title: 'Plastic Machinery', path: '#' },
          { title: 'Woodworking Machinery', path: '#' },
          { title: 'Blow Molding Machine', path: '#' },
          { title: 'Plastic Recycling Machine', path: '#' },
          { title: 'Injection Molding Machine', path: '#' },
        ],
      },
      {
        subheader: 'Construction Machinery',
        items: [
          { title: 'Building Material Making Machinery', path: '#' },
          { title: 'Lifting Equipment', path: '#' },
          { title: 'Excavator', path: '#' },
          { title: 'Concrete Machinery', path: '#' },
          { title: 'Stone Processing Machinery', path: '#' },
        ],
      },
      {
        subheader: 'Agriculture Machinery',
        items: [
          { title: 'Agriculture Machinery', path: '#' },
          { title: 'Livestock MachineryFeed', path: '#' },
          { title: 'Feed Processing Machinery', path: '#' },
          { title: 'Tiller', path: '#' },
          { title: 'Harvesting Machine', path: '#' },
        ],
      },
      {
        subheader: 'Machine Tools',
        items: [
          { title: 'CNC Machine Tools', path: '#' },
          { title: 'Lathe', path: '#' },
          { title: 'Grinding Machine ', path: '#' },
          { title: 'Drilling Machine ', path: '#' },
          { title: 'Milling Machine ', path: '#' },
        ],
      },
    ],
  },
  {
    title: 'Item 2',
    path: '#',
    icon: <Iconify icon="carbon:airplay" sx={{ width: 1, height: 1 }} />,
    children: [
      {
        subheader: 'Other Machinery & Parts',
        items: [
          { title: 'Metallic Processing Machinery', path: '#' },
          { title: 'Machinery for Food, Beverage & Cereal', path: '#' },
          { title: 'Laser Equipment', path: '#' },
          { title: 'Mould', path: '#' },
          { title: 'Textile Machinery & Parts', path: '#' },
          { title: 'Cutting & Fold-bend Machine', path: '#' },
          { title: 'Paper Machinery', path: '#' },
          { title: 'Rubber Machinery', path: '#' },
          { title: 'Chemical Equipment & Machinery', path: '#' },
          { title: 'Mixing Equipment', path: '#' },
          { title: 'Machinery for Garment, Shoes & Accessories', path: '#' },
          { title: 'Crushing & Culling Machine', path: '#' },
        ],
      },
      {
        subheader: 'Plastic & Woodworking',
        items: [
          { title: 'Plastic Machinery', path: '#' },
          { title: 'Woodworking Machinery', path: '#' },
          { title: 'Blow Molding Machine', path: '#' },
          { title: 'Plastic Recycling Machine', path: '#' },
          { title: 'Injection Molding Machine', path: '#' },
        ],
      },
      {
        subheader: 'Construction Machinery',
        items: [
          { title: 'Building Material Making Machinery', path: '#' },
          { title: 'Lifting Equipment', path: '#' },
          { title: 'Excavator', path: '#' },
          { title: 'Concrete Machinery', path: '#' },
          { title: 'Stone Processing Machinery', path: '#' },
        ],
      },
      {
        subheader: 'Agriculture Machinery',
        items: [
          { title: 'Agriculture Machinery', path: '#' },
          { title: 'Livestock MachineryFeed', path: '#' },
          { title: 'Feed Processing Machinery', path: '#' },
          { title: 'Tiller', path: '#' },
          { title: 'Harvesting Machine', path: '#' },
        ],
      },
      {
        subheader: 'Machine Tools',
        items: [
          { title: 'CNC Machine Tools', path: '#' },
          { title: 'Lathe', path: '#' },
          { title: 'Grinding Machine ', path: '#' },
          { title: 'Drilling Machine ', path: '#' },
          { title: 'Milling Machine ', path: '#' },
        ],
      },
    ],
  },
  {
    title: 'Item 3',
    path: '#',
    icon: <Iconify icon="carbon:api" sx={{ width: 1, height: 1 }} />,
    children: [
      {
        subheader: '',
        items: [
          { title: 'Metallic Processing Machinery', path: '#' },
          { title: 'Machinery for Food, Beverage & Cereal', path: '#' },
          { title: 'Laser Equipment', path: '#' },
          { title: 'Mould', path: '#' },
          { title: 'Textile Machinery & Parts', path: '#' },
          { title: 'Cutting & Fold-bend Machine', path: '#' },
          { title: 'Paper Machinery', path: '#' },
          { title: 'Rubber Machinery', path: '#' },
          { title: 'Chemical Equipment & Machinery', path: '#' },
          { title: 'Mixing Equipment', path: '#' },
          { title: 'Machinery for Garment, Shoes & Accessories', path: '#' },
          { title: 'Crushing & Culling Machine', path: '#' },
        ],
      },
    ],
  },
  {
    title: 'Item 4',
    path: 'https://www.google.com/',
    icon: <Iconify icon="carbon:basketball" sx={{ width: 1, height: 1 }} />,
  },
];
