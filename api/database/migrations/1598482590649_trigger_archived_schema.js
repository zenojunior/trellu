'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class TriggerArchivedSchema extends Schema {
  async up() {
    await Database.raw(`CREATE OR REPLACE FUNCTION archived_boards()
      RETURNS TRIGGER
      AS $$ BEGIN
      IF OLD.archived <> NEW.archived THEN
      UPDATE lists SET archived = NEW.archived WHERE lists.board_id = NEW.board_id;
      END IF;
      RETURN null;
      END;
      $$ LANGUAGE plpgsql;
      CREATE TRIGGER archived_boards
      AFTER UPDATE ON boards
      FOR EACH ROW
      EXECUTE PROCEDURE archived_boards();`)
  }

  async down() {
    await Database.raw('DROP TRIGGER archived_boards ON boards')
  }
}

module.exports = TriggerArchivedSchema
