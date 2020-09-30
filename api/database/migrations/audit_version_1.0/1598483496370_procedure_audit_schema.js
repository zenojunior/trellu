'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class ProcedureCardSchema extends Schema {
  async up() {
    await Database.raw(`create or replace function audit_procedure (
    tab varchar,
    oper varchar
)
    returns table (IDS integer)
    language plpgsql
as $$
begin
    return query
        SELECT affected_id as IDS
        FROM audit
        WHERE audit.affected_table = tab AND audit.operation = oper;
end;$$`)
  }

  async down() {
    await Database.raw('drop function audit_procedure;')
  }
}

module.exports = ProcedureCardSchema
