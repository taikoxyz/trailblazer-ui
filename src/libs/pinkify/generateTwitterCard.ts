import { blobToBase64 } from "$libs/util/blobToBase64";

export async function generateTwitterCardSVG(avatarBlob: Blob): Promise<string> {
  // 
  const base64data = await blobToBase64(avatarBlob);

  // Replace data:image/png;base64 with data:image/svg+xml;base64
  // base64data = base64data.replace("data:image/png;base64", "data:image/svg+xml;base64");
  // const base64Image: string | null = 'data:image/svg+xml;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAKklEQVR42mJ89+57VwMQFr3KiWwDkYHLJgEGdAPoAmoFA4YBoGMJmBgBWYBlPXKmJWAAAAAElFTkSuQmCC'

  return `

  <svg
    id="test"
    width="600"
    viewBox="0 0 1200 600"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    >
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
}
//   return `
//   <svg
//   id="test"
//   width="600"
//   viewBox="0 0 1200 600"
//   preserveAspectRatio="xMidYMid meet"
//   xmlns="http://www.w3.org/2000/svg"
//   xmlns:xlink="http://www.w3.org/1999/xlink">
//   <defs>
//     <style type="text/css">
//       @font-face {
//         font-family: 'Clash Grotesk';
//         src: url('data:font/woff2;base64,...'); /* Replace with actual Base64 encoded font data */
//       }
//     </style>
//   </defs>
//   <image x="50%" y="50%" width="300" height="400" transform="translate(-150,-150)" xlink:href="${base64Image}" />
//   <text
//     x="50%"
//     y="100"
//     text-anchor="middle"
//     fill="white"
//     font-size="80"
//     font-family="Clash Grotesk"
//     alignment-baseline="middle">@zkenk has answered the call</text>
// </svg>
// `


// return `

// <svg
//   id="test"
//   width="600"
//   viewBox="0 0 1200 600"
//   preserveAspectRatio="xMidYMid meet"
//   xmlns="http://www.w3.org/2000/svg"
//   xmlns:xlink="http://www.w3.org/1999/xlink">
//   <rect x="0" y="0" width="100%" height="100%" fill="#d63b95" />
//   <image x="50%" y="50%" width="300" height="400" transform="translate(-150,-150)" xlink:href="${base64data}" />
//   <text
//     x="50%"
//     y="100"
//     text-anchor="middle"
//     fill="white"
//     font-size="80"
//     font-family="Clash Grotesk"
//     alignment-baseline="middle">@zkenk has answered the call</text>
// </svg>`;


