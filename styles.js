// cannot load .css file in chrome extension and edit shadowRoot elemets


function applyStyle(element, style) {
    Object.entries(STYLES[style] || {}).forEach(([key, value]) => {
        element.style[key] = value;
    });
    return element;
}

STYLES = {
    topUiDetails: {
        border: '1px solid HSL(52, 90%, 58%)',
        background: '#FCF5C7',
        borderRadius: '10px',
    },
    topUiSummary: {
        padding: '10px',
        border: '2px solid HSL(52, 90%, 58%)',
        background: '#FCF5C7',
        borderRadius: '10px',
        cursor: 'pointer',
    },
    topUiContents: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
    },
    topUiHeader: {
        margin: '20px 5px 5px 0',
        fontWeight: 'bold',
        fontSize: '1.1rem',
    },
    topUiOptionsContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
    
    },
    topUiOptionsDetail: {
        marginLeft: '10px',
        marginTop: '5px',
        paddingLeft: '10px',
        borderLeft: '1px solid black',
    },
    topUiCheckbox: {
        cursor: 'pointer',
    },
    topUiCheckboxLabel: {
        cursor: 'pointer',
        paddingLeft: '5px',
    },
    topUiDownload: {
        height: '2em',
        cursor: 'pointer',
        marginTop: '-2rem',
        alignSelf: 'flex-end',
    },
    topUiDownloadActive: {
        cursor: 'pointer',
        fill: 'black',
    },
    topUiDownloadInactive: {
        cursor: 'default',
        fill: '#aaa',
    },
    topUiSelectedContainer: {
        display: 'grid',
        gridTemplateColumns: '400px 50px 50px 150px 150px',
    },
    topUiSelectedCell: {
        padding: '3px 0',
    },
    actionButton: {
        padding: '0',
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '100%',
        background: 'transparent',
        fontWeight: 'bold',
        position: 'absolute',
        left: '5px',
        bottom: '5px',
        width: '1.5rem',
        height: '1.5rem',
        fontSize: '1.5rem',
    },
    actionButtonAdd: {
        color: 'green',
        border: '2px solid green',
        lineHeight: '1.4rem',
    },
    actionButtonRemove: {
        color: 'red',
        border: '2px solid red',
        lineHeight: '0.5rem',
    }
}
