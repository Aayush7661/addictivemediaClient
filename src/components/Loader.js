import React from 'react';
import { Spinner } from 'reactstrap';
const Loader = () => {
    return (
        <div className="preloader">
            <div className="status">
                <Spinner color={"primary"} />
            </div>
        </div>
    );
};

export default Loader;
