import Tone from "tone";
import { onUnmounted, ref } from "@vue/composition-api";

const songs = {
  connection: () => {
    const player = new Tone.Player("/assets/mp3/Alexander_Graham_Bell's_Voice.ogg.mp3").toMaster();
    player.autostart = true;

    return () => {
      player.dispose();
    }
  },
  c4: () => {
    Tone.Transport.bpm.value = 100;

    var notes = ['C4', 'C4'];
    var current_note = 0;

    var synth = new Tone.DuoSynth();
    var gain = new Tone.Gain(0.9);
    synth.connect(gain);
    gain.toMaster();

    synth.voice0.oscillator.type = 'triangle';
    synth.voice1.oscillator.type = 'triangle';

    Tone.Transport.scheduleRepeat(function (time) {
      var note = notes[current_note % notes.length];
      synth.triggerAttackRelease(note, '20n', time);
      current_note++;
    }, '20n');

    Tone.Transport.start();

    return () => {
      Tone.Transport.cancel();
      synth.dispose();
      gain.dispose();
    }
  },
  simplePlay: () => {
    var synth = new Tone.Synth().toMaster();
    synth.triggerAttackRelease("D4", "8n");

    return () => synth.dispose();
  }
}

const useSound = () => {
  const isPlaying = ref(false);
  const dispose = ref(null);

  const play = song => {
    isPlaying.value = true;
    dispose.value = songs[song]();
  }

  const stop = () => {
    if (isPlaying.value) {
      isPlaying.value = false;
      if (dispose.value) {
        dispose.value();
        // Tone.context.close();
        // Tone.context = new AudioContext();
      }
    }
  }

  onUnmounted(stop);
  return { play, stop, isPlaying };
};


export default useSound;