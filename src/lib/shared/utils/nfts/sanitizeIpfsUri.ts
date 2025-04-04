export default function sanitizeIpfsUri(ipfsUri: string): string {
  if (!ipfsUri.startsWith('https://')) {
    if (ipfsUri.startsWith('ipfs://')) {
      ipfsUri = ipfsUri.split('ipfs://')[1];
    }
    ipfsUri = `https://taikonfts.4everland.link/ipfs/${ipfsUri}`;
  }
  return ipfsUri;
}
