'use strict'

const Auditor = async (operation, affected_id, affected_table, userAgent, auth = null) => {
  const user_id = auth === null ? null : (await auth.getUser()).id
  const Audit = use('App/Models/Audit')
  const audit = new Audit()
  const platform = userAgent;
  audit.operation = operation
  audit.affected_id = affected_id
  audit.affected_table = affected_table
  audit.platform = platform
  audit.user_id = user_id
  await audit.save()
}

module.exports = Auditor
