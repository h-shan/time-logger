import Datastore from 'nedb';
import path from 'path';
import { remote } from 'electron';
const db = {};

db.payable = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/payable.db')
});

db.jira = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/jira.db')
});

export default db;
