// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Facts, Reminder, Alert, School } = initSchema(schema);

export {
  Facts,
  Reminder,
  Alert,
  School
};