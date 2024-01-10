'use client';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { paths } from 'src/routes/paths';

import { RoleBasedGuard } from 'src/auth/guard';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

export default function PermissionDeniedView() {
  const settings = useSettingsContext();

  const [role, setRole] = useState('admin');

  const handleChangeRole = useCallback((event, newRole) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Permission Denied"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Permission Denied',
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ToggleButtonGroup
        exclusive
        value={role}
        size="small"
        onChange={handleChangeRole}
        sx={{ mb: 5 }}
      >
        <ToggleButton value="admin" aria-label="admin role">
          isAdmin
        </ToggleButton>

        <ToggleButton value="user" aria-label="user role">
          isUser
        </ToggleButton>
      </ToggleButtonGroup>

      <RoleBasedGuard hasContent roles={[role]} sx={{ py: 10 }}>
        <Box gap={3} display="grid" gridTemplateColumns="repeat(2, 1fr)">
          {[...Array(8)].map((_, index) => (
            <Card key={index}>
              <CardHeader title={`Card ${index + 1}`} subheader="Proin viverra ligula" />

              <Typography variant="body2" sx={{ px: 3, py: 2, color: 'text.secondary' }}>
                Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. In enim justo,
                rhoncus ut, imperdiet a, venenatis vitae, justo. Vestibulum fringilla pede sit amet
                augue.
              </Typography>
            </Card>
          ))}
        </Box>
      </RoleBasedGuard>
    </Container>
  );
}
