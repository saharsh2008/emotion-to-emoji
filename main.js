predict1 = "";
predict2 = "";

Webcam.set({
    width : 350,
    height : 300,
    image_format : "png",
    png_quality : 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function takeSnapShot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = "<img id = 'capturedImage' src = '" + data_uri + "'>";
    });
}

console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/7ZlbhcLtu/model.json", modelLoaded);

function modelLoaded() {
    console.log("model is loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speakData1 = "The first prediction is" + predict1;
    speakData2 = "And the second prediction is" + predict2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}

function check () {
    img = document.getElementById("capturedImage");
    classifier.classify(img,gotResult);
}

function gotResult (error, results) {
    if (error) {
        console.error(error);
    }

    else {
        console.log(results);
        document.getElementById("resultEmotionName").innerHTML = results[0].label;
        document.getElementById("resultEmotionName2").innerHTML = results[1].label;
        predict1 = results[0].label;
        predict2 = results[1].label;
        speak();
        if (results[0].label == "Happy") {
            document.getElementById("updateEmoji").innerHTML = "&#128522;";
        }
        if (results[0].label == "Sad") {
            document.getElementById("updateEmoji").innerHTML = "&#128532;";
        }
        if (results[0].label == "Angry") {
            document.getElementById("updateEmoji").innerHTML = "&#128548;";
        }
        if (results[1].label == "Happy") {
            document.getElementById("updateEmoji2").innerHTML = "&#128522;";
        }
        if (results[1].label == "Sad") {
            document.getElementById("updateEmoji2").innerHTML = "&#128532;";
        }
        if (results[1].label == "Angry") {
            document.getElementById("updateEmoji2").innerHTML = "&#128548;";
        }
    }
}