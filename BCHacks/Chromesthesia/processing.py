import numpy as np
import os
import requests
from pydub import AudioSegment
from scipy.io import wavfile
from .BPM_detector import analyze_bpm
from mpl_toolkits.mplot3d import Axes3D

import matplotlib
matplotlib.use('Agg')  # Use non-GUI backend

import matplotlib.pyplot as plt


def process_audio(filepath):
    bpm = analyze_bpm(filepath)
    file_ext = os.path.splitext(filepath)[1].lower()

    if file_ext == ".wav":
        sample_rate, audio_data = wavfile.read(filepath)
        if audio_data.ndim == 2:
            audio_data = np.mean(audio_data, axis=1)
    elif file_ext == ".mp3":
        audio = AudioSegment.from_mp3(filepath)
        sample_rate = int(audio.frame_rate)
        if audio.channels == 2:
            audio = audio.set_channels(1)
        audio_data = np.array(audio.get_array_of_samples(), dtype=np.float32)
    else:
        raise ValueError("Unsupported file format!")

    if file_ext == ".mp3":
        audio_data = audio_data / np.max(np.abs(audio_data))

    fft_magnitude = np.abs(np.fft.fft(audio_data))[:len(audio_data) // 2]
    frequencies = np.fft.fftfreq(len(audio_data), 1 / sample_rate)[:len(audio_data) // 2]

    fft_magnitude = np.power(fft_magnitude, 0.3)
    fft_magnitude = fft_magnitude / np.max(fft_magnitude)

    num_points = min(10000, len(fft_magnitude))
    fft_magnitude = fft_magnitude[:num_points]

    theta = np.linspace(0, 15 * np.pi, num_points)
    r = np.linspace(0, 15, num_points)
    z_low = np.linspace(0, 3, num_points)
    z_high = fft_magnitude * 8 + 5

    blend_ratio = np.linspace(0, 1, num_points)
    z = z_low * (1 - blend_ratio) + z_high * blend_ratio

    x = r * np.cos(theta)
    y = r * np.sin(theta)

    fig = plt.figure(figsize=(20, 20))
    ax = fig.add_subplot(111, projection='3d')
    fig.patch.set_facecolor("black")
    ax.set_facecolor("black")
    ax.grid(False)
    ax.axis("off")

    colors = plt.cm.inferno(z / max(z)) if bpm > 100 else plt.cm.Blues(z / max(z))

    ax.scatter(x, y, z, c=colors, s=10, alpha=0.8)
    ax.set_xlim([-15, 15])
    ax.set_ylim([-15, 15])
    ax.set_zlim([2, 8])
    ax.view_init(elev=30, azim=50)

    image_path = os.path.join("media", f"fractal_{os.path.basename(filepath)}.png")
    plt.savefig(image_path, dpi=400, bbox_inches="tight", facecolor="black")
    plt.close()

    # Post image to /api/slates
    files = {"image": open(image_path, "rb")}
    data = {"description": f"Generated from {os.path.basename(filepath)}, BPM: {bpm}"}
    response = requests.post("http://localhost:8000/api/slates/", files=files, data=data)

    if response.status_code == 201:
        print(f"Image posted successfully: {response.json()}")
    else:
        print(f"Failed to post image: {response.text}")

    return image_path
