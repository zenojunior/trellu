'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class TriggerArchivedSchema extends Schema {
  async up() {
    await Database.raw(`CREATE OR REPLACE FUNCTION archived_lists()
      RETURNS TRIGGER
      AS $$ BEGIN
      IF OLD.archived <> NEW.archived THEN
      UPDATE cards SET archived = NEW.archived WHERE cards.list_id = NEW.id;
      END IF;
      RETURN null;
      END;
      $$ LANGUAGE plpgsql;
      CREATE TRIGGER archived_lists
      AFTER UPDATE ON lists
      FOR EACH ROW
      EXECUTE PROCEDURE archived_lists();`)
  }

  async down () {
    await Database.raw('DROP TRIGGER archived_lists ON lists')
  }
}

module.exports = TriggerArchivedSchema
