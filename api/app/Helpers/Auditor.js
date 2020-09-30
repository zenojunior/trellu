const Auditor = async (operation, affected_id, affected_table, platform, auth) => {
  const user = (auth === null) ? null : (await auth.getUser()).id
  const Audit = use('App/Models/Audit')
  const audit = new Audit()
  audit.operation = operation
  audit.affected_id = affected_id
  audit.affected_table = affected_table
  audit.
  audit.platform = platform
  audit.user_id = user
  await audit.save()
  return audit;
}

module.exports = Auditor
