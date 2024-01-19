function displayCardDetails(card) {
    const cardDetailsContainer = document.getElementById('cardDetails');

    if (card) {
      const audioData = card.contents[0].audioFile.audio.data.data;
      const audioBlob = new Blob([new Uint8Array(audioData)], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);

      const audioPlayer = new Howl({
        src: [audioUrl],
        format: ['mp3'],
        html5: true
      });

      const audioElement = document.createElement('audio');
      audioElement.controls = true;
      audioElement.src = audioUrl;

      cardDetailsContainer.innerHTML = `
        <h2>${card.title}</h2>
        <p>Instructor: ${card.instructor}</p>
        <p>Length: ${card.length}</p>
        <p>Description: ${card.description}</p>
        <img src="${card.coverImage}" alt="Cover Image" style="max-width: 100%; border-radius: 8px; margin-top: 10px;">
        <h3>Audio Content: ${card.contents[0].title} style="width : 20% ; height:20px;"</h3>
      `;

      cardDetailsContainer.appendChild(audioElement);
    } else {
      cardDetailsContainer.innerHTML = '<p>Card not found.</p>';
    }
  }

  let card = JSON.parse(localStorage.getItem("single"));

  displayCardDetails(card);