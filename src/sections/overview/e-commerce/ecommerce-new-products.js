import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { alpha, useTheme } from '@mui/material/styles';

import Image from 'src/components/image';
import Carousel, { useCarousel, CarouselDots } from 'src/components/carousel';

// ----------------------------------------------------------------------

export default function EcommerceNewProducts({ list, ...other }) {
  const carousel = useCarousel({
    speed: 800,
    autoplay: true,
    ...CarouselDots({
      sx: {
        right: 20,
        bottom: 20,
        position: 'absolute',
        color: 'primary.light',
      },
    }),
  });

  return (
    <Card {...other}>
      <Carousel {...carousel.carouselSettings}>
        {list.map((item) => (
          <CarouselItem key={item.id} item={item} />
        ))}
      </Carousel>
    </Card>
  );
}

EcommerceNewProducts.propTypes = {
  list: PropTypes.array,
};

// ----------------------------------------------------------------------

function CarouselItem({ item }) {
  const theme = useTheme();

  const { coverUrl, name } = item;

  const renderImg = (
    <Image
      alt={name}
      src={coverUrl}
      overlay={`linear-gradient(to bottom, ${alpha(theme.palette.grey[900], 0)} 0%, ${
        theme.palette.grey[900]
      } 75%)`}
      sx={{
        width: 1,
        height: { xs: 280, xl: 320 },
      }}
    />
  );

  return (
    <Box sx={{ position: 'relative' }}>
      <CardContent
        sx={{
          left: 0,
          width: 1,
          bottom: 0,
          zIndex: 9,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <Typography variant="overline" sx={{ opacity: 0.48 }}>
          New
        </Typography>

        <Typography noWrap variant="h5" sx={{ mt: 1, mb: 3 }}>
          {name}
        </Typography>

        <Button color="primary" variant="contained">
          Buy Now
        </Button>
      </CardContent>

      {renderImg}
    </Box>
  );
}

CarouselItem.propTypes = {
  item: PropTypes.object,
};
