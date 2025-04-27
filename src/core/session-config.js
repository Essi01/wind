function configureSession(session, privateMode = false) {
    if (privateMode) {
        console.log('Private mode: clearing storage.');
        session.clearStorageData();
    } else {
        console.log('Normal mode.');
    }
}

module.exports = { configureSession };