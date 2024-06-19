export function randomString(len) {
  len = len || 32
  const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const a = t.length
  let n = ''
  for (let i = 0; i < len; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}
