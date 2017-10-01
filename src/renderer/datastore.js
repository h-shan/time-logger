import Datastore from 'nedb';
import path from 'path';
import { remote } from 'electron';
const db = {};

db.accounts = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/user-accounts.db')
});

export default db;
