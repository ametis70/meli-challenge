export function getPort() {
  let port = 3000
  if (process.env.PORT !== undefined) {
    const _port = parseInt(process.env.PORT)
    if (isNaN(_port)) {
      console.warn(
        `PORT env var (${process.env.PORT}) is not a number, falling back to port 3000`,
      )
    } else {
      port = _port
    }
  }
  return port
}
