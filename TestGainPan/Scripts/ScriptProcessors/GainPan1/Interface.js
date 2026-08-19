Content.makeFrontInterface(700, 360);

// TestGainPan / HISE 4.1.0
// DSP is created in the Master Chain on initialisation.
// Audio flow: Input -> Volume -> Pan -> OutputMeter -> Output.

const var volumeFx = Synth.getEffect("Volume");
if(!isDefined(volumeFx))
    Synth.addEffect("SimpleGain", "Volume", -1);

const var panFx = Synth.getEffect("Pan");
if(!isDefined(panFx))
    Synth.addEffect("StereoFX", "Pan", -1);

const var outputMeter = Synth.getEffect("OutputMeter");
if(!isDefined(outputMeter))
    Synth.addEffect("Analyser", "OutputMeter", -1);

const var Volume = Content.addKnob("Volume", 72, 88);
Volume.set("width", 210);
Volume.set("height", 210);
Volume.set("text", "VOLUME");
Volume.set("min", -60.0);
Volume.set("max", 6.0);
Volume.set("defaultValue", 0.0);
Volume.set("stepSize", 0.1);
Volume.set("mode", "Decibel");
Volume.set("processorId", "Volume");
Volume.set("parameterId", "Gain");
Volume.set("saveInPreset", true);
Volume.set("isPluginParameter", true);
Volume.set("pluginParameterName", "Volume");

const var Pan = Content.addKnob("Pan", 322, 88);
Pan.set("width", 210);
Pan.set("height", 210);
Pan.set("text", "PAN");
Pan.set("min", -100.0);
Pan.set("max", 100.0);
Pan.set("defaultValue", 0.0);
Pan.set("stepSize", 1.0);
Pan.set("mode", "Pan");
Pan.set("processorId", "Pan");
Pan.set("parameterId", "Pan");
Pan.set("saveInPreset", true);
Pan.set("isPluginParameter", true);
Pan.set("pluginParameterName", "Pan");

const var Title = Content.addLabel("Title", 28, 18);
Title.set("width", 500);
Title.set("height", 30);
Title.set("text", "TEST GAIN / PAN");
Title.set("fontSize", 18);
Title.set("fontStyle", "bold");

const var Meter = Content.addPanel("Meter", 580, 62);
Meter.set("width", 92);
Meter.set("height", 260);
Meter.set("bgColour", 0xFF191C21);
Meter.set("opaque", true);
Meter.set("tooltip", "Stereo output peak");

Meter.setPaintRoutine(function(g)
{
    var h = this.getHeight();
    var levelL = Math.max(-60.0, Math.min(0.0, Engine.getDecibelsForGainFactor(Engine.getMasterPeakLevel(0))));
    var levelR = Math.max(-60.0, Math.min(0.0, Engine.getDecibelsForGainFactor(Engine.getMasterPeakLevel(1))));
    var normL = (levelL + 60.0) / 60.0;
    var normR = (levelR + 60.0) / 60.0;
    var meterH = h - 54;

    g.setColour(0xFF2A2E35);
    g.fillRect([12, 30, 24, meterH]);
    g.fillRect([56, 30, 24, meterH]);

    g.setColour(0xFF65D37E);
    g.fillRect([12, 30 + meterH * (1.0 - normL), 24, meterH * normL]);
    g.fillRect([56, 30 + meterH * (1.0 - normR), 24, meterH * normR]);

    g.setColour(0xFF9AA1AC);
    g.setFont("Arial", 11);
    g.drawAlignedText("L", [12, 8, 24, 16], "centred");
    g.drawAlignedText("R", [56, 8, 24, 16], "centred");
});

Meter.setTimerCallback(function()
{
    this.repaint();
});
Meter.startTimer(40);
