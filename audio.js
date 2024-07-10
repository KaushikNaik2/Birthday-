const recordButton = document.getElementById('record-button');
const stopButton = document.getElementById('stop-button');
const recordingStatus = document.getElementById('recording-status');

let recorder, recordingBlob;

recordButton.addEventListener('click', () => {
  if (recorder) { // Stop recording if already started
    stopRecording();
  } else {
    startRecording();
  }
});

stopButton.addEventListener('click', stopRecording);

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      recorder = new MediaRecorder(stream);
      recordingBlob = [];
      recorder.ondataavailable = e => recordingBlob.push(e.data);
      recorder.start();
      recordingStatus.textContent = 'Recording...';
      recordButton.textContent = 'Stop Recording';
      stopButton.disabled = false;
    })
    .catch(error => {
      console.error('Error accessing microphone:', error);
      recordingStatus.textContent = 'Error accessing microphone. Please check that your microphone is connected and try again.';
    });
}

function stopRecording() {
  if (recorder) {
    recorder.stop();
    recordingStatus.textContent = 'Recording stopped.';
    recordButton.textContent = 'Start Recording';
    stopButton.disabled = true;
    const blob = new Blob(recordingBlob, { type: 'audio/webm' }); // Adjust type if needed
    // Send recording to email (new function)
    sendEmail(blob);
  }
}

function sendEmail(blob) {
  const emailData = {
    // Replace with your email address and any additional data
    to: 'dummywashigh1@gmail.com',
    subject: 'Client Response Recording',
    body: 'This email contains a recorded audio response from a client.',
    attachment: {
      filename: 'client_response.webm', // Adjust filename and extension
      data: blob,
    },
  };

  // Use an email sending service API or library here
  // This example demonstrates the data structure but doesn't implement sending functionality
  console.log('Email data:', emailData);
}