import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import UserCard from './user-card';

// ----------------------------------------------------------------------

export default function UserCardList({ users }) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
    >
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </Box>
  );
}

UserCardList.propTypes = {
  users: PropTypes.array,
};
