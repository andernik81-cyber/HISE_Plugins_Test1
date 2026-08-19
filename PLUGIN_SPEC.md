# Plugin Specification — Test Gain Pan Meter

## 1. Назначение

Первый простой стерео FX-плагин для проверки полного workflow HISE + GitHub + AI.

Плагин принимает стереосигнал, позволяет управлять общей громкостью и стерео-панорамой и показывает выходной уровень справа.

## 2. Audio flow

`Input Stereo → Volume → Pan → Output Meter → Output Stereo`

## 3. Parameters

### Volume

- Stable ID: `volume`
- Type: continuous
- Range: `-60 dB ... +6 dB`
- Default: `0 dB`
- Step: `0.1 dB`
- Display: dB
- Double click: reset to `0 dB`
- Mouse wheel: enabled
- Automation: enabled
- Host parameter name: `Volume`

### Pan

- Stable ID: `pan`
- Type: continuous
- Range: `-100 ... +100`
- Default: `0`
- Step: `1`
- Display: clear left / center / right representation
- Double click: reset to center
- Mouse wheel: enabled
- Automation: enabled
- Host parameter name: `Pan`

## 4. Output meter

Справа интерфейса — стерео output level meter.

Requirements:

- Left and Right channels shown separately.
- Meter follows the actual output signal after Volume and Pan.
- Visual range approximately `-60 dB ... 0 dBFS`.
- Peak-oriented indication.
- Meter is display-only.
- Meter must NOT be registered as a plugin parameter.

The concrete HISE meter / analyser component must be chosen from the current HISE version and verified against its documentation. Do not invent component APIs.

## 5. UI

Base size: `700 x 360 px`.

Composition:

- Top title: `TEST GAIN / PAN`
- Large `VOLUME` knob on the left / centre-left
- `PAN` knob next to it
- Vertical stereo output meter on the right
- Optional small value/status row at the bottom

Visual direction:

- Dark
- Minimal
- Modern
- Clean typography
- No unnecessary decoration
- Clear parameter names and values

## 6. Behaviour

### Volume

Controls overall output gain.

### Pan

Controls stereo balance after Volume.

### Meter

Shows the resulting stereo output level immediately before the plugin output.

## 7. First milestone

Before visual polish, the project must satisfy:

1. Opens correctly in HISE.
2. GUI loads correctly.
3. Volume changes audio level.
4. Pan changes stereo balance.
5. Meter reacts to the processed output.
6. Volume and Pan are saved with the preset.
7. Volume and Pan are exposed as plugin parameters.
8. Plugin parameter validation passes in the current HISE workflow.

## 8. Out of scope for milestone 1

- Preset browser
- Oversampling
- Saturation
- Limiter
- Sidechain
- MIDI
- Custom SVG skin
- Complex animation
- Extra DSP features

## 9. Design principle

Keep this project deliberately small. It is the reference project for our future HISE plugin workflow, so stability and understandable structure are more important than feature count.
