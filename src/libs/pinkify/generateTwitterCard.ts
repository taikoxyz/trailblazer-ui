import { blobToBase64 } from "$libs/util/blobToBase64";

export async function generateTwitterCardSVG(avatarBlob: Blob): Promise<string> {

  const base64data = await blobToBase64(avatarBlob);

  // Replace data:image/png;base64 with data:image/svg+xml;base64
  // base64data = base64data.replace("data:image/png;base64", "data:image/svg+xml;base64");

  return `<svg
    id="test"
    width="600"
    viewBox="0 0 1200 600"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="100%" height="100%" fill="#d63b95" />
    <image x="50%" y="50%" width="300" height="400" transform="translate(-150,-150)" href="${base64data}" />
    <text
      x="50%"
      y="100"
      text-anchor="middle"
      fill="white"
      font-size="80"
      font-family="Clash Grotesk"
      alignment-baseline="middle">@zkenk has answered the call</text>
  </svg>`;
};

