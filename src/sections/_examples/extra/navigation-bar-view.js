'use client';

import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Drawer from '@mui/material/Drawer';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import Logo from 'src/components/logo';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { NavBasicMobile, NavBasicDesktop } from 'src/components/nav-basic';
import {
  NavSectionMini,
  NavSectionVertical,
  NavSectionHorizontal,
} from 'src/components/nav-section';

// ----------------------------------------------------------------------

const defaultConfig = {
  gap: 4,
  icon: 24,
  currentRole: 'admin',
  rootItemHeight: 44,
  subItemHeight: 36,
  padding: '4px 8px 4px 12px',
  radius: 8,
  hiddenLabel: false,
  hiddenSubheader: false,
};

export default function NavigationBarView() {
  const mobileOpen = useBoolean();

  const [config, setConfig] = useState(defaultConfig);

  const canReset = !isEqual(defaultConfig, config);

  const handleChangeConfig = useCallback((name, value) => {
    setConfig((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleReset = useCallback(() => {
    setConfig(defaultConfig);
  }, []);

  const renderNavBasic = (
    <>
      <Stack spacing={2}>
        <Typography variant="h6"> Nav Basic </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.customShadows.z20,
          }}
        >
          <IconButton onClick={mobileOpen.onTrue}>
            <Iconify icon="carbon:menu" />
          </IconButton>

          <NavBasicDesktop
            data={BASIC_NAV_ITEMS}
            slotProps={{
              rootItem: {
                fontSize: 15,
                fontFamily: (theme) => theme.typography.fontSecondaryFamily,
              },
            }}
          />
        </Stack>
      </Stack>

      <Drawer
        open={mobileOpen.value}
        onClose={mobileOpen.onFalse}
        PaperProps={{
          sx: {
            width: 260,
          },
        }}
      >
        <Logo sx={{ m: 2 }} />
        <NavBasicMobile
          data={BASIC_NAV_ITEMS}
          slotProps={{
            rootItem: {
              fontSize: 15,
              fontFamily: (theme) => theme.typography.fontSecondaryFamily,
            },
          }}
        />
      </Drawer>
    </>
  );

  const renderNavVertical = (
    <Stack spacing={2}>
      <Typography variant="h6"> Nav Vertical </Typography>

      <NavSectionVertical
        data={NAV_ITEMS}
        sx={{
          py: 2,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: (theme) => theme.customShadows.z20,
        }}
        slotProps={{
          gap: config.gap,
          currentRole: config.currentRole,
          rootItem: {
            padding: config.padding,
            minHeight: config.rootItemHeight,
            borderRadius: `${config.radius}px`,
            '& .icon, .sub-icon': {
              width: config.icon,
              height: config.icon,
              ...(!config.icon && { display: 'none' }),
            },
            ...(config.hiddenLabel && {
              '& .label, .caption': {
                display: 'none',
              },
            }),
          },
          subItem: {
            padding: config.padding,
            minHeight: config.subItemHeight,
            borderRadius: `${config.radius}px`,
            '& .icon, .sub-icon': {
              width: config.icon,
              height: config.icon,
              ...(!config.icon && { display: 'none' }),
            },
            ...(config.hiddenLabel && {
              '& .label, .caption': {
                display: 'none',
              },
            }),
          },
          subheader: {
            ...(config.hiddenSubheader && {
              display: 'none',
            }),
          },
        }}
      />
    </Stack>
  );

  const renderNavMini = (
    <Stack spacing={2}>
      <Typography variant="h6"> Nav Mini </Typography>

      <NavSectionMini
        data={NAV_ITEMS}
        sx={{
          py: 0.5,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: (theme) => theme.customShadows.z20,
        }}
      />
    </Stack>
  );

  const renderNavHorizontal = (
    <Stack spacing={2}>
      <Typography variant="h6"> Nav Horizontal </Typography>
      <Stack
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: (theme) => theme.customShadows.z20,
        }}
      >
        <NavSectionHorizontal data={NAV_ITEMS} />
      </Stack>
    </Stack>
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
            heading="Navigation Bar"
            links={[
              {
                name: 'Components',
                href: paths.components,
              },
              { name: 'Navigation Bar' },
            ]}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Stack
          sx={{
            p: 5,
            mb: 5,
            borderRadius: 2,
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          }}
        >
          {renderNavBasic}
        </Stack>

        <Stack
          sx={{
            p: 5,
            mb: 5,
            borderRadius: 2,
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          }}
        >
          {renderNavHorizontal}

          <Stack direction="row" spacing={10} sx={{ mt: 5 }}>
            {renderNavMini}

            {renderNavVertical}

            <ControlsPanel
              config={config}
              onChangeConfig={handleChangeConfig}
              canReset={canReset}
              onReset={handleReset}
            />
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

function ControlsPanel({ config, onChangeConfig, canReset, onReset }) {
  return (
    <Stack component={Paper} spacing={3} variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
      <Stack direction="row" alignItems="center" sx={{ width: 1 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ControlsPanel
        </Typography>

        {canReset && (
          <IconButton onClick={onReset}>
            <Badge color="error" variant="dot" invisible={!canReset}>
              <Iconify icon="solar:restart-bold" />
            </Badge>
          </IconButton>
        )}
      </Stack>

      {/* Gap */}
      <Stack spacing={1}>
        <Typography variant="subtitle2">Gap</Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={config.gap}
          onChange={(event, newValue) => {
            if (newValue !== null) {
              onChangeConfig('gap', newValue);
            }
          }}
        >
          {[4, 8, 16, 40].map((i) => (
            <ToggleButton key={i} value={i} sx={{ width: 1 }}>
              {i}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      {/* Size */}
      <Stack spacing={1}>
        <Typography variant="subtitle2">Icon</Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={config.icon}
          onChange={(event, newValue) => {
            if (newValue !== null) {
              onChangeConfig('icon', newValue);
            }
          }}
        >
          {[0, 16, 20, 24, 40].map((i) => (
            <ToggleButton key={i} value={i} sx={{ width: 1 }}>
              {i}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      {/* Radius */}
      <Stack spacing={1}>
        <Typography variant="subtitle2">Radius</Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={config.radius}
          onChange={(event, newValue) => {
            if (newValue !== null) {
              onChangeConfig('radius', newValue);
            }
          }}
        >
          {[0, 8, 16, 40].map((i) => (
            <ToggleButton key={i} value={i} sx={{ width: 1 }}>
              {i}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      {/* Role */}
      <Stack spacing={1}>
        <Typography variant="subtitle2">Role</Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={config.currentRole}
          onChange={(event, newValue) => {
            if (newValue !== null) {
              onChangeConfig('currentRole', newValue);
            }
          }}
        >
          {['admin', 'user'].map((i) => (
            <ToggleButton key={i} value={i} sx={{ width: 1 }}>
              {i}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      {/* Root Height */}
      <Stack spacing={1}>
        <Typography variant="subtitle2">Item Root Height</Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={config.rootItemHeight}
          onChange={(event, newValue) => {
            if (newValue !== null) {
              onChangeConfig('rootItemHeight', newValue);
            }
          }}
        >
          {[36, 44, 64, 80].map((i) => (
            <ToggleButton key={i} value={i} sx={{ width: 1 }}>
              {i}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      {/* Sub Height */}
      <Stack spacing={1}>
        <Typography variant="subtitle2">Item Sub Height</Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={config.subItemHeight}
          onChange={(event, newValue) => {
            if (newValue !== null) {
              onChangeConfig('subItemHeight', newValue);
            }
          }}
        >
          {[36, 44, 64, 80].map((i) => (
            <ToggleButton key={i} value={i} sx={{ width: 1 }}>
              {i}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>

      {/* Padding */}
      <TextField
        label="Item Padding"
        value={config.padding || ''}
        onChange={(event) => onChangeConfig('padding', event.target.value)}
      />

      <FormControlLabel
        control={
          <Switch
            checked={config.hiddenLabel}
            onClick={() => onChangeConfig('hiddenLabel', !config.hiddenLabel)}
          />
        }
        label="Hidden Label"
      />

      <FormControlLabel
        control={
          <Switch
            checked={config.hiddenSubheader}
            onClick={() => onChangeConfig('hiddenSubheader', !config.hiddenSubheader)}
          />
        }
        label="Hidden Subheader"
      />
    </Stack>
  );
}

ControlsPanel.propTypes = {
  onReset: PropTypes.func,
  canReset: PropTypes.bool,
  config: PropTypes.object,
  onChangeConfig: PropTypes.func,
};

// ----------------------------------------------------------------------

const BASIC_NAV_ITEMS = [
  { title: 'Home', path: '#' },
  {
    title: 'Page',
    path: '#',
    children: [
      {
        title: 'Page 1',
        path: '#',
        children: [
          { title: 'Page 1.1', path: '#' },
          { title: 'Page 1.2', path: '#' },
        ],
      },
      {
        title: 'Page 2',
        path: '#',
        children: [
          { title: 'Page 2.1', path: '#' },
          { title: 'Page 2.2', path: '#' },
          {
            title: 'Page 2.3',
            path: '#',
            children: [
              { title: 'Page 2.3.1', path: '#' },
              { title: 'Page 2.3.2', path: '#' },
              { title: 'Page 2.3.3', path: '#' },
            ],
          },
        ],
      },
      { title: 'Page 3', path: '#' },
    ],
  },
  { title: 'Blog', path: '#' },
  { title: 'About', path: '#' },
  { title: 'Contact', path: '#' },
  { title: 'External', path: 'https://www.google.com/' },
];

const NAV_ITEMS = [
  {
    subheader: 'Marketing',
    items: [
      {
        title: 'Landing',
        path: '#',
        icon: <Iconify icon="carbon:bat" width={1} />,
        roles: ['admin'],
        caption: 'Display only admin role',
      },
      {
        title: 'Services',
        path: '#',
        icon: <Iconify icon="carbon:cyclist" width={1} />,
        roles: ['admin', 'user'],
      },
      {
        title: 'Case Studies',
        path: '#',
        icon: <Iconify icon="carbon:3d-cursor-alt" width={1} />,
        info: <Label color="error">+32</Label>,
        children: [
          { title: 'Case Studies', path: '#' },
          { title: 'Case Study', path: '#' },
        ],
      },
      {
        title: 'Blog',
        path: '#',
        icon: <Iconify icon="carbon:3d-mpr-toggle" width={1} />,
        children: [
          { title: 'Blog Posts', path: '#' },
          { title: 'Blog Post', path: '#' },
        ],
      },
    ],
  },
  {
    subheader: 'Travel',
    items: [
      {
        title: 'About',
        path: '#',
        icon: <Iconify icon="carbon:airport-01" width={1} />,
      },
      {
        title: 'Contact',
        path: '#',
        icon: <Iconify icon="carbon:battery-full" width={1} />,
      },
      {
        title: 'Level',
        path: '#',
        icon: <Iconify icon="carbon:play" width={1} />,
        children: [
          { title: 'Level 2.1', path: '#' },
          { title: 'Level 2.2', path: '#' },
          {
            title: 'Level 2.3',
            path: '#',
            children: [
              { title: 'Level 3.1', path: '#' },
              { title: 'Level 3.2', path: '#' },
            ],
          },
        ],
      },
    ],
  },
];
