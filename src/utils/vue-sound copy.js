import Tone from "tone";
import { onUnmounted } from "@vue/composition-api";

const customPlay = () => {
  // Tone.context.close();
  // Tone.context = new AudioContext();
  // Tone.Transport.bpm.value = 100;

  // var notes = ['C4', 'E4', 'G4', 'B4'];
  // var current_note = 0;

  // // http://tonejs.org/docs/#DuoSynth
  // var synth = new Tone.DuoSynth();
  // var gain = new Tone.Gain(0.5);
  // synth.connect(gain);
  // gain.toMaster();

  // synth.voice0.oscillator.type = 'triangle';
  // synth.voice1.oscillator.type = 'triangle';

  // Tone.Transport.scheduleRepeat(function (time) {
  //   var note = notes[current_note % notes.length];
  //   synth.triggerAttackRelease(note, '16n', time);
  //   current_note++;
  // }, '16n');

  // // start the repeat
  // Tone.Transport.start();
}

const useSound = () => {
  const synth = new Tone.Synth().toMaster();
  onUnmounted(() => synth.dispose());

  const play = song => {
    customPlay();
  }

  const stop = () => {
    Tone.context.close();
    Tone.context = new AudioContext();
  }

  return { play, stop };
};


export default useSound;