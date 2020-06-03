// eslint-disable-next-line
import React, { ChangeEvent, FC, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { fontFamily, fontSize, gray1, gray2, gray5 } from './Styles';
import { UserIcon } from './Icons';
export const Header: FC<RouteComponentProps> = ({ history, location }) => (
  <div
    css={css`
      position: fixed;
      box-sizing: border-box;
      top: 0;
      z-index: 1;
      width: 100%;
      padding: 10px 20px;
      background-color: #fff;
      border-bottom: 1px solid ${gray5};
      box-shadow: 0 3px 7px 0 rgba(110, 112, 114, 0.21);
    `}
  >
    <div
      css={css`
        display: flex;
        width: 1170px;
        align-items: center;
        justify-content: space-between;
        margin-right: auto;
        margin-left: auto;
      `}
    >
      <Link
        to="/"
        css={css`
          font-size: 24px;
          font-weight: bold;
          color: ${gray1};
          text-decoration: none;
        `}
      >
        tutortech.
      </Link>
      <div>
        <Link
          to="/faq"
          css={css`
            font-family: ${fontFamily};
            font-size: ${fontSize};
            padding: 5px 10px;
            background-color: transparent;
            color: ${gray2};
            text-decoration: none;
            cursor: pointer;
            span {
              margin-left: 10px;
            }
            :focus {
              outline-color: ${gray5};
            }
          `}
        >
          <span>FAQ's</span>
        </Link>
        <Link
          to="/appointments"
          css={css`
            font-family: ${fontFamily};
            font-size: ${fontSize};
            padding: 5px 10px;
            background-color: transparent;
            color: ${gray2};
            text-decoration: none;
            cursor: pointer;
            span {
              margin-left: 10px;
            }
            :focus {
              outline-color: ${gray5};
            }
          `}
        >
          <span>Appointments</span>
        </Link>
        <Link
          to="/signin"
          css={css`
            font-family: ${fontFamily};
            font-size: ${fontSize};
            padding: 5px 10px;
            background-color: transparent;
            color: ${gray2};
            text-decoration: none;
            cursor: pointer;
            span {
              margin-left: 10px;
            }
            :focus {
              outline-color: ${gray5};
            }
          `}
        >
          <UserIcon />
          <span>Sign In</span>
        </Link>
      </div>
    </div>
  </div>
);
export const HeaderWithRouter = withRouter(Header);
