import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const AppButton = ({
    children,
    isLoading,
    icon,
    theme = 'primary',
    disabled,
    ...otherProps
}) => {
    let spinnerTemplate;
    let iconTemplate;

    if (isLoading) {
        spinnerTemplate = (
            <Spinner
                className="ml-2"
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
        );
    }

    return (
        <Button
            {...otherProps}
            variant={theme}
            disabled={isLoading || disabled}
        >
            {iconTemplate}
            {children}
            {spinnerTemplate}
        </Button>
    );
};

export default AppButton;
