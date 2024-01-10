import PropTypes from 'prop-types';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';
import SearchNotFound from 'src/components/search-not-found';

// ----------------------------------------------------------------------

export default function JobSearch({ query, results, onSearch, hrefItem }) {
  const router = useRouter();

  const handleClick = (id) => {
    router.push(hrefItem(id));
  };

  const handleKeyUp = (event) => {
    if (query) {
      if (event.key === 'Enter') {
        const selectProduct = results.filter((job) => job.title === query)[0];

        handleClick(selectProduct.id);
      }
    }
  };

  return (
    <Autocomplete
      sx={{ width: { xs: 1, sm: 260 } }}
      autoHighlight
      popupIcon={null}
      options={results}
      onInputChange={(event, newValue) => onSearch(newValue)}
      getOptionLabel={(option) => option.title}
      noOptionsText={<SearchNotFound query={query} sx={{ bgcolor: 'unset' }} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, job, { inputValue }) => {
        const matches = match(job.title, inputValue);
        const parts = parse(job.title, matches);

        return (
          <Box component="li" {...props} onClick={() => handleClick(job.id)} key={job.id}>
            <div>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                  sx={{
                    typography: 'body2',
                    fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
                  }}
                >
                  {part.text}
                </Typography>
              ))}
            </div>
          </Box>
        );
      }}
    />
  );
}

JobSearch.propTypes = {
  hrefItem: PropTypes.func,
  onSearch: PropTypes.func,
  query: PropTypes.string,
  results: PropTypes.array,
};
