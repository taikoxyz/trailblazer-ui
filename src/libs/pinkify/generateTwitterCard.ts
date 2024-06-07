import { blobToBase64 } from '$libs/util/blobToBase64';

export async function generateTwitterCardSVG(avatarBlob: Blob): Promise<string> {
  //
  const base64data = await blobToBase64(avatarBlob);

  // Replace data:image/png;base64 with data:image/svg+xml;base64
  // base64data = base64data.replace("data:image/png;base64", "data:image/svg+xml;base64");
  // const base64Image: string | null = 'data:image/svg+xml;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAKklEQVR42mJ89+57VwMQFr3KiWwDkYHLJgEGdAPoAmoFA4YBoGMJmBgBWYBlPXKmJWAAAAAElFTkSuQmCC'

  return `
  <svg
    id="test"
    width="1200"
    viewBox="0 0 1200 600"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    >
    <defs>
    <style>
      .cls-1 {
        fill: #d53c94;
      }

      .cls-1,
      .cls-2 {
        stroke-width: 0px;
      }

      .cls-3 {
        opacity: .3;
      }

      .cls-4 {
        opacity: .7;
      }

      .cls-2 {
        fill: #fff;
      }
    </style>
  </defs>
  <g>

    <image x="50%" y="50%" width="300" height="400" transform="translate(-150,-150)"
      href="${base64data}" />
    <path class="cls-1"
      d="M600,213.2c35.6,0,69.1,13.9,94.3,39,25.2,25.2,39,58.7,39,94.3s-13.9,69.1-39,94.3c-25.2,25.2-58.7,39-94.3,39s-69.1-13.9-94.3-39c-25.2-25.2-39-58.7-39-94.3s13.9-69.1,39-94.3c25.2-25.2,58.7-39,94.3-39M600,191.5c-85.6,0-155,69.4-155,155s69.4,155,155,155,155-69.4,155-155-69.4-155-155-155h0Z" />
    <g class="cls-4">
      <path class="cls-1"
        d="M600,236.6c29.4,0,57,11.4,77.7,32.2,20.8,20.8,32.2,48.4,32.2,77.7s-11.4,57-32.2,77.7c-20.8,20.8-48.4,32.2-77.7,32.2s-57-11.4-77.7-32.2c-20.8-20.8-32.2-48.4-32.2-77.7s11.4-57,32.2-77.7c20.8-20.8,48.4-32.2,77.7-32.2M600,213.3c-73.6,0-133.2,59.6-133.2,133.2s59.6,133.2,133.2,133.2,133.2-59.6,133.2-133.2-59.6-133.2-133.2-133.2h0Z" />
    </g>
    <g class="cls-3">
      <path class="cls-1"
        d="M600,259.9c47.7,0,86.6,38.8,86.6,86.6s-38.8,86.6-86.6,86.6-86.6-38.8-86.6-86.6,38.8-86.6,86.6-86.6M600,236.7c-60.7,0-109.8,49.2-109.8,109.8s49.2,109.8,109.8,109.8,109.8-49.2,109.8-109.8-49.2-109.8-109.8-109.8h0Z" />
    </g>
    <path class="cls-1"
      d="M445,191.5v310h310V191.5h-310ZM600,482.7c-75.2,0-136.2-61-136.2-136.2s61-136.2,136.2-136.2,136.2,61,136.2,136.2-61,136.2-136.2,136.2Z" />
  </g>
  <path class="cls-1" d="M1-.5v601h1198V-.5H1ZM753.2,499.9h-306.5V193.4h306.5v306.5Z" />
  <path class="cls-2"
    d="M642.9,560.8l-15.4-20.9c-1.7-2.3-4.1-3.6-6.8-3.9-.6,0-1.1-.4-1.4-.9-.3-.5-.3-1.2,0-1.7,1.1-2.4,1.1-5.2,0-7.8l-10.4-23.7c-1.5-3.5-5-5.8-8.9-5.8s-7.3,2.3-8.9,5.8l-10.4,23.7c-1.1,2.6-1.1,5.4,0,7.8.2.6.2,1.2,0,1.7-.3.5-.8.9-1.4.9-2.6.3-5.1,1.7-6.8,3.9l-15.4,20.9c-2.3,3.1-2.5,7.2-.6,10.6,1.9,3.3,5.6,5.2,9.5,4.8l25.7-2.9c2.8-.3,5.2-1.8,6.8-3.9.4-.5.9-.8,1.5-.8s1.2.3,1.5.8c1.6,2.1,4,3.6,6.8,3.9l25.7,2.9c3.8.4,7.5-1.4,9.5-4.8,1.9-3.3,1.7-7.5-.6-10.6ZM587.5,528.5l10.4-23.8c.4-.9,1.2-1.4,2.1-1.4s1.8.6,2.1,1.4l10.4,23.8c.3.7.3,1.6-.2,2.3-.4.7-1.2,1.1-2,1.1h-20.6c-.8,0-1.6-.4-2-1.1-.4-.7-.5-1.6-.2-2.3h0ZM592.8,564.7c-.4.7-1.1,1.2-1.9,1.3l-25.8,2.9c-.9.1-1.8-.3-2.3-1.1-.5-.8-.4-1.8.1-2.6l15.4-20.9c.5-.7,1.3-1,2.1-1,.8,0,1.6.5,2,1.2h0s10.3,17.9,10.3,17.9h0c.4.7.4,1.6,0,2.3h0ZM602.1,556.6c-.4.8-1.2,1.2-2.1,1.2s-1.7-.5-2.1-1.2l-7.9-13.7c-.4-.8-.4-1.7,0-2.4.4-.8,1.2-1.2,2.1-1.2h15.8c.9,0,1.7.5,2.1,1.2.4.8.4,1.7,0,2.4l-7.9,13.7ZM637.2,567.7c-.5.8-1.4,1.3-2.3,1.2l-25.8-2.9c-.8,0-1.5-.6-1.9-1.3-.4-.7-.3-1.6,0-2.3h0s10.3-17.9,10.3-17.9h0c.4-.7,1.1-1.2,2-1.2s1.6.3,2.1,1l15.4,20.9c.6.7.6,1.7.1,2.6h0Z" />
  <text x="50%" y="100" text-anchor="middle" fill="white" font-size="80" font-family="Clash Grotesk"
    alignment-baseline="middle">@zkenk has answered the call</text>
</svg>
  `;
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
