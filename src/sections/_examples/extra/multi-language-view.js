'use client';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import TablePagination from '@mui/material/TablePagination';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';

import { useLocales, useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

export default function MultiLanguageView() {
  const { t, onChangeLang } = useTranslate();

  const { allLangs, currentLang } = useLocales();

  const [mounted, setMounted] = useState(false);

  const [page, setPage] = useState(2);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => setMounted(true), []);

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

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
            heading="Multi Language"
            links={[
              {
                name: 'Components',
                href: paths.components,
              },
              { name: 'Multi Language' },
            ]}
            moreLink={[
              'https://react.i18next.com',
              'https://mui.com/guides/localization/#main-content',
            ]}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Stack spacing={5}>
          <Card>
            <CardHeader title="Flexible" />

            <Box sx={{ p: 3 }}>
              <RadioGroup
                row
                value={currentLang.value}
                onChange={(event) => onChangeLang(event.target.value)}
              >
                {allLangs.map((lang) => (
                  <FormControlLabel
                    key={lang.label}
                    value={lang.value}
                    label={lang.label}
                    control={<Radio />}
                  />
                ))}
              </RadioGroup>

              <Stack direction="row" alignItems="center" sx={{ typography: 'h2', my: 3 }}>
                <Iconify icon={currentLang.icon} width={32} sx={{ mr: 1, borderRadius: 1 }} />
                {mounted && t('demo.title')}
              </Stack>

              <Typography>
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                hymenaeos. Praesent ac massa at ligula laoreet iaculis. Vivamus in erat ut urna
                cursus vestibulum. In ac felis quis tortor malesuada pretium. Nulla porta dolor. Sed
                consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi
                a libero. Vestibulum rutrum, mi nec elementum vehicula, eros quam gravida nisl, id
                fringilla neque ante vel mi. Cras varius. Nunc nec neque. Phasellus tempus.
              </Typography>
            </Box>
          </Card>

          <Card>
            <CardHeader title="System" sx={{ pb: 2 }} />

            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Stack>
      </Container>
    </>
  );
}
