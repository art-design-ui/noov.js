import os from 'os'

export default function getNetworkAddress(): string {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const item of interfaces[name] as any) {
      const { address, family, internal } = item
      if (family === 'IPv4' && !internal) {
        return address
      }
    }
  }
  return ''
}
