Content.makeFrontInterface(700, 360);

// TestGainPan - HISE 4.1.0
// Creates the small stereo Gain / Pan FX architecture on first compile.
// Volume and Pan are UI plugin parameters.

const var existingVolume = Synth.getEffect("Volume");
if(!isDefined(existingVolume))
    Synth.addEffect("SimpleGain", "Volume", -1);

const var existingPan = Synth.getEffect("Pan");
if(!isDefined(existingPan))
    Synth.addEffect("StereoFX", "Pan", -1);

const var existingMeter = Synth.getEffect("OutputMeter");
if(!isDefined(existingMeter))
    Synth.addEffect("Analyser", "OutputMeter", -1);

const var VolumeFX = Synth.getEffect("Volume");
const var PanFX = Synth.getEffect("Pan");
const var MeterFX = Synth.getEffect("OutputMeter");

// Background
const var Background = Content.addPanel("Background", 0, 0);
Background.set("width", 700);
Background.set("height", 360);
Background.set("bgColour", 0xFF111317);
Background.set("opaque", true);

// Title
const var Title = Content.addLabel("Title", 28, 20);
Title.set("width", 500);
Title.set("height", 28);
Title.set("text", "TEST GAIN / PAN");
Title.set("fontSize", 18);
Title.set("fontStyle", "bold");
Title.set("textColour", 0xFFE8E8E8);

// Volume knob
const var Volume = Content.addKnob("Volume", 65, 82);
Volume.set("width", 220);
Volume.set("height", 220);
Volume.set("text", "VOLUME");
Volume.set("min", -60.0);
Volume.set("max", 6.0);
Volume.set("defaultValue", 0.0);
Volume.set("stepSize", 0.1);
Volume.set("mode", "Decibel");
Volume.set("isPluginParameter", true);
Volume.set("pluginParameterName", "Volume");
Volume.set("saveInPreset", true);
Volume.set("processorId", "Volume");
Volume.set("parameterId", "Gain");
Volume.set("textColour", 0xFFE8E8E8);

// Pan knob
const var Pan = Content.addKnob("Pan", 315, 82);
Pan.set("width", 220);
Pan.set("height", 220);
Pan.set("text", "PAN");
Pan.set("min", -100.0);
Pan.set("max", 100.0);
Pan.set("defaultValue", 0.0);
Pan.set("stepSize", 1.0);
Pan.set("mode", "Pan");
Pan.set("isPluginParameter", true);
Pan.set("pluginParameterName", "Pan");
Pan.set("saveInPreset", true);
Pan.set("processorId", "Pan");
Pan.set("parameterId", "Pan");
Pan.set("textColour", 0xFFE8E8E8);

// Output meter: display only, not a plugin parameter.
const var Meter = Content.addPanel("Meter", 585, 72);
Meter.set("width", 82);
Meter.set("height", 250);
Meter.set("bgColour", 0xFF191C21);
Meter.set("opaque", true);
Meter.set("tooltip", "Stereo output peak");

Meter.setPaintRoutine(function(g)
{
    var w = this.getWidth();
    var h = this.getHeight();
    var left = Math.max(-60.0, Math.min(0.0, Engine.getValueForMode(MeterFX.getCurrentLevel(true), "Decibel")));
    var right = Math.max(-60.0, Math.min(0.0, Engine.getValueForMode(MeterFX.getCurrentLevel(false), "Decibel")));
    var leftNorm = (left + 60.0) / 60.0;
    var rightNorm = (right + 60.0) / 60.0;

    g.setColour(0xFF2A2E35);
    g.fillRect([10, 26, 24, h - 52]);
    g.fillRect([48, 26, 24, h - 52]);

    g.setColour(0xFF65D37E);
    g.fillRect([10, 26 + (h - 52) * (1.0 - leftNorm), 24, (h - 52) * leftNorm]);
    g.fillRect([48, 26 + (h - 52) * (1.0 - rightNorm), 24, (h - 52) * rightNorm]);

    g.setColour(0xFF7F8792);
    g.setFont("Arial", 11);
    g.drawAlignedText("L", [10, 6, 24, 16], "centred");
    g.drawAlignedText("R", [48, 6, 24, 16], "centred");
});

Meter.setTimerCallback(function()
{
    this.repaint();
});
Meter.startTimer(40);

// Keep the parameter ranges explicit and stable for HISE / host automation.
Volume.set("processorId", "Volume");
Volume.set("parameterId", "Gain");
Pan.set("processorId", "Pan");
Pan.set("parameterId", "Pan");
