
let screen = "intro";
let scenario = "";
let stage = 0;
let completed = [false, false, false, false, false, false];
let message = "";
let messageGood = true;
let dragging = false;

let viewOffsetX = 0;
let viewOffsetY = 0;

let dragOffsetX = 0;
let dragOffsetY = 0;

let fitScale = 1;
let zoom = 1;
let minZoom = 1;
let maxZoom = 2.5;

let lastPinchDistance = 0;
let pinchZooming = false;
let panOffsetX = 0;
let panOffsetY = 0;

let pinchAnchorX = 0;
let pinchAnchorY = 0;
let sample = { x: 130, y: 490, w: 72, h: 118 };

const steps = [
  {
    title: "01 | WATER SAMPLE COLLECTION",
    instruction: "Drag the water sample to the highlighted station.",
    detail: "Verify the sample identity and traceability.",
    target: "SAMPLE RECEIVING",
    tx: 330, ty: 350
  },
  {
    title: "02 | SAMPLE PREPARATION",
    instruction: "Drag the sample to the preparation station.",
    detail: "Preparation follows the selected validated method.",
    target: "SAMPLE PREPARATION",
    tx: 510, ty: 350
  },
  {
    title: "03 | PRE-ENRICHMENT",
    instruction: "Drag the sample to the pre-enrichment station.",
    detail: "Recovery of stressed cells may be supported at this stage.",
    target: "PRE-ENRICHMENT",
    tx: 510, ty: 350
  },
  {
    title: "04 | SELECTIVE ENRICHMENT",
    instruction: "Drag the sample to the selective enrichment station.",
    detail: "Selective conditions help favor recovery of the target.",
    target: "SELECTIVE ENRICHMENT",
    tx: 700, ty: 350
  },
  {
    title: "05 | SELECTIVE PLATING",
    instruction: "Drag the sample to the plating work area.",
    detail: "Suspect colonies require further investigation.",
    target: "SELECTIVE PLATING",
    tx: 700, ty: 350
  },
  {
    title: "06 | CONFIRMATION",
    instruction: "Drag the sample to the confirmation station.",
    detail: "Colony appearance alone cannot confirm Salmonella.",
    target: "CONFIRMATION",
    tx: 330, ty: 350
  }
];

const explanations = [
  {
    heading: "WHY COLLECT THE SAMPLE?",
    body: "Collect and identify the water sample using an appropriate approved procedure. Correct labeling, handling and traceability help preserve sample integrity."
  },
  {
    heading: "WHY PREPARE THE SAMPLE?",
    body: "Preparation depends on the water type and validated method. Where appropriate, concentration can improve the chance of recovering microorganisms present in low numbers."
  },
  {
    heading: "WHY PRE-ENRICH?",
    body: "A suitable non-selective recovery stage can help stressed target cells recover before selective steps, when required by the chosen method."
  },
  {
    heading: "WHY SELECTIVE ENRICHMENT?",
    body: "Selective media or conditions help favor recovery of the target organism among competing microorganisms. This stage is not final confirmation."
  },
  {
    heading: "WHY USE SELECTIVE AGAR?",
    body: "XLD and a complementary medium help identify suspect colonies for further testing. Colony appearance alone cannot confirm Salmonella."
  },
  {
    heading: "WHY CONFIRM THE RESULT?",
    body: "Appropriate biochemical and/or serological tests help establish identity. Interpret all relevant evidence before issuing a final report."
  }
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Arial");
}

function draw() {
  background("#dce8e6");

fitScale = min(width / 1100, height / 700);

let totalScale = fitScale * zoom;

viewOffsetX = (width - 1100 * totalScale) / 2 + panOffsetX;
viewOffsetY = (height - 700 * totalScale) / 2 + panOffsetY;

push();
translate(viewOffsetX, viewOffsetY);
scale(totalScale);
  drawRoom();

  if (screen === "intro") {
    drawIntro();
  } else if (screen === "theory") {
    drawTheory();
  } else if (screen === "scenario") {
    drawScenario();
  } else if (screen === "lab") {
    drawLab();
  } else if (screen === "report") {
    drawFinalReport();
  }

  pop();
}


function drawRoom() {
  background("#dce8e6");

  noStroke();
  fill("#e2ece9");
  rect(0, 0, width, 455);

  fill("#c5d6d4");
  rect(0, 455, width, 245);

  stroke("#b5c9c7");
  strokeWeight(1);

  for (let x = 0; x < width; x += 55) {
    line(x, 455, x - 40, 700);
  }

  for (let y = 485; y < 700; y += 40) {
    line(0, y, width, y);
  }

  noStroke();

  // Laboratory window
  fill("#a6c5c8");
  rect(45, 75, 240, 155, 8);

  fill("#d0e9e9");
  rect(54, 84, 222, 137, 4);

  fill("#f4f4dc");
  circle(230, 115, 24);

  fill("#b3d1d0");
  triangle(54, 204, 120, 140, 176, 204);
  triangle(128, 204, 205, 150, 276, 204);

  stroke("#94b0b1");
  strokeWeight(5);
  line(165, 85, 165, 220);
  line(55, 154, 275, 154);
  noStroke();

  // Shelves
  fill("#9eb5b4");
  rect(350, 115, 330, 10, 4);
  rect(350, 200, 330, 10, 4);

  for (let i = 0; i < 5; i++) {
    let x = 370 + i * 60;
    fill(["#87b7b8", "#c8d9c9", "#e0c58f", "#a1bfd0", "#b5c8bc"][i]);
    rect(x, 78, 30, 35, 5);

    fill("#e9f3ed");
    rect(x + 5, 83, 20, 7, 3);

    fill("#819e9f");
    rect(x + 4, 160, 23, 36, 5);

    fill("#d8ece8");
    rect(x + 8, 168, 15, 7, 2);
  }

  // Storage cabinet
  fill("#b6c9c7");
  rect(830, 75, 220, 260, 8);

  fill("#cedbd7");
  rect(841, 87, 198, 236, 5);

  stroke("#a0b7b5");
  strokeWeight(2);
  line(940, 90, 940, 320);
  noStroke();

  for (let y of [145, 205, 265]) {
    fill("#91acab");
    rect(927, y, 6, 20, 3);
    rect(947, y, 6, 20, 3);
  }

  // Laboratory bench
  fill(30, 65, 68, 25);
  rect(50, 420, 1000, 32, 8);

  fill("#668587");
  rect(45, 410, 1010, 28, 6);

  fill("#a9bfbd");
  rect(60, 438, 980, 92, 5);

  for (let i = 0; i < 6; i++) {
    fill("#91aaaa");
    rect(75 + i * 160, 450, 135, 65, 5);

    fill("#d3dfda");
    rect(130 + i * 160, 462, 20, 4, 2);
  }

  fill("#f4f4e6");
  rect(410, 34, 280, 12, 6);
}

function overlay() {
  noStroke();
  fill(9, 29, 43, 215);
  rect(0, 0, width, height);
}

function drawIntro() {
  overlay();

  textAlign(CENTER, CENTER);
  textStyle(BOLD);

  fill("#e8f4f7");
  textSize(16);
  text("VETERINARY VIRTUAL LAB", 550, 160);

  fill("#ffffff");
  textSize(47);
  text("SALMONELLA", 550, 220);

  fill("#58d5c3");
  text("DETECTIVE", 550, 274);

  textStyle(NORMAL);
  fill("#d7e6e9");
  textSize(17);
  text("Detection of Salmonella in Water", 550, 319);

  button(435, 365, 230, 52, "ENTER OUR SECRET LAB", true);

  drawCredits(550, 455);

  fill("#b8cbd0");
  textStyle(NORMAL);
  textSize(11);
  text("EDUCATIONAL SIMULATION • NO REAL SAMPLE TESTING", 550, 595);

  textAlign(LEFT, CENTER);
}

function drawCredits(centerX, topY) {
  textAlign(CENTER, CENTER);
  textStyle(BOLD);

  fill("#58d5c3");
  textSize(16);
  text("SECTION : 5", centerX, topY);

  fill("#e4edf0");
  textSize(15);
  text("SENIOR 2027  ♥", centerX, topY + 30);

  fill("#e4edf0");
  textSize(15);
  text("VET 28 PROGRAM  ♥", centerX, topY + 59);

  fill("#58d5c3");
  textSize(13);
  text("MADE BY FUTURE DOCTORS", centerX, topY + 89);

  textStyle(NORMAL);
}

function drawTheory() {
  overlay();

  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  fill("#58d5c3");
  textSize(27);
  text("VETERINARY BACKGROUND", 550, 70);

  fill("#ffffff");
  textSize(16);
  text("Why do we investigate water for Salmonella?", 550, 108);

  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(13);
  fill("#58d5c3");
  text("SCIENTIFIC BACKGROUND", 100, 145);

  textStyle(NORMAL);
  textSize(12);
  fill("#e5eef0");
  text(
    "Salmonella is a group of bacteria that can cause salmonellosis in humans and animals. Contaminated water may act as a route of transmission.",
    100, 168, 900, 45
  );

  textStyle(BOLD);
  fill("#58d5c3");
  text("VETERINARY IMPORTANCE", 100, 232);

  textStyle(NORMAL);
  fill("#e5eef0");
  text(
    "Water-quality investigation supports animal health, public health, hygiene and disease prevention. It helps identify potential contamination that may require further action.",
    100, 255, 900, 45
  );

  textStyle(BOLD);
  fill("#58d5c3");
  text("AIM OF THE EXPERIMENT", 100, 319);

  textStyle(NORMAL);
  fill("#e5eef0");
  text(
    "To demonstrate the main stages used to investigate a water sample for possible Salmonella contamination, from collection to confirmatory testing and reporting.",
    100, 342, 900, 45
  );

  fill("#f2d7a0");
  textStyle(BOLD);
  text("IMPORTANT NOTE", 100, 406);

  fill("#f4e8cc");
  textStyle(NORMAL);
  text(
    "This virtual lab uses fictional results. Real testing requires a validated method, appropriate controls and interpretation of confirmatory evidence. A negative result alone does not prove water is safe.",
    100, 429, 900, 55
  );

  textAlign(CENTER, CENTER);
  button(405, 540, 290, 48, "CHOOSE YOUR SCENARIO", true);

  textAlign(LEFT, CENTER);
}

function drawScenario() {
  overlay();

  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  fill("#ffffff");
  textSize(29);
  text("CHOOSE YOUR LAB SCENARIO", 550, 175);

  textStyle(NORMAL);
  textSize(14);
  fill("#d4e3e8");
  text("Choose a fictional outcome before starting the investigation.", 550, 216);

  fill("#d7f1e7");
  rect(180, 270, 340, 165, 16);

  fill("#236e60");
  textStyle(BOLD);
  textSize(21);
  text("POSITIVE SCENARIO", 350, 310);

  textStyle(NORMAL);
  textSize(13);
  text("Confirmation supports Salmonella", 350, 349);
  text("in this simulated sample.", 350, 372);

  textStyle(BOLD);
  textSize(10);
  text("CLICK TO SELECT", 350, 408);

  fill("#e2edf6");
  rect(580, 270, 340, 165, 16);

  fill("#315c83");
  textStyle(BOLD);
  textSize(21);
  text("NEGATIVE SCENARIO", 750, 310);

  textStyle(NORMAL);
  textSize(13);
  text("Confirmation does not detect", 750, 349);
  text("Salmonella in this simulated sample.", 750, 372);

  textStyle(BOLD);
  textSize(10);
  text("CLICK TO SELECT", 750, 408);

  fill("#d4e3e8");
  textStyle(NORMAL);
  textSize(12);
  text("Training simulation only — not a real water-quality result.", 550, 480);

  textAlign(LEFT, CENTER);
}

function drawLab() {
  noStroke();
  fill("#193b49");
  rect(0, 0, width, 62);

  fill("#58d5c3");
  circle(29, 31, 13);

  fill("#ffffff");
  textStyle(BOLD);
  textSize(17);
  text("SALMONELLA DETECTIVE", 48, 31);

  fill("#d2e4e7");
  textStyle(NORMAL);
  textSize(10);
  text("VIRTUAL WATER SAMPLE WORKFLOW", 335, 31);

  let count = completed.filter(Boolean).length;

  fill("#345a65");
  rect(850, 22, 200, 18, 9);

  fill("#58d5c3");
  rect(850, 22, 200 * count / 6, 18, 9);

  fill("#ffffff");
  textAlign(CENTER, CENTER);
  textSize(10);
  text(count + " / 6 STAGES", 950, 31);

  let s = steps[stage];

  textAlign(LEFT, CENTER);
  fill("#193b49");
  textStyle(BOLD);
  textSize(15);
  text(s.title, 330, 88);

  fill("#355c64");
  textStyle(NORMAL);
  textSize(11);
  text(s.instruction, 330, 113);

  fill("#5c7a7d");
  textSize(10);
  text(s.detail, 330, 135);

  // Station areas
  drawStation(330, 350, "SAMPLE RECEIVING", stage === 0);
  drawStation(510, 350, "SAMPLE PREPARATION", stage === 1);
  drawStation(510, 350, "PRE-ENRICHMENT", stage === 2);
  drawStation(700, 350, "SELECTIVE ENRICHMENT", stage === 3);
  drawStation(700, 350, "SELECTIVE PLATING", stage === 4);
  drawStation(330, 350, "CONFIRMATION", stage === 5);

  drawInstrument(565, 265, "PREP");
  drawInstrument(755, 265, "SELECTIVE");
  drawInstrument(365, 265, "CONFIRM");

  drawPlate(780, 520, "#e1c4a3", "XLD");
  drawPlate(885, 520, "#c8d9c7", "COMPLEMENT");

  drawRecord(350, 550, completed[0]);
  drawComputer(925, 270);

  // Explanatory panel
  drawStageExplanation(stage);

  // Draggable sample
  drawBottle(sample.x, sample.y, completed[stage]);

  if (stage === 5) drawConfirmationNote();

  if (message) drawMessage(message, messageGood);

  noStroke();
  fill("#193b49");
  rect(0, 648, width, 52);

  fill("#d3e5e6");
  textSize(10);
  text("SIMULATED TRAINING ONLY • Follow the approved method for real samples.", 20, 674);

  if (stage > 0) button(790, 658, 85, 32, "BACK", false);

  button(
    885, 658, 190, 32,
    stage === 5 ? "FINAL REPORT" : "NEXT STAGE",
    true
  );

  textStyle(NORMAL);
}

function drawStageExplanation(i) {
  let item = explanations[i];

  noStroke();
  fill("#f3f5eb");
  rect(25, 165, 275, 220, 12);

  fill("#236e60");
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(12);
  text(item.heading, 40, 183, 245, 35);

  fill("#34565b");
  textStyle(NORMAL);
  textSize(12);
  text(item.body, 40, 225, 245, 132);

  fill("#6b8586");
  textSize(9);
  text("EDUCATIONAL SIMULATION", 40, 360);

  textAlign(LEFT, CENTER);
}

function drawStation(x, y, label, active) {
  noStroke();
  fill(25, 65, 68, 22);
  ellipse(x + 85, y + 100, 175, 20);

  fill(active ? "#d2eee6" : "#cbdcd7");
  rect(x, y, 170, 95, 12);

  noFill();
  stroke(active ? "#269d8c" : "#a1b8b4");
  strokeWeight(active ? 3 : 1.5);
  rect(x + 7, y + 7, 156, 81, 9);
  noStroke();

  fill(active ? "#24796f" : "#54777a");
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(9);
  text(label, x + 85, y + 70);

  textAlign(LEFT, CENTER);
  textStyle(NORMAL);
}

function drawBottle(x, y, received) {
  noStroke();
  fill(30, 60, 60, 25);
  ellipse(x + 35, y + 115, 80, 15);

  fill("#416d74");
  rect(x + 22, y, 28, 16, 4);

  fill("#d5eeea");
  stroke("#80aaa8");
  strokeWeight(2);
  rect(x + 25, y + 13, 22, 20, 4);
  rect(x + 8, y + 29, 56, 78, 11);
  noStroke();

  fill("#9dd6cd");
  rect(x + 12, y + 62, 48, 39, 7);

  fill("#ffffff");
  rect(x + 15, y + 39, 5, 19, 2);

  fill("#f7f3df");
  rect(x + 13, y + 45, 46, 25, 3);

  fill("#34545a");
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(7);
  text("WATER SAMPLE", x + 36, y + 53);
  text("ID W-027", x + 36, y + 62);

  if (received) {
    fill("#299b88");
    circle(x + 58, y + 34, 16);

    fill("#ffffff");
    textSize(10);
    text("✓", x + 58, y + 34);
  }

  textAlign(LEFT, CENTER);
  textStyle(NORMAL);
}

function drawRecord(x, y, registered) {
  noStroke();
  fill("#f7f3df");
  stroke("#a6bdb5");
  rect(x, y, 112, 43, 4);
  noStroke();

  fill("#31545b");
  textStyle(BOLD);
  textSize(8);
  text("SAMPLE RECORD", x + 7, y + 10);

  textStyle(NORMAL);
  textSize(7);
  text("ID: W-027", x + 7, y + 23);
  text("SOURCE: WATER", x + 7, y + 33);

  if (registered) {
    fill("#258d7d");
    textStyle(BOLD);
    textSize(8);
    text("REGISTERED ✓", x + 5, y + 56);
  }

  textStyle(NORMAL);
}

function drawInstrument(x, y, label) {
  noStroke();
  fill("#718f91");
  rect(x, y, 110, 80, 8);

  fill("#d7e5df");
  rect(x + 8, y + 8, 94, 56, 5);

  fill("#204854");
  rect(x + 15, y + 15, 80, 34, 4);

  fill("#63d5be");
  circle(x + 24, y + 25, 5);

  fill("#d7eee7");
  rect(x + 34, y + 24, 49, 3, 2);
  rect(x + 34, y + 33, 40, 3, 2);
  rect(x + 34, y + 41, 46, 3, 2);

  fill("#31545c");
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(8);
  text(label, x + 55, y + 94);

  textAlign(LEFT, CENTER);
  textStyle(NORMAL);
}

function drawPlate(x, y, color, label) {
  noStroke();
  fill(30, 60, 60, 25);
  ellipse(x + 35, y + 22, 75, 18);

  fill("#eff5ef");
  stroke("#8eaaa5");
  strokeWeight(2);
  ellipse(x + 35, y + 15, 70, 27);

  noStroke();
  fill(color);
  ellipse(x + 35, y + 15, 55, 17);

  fill("#375b60");
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(8);
  text(label, x + 35, y + 42);

  textAlign(LEFT, CENTER);
  textStyle(NORMAL);
}

function drawComputer(x, y) {
  noStroke();
  fill("#607e83");
  rect(x, y, 118, 78, 7);

  fill("#d8e7df");
  rect(x + 6, y + 6, 106, 65, 4);

  fill("#173f4b");
  rect(x + 11, y + 11, 96, 54, 3);

  fill("#58d5c3");
  textStyle(BOLD);
  textSize(8);
  text("LAB REPORT", x + 19, y + 21);

  stroke("#9ac9c1");
  strokeWeight(1);
  line(x + 19, y + 30, x + 98, y + 30);
  line(x + 19, y + 38, x + 90, y + 38);
  line(x + 19, y + 46, x + 94, y + 46);
  noStroke();

  fill("#8da5a7");
  quad(x + 49, y + 78, x + 69, y + 78, x + 78, y + 94, x + 40, y + 94);

  fill("#607e83");
  rect(x + 29, y + 94, 60, 6, 3);
}

function drawConfirmationNote() {
  noStroke();
  fill("#eff5ef");
  rect(510, 455, 535, 145, 10);

  fill("#244f59");
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  textSize(12);
  text("SIMULATED CONFIRMATION RESULTS", 530, 477);

  fill("#355b60");
  textStyle(NORMAL);
  textSize(10);

  if (scenario === "positive") {
    text("Biochemical profile: consistent with Salmonella", 530, 503);
    text("Serological confirmation: supportive in this scenario", 530, 525);

    fill("#258b79");
    textStyle(BOLD);
    text("SCENARIO OUTCOME: CONFIRMED POSITIVE", 530, 555);
  } else {
    text("Biochemical profile: not supportive of Salmonella", 530, 503);
    text("Serological confirmation: not supportive in this scenario", 530, 525);

    fill("#315f91");
    textStyle(BOLD);
    text("SCENARIO OUTCOME: NOT DETECTED", 530, 555);
  }

  fill("#55757a");
  textStyle(NORMAL);
  textSize(9);
  text("Fictional training results — not real laboratory data.", 530, 578);
}

function drawMessage(msg, good) {
  noStroke();
  fill(good ? "#d7f1e7" : "#f8e7d4");
  rect(330, 165, 500, 35, 9);

  fill(good ? "#236e60" : "#89562a");
  textAlign(CENTER, CENTER);
  textSize(11);
  text(msg, 580, 182);

  textAlign(LEFT, CENTER);
}

function drawFinalReport() {
  overlay();

  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  fill("#ffffff");
  textSize(31);
  text("FINAL LABORATORY REPORT", 550, 145);

  if (scenario === "positive") {
    fill("#d7f1e7");
    rect(230, 205, 640, 110, 14);

    fill("#236e60");
    textSize(24);
    text("CONFIRMED POSITIVE", 550, 243);

    textStyle(NORMAL);
    textSize(12);
    text("Simulated confirmation supports Salmonella in this scenario.", 550, 279);
  } else {
    fill("#e2edf6");
    rect(230, 205, 640, 110, 14);

    fill("#315c83");
    textSize(23);
    text("SALMONELLA NOT DETECTED", 550, 243);

    textStyle(NORMAL);
    textSize(12);
    text("Not detected in this fictional scenario using the simulated method.", 550, 279);
  }

  fill("#d4e3e8");
  textSize(12);
  text("This is a fictional educational result, not a real water test.", 550, 355);
  text("A negative result alone does not prove water is safe.", 550, 382);

  drawCredits(550, 435);

  button(450, 590, 200, 45, "RESTART LAB", true);

  textAlign(LEFT, CENTER);
}

function button(x, y, w, h, label, primary) {
  noStroke();
  fill(primary ? "#299d8d" : "#456c74");
  rect(x, y, w, h, h / 2);

  fill("#ffffff");
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(11);
  text(label, x + w / 2, y + h / 2);

  textAlign(LEFT, CENTER);
  textStyle(NORMAL);
}

function inside(px, py, x, y, w, h) {
  return px >= x && px <= x + w &&
         py >= y && py <= y + h;
}



function mousePressed() {
  let mx = logicalMouseX();
  let my = logicalMouseY();
  if (screen === "intro") {
    if (inside(mx, my, 435, 365, 230, 52)) {
      screen = "theory";
    }
    return;
  }

  if (screen === "theory") {
    if (inside(mx, my, 405, 540, 290, 48)) {
      screen = "scenario";
    }
    return;
  }

  if (screen === "scenario") {
    if (inside(mx, my, 180, 270, 340, 165)) {
      startInvestigation("positive");
    } else if (inside(mx, my, 580, 270, 340, 165)) {
      startInvestigation("negative");
    }
    return;
  }

  if (screen === "report") {
    if (inside(mx, my, 450, 590, 200, 45)) {
      restartLab();
    }
    return;
  }

  if (screen !== "lab") return;

  if (inside(mx, my, 790, 658, 85, 32) && stage > 0) {
    stage--;
    sample.x = 130;
    sample.y = 490;
    message = "";
    return;
  }

  if (inside(mx, my, 885, 658, 190, 32)) {
    nextStage();
    return;
  }

  if (inside(mx, my, sample.x - 8, sample.y - 8, 82, 130)) {
  dragging = true;
dragOffsetX = mx - sample.x;
dragOffsetY = my - sample.y;
  }
}


function mouseDragged() {
  if (dragging && screen === "lab") {
    sample.x = logicalMouseX() - dragOffsetX;
    sample.y = logicalMouseY() - dragOffsetY;
  }
}

function mouseReleased() {
  if (!dragging || screen !== "lab") return;

  dragging = false;

  let s = steps[stage];
  let cx = sample.x + sample.w / 2;
  let cy = sample.y + sample.h / 2;

  if (inside(cx, cy, s.tx, s.ty, 170, 95)) {
    completed[stage] = true;
    message = "Stage completed in the educational simulation.";
    messageGood = true;
  } else {
    sample.x = 130;
    sample.y = 490;
    message = "Drop the sample inside the highlighted station.";
    messageGood = false;
  }
}


function startInvestigation(selectedScenario) {
  scenario = selectedScenario;
  screen = "lab";
  stage = 0;
  completed = [false, false, false, false, false, false];
  sample.x = 130;
  sample.y = 490;
  message = "";
}

function nextStage() {
  message = "";

  if (!completed[stage]) {
    message = "Complete this stage by dragging the sample to its station.";
    messageGood = false;
    return;
  }

  if (stage < 5) {
    stage++;
    sample.x = 130;
    sample.y = 490;
  } else {
    screen = "report";
  }
}

function restartLab() {
  screen = "intro";
  scenario = "";
  stage = 0;
  completed = [false, false, false, false, false, false];
  sample.x = 130;
  sample.y = 490;
  message = "";
  dragging = false;
}
function logicalMouseX() {
  return (mouseX - viewOffsetX) / (fitScale * zoom);
}

function logicalMouseY() {
  return (mouseY - viewOffsetY) / (fitScale * zoom);
}
function touchStarted() {
  if (touches.length >= 2) {
    pinchZooming = true;
    dragging = false;

    lastPinchDistance = getPinchDistance();

    let midX = (touches[0].x + touches[1].x) / 2;
    let midY = (touches[0].y + touches[1].y) / 2;

    let totalScale = fitScale * zoom;

    pinchAnchorX = (midX - viewOffsetX) / totalScale;
    pinchAnchorY = (midY - viewOffsetY) / totalScale;

    return false;
  }

  pinchZooming = false;
  mousePressed();

  return false;
}

function touchMoved() {
  if (pinchZooming && touches.length >= 2) {
    let newDistance = getPinchDistance();

    if (lastPinchDistance > 0) {
      zoom *= newDistance / lastPinchDistance;
      zoom = constrain(zoom, minZoom, maxZoom);
    }

    lastPinchDistance = newDistance;

    let midX = (touches[0].x + touches[1].x) / 2;
    let midY = (touches[0].y + touches[1].y) / 2;

    let totalScale = fitScale * zoom;

    let centeredX = (width - 1100 * totalScale) / 2;
    let centeredY = (height - 700 * totalScale) / 2;

    panOffsetX = midX - pinchAnchorX * totalScale - centeredX;
    panOffsetY = midY - pinchAnchorY * totalScale - centeredY;

    return false;
  }

  if (!pinchZooming) {
    mouseDragged();
  }

  return false;
}
function touchEnded() {
  if (pinchZooming) {
    if (touches.length < 2) {
      pinchZooming = false;
      lastPinchDistance = 0;
    }

    return false;
  }

  mouseReleased();
  return false;
}
function getPinchDistance() {
  if (touches.length < 2) return 0;

  let dx = touches[0].x - touches[1].x;
  let dy = touches[0].y - touches[1].y;

  return sqrt(dx * dx + dy * dy);
}