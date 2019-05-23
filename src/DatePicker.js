import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import { DateTime } from 'luxon';

import Calendar from './Calendar';
import translate from './translate';

export default class DatePicker extends Component {
    static propTypes = {
        value: PropTypes.instanceOf(DateTime),
        onChange: PropTypes.func.isRequired,
        format: PropTypes.string,
        translate: PropTypes.func,
    };

    static defaultProps = {
        format: 'dd-LL-yyyy',
        translate,
    };

    state = { open: false };

    constructor(...args) {
        super(...args);
        this.onChange = this.onChange.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onChange(value) {
        const { onChange } = this.props;
        onChange(value);
        this.onClose();
    }

    onOpen(e) {
        e.preventDefault();
        this.setState({ open: true });
    }

    onClose() {
        this.setState({ open: false });
    }

    render() {
        const { value, format, translate, ...props } = this.props;
        const { open } = this.state;

        delete props.onChange;

        return (
            <Calendar
                open={open}
                value={value}
                onChange={this.onChange}
                onClose={this.onClose}
                trigger={
                    <Input
                        className="day-cy date-picker"
                        value={value ? value.toFormat(format) : ''}
                        readOnly
                        focus={open}
                        onClick={this.onOpen}
                        {...props}
                    />
                }
                translate={translate}
            />
        );
    }
}