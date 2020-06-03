/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Background from './img/showcase.jpg';
export const Backimage = () => (
  <div
    css={css`
      /* The image used */
      background-image: url(${Background});
      min-height: 380px;
      /* Center and scale the image nicely */
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      margin-top: 50px;
    `}
  ></div>
);
