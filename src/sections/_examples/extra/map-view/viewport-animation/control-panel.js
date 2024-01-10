import { memo } from 'react';
import PropTypes from 'prop-types';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { StyledControlPanel } from 'src/components/map';

// ----------------------------------------------------------------------

function ControlPanel({ data, selectedCity, onSelectCity }) {
  return (
    <StyledControlPanel>
      {data.map((city) => (
        <RadioGroup
          key={city.city}
          value={selectedCity}
          onChange={(event) => onSelectCity(event, city)}
        >
          <FormControlLabel
            value={city.city}
            label={city.city}
            control={<Radio size="small" />}
            sx={{ color: 'common.white' }}
          />
        </RadioGroup>
      ))}
    </StyledControlPanel>
  );
}

ControlPanel.propTypes = {
  data: PropTypes.array,
  onSelectCity: PropTypes.func,
  selectedCity: PropTypes.string,
};

export default memo(ControlPanel);
