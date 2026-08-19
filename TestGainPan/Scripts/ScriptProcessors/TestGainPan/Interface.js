Content.makeFrontInterface(500, 450);

const var pnlBackground = Content.addPanel("pnlBackground", 0, 0);
pnlBackground.set("width", 500);
pnlBackground.set("height", 450);
pnlBackground.set("bgColour", 0xFF15171B);
pnlBackground.set("opaque", true);
pnlBackground.set("saveInPreset", false);

const var lblTitle = Content.addLabel("lblTitle", 0, 24);
lblTitle.set("width", 500);
lblTitle.set("height", 32);
lblTitle.set("text", "TEST GAIN / PAN");
lblTitle.set("fontSize", 20);
lblTitle.set("textColour", 0xFFF0F0F0);
lblTitle.set("alignment", "centred");
lblTitle.set("saveInPreset", false);

const var knbVolume = Content.addKnob("knbVolume", 70, 100);
knbVolume.set("width", 160);
knbVolume.set("height", 210);
knbVolume.set("text", "VOLUME");
knbVolume.set("style", "Knob");
knbVolume.set("mode", "Decibel");
knbVolume.set("min", -60.0);
knbVolume.set("max", 6.0);
knbVolume.set("defaultValue", 0.0);
knbVolume.set("stepSize", 0.1);
knbVolume.set("showTextBox", true);
knbVolume.set("saveInPreset", true);

const var knbPan = Content.addKnob("knbPan", 270, 100);
knbPan.set("width", 160);
knbPan.set("height", 210);
knbPan.set("text", "PAN");
knbPan.set("style", "Knob");
knbPan.set("mode", "Pan");
knbPan.set("min", -100.0);
knbPan.set("max", 100.0);
knbPan.set("defaultValue", 0.0);
knbPan.set("stepSize", 1.0);
knbPan.set("showTextBox", true);
knbPan.set("saveInPreset", true);

const var lblStatus = Content.addLabel("lblStatus", 0, 370);
lblStatus.set("width", 500);
lblStatus.set("height", 24);
lblStatus.set("text", "VOLUME        PAN");
lblStatus.set("fontSize", 11);
lblStatus.set("textColour", 0xFF8F969F);
lblStatus.set("alignment", "centred");
lblStatus.set("saveInPreset", false);
