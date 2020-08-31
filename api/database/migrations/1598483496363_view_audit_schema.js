'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class ViewCardSchema extends Schema {
  async up() {
    await Database.raw(`CREATE VIEW audit_view AS
    SELECT 
  CASE operation 
  WHEN 'U' THEN 'UPDATE' 
  WHEN 'I' THEN 'INSERT' 
  WHEN 'D' THEN 'DELETE' 
  END  as ACTION, 
  affected_table as AFFECTED_TABLE, 
  affected_id as ID,
  to_char(created_at, 'DD/MM/YYYY HH24:MI:SS') as "CREATED WHEN",
  CASE affected_table 
  WHEN 'users' THEN (SELECT users.name FROM users WHERE users.id = audit.affected_id)
  WHEN 'boards' THEN (SELECT users.name FROM users, boards WHERE boards.id = audit.affected_id AND boards.user_id = users.id)
  WHEN 'lists' THEN (SELECT users.name FROM users, boards, lists WHERE lists.id = audit.affected_id AND lists.board_id = boards.id AND boards.user_id = users.id)
  WHEN 'cards' THEN (SELECT users.name FROM users, boards, lists, cards WHERE cards.id = audit.affected_id AND cards.list_id = lists.id AND 
                        lists.board_id = boards.id AND boards.user_id = users.id)
  END  as USER_ACTION FROM audit;`)
  }

  async down() {
    await Database.raw('DROP VIEW audit_view;')
  }
}

module.exports = ViewCardSchema
