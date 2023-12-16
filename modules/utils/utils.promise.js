export const delay = (interval = 300) => 
    new Promise(resolve => setTimeout(resolve, interval));



export const runLongProcess = (process, beforeRunning, afterRunning) => {
    beforeRunning && beforeRunning();
    
    process()
    .catch(error => alert(error.message))
    .finally(() => afterRunning && afterRunning());
};