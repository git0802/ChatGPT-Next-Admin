import PropTypes from 'prop-types';

import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fDateTime } from 'src/utils/format-time';

import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

// ----------------------------------------------------------------------

export default function BookingCustomerReviews({ title, subheader, list, ...other }) {
  const carousel = useCarousel({
    adaptiveHeight: true,
  });

  const customerInfo = list.find((_, index) => index === carousel.currentIndex);

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={<CarouselArrows onNext={carousel.onNext} onPrev={carousel.onPrev} />}
      />

      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {list.map((item) => (
          <ReviewItem key={item.id} item={item} />
        ))}
      </Carousel>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack spacing={2} direction="row" alignItems="center" sx={{ p: 3 }}>
        <Button
          fullWidth
          color="error"
          variant="soft"
          onClick={() => console.info('ACCEPT', customerInfo?.id)}
        >
          Reject
        </Button>

        <Button
          fullWidth
          color="inherit"
          variant="contained"
          onClick={() => console.info('REJECT', customerInfo?.id)}
        >
          Accept
        </Button>
      </Stack>
    </Card>
  );
}

BookingCustomerReviews.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function ReviewItem({ item }) {
  const { avatarUrl, name, description, rating, postedAt, tags } = item;

  return (
    <Stack
      spacing={2}
      sx={{
        p: 3,
        position: 'relative',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />

        <ListItemText
          primary={name}
          secondary={`Posted ${fDateTime(postedAt)}`}
          secondaryTypographyProps={{
            component: 'span',
            typography: 'caption',
            mt: 0.5,
            color: 'text.disabled',
          }}
        />
      </Stack>

      <Rating value={rating} size="small" readOnly precision={0.5} />

      <Typography variant="body2">{description}</Typography>

      <Stack direction="row" flexWrap="wrap" spacing={1}>
        {tags.map((tag) => (
          <Chip size="small" variant="soft" key={tag} label={tag} />
        ))}
      </Stack>
    </Stack>
  );
}

ReviewItem.propTypes = {
  item: PropTypes.object,
};
