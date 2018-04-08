import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as ApolloReact from 'react-apollo';

import * as Router from 'reiso/Modules/Router';
import * as Reducer from 'reiso/Modules/Reducer';

import * as UserReducer from '~/Modules/Authentication/Reducer/User';
import { Menu } from '~/Modules/Main/View/Menu';
import { Transition } from '~/Components/Animation';

import * as Header from '../Reducer/Header';

export interface StateProps {
    user?: UserReducer.UserInterface
    isDesktop?: boolean
}

export interface DispatchProps {
    setTitle?: (name: string) => void
}

export type Props = StateProps & DispatchProps & {
    data?: any,
    login?: any,
    registration?: any
    containerFree?: boolean
    location?: any
    children?: any
}

export const Application: (props: Props) => any = Router.withRouter(
Reducer.Connect<StateProps, DispatchProps, Header.StateModel>(state => ({}), (dispatch, props) => ({
    setTitle: async (name: string) => {
        await dispatch(Header.setTitle(name));
    }
}))(
Reducer.Connect<StateProps, {}, UserReducer.StateModel>(state => ({
    user: state.User.entity
}))(
function (props: Props) {
    return (
        <div>
            <Menu/>
            <Transition appear id={props.location.pathname}>
                {props.children}
            </Transition>
        </div>
    )
})))