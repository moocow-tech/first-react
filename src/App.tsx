// eslint-disable-next-line
import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './Store';
import HomePage from './HomePage';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { HeaderWithRouter as Header } from './Header';
import AddAppointmentPage from './AddAppointmentPage';
import { SignInPage } from './SignInPage';
import { AppointmentPage } from './AppointmentPage';
import { NotFoundPage } from './NotFOundPage';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { fontFamily, fontSize, gray2 } from './Styles';
const store = configureStore();
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div
          css={css`
            font-family: ${fontFamily};
            font-size: ${fontSize};
            color: ${gray2};
          `}
        >
          <Header />
          <Switch>
            <Redirect from="/home" to="/" />
            <Route exact path="/" component={HomePage} />
            <Route path="/signin" component={SignInPage} />
            <Route path="/add" component={AddAppointmentPage} />
            <Route
              path="/appointments/:appointmentId"
              component={AppointmentPage}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
