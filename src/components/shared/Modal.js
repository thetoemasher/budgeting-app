import React from 'react';

function Modal(props) {
    return (
        <div onClick={props.close} style={props.outerDiv? props.outerDiv : style.outerDiv}>
            <div onClick={(e) => e.stopPropagation()} style={props.innerDiv? props.innerDiv : style.innerDiv}>
                {props.children}
            </div>
        </div>
    );
}

let style = {
    outerDiv: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        background: 'rgba(0, 0, 0, 0.45)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerDiv: {
        width: '50%',
        height: '50%',
        background: 'white'
    }
}

export default Modal;
