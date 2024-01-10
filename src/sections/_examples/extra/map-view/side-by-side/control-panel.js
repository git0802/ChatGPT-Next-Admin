import { memo } from 'react';
import PropTypes from 'prop-types';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { StyledControlPanel } from 'src/components/map';

// ----------------------------------------------------------------------

function ControlPanel({ mode, onModeChange }) {
  return (
    <StyledControlPanel>
      <ToggleButtonGroup color="primary" value={mode} exclusive onChange={onModeChange}>
        <ToggleButton value="side-by-side">Side by side</ToggleButton>

        <ToggleButton value="split-screen">Split screen</ToggleButton>
      </ToggleButtonGroup>
    </StyledControlPanel>
  );
}

ControlPanel.propTypes = {
  mode: PropTypes.string,
  onModeChange: PropTypes.func,
};

export default memo(ControlPanel);
