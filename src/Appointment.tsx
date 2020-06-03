// eslint-disable-next-line
import React, { FC } from 'react';
/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { AppointmentData } from './AppointmentData';
import { gray3 } from './Styles';

interface Props {
  data: AppointmentData;
  showContent?: boolean;
}

export const Appointment: FC<Props> = ({ data, showContent }) => (
  <div
    css={css`
      padding: 10px 0px;
    `}
  >
    {showContent && (
      <div
        css={css`
          padding: 10px 0px;
          font-size: 19px;
        `}
      >
        {data.description.length > 50
          ? `${data.description.substring(0, 50)}...`
          : data.description}
      </div>
    )}
    <div
      css={css`
        font-size: 12px;
        font-style: italic;
        color: ${gray3};
      `}
    >
      {`Appointment for ${
        data.stuName
      } on ${data.start.toLocaleDateString()} ${data.start.toLocaleTimeString()}`}
    </div>
  </div>
);
Appointment.defaultProps = {
  showContent: true,
};
