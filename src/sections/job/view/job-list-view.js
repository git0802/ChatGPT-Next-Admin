'use client';

import orderBy from 'lodash/orderBy';
import isEqual from 'lodash/isEqual';
import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { countries } from 'src/assets/data';
import {
  _jobs,
  _roles,
  JOB_SORT_OPTIONS,
  JOB_BENEFIT_OPTIONS,
  JOB_EXPERIENCE_OPTIONS,
  JOB_EMPLOYMENT_TYPE_OPTIONS,
} from 'src/_mock';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import JobList from '../job-list';
import JobSort from '../job-sort';
import JobSearch from '../job-search';
import JobFilters from '../job-filters';
import JobFiltersResult from '../job-filters-result';

// ----------------------------------------------------------------------

const defaultFilters = {
  roles: [],
  locations: [],
  benefits: [],
  experience: 'all',
  employmentTypes: [],
};

// ----------------------------------------------------------------------

export default function JobListView() {
  const settings = useSettingsContext();

  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState('latest');

  const [search, setSearch] = useState({
    query: '',
    results: [],
  });

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: _jobs,
    filters,
    sortBy,
  });

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = !dataFiltered.length && canReset;

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback(
    (inputValue) => {
      setSearch((prevState) => ({
        ...prevState,
        query: inputValue,
      }));

      if (inputValue) {
        const results = _jobs.filter(
          (job) => job.title.toLowerCase().indexOf(search.query.toLowerCase()) !== -1
        );

        setSearch((prevState) => ({
          ...prevState,
          results,
        }));
      }
    },
    [search.query]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <JobSearch
        query={search.query}
        results={search.results}
        onSearch={handleSearch}
        hrefItem={(id) => paths.dashboard.job.details(id)}
      />

      <Stack direction="row" spacing={1} flexShrink={0}>
        <JobFilters
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          //
          filters={filters}
          onFilters={handleFilters}
          //
          canReset={canReset}
          onResetFilters={handleResetFilters}
          //
          locationOptions={countries}
          roleOptions={_roles}
          benefitOptions={JOB_BENEFIT_OPTIONS.map((option) => option.label)}
          experienceOptions={['all', ...JOB_EXPERIENCE_OPTIONS.map((option) => option.label)]}
          employmentTypeOptions={JOB_EMPLOYMENT_TYPE_OPTIONS.map((option) => option.label)}
        />

        <JobSort sort={sortBy} onSort={handleSortBy} sortOptions={JOB_SORT_OPTIONS} />
      </Stack>
    </Stack>
  );

  const renderResults = (
    <JobFiltersResult
      filters={filters}
      onResetFilters={handleResetFilters}
      //
      canReset={canReset}
      onFilters={handleFilters}
      //
      results={dataFiltered.length}
    />
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Job',
            href: paths.dashboard.job.root,
          },
          { name: 'List' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.job.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Job
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {renderFilters}

        {canReset && renderResults}
      </Stack>

      {notFound && <EmptyContent filled title="No Data" sx={{ py: 10 }} />}

      <JobList jobs={dataFiltered} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({ inputData, filters, sortBy }) => {
  const { employmentTypes, experience, roles, locations, benefits } = filters;

  // SORT BY
  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    inputData = orderBy(inputData, ['totalViews'], ['desc']);
  }

  // FILTERS
  if (employmentTypes.length) {
    inputData = inputData.filter((job) =>
      job.employmentTypes.some((item) => employmentTypes.includes(item))
    );
  }

  if (experience !== 'all') {
    inputData = inputData.filter((job) => job.experience === experience);
  }

  if (roles.length) {
    inputData = inputData.filter((job) => roles.includes(job.role));
  }

  if (locations.length) {
    inputData = inputData.filter((job) => job.locations.some((item) => locations.includes(item)));
  }

  if (benefits.length) {
    inputData = inputData.filter((job) => job.benefits.some((item) => benefits.includes(item)));
  }

  return inputData;
};
