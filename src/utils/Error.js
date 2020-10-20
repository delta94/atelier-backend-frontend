import React from 'react';

const Error = ({ touched, message }) => {
    if (!touched) {
        return <div className="form-message text-danger">&nbsp;</div>
    }
    if (message) {
        return <div className="form-message text-danger">{message}</div>
    }
    return <div className="form-message text-success">all good</div>
}

export default Error; 