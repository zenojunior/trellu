const Logger = async (level, event, auth, description = null) => {
  const user = (auth === null) ? null : (await auth.getUser()).id
  const Log = use('App/Models/Log')
  const log = new Log()
  log.level = level.toUpperCase()
  log.event = event.toUpperCase()
  log.user_id = user
  log.description = ((typeof description === "object") && (description !== null) ) ? JSON.stringify(description) : description
  await log.save()
  return log;
}

module.exports = Logger
