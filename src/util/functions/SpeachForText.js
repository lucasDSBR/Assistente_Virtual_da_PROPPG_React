export const speeach = () => {
    let speechRecognition = new window.webkitSpeechRecognition();
    let final_transcript = "";

    speechRecognition.continuous = false;

    speechRecognition.onresult = (event) => {
        let interim_transcript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        console.log(final_transcript)
        debugger
        return final_transcript;
        
    };
    speechRecognition.start()
    
    
}