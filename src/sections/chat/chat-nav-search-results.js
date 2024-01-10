import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import SearchNotFound from 'src/components/search-not-found';

// ----------------------------------------------------------------------

export default function ChatNavSearchResults({ query, results, onClickResult }) {
  const totalResults = results.length;

  const notFound = !totalResults && !!query;

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          px: 2.5,
          mb: 2,
        }}
      >
        Contacts ({totalResults})
      </Typography>

      {notFound ? (
        <SearchNotFound
          query={query}
          sx={{
            p: 3,
            mx: 'auto',
            width: `calc(100% - 40px)`,
            bgcolor: 'background.neutral',
          }}
        />
      ) : (
        <>
          {results.map((result) => (
            <ListItemButton
              key={result.id}
              onClick={() => onClickResult(result)}
              sx={{
                px: 2.5,
                py: 1.5,
                typography: 'subtitle2',
              }}
            >
              <Avatar alt={result.name} src={result.avatarUrl} sx={{ mr: 2 }} />
              {result.name}
            </ListItemButton>
          ))}
        </>
      )}
    </>
  );
}

ChatNavSearchResults.propTypes = {
  query: PropTypes.string,
  results: PropTypes.array,
  onClickResult: PropTypes.func,
};
