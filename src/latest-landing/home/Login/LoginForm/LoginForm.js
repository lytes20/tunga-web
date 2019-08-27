import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import "./LoginForm.scss";
import Icon from "../../../shared/core/Icon";
import { Form, Title, Button, Input, Group, Label, IconGroup, Cta } from "../../../shared/Form/Form";
import Error from "../../../../components/core/Error";
import { authenticate } from "../../../../actions/AuthActions";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            formSubmitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault();
        this.setState({ formSubmitted: true });
        if (!this.state.username || !this.state.password) {
            return;
        }

        this.props.authenticate(this.state);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value, formSubmitted: false });
    }

    render() {
        const { auth } = this.props;

        return (
            <div className="LoginForm">
                <div className="LoginForm__card">
                    <Form onSubmit={this.onFormSubmit}>
                        <React.Fragment>
                            {auth.errors && auth.errors.auth && auth.errors.auth.non_field_errors ?
                                <Error
                                    message={
                                        auth.errors.auth.non_field_errors.join(', ') ||
                                        "Sorry, we couldn't log you in. Please try again."
                                    }
                                /> :
                                null}
                            <Title className="LoginForm__title">
                                Welcome back
                            </Title>
                            <Group>
                                <Label>
                                    Email address or username
                                </Label>
                                <IconGroup className="Form__input-icon-group">
                                    <Icon className="Form__input-icon" name='envelope-o' size='card'/>
                                    <Input className="Form__input--has-icon" type="text"
                                           name="username" value={this.state.username} onChange={this.handleChange}
                                           placeholder="Enter email address or username"/>
                                </IconGroup>
                                {
                                    this.state.formSubmitted && !this.state.username &&
                                    <div className="Form__group text-danger mt-2">
                                        Please enter a username or email
                                    </div>
                                }
                            </Group>
                            <Group>
                                <Label>
                                    Password
                                </Label>
                                <Cta className="LoginForm__cta float-right">Forgot password?</Cta>
                                <IconGroup>
                                    <Icon className="Form__input-icon" name='lock-alt' size='card'/>
                                    <Input className="Form__input--has-icon" type="password"
                                           name="password" value={this.state.password} onChange={this.handleChange}
                                           placeholder="Enter password"/>
                                </IconGroup>
                                {
                                    this.state.formSubmitted && !this.state.password &&
                                    <div className="Form__group text-danger mt-2">
                                        Please enter a password
                                    </div>
                                }
                            </Group>
                            <div className="text-center">
                                <Button type="submit">
                                    Login
                                </Button>
                            </div>
                        </React.Fragment>
                    </Form>
                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {};

const mapStateToProps = store => ({
    auth: store.app.Auth
});

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (credentials) => dispatch(authenticate(credentials)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

