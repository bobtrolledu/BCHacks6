import librosa

def analyze_bpm(filepath):
    # 🔹 Ask for the file path


    try:
        # 🔹 Load Audio File
        y, sr = librosa.load(filepath, sr=None)  # Load with original sample rate

        # 🔹 Compute the Tempo (BPM)
        tempo, _ = librosa.beat.beat_track(y=y, sr=sr)

        # 🔹 Fix: Extract the first BPM value
        tempo_value = tempo[0]

        # 🔹 Print the BPM result
        print(f"Estimated BPM: {tempo_value:.2f} BPM")

        # 🔹 Return BPM value
        return tempo_value

    except Exception as e:
        print(f"Error processing the file: {e}")
        return None  # Return None if an error occurs
