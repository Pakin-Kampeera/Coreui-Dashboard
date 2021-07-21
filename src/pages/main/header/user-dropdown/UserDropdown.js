import React, {useRef, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {authAction} from '../../../../store/reducer/authReducer';
import {useSelector, useDispatch} from 'react-redux';

const UserDropdown = () => {
    const dropdownRef = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const email = useSelector((state) => state.auth.user.email);
    const created = useSelector((state) => state.auth.user.created);

    const [dropdownState, updateDropdownState] = useState({
        isDropdownOpen: false
    });

    const toggleDropdown = () => {
        updateDropdownState({isDropdownOpen: !dropdownState.isDropdownOpen});
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef &&
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            updateDropdownState({isDropdownOpen: false});
        }
    };

    const logoutHandler = (event) => {
        event.preventDefault();
        toggleDropdown();
        dispatch(authAction.logout());
        history.push('/login');
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside, false);
        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside,
                false
            );
        };
    });

    let className = 'dropdown-menu dropdown-menu-lg dropdown-menu-right';

    if (dropdownState.isDropdownOpen) {
        className += ' show';
    }

    return (
        <li ref={dropdownRef} className="nav-item dropdown user-menu">
            <button
                onClick={toggleDropdown}
                type="button"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
            >
                <img
                    src={'/img/default-profile.png'}
                    className="user-image img-circle elevation-2"
                    alt="User"
                />
            </button>
            <ul className={className}>
                <li className="user-header bg-primary">
                    <img
                        src={'/img/default-profile.png'}
                        className="img-circle elevation-2"
                        alt="User"
                    />
                    <p>
                        {email}
                        <small>
                            <span>Member since </span>
                            <span>{created}</span>
                        </small>
                    </p>
                </li>
                <li className="user-footer">
                    <button
                        type="button"
                        className="btn btn-default btn-flat float-right"
                        onClick={logoutHandler}
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </li>
    );
};

export default UserDropdown;
