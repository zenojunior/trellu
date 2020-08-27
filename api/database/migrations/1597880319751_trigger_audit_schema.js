'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */

const Schema = use('Schema')
const Database = use('Database')

class TriggerAuditSchema extends Schema {
  async up() {
    await Database.raw(`CREATE OR REPLACE FUNCTION audit()
      RETURNS TRIGGER
      AS $$ BEGIN IF TG_OP = 'DELETE' THEN
      INSERT INTO audit SELECT 'D', OLD.id , TG_TABLE_NAME, now(), now();
      END IF;
      IF TG_OP='INSERT' THEN
      INSERT INTO audit SELECT 'U', NEW.id, TG_TABLE_NAME, now(), now();
      END IF;
      IF TG_OP='UPDATE' THEN
      INSERT INTO audit SELECT 'I', OLD.id, TG_TABLE_NAME, now(), now();
      END IF;
      RETURN null;
      END;
      $$ LANGUAGE plpgsql;
      CREATE TRIGGER audit_users
      AFTER INSERT OR UPDATE OR DELETE ON users
      FOR EACH ROW
      EXECUTE PROCEDURE audit();
      CREATE TRIGGER audit_boards
      AFTER INSERT OR UPDATE OR DELETE ON boards
      FOR EACH ROW
      EXECUTE PROCEDURE audit();
      CREATE TRIGGER audit_cards
      AFTER INSERT OR UPDATE OR DELETE ON cards
      FOR EACH ROW
      EXECUTE PROCEDURE audit();`)
  }

  async down() {
    await Database.raw('DROP TRIGGER audit_users ON users')
    await Database.raw('DROP TRIGGER audit_boards ON boards')
    await Database.raw('DROP TRIGGER audit_cards ON cards')
  }
}

module.exports = TriggerAuditSchema
