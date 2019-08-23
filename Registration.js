import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { Input, TextLink, Loading, Button } from './common';
import axios from 'axios';

class Registration extends Component {
    constructor(props) {
        # code omitted

        this.registerUser = this.registerUser.bind(this);
    }

    registerUser() {
        const { email, password, password_confirmation } = this.state;

        this.setState({ error: '', loading: true });

        // NOTE HTTP is insecure, only post to HTTPS in production apps

        axios.post("http://localhost:4000/api/v1/sign_up", {
            user: {
                email: email,
                password: password,
                password_confirmation: password_confirmation
            }
        })
            .then((response) => {
                // Handle the JWT response here
            })
            .catch((error) => {
                // Handle returned errors here
            });
    }

};
