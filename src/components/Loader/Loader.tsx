
const Loader = () => {

    return (
        <div className="position-absolute top-50 start-50" style={{transform: 'translateX(-50%), translateY: (-50%}}>'}}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;