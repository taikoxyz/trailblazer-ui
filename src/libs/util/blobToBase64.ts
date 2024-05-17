export async function blobToBase64(blob: Blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  const binaryString = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
  return `data:image/png;base64,${btoa(binaryString)}`;
}
