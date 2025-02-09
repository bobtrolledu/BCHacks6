
filepath = "/Users/ethanhayne/Desktop/Music/Gitar.wav"  # Ensure this file exists
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import os
from scipy.io import wavfile
from pydub import AudioSegment

#filepath = input() #always takes in string
print(f'Your File path is {filepath}')
# Load audio file

# Check file extension and load audio
file_ext = os.path.splitext(filepath)[1].lower()

if file_ext == ".wav":
    # Load WAV file
    sample_rate, audio_data = wavfile.read(filepath)

    # Convert stereo to mono if needed
    if audio_data.ndim == 2:
        audio_data = np.mean(audio_data, axis=1)

elif file_ext == ".mp3":
    # Load MP3 file using pydub
    audio = AudioSegment.from_mp3(filepath)
    sample_rate = int(audio.frame_rate)  # Ensure sample rate is an integer

    # Convert stereo to mono if needed
    if audio.channels == 2:
        audio = audio.set_channels(1)  # Convert to mono

    # Convert to NumPy array
    audio_data = np.array(audio.get_array_of_samples(), dtype=np.float32)

else:
    raise ValueError("Unsupported file format! Please use a WAV or MP3 file.")

# 3️⃣ Normalize MP3 audio (if loaded with pydub, it may be int16)
if file_ext == ".mp3":
    audio_data = audio_data / np.max(np.abs(audio_data))  # Normalize to range -1 to 1



# Plot audio waveform
plt.figure(figsize=(10, 4))


downsample_factor = 1  # Change this value to control resolution
plt.plot(
    np.arange(0, len(audio_data), downsample_factor) / sample_rate,
    audio_data[::downsample_factor]
)

time_axis = np.arange(len(audio_data)) / sample_rate
csv_filepath = "/Users/ethanhayne/Desktop/Music/audio_data.csv"  # Change path if needed
df = pd.DataFrame({'Time (s)': time_axis, 'Amplitude': audio_data})
df.to_csv(csv_filepath, index=False)
print(f"CSV file saved at: {csv_filepath}")

#plt.plot(np.arange(len(audio_data)) / sample_rate, audio_data)
plt.xlabel('Time (s)')
plt.ylabel('Amplitude')
plt.title('Audio Waveform')
plt.show()
print(audio_data.shape)
