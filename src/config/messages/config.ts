import { registerAs } from '@nestjs/config';

export default registerAs('msg', () => ({
  ERROR_NOT_FOUND: 'Not found',
  ERROR_MAIL_USERNAME: 'The username or email has already registered',
  ERROR_GROUP_NAME: 'The group name has already registered',
  ERROR_USER_NOT_FOUND: 'The user not found in the database',
}));
