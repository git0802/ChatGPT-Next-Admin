import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ProductReviewItem({ review }) {
  const { name, rating, comment, postedAt, avatarUrl, attachments, isPurchased } = review;

  const renderInfo = (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'row',
        md: 'column',
      }}
      sx={{
        width: { md: 240 },
        textAlign: { md: 'center' },
      }}
    >
      <Avatar
        src={avatarUrl}
        sx={{
          width: { xs: 48, md: 64 },
          height: { xs: 48, md: 64 },
        }}
      />

      <ListItemText
        primary={name}
        secondary={fDate(postedAt)}
        primaryTypographyProps={{
          noWrap: true,
          typography: 'subtitle2',
          mb: 0.5,
        }}
        secondaryTypographyProps={{
          noWrap: true,
          typography: 'caption',
          component: 'span',
        }}
      />
    </Stack>
  );

  const renderContent = (
    <Stack spacing={1} flexGrow={1}>
      <Rating size="small" value={rating} precision={0.1} readOnly />

      {isPurchased && (
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            color: 'success.main',
            typography: 'caption',
          }}
        >
          <Iconify icon="ic:round-verified" width={16} sx={{ mr: 0.5 }} />
          Verified purchase
        </Stack>
      )}

      <Typography variant="body2">{comment}</Typography>

      {!!attachments?.length && (
        <Stack direction="row" flexWrap="wrap" spacing={1} sx={{ pt: 1 }}>
          {attachments.map((attachment) => (
            <Box
              component="img"
              key={attachment}
              alt={attachment}
              src={attachment}
              sx={{ width: 64, height: 64, borderRadius: 1.5 }}
            />
          ))}
        </Stack>
      )}

      <Stack direction="row" spacing={2} sx={{ pt: 1.5 }}>
        <Stack direction="row" alignItems="center" sx={{ typography: 'caption' }}>
          <Iconify icon="solar:like-outline" width={16} sx={{ mr: 0.5 }} />
          123
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'caption' }}>
          <Iconify icon="solar:dislike-outline" width={16} sx={{ mr: 0.5 }} />
          34
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <Stack
      spacing={2}
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{ mt: 5, px: { xs: 2.5, md: 0 } }}
    >
      {renderInfo}

      {renderContent}
    </Stack>
  );
}

ProductReviewItem.propTypes = {
  review: PropTypes.object,
};
