const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const resultDiv = document.getElementById('result');
    const bijoyText = document.getElementById('bijoyText');

    let recognition;

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'bn-BD';
      recognition.interimResults = true;

      recognition.onstart = () => {
        resultDiv.textContent = 'Recording...';
        startButton.disabled = true;
        stopButton.disabled = false;
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        resultDiv.textContent = finalTranscript + interimTranscript;
        const bijoyOutput = convertUnicodeToBijoy(finalTranscript + interimTranscript);
        bijoyText.value = bijoyOutput;
      };

      recognition.onend = () => {
        startButton.disabled = false;
        stopButton.disabled = true;
        if (resultDiv.textContent === 'Recording...') {
          resultDiv.textContent = '';
        }
      };

      recognition.onerror = (event) => {
        resultDiv.textContent = 'Error occurred: ' + event.error;
        startButton.disabled = false;
        stopButton.disabled = true;
      };

      startButton.addEventListener('click', () => {
        recognition.start();
      });

      stopButton.addEventListener('click', () => {
        recognition.stop();
      });
    } else {
      resultDiv.textContent = 'Speech recognition is not supported in this browser.';
      startButton.disabled = true;
      stopButton.disabled = true;
    }


    function convertUnicodeToBijoy(unicodeText) {
      // This is a placeholder. Actual conversion requires complex mapping.
      // Due to the limitations of this environment, a full conversion is not possible.
      // This will return the input text with a message.
      return `Bijoy conversion is not fully implemented in this environment. Input: ${unicodeText}`;
    }
