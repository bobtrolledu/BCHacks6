import numpy as np
import matplotlib.pyplot as plt
import os
from pydub.utils import which
from scipy.io import wavfile
from pydub import AudioSegment
from BPM_detector import analyze_bpm
from mpl_toolkits.mplot3d import Axes3D  # For 3D plotting

ffmpeg_path = which("ffmpeg")
if ffmpeg_path is None:
    ffmpeg_path = "C://ffmpeg//bin//fmeg.exe"
AudioSegment.converter=ffmpeg_path
# Filepath (Ensure this file exists)
filepath = "/Users/Anson/Downloads/Mozart - Lacrimosa.mp3"
print(f'Your File path is {filepath}')


bpm = analyze_bpm(filepath)

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

# Normalize MP3 audio (if loaded with pydub, it may be int16)
if file_ext == ".mp3":
    audio_data = audio_data / np.max(np.abs(audio_data))  # Normalize to range -1 to 1

# Compute FFT (Fourier Transform) to extract frequency information
fft_magnitude = np.abs(np.fft.fft(audio_data))[:len(audio_data) // 2]
frequencies = np.fft.fftfreq(len(audio_data), 1/sample_rate)[:len(audio_data) // 2]

# **🔹 Boosting Frequencies to Always Show Big Spikes**
fft_magnitude = np.power(fft_magnitude, 0.3)  # Exaggerate small values for prominent spikes
fft_magnitude = fft_magnitude / np.max(fft_magnitude)  # Normalize again after transformation

# Reduce number of points to improve performance
num_points = min(10000, len(fft_magnitude))  # Take first 10,000 points
fft_magnitude = fft_magnitude[:num_points]

# Generate 3D Spiral Coordinates
theta = np.linspace(0, 15 * np.pi, num_points)  # More spiral rotations
r = np.linspace(0, 15, num_points)  # Expand outward

# **🔹 Create Two Sections for z:**
# 1. Bottom Spiral: Linear increase from 0 to a base height
z_low = np.linspace(0, 3, num_points)

# 2. Top Part (Spikes): Use the FFT data for frequency spikes
z_high = fft_magnitude * 8 + 5  # Ensure spikes start above the base spiral

# Merge both parts smoothly
blend_ratio = np.linspace(0, 1, num_points)  # Smooth transition factor
z = z_low * (1 - blend_ratio) + z_high * blend_ratio  # Blended height

# Convert to Cartesian Coordinates for 3D spiral
x = r * np.cos(theta)
y = r * np.sin(theta)

# Create a 3D Plot
fig = plt.figure(figsize=(20, 20))
ax = fig.add_subplot(111, projection='3d')

# Set a black background
fig.patch.set_facecolor("black")  # Figure background
ax.set_facecolor("black")  # 3D axis background
ax.grid(False)
ax.axis("off")  # Remove axis lines

# Color mapping based on frequency intensity
if bpm > 150:
    colors = plt.cm.summer(z / max(z))
elif bpm > 100:
    colors = plt.cm.inferno(z / max(z))
elif bpm > 50:
    colors = plt.cm.twilight(z / max(z))  # Use plasma colormap for aesthetics
else:
    colors = plt.cm.Blues(z / max(z))
#viridis
#inferno
#magma
#coolwarm
#cividis
#turbo


# Scatter plot for spiral effect
ax.scatter(x, y, z, c=colors, s=50, alpha=0.1)  # Adjust point size & transparency
ax.scatter(x, y, z, c=colors, s=10, alpha=0.8)  # Adjust point size & transparency

# **🔹 Keep the Bottom as a Spiral, Keep the Top as Spikes**
ax.set_xlim([-15, 15])  # Crop X to zoom in
ax.set_ylim([-15, 15])  # Crop Y to zoom in
ax.set_zlim([2, 8])  # Adjust Z limit to accommodate both spiral and spikes

# **📸 Adjust Camera View for Zoom Effect**
ax.view_init(elev=30, azim=50)  # Slightly adjust angle for a natural zoom-in effect

# Styling
ax.set_xlabel("")
ax.set_ylabel("")
ax.set_zlabel("")
plt.title("3D Fractal Sound Spiral", fontsize=50, color="white", fontweight="bold")

# Save and Show
spiral_filepath = "../media/"
plt.savefig(spiral_filepath, dpi=400, bbox_inches="tight", facecolor="black")

plt.show()
#print(f"3D Fractal Sound Spiral saved at: {spiral_filepath}")