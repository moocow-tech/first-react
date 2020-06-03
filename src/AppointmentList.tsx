// eslint-disable-next-line
import React, { FC } from 'react';
/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { gray5, accent2 } from './Styles';
import { AppointmentData } from './AppointmentData';
import { Appointment } from './Appointment';
interface Props {
  data: AppointmentData[];
}

export const AppointmentList: FC<Props> = ({ data }) => (
  <ul
    css={css`
      list-style: none;
      margin: 10px 0 0 0;
      padding: 0px 20px;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border-top: 3px solid ${accent2};
      box-shadow: 3px 5px 0 rgba(0, 0, 0, 0.16);
    `}
  >
    {data.map((appointment) => (
      <li
        key={appointment.appointmentId}
        css={css`
          border-top: 1px solid ${gray5};
          :first-of-type {
            border-top: none;
          }
        `}
      >
        <Appointment data={appointment} />
      </li>
    ))}
  </ul>
);
